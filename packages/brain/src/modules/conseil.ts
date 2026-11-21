import { consigne } from "../prompts.js";
import { type ConseilDeGuerre, type Formulation, type Lecture, SchemaConseil } from "../schemas.js";
import { type ParametresMethode, resumerLecture } from "../pipeline/methode.js";

type Coup = Formulation["coups"][number];

/** Module « Le conseil de guerre » : simulation raisonnée de la réaction des acteurs à un coup. */
export async function tenirConseil(p: ParametresMethode, lecture: Lecture, coup: Coup): Promise<ConseilDeGuerre> {
  return p.modele.json({
    etape: "conseil",
    contexte: p.contexte,
    consigne: consigne("conseil", p.langue, {
      lecture: resumerLecture(lecture),
      coup: `${coup.titre} — ${coup.coup}\n${coup.pourquoiIlGagne}`,
    }),
    schema: SchemaConseil,
    effort: p.config.effortReflexion,
  });
}
