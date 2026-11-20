import type { ConfigCerveau } from "./config.js";
import type { ModeleIA } from "./llm/types.js";
import { consigne } from "./prompts.js";
import { type Jugement, SchemaJugement } from "./schemas.js";
import type { Position } from "./types.js";

export interface VerdictJuge {
  /** Préférence pour la réponse de Bishop : +1 par passe gagnée, −1 par passe perdue. */
  scoreBishop: number;
  passes: { ordre: "bishop-en-A" | "bishop-en-B"; jugement: Jugement }[];
}

/**
 * Juge automatique, en complément (jamais en remplacement) du jugement humain.
 * Il compare les deux réponses deux fois en inversant leur ordre,
 * pour neutraliser le biais de position connu des modèles juges.
 */
export async function juger(
  position: Position,
  bishop: string,
  temoin: string,
  modele: ModeleIA,
  config: ConfigCerveau,
): Promise<VerdictJuge> {
  const langue = position.langue ?? "fr";
  const contexte = {
    doctrine: consigne("juge", langue),
    position: [
      `# Dossier : ${position.titre}`,
      ...position.documents.map((d) => `<document nom="${d.nom}">\n${d.contenu.trim()}\n</document>`),
      ...(position.donnees ?? []).map((j) => `<donnees nom="${j.nom}">\n${j.csv.trim()}\n</donnees>`),
      `# Question\n\n${position.question}`,
    ].join("\n\n"),
  };

  const ordres = [
    { ordre: "bishop-en-A" as const, A: bishop, B: temoin },
    { ordre: "bishop-en-B" as const, A: temoin, B: bishop },
  ];

  const passes = await Promise.all(
    ordres.map(async (o) => ({
      ordre: o.ordre,
      jugement: await modele.json({
        etape: `juge-${o.ordre}`,
        contexte,
        consigne: `<reponse_A>\n${o.A}\n</reponse_A>\n\n<reponse_B>\n${o.B}\n</reponse_B>`,
        schema: SchemaJugement,
        effort: config.effortReflexion,
      }),
    })),
  );

  let scoreBishop = 0;
  for (const { ordre, jugement } of passes) {
    if (jugement.preference === "egalite") continue;
    const bishopGagne = (ordre === "bishop-en-A") === (jugement.preference === "A");
    scoreBishop += bishopGagne ? 1 : -1;
  }
  return { scoreBishop, passes };
}
