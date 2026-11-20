import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import type { z } from "zod";
import type { ConfigCerveau } from "../config.js";
import type { Consommation, ModeleIA, RequeteJson, RequeteTexte } from "./types.js";

const BETA_FALLBACK = "server-side-fallback-2026-07-01";

export class ErreurModele extends Error {
  constructor(
    message: string,
    readonly etape: string,
  ) {
    super(`[${etape}] ${message}`);
    this.name = "ErreurModele";
  }
}

/**
 * Implémentation du modèle d'IA avec l'API Claude.
 *
 * - La doctrine et la position sont envoyées en blocs système, avec un point de cache
 *   sur la position : toutes les étapes d'une analyse réutilisent ce préfixe.
 * - Les sorties sont contraintes par un schéma (structured outputs) et validées par Zod.
 * - En cas de refus du modèle principal, l'API bascule automatiquement sur un modèle de repli.
 */
export class ModeleAnthropic implements ModeleIA {
  private readonly client: Anthropic;
  private readonly journal: Consommation[] = [];

  constructor(
    private readonly config: ConfigCerveau,
    client?: Anthropic,
  ) {
    this.client = client ?? new Anthropic();
  }

  consommation(): Consommation[] {
    return [...this.journal];
  }

  async json<S extends z.ZodType>(requete: RequeteJson<S>): Promise<z.infer<S>> {
    const debut = Date.now();
    const reponse = await this.client.beta.messages.parse({
      model: this.config.modele,
      max_tokens: this.config.maxTokens,
      betas: [BETA_FALLBACK],
      fallbacks: "default",
      system: [
        { type: "text", text: requete.contexte.doctrine },
        {
          type: "text",
          text: requete.contexte.position,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [{ role: "user", content: requete.consigne }],
      output_config: {
        effort: requete.effort,
        format: betaZodOutputFormat(requete.schema),
      },
    });

    this.noter(requete.etape, reponse.usage, debut);
    this.verifierArret(requete.etape, reponse.stop_reason);

    if (reponse.parsed_output == null) {
      throw new ErreurModele("la réponse ne respecte pas le schéma attendu", requete.etape);
    }
    return reponse.parsed_output as z.infer<S>;
  }

  async texte(requete: RequeteTexte): Promise<string> {
    const debut = Date.now();
    const reponse = await this.client.beta.messages.create({
      model: this.config.modele,
      max_tokens: this.config.maxTokens,
      betas: [BETA_FALLBACK],
      fallbacks: "default",
      system: requete.systeme,
      messages: [{ role: "user", content: requete.consigne }],
      output_config: { effort: requete.effort },
    });

    this.noter(requete.etape, reponse.usage, debut);
    this.verifierArret(requete.etape, reponse.stop_reason);

    return reponse.content
      .filter((bloc): bloc is Anthropic.Beta.BetaTextBlock => bloc.type === "text")
      .map((bloc) => bloc.text)
      .join("\n")
      .trim();
  }

  private verifierArret(etape: string, raison: string | null): void {
    if (raison === "refusal") {
      throw new ErreurModele("le modèle a refusé de répondre", etape);
    }
    if (raison === "max_tokens") {
      throw new ErreurModele(
        "réponse tronquée (limite de jetons atteinte) : augmenter BISHOP_MAX_TOKENS",
        etape,
      );
    }
  }

  private noter(etape: string, usage: Anthropic.Beta.BetaUsage, debut: number): void {
    this.journal.push({
      etape,
      entree: usage.input_tokens,
      sortie: usage.output_tokens,
      cacheLu: usage.cache_read_input_tokens ?? 0,
      cacheEcrit: usage.cache_creation_input_tokens ?? 0,
      dureeMs: Date.now() - debut,
    });
  }
}
