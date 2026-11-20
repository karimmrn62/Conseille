import type { ConfigCerveau } from "./config.js";
import { lireCsv } from "./compute/csv.js";
import type { ModeleIA } from "./llm/types.js";
import { consigne } from "./prompts.js";
import type { Position } from "./types.js";

/**
 * Le témoin : ce que ferait un consultant compétent avec un assistant généraliste
 * et un très bon prompt. Même modèle, même effort, mêmes documents et données brutes,
 * mais sans la méthode ni les faits calculés. C'est la référence à battre.
 */
export async function repondreTemoin(position: Position, modele: ModeleIA, config: ConfigCerveau): Promise<string> {
  const langue = position.langue ?? "fr";
  const documents = position.documents
    .map((d) => `<document nom="${d.nom}">\n${d.contenu.trim()}\n</document>`)
    .join("\n\n");
  const donnees = (position.donnees ?? [])
    .map((j) => {
      const { lignes } = lireCsv(j.csv);
      return `<donnees nom="${j.nom}" lignes="${lignes.length}">\n${j.csv.trim()}\n</donnees>`;
    })
    .join("\n\n");

  return modele.texte({
    etape: "temoin",
    systeme: consigne("temoin", langue),
    consigne: [`# Dossier : ${position.titre}`, documents, donnees, `# Question\n\n${position.question}`]
      .filter((x) => x !== "")
      .join("\n\n"),
    effort: config.effortReflexion,
  });
}
