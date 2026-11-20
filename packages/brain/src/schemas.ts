import { z } from "zod";

/**
 * Schémas des sorties du modèle à chaque étape.
 * Ils servent à la fois à contraindre la génération (structured outputs) et à valider la réponse.
 */

const Niveau = z.enum(["faible", "moyen", "fort"]);
const Fragilite = z.enum(["faible", "moyenne", "forte"]);
export const Confiance = z.enum(["faible", "moyenne", "forte"]);

export const SchemaLecture = z.object({
  vraieQuestion: z.string(),
  enjeux: z.array(z.string()),
  acteurs: z.array(
    z.object({
      nom: z.string(),
      role: z.string(),
      interets: z.string(),
      pouvoir: Niveau,
      positionProbable: z.string(),
    }),
  ),
  contraintesDures: z.array(z.string()),
  contraintesSupposees: z.array(z.string()),
  hypothesesImplicites: z.array(
    z.object({ hypothese: z.string(), fragilite: Fragilite, pourquoi: z.string() }),
  ),
  anglesMorts: z.array(z.string()),
  contradictions: z.array(z.string()),
  nonDits: z.array(z.string()),
  actifsSousEstimes: z.array(z.string()),
  coupsEvidents: z.array(z.string()),
  questionsAPoser: z.array(z.string()),
});
export type Lecture = z.infer<typeof SchemaLecture>;

export const SchemaCandidats = z.object({
  candidats: z.array(
    z.object({
      titre: z.string(),
      coup: z.string(),
      technique: z.string(),
      mecanisme: z.string(),
      pourquoiInvisible: z.string(),
    }),
  ),
});
export type Candidat = z.infer<typeof SchemaCandidats>["candidats"][number] & { id: string };

export const SchemaNotation = z.object({
  notes: z.array(
    z.object({
      id: z.string(),
      banalite: z.number(),
      pertinence: z.number(),
      coherence: z.number(),
      faisabilite: z.number(),
      commentaire: z.string(),
    }),
  ),
});

export const SchemaVerification = z.object({
  verifications: z.array(
    z.object({
      id: z.string(),
      refutation: z.string(),
      tient: z.boolean(),
      risque: z.string(),
      conditionsDeSucces: z.array(z.string()),
      test: z.string(),
      confiance: Confiance,
      pourMonterLaConfiance: z.string(),
    }),
  ),
});
export type Verification = z.infer<typeof SchemaVerification>["verifications"][number];

export const SchemaFormulation = z.object({
  ouverture: z.string(),
  coups: z.array(
    z.object({
      titre: z.string(),
      coup: z.string(),
      pourquoiPersonne: z.string(),
      pourquoiIlGagne: z.string(),
      troisCoupsSuivants: z.array(z.string()),
      risque: z.string(),
      test: z.string(),
      confiance: Confiance,
      pourMonterLaConfiance: z.string(),
      appuis: z.array(z.string()),
    }),
  ),
  coupEvident: z.string(),
  siJeNeDevaisJouerQuUnCoup: z.string(),
});
export type Formulation = z.infer<typeof SchemaFormulation>;

export const Pathologie = z.enum([
  "surrogation",
  "retarde_sans_avance",
  "sans_contrepartie",
  "effet_de_mix",
  "denominateur_trompeur",
  "moyenne_masque_dispersion",
  "autre",
]);

export const SchemaKpi = z.object({
  diagnostic: z.string(),
  kpiQuiMentent: z.array(
    z.object({
      kpi: z.string(),
      pathologie: Pathologie,
      explication: z.string(),
      faits: z.array(z.string()),
      consequence: z.string(),
    }),
  ),
  indicateursManquants: z.array(
    z.object({ indicateur: z.string(), definition: z.string(), pourquoi: z.string(), frequence: z.string() }),
  ),
  arbreKpi: z.array(
    z.object({
      niveau: z.enum(["objectif", "pilotage", "operationnel"]),
      indicateur: z.string(),
      rattacheA: z.string(),
    }),
  ),
  revue: z.array(
    z.object({
      priorite: z.string(),
      justification: z.string(),
      faits: z.array(z.string()),
      actions: z.array(z.object({ action: z.string(), responsable: z.string(), echeance: z.string() })),
    }),
  ),
});
export type AnalyseKpi = z.infer<typeof SchemaKpi>;

export const SchemaConseil = z.object({
  acteurs: z.array(
    z.object({
      acteur: z.string(),
      reaction: z.string(),
      objection: z.string(),
      interetCache: z.string(),
      contreCoup: z.string(),
      signal: z.string(),
      plausibilite: Fragilite,
    }),
  ),
  hypotheses: z.array(z.string()),
  ordreDeJeu: z.string(),
});
export type ConseilDeGuerre = z.infer<typeof SchemaConseil>;

export const Note = z.object({
  originalite: z.number(),
  pertinence: z.number(),
  rigueur: z.number(),
  actionnabilite: z.number(),
  credibilite: z.number(),
});

export const SchemaJugement = z.object({
  A: Note,
  B: Note,
  preference: z.enum(["A", "B", "egalite"]),
  justification: z.string(),
});
export type Jugement = z.infer<typeof SchemaJugement>;
