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

  const donneesBrutes = (position.donnees ?? [])
    .map((jeu) => {
      const lignes = jeu.csv.trim().split(/\r?\n/);
      const extrait = lignes.slice(0, LIGNES_BRUTES_MAX + 1).join("\n");
      const suite = lignes.length > LIGNES_BRUTES_MAX + 1 ? `\n${t.contexte.tronque(lignes.length - 1)}` : "";
      return `<donnees nom="${echapper(jeu.nom)}" lignes="${lignes.length - 1}">\n${extrait}${suite}\n</donnees>`;
    })
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
    ...(donneesBrutes ? [`## ${t.contexte.donneesBrutes}\n\n${t.contexte.donneesBrutesIntro}\n\n${donneesBrutes}`] : []),
    `## ${t.contexte.faits}\n\n${blocFaits}`,
  ].join("\n\n");

  return { doctrine, position: texte };
}

/** Au-delà, on n'envoie qu'un extrait : les calculs, eux, portent toujours sur toutes les lignes. */
const LIGNES_BRUTES_MAX = 200;

function echapper(texte: string): string {
  return texte.replace(/"/g, "'");
}
