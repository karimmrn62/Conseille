import type { ConfigCerveau } from "./config.js";
import { calculerFaits } from "./compute/faits.js";
import { chiffresNonSources } from "./compute/verification.js";
import { construireContexte } from "./contexte.js";
import type { ModeleIA } from "./llm/types.js";
import { tenirConseil } from "./modules/conseil.js";
import { analyserKpi } from "./modules/kpi.js";
import { jouer, lire, type ParametresMethode, type ResultatMethode } from "./pipeline/methode.js";
import { rendreAnalyse } from "./render/markdown.js";
import type { AnalyseKpi, ConseilDeGuerre, Lecture } from "./schemas.js";
import type { Fait, Position } from "./types.js";

export interface ResultatAnalyse {
  position: Pick<Position, "id" | "titre" | "type" | "question">;
  faits: Fait[];
  lecture: Lecture;
  methode: ResultatMethode;
  kpi: AnalyseKpi | null;
  conseil: ConseilDeGuerre | null;
  /** Chiffres du rendu final introuvables dans les documents et les faits calculés. */
  chiffresNonSources: string[];
  markdown: string;
}

/**
 * Analyse complète d'une position par Bishop :
 * 1. calcul des faits par le code ;
 * 2. lecture de la position ;
 * 3. en parallèle : la méthode du grand maître, et l'audit des KPI s'il y a des données ;
 * 4. le conseil de guerre sur le coup principal ;
 * 5. rendu et contrôle des chiffres.
 */
export async function analyser(position: Position, modele: ModeleIA, config: ConfigCerveau): Promise<ResultatAnalyse> {
  const langue = position.langue ?? "fr";
  const faits = (position.donnees ?? []).flatMap((jeu, i) => calculerFaits(jeu, langue, i === 0 ? "F" : `F${i + 1}.`));
  const contexte = construireContexte(position, faits);

  const p: ParametresMethode = {
    modele,
    config,
    contexte,
    langue,
    audace: position.audace ?? 2,
    registre: position.registre ?? "sobre",
  };

  const lecture = await lire(p, position.question);
  const [methode, kpi] = await Promise.all([
    jouer(p, lecture),
    faits.length > 0 ? analyserKpi(p, lecture) : Promise.resolve(null),
  ]);

  const coupPrincipal = methode.formulation.coups[0];
  const conseil = coupPrincipal ? await tenirConseil(p, lecture, coupPrincipal) : null;

  const corps = rendreAnalyse({ langue, lecture, formulation: methode.formulation, kpi, conseil });
  const suspects = chiffresNonSources(
    corps,
    faits,
    position.documents.map((d) => d.contenu),
  );
  const markdown = rendreAnalyse({
    langue,
    lecture,
    formulation: methode.formulation,
    kpi,
    conseil,
    chiffresNonSources: suspects,
  });

  return {
    position: { id: position.id, titre: position.titre, type: position.type, question: position.question },
    faits,
    lecture,
    methode,
    kpi,
    conseil,
    chiffresNonSources: suspects,
    markdown,
  };
}
