import { consigne } from "../prompts.js";
import { type AnalyseKpi, type Lecture, SchemaKpi } from "../schemas.js";
import type { ParametresMethode } from "../pipeline/methode.js";

/** Module « Les KPI qui vous mentent » et « Revue en trois coups ». */
export async function analyserKpi(p: ParametresMethode, lecture: Lecture): Promise<AnalyseKpi> {
  return p.modele.json({
    etape: "kpi",
    contexte: p.contexte,
    consigne: consigne("kpi", p.langue, { lecture: JSON.stringify(lecture, null, 2) }),
    schema: SchemaKpi,
    effort: p.config.effortReflexion,
  });
}
