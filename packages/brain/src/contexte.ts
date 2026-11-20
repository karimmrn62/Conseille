import { libelles } from "./i18n.js";
import type { ContextePartage } from "./llm/types.js";
import { consigne } from "./prompts.js";
import type { Fait, Position } from "./types.js";

/**
 * Construit le contexte partagé par toutes les étapes d'une analyse :
 * la doctrine de Bishop, puis la position (réglages, documents, faits calculés).
 * Ce texte ne doit contenir aucun élément variable (date, identifiant aléatoire…)
 * pour rester identique d'un appel à l'autre et profiter du cache.
 */
export function construireContexte(position: Position, faits: Fait[]): ContextePartage {
  const langue = position.langue ?? "fr";
  const t = libelles(langue);
  const audace = position.audace ?? 2;
  const registre = position.registre ?? "sobre";

  const doctrine = `${consigne("doctrine", langue)}\n\n${t.langueReponse}`;

  const documents = position.documents
    .map((d) => `<document nom="${echapper(d.nom)}">\n${d.contenu.trim()}\n</document>`)
    .join("\n\n");

  const blocFaits =
    faits.length > 0
      ? `${t.contexte.faitsIntro}\n\n${faits.map((f) => `- ${f.id} : ${f.texte}`).join("\n")}`
      : t.contexte.aucunFait;

  const texte = [
    `# ${t.contexte.position} : ${position.titre}`,
    `(${t.contexte.type[position.type]})`,
    `## ${t.contexte.question}\n\n${position.question}`,
    `## ${t.contexte.reglages}\n\n- ${t.audace[audace]}\n- ${t.registre[registre]}`,
    `## ${t.contexte.documents}\n\n${documents}`,
    `## ${t.contexte.faits}\n\n${blocFaits}`,
  ].join("\n\n");

  return { doctrine, position: texte };
}

function echapper(texte: string): string {
  return texte.replace(/"/g, "'");
}
