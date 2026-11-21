import { consigne } from "../prompts.js";
import { type AnalyseKpi, type Lecture, SchemaKpi } from "../schemas.js";
import { type ParametresMethode, resumerLecture } from "../pipeline/methode.js";

/** Module « Les KPI qui vous mentent » et « Revue en trois coups ». */
export async function analyserKpi(p: ParametresMethode, lecture: Lecture): Promise<AnalyseKpi> {
  return p.modele.json({
    etape: "kpi",
    contexte: p.contexte,
    consigne: consigne("kpi", p.langue, { lecture: resumerLecture(lecture) }),
    schema: SchemaKpi,
    effort: p.config.effortReflexion,
  });
}
