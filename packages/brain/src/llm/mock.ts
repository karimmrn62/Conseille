import type { z } from "zod";
import type { Consommation, ModeleIA, RequeteJson, RequeteTexte } from "./types.js";

type Repondeur = (etape: string, consigne: string) => unknown;

/**
 * Faux modèle pour les tests : renvoie des réponses préparées selon l'étape
 * et vérifie qu'elles respectent le schéma, comme le ferait l'API.
 */
export class ModeleSimule implements ModeleIA {
  readonly appels: { etape: string; consigne: string; modele?: string }[] = [];

  constructor(private readonly repondre: Repondeur) {}

  async json<S extends z.ZodType>(requete: RequeteJson<S>): Promise<z.infer<S>> {
    this.appels.push({ etape: requete.etape, consigne: requete.consigne, modele: requete.modele });
    const brut = this.repondre(requete.etape, requete.consigne);
    return requete.schema.parse(brut) as z.infer<S>;
  }

  async texte(requete: RequeteTexte): Promise<string> {
    this.appels.push({ etape: requete.etape, consigne: requete.consigne });
    return String(this.repondre(requete.etape, requete.consigne));
  }

  consommation(): Consommation[] {
    return this.appels.map((a) => ({
      etape: a.etape,
      modele: a.modele ?? "simule",
      entree: 0,
      sortie: 0,
      cacheLu: 0,
      cacheEcrit: 0,
      dureeMs: 0,
    }));
  }
}
