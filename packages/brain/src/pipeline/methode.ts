import type { ConfigCerveau } from "../config.js";
import { libelles } from "../i18n.js";
import type { ContextePartage, ModeleIA } from "../llm/types.js";
import { consigne } from "../prompts.js";
import {
  type Candidat,
  type Formulation,
  type Lecture,
  type Verification,
  SchemaCandidats,
  SchemaFormulation,
  SchemaLecture,
  SchemaNotation,
  SchemaVerification,
} from "../schemas.js";
import type { Audace, Locale, Registre } from "../types.js";
import { agregerNotes, melanger, type NoteAgregee, selectionner } from "./selection.js";

/**
 * La méthode du grand maître, en cinq étapes :
 * lecture → divergence imposée → filtre anti-banalité → vérification → coup joué.
 */

export interface ParametresMethode {
  modele: ModeleIA;
  config: ConfigCerveau;
  contexte: ContextePartage;
  langue: Locale;
  audace: Audace;
  registre: Registre;
}

export interface ResultatMethode {
  candidats: Candidat[];
  notes: NoteAgregee[];
  verifications: Verification[];
  formulation: Formulation;
}

export async function lire(p: ParametresMethode, question: string): Promise<Lecture> {
  return p.modele.json({
    etape: "lecture",
    contexte: p.contexte,
    consigne: consigne("lecture", p.langue, { question }),
    schema: SchemaLecture,
    effort: p.config.effortReflexion,
  });
}

/** Étape 2 : plusieurs générations en parallèle, chacune avec des techniques imposées différentes. */
export async function diverger(p: ParametresMethode, lecture: Lecture): Promise<Candidat[]> {
  const t = libelles(p.langue);
  const lectureTexte = JSON.stringify(lecture, null, 2);
  const evidents = lecture.coupsEvidents.map((c) => `- ${c}`).join("\n") || "-";

  const lots = await Promise.all(
    t.techniques.map((techniques, i) =>
      p.modele.json({
        etape: `divergence-${i + 1}`,
        contexte: p.contexte,
        consigne: consigne("divergence", p.langue, {
          lecture: lectureTexte,
          coupsEvidents: evidents,
          nombre: String(Math.max(techniques.length, 4)),
          techniques: techniques.map((x) => `- ${x}`).join("\n"),
          audace: t.audace[p.audace],
        }),
        schema: SchemaCandidats,
        effort: p.config.effortReflexion,
      }),
    ),
  );

  return lots.flatMap((lot, i) =>
    lot.candidats.map((c, j) => ({ ...c, id: `C${i + 1}.${j + 1}` })),
  );
}

/** Étape 3 : notations indépendantes (ordre de présentation différent à chaque passe), agrégées par la médiane. */
export async function noter(
  p: ParametresMethode,
  lecture: Lecture,
  candidats: Candidat[],
): Promise<NoteAgregee[]> {
  const lectureTexte = JSON.stringify(lecture, null, 2);
  const passes = await Promise.all(
    Array.from({ length: p.config.passesNotation }, (_, i) =>
      p.modele
        .json({
          etape: `notation-${i + 1}`,
          contexte: p.contexte,
          consigne: consigne("notation", p.langue, {
            lecture: lectureTexte,
            candidats: decrireCandidats(melanger(candidats, i + 1)),
          }),
          schema: SchemaNotation,
          effort: p.config.effortNotation,
        })
        .then((r) => r.notes),
    ),
  );
  return agregerNotes(
    candidats.map((c) => c.id),
    passes,
    p.audace,
  );
}

/** Étape 4 : l'avocat du diable essaie de réfuter les meilleurs candidats. */
export async function verifier(
  p: ParametresMethode,
  lecture: Lecture,
  retenus: Candidat[],
): Promise<Verification[]> {
  if (retenus.length === 0) return [];
  const r = await p.modele.json({
    etape: "verification",
    contexte: p.contexte,
    consigne: consigne("verification", p.langue, {
      lecture: JSON.stringify(lecture, null, 2),
      candidats: decrireCandidats(retenus),
    }),
    schema: SchemaVerification,
    effort: p.config.effortReflexion,
  });
  const ids = new Set(retenus.map((c) => c.id));
  return r.verifications.filter((v) => ids.has(v.id));
}

/** Étape 5 : la formulation finale, dans la voix de Bishop. */
export async function formuler(
  p: ParametresMethode,
  lecture: Lecture,
  survivants: { candidat: Candidat; verification: Verification }[],
): Promise<Formulation> {
  const t = libelles(p.langue);
  return p.modele.json({
    etape: "formulation",
    contexte: p.contexte,
    consigne: consigne("formulation", p.langue, {
      lecture: JSON.stringify(lecture, null, 2),
      retenus: JSON.stringify(survivants, null, 2),
      registre: t.registre[p.registre],
      maximum: String(p.config.coupsFinaux),
    }),
    schema: SchemaFormulation,
    effort: p.config.effortReflexion,
  });
}

/** Enchaîne les étapes 2 à 5 à partir d'une lecture déjà faite. */
export async function jouer(p: ParametresMethode, lecture: Lecture): Promise<ResultatMethode> {
  const candidats = await diverger(p, lecture);
  const notes = await noter(p, lecture, candidats);
  const meilleurs = selectionner(notes, p.config.candidatsVerifies);
  const retenus = meilleurs
    .map((n) => candidats.find((c) => c.id === n.id))
    .filter((c): c is Candidat => c !== undefined);
  const verifications = await verifier(p, lecture, retenus);

  const survivants = retenus
    .map((candidat) => ({ candidat, verification: verifications.find((v) => v.id === candidat.id) }))
    .filter((s): s is { candidat: Candidat; verification: Verification } => s.verification?.tient === true)
    .slice(0, p.config.coupsFinaux);

  const formulation =
    survivants.length > 0
      ? await formuler(p, lecture, survivants)
      : {
          ouverture: lecture.vraieQuestion,
          coups: [],
          coupEvident: lecture.coupsEvidents[0] ?? "",
          siJeNeDevaisJouerQuUnCoup: libelles(p.langue).rendu.aucunCoup,
        };

  return { candidats, notes, verifications, formulation };
}

function decrireCandidats(candidats: Candidat[]): string {
  return candidats
    .map(
      (c) =>
        `[${c.id}] ${c.titre}\nCoup : ${c.coup}\nTechnique : ${c.technique}\nMécanisme : ${c.mecanisme}\nPourquoi invisible : ${c.pourquoiInvisible}`,
    )
    .join("\n\n");
}
