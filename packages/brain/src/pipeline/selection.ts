import type { Audace } from "../types.js";

export interface NoteBrute {
  id: string;
  banalite: number;
  pertinence: number;
  coherence: number;
  faisabilite: number;
  commentaire: string;
}

export interface NoteAgregee {
  id: string;
  banalite: number;
  pertinence: number;
  coherence: number;
  faisabilite: number;
  score: number;
  passes: number;
  commentaires: string[];
  ecarte: string | null;
}

/** Poids des critères selon le niveau d'audace (nouveauté = 10 − banalité). */
const POIDS: Record<Audace, { nouveaute: number; pertinence: number; coherence: number; faisabilite: number }> = {
  1: { nouveaute: 0.2, pertinence: 0.3, coherence: 0.25, faisabilite: 0.25 },
  2: { nouveaute: 0.4, pertinence: 0.3, coherence: 0.2, faisabilite: 0.1 },
  3: { nouveaute: 0.55, pertinence: 0.25, coherence: 0.15, faisabilite: 0.05 },
};

/** Seuils éliminatoires : une idée incohérente ou hors sujet ne passe jamais, quelle que soit sa nouveauté. */
const SEUIL_COHERENCE = 5;
const SEUIL_PERTINENCE = 5;
/** En mode Classique, on exige aussi un minimum de faisabilité. */
const SEUIL_FAISABILITE_CLASSIQUE = 5;

export function mediane(valeurs: number[]): number {
  if (valeurs.length === 0) return 0;
  const tri = [...valeurs].sort((a, b) => a - b);
  const milieu = Math.floor(tri.length / 2);
  return tri.length % 2 === 1 ? tri[milieu]! : (tri[milieu - 1]! + tri[milieu]!) / 2;
}

function borner(x: number): number {
  return Math.min(10, Math.max(0, x));
}

/**
 * Convertit les notes d'une passe en rangs relatifs sur 0–10 (ex æquo : rang moyen).
 * Les modèles notent de façon resserrée (tout entre 6 et 8) : raisonner en rangs
 * oblige à départager les idées au lieu de les trouver toutes « assez bonnes ».
 */
export function rangsRelatifs(valeurs: number[]): number[] {
  const n = valeurs.length;
  if (n <= 1) return valeurs.map(() => 5);
  return valeurs.map((v) => {
    const inferieurs = valeurs.filter((x) => x < v).length;
    const egaux = valeurs.filter((x) => x === v).length;
    const rangMoyen = inferieurs + (egaux - 1) / 2;
    return (rangMoyen / (n - 1)) * 10;
  });
}

type Critere = "banalite" | "pertinence" | "coherence" | "faisabilite";
const CRITERES: Critere[] = ["banalite", "pertinence", "coherence", "faisabilite"];

/**
 * Agrège plusieurs passes de notation indépendantes :
 * - le score de sélection repose sur les **rangs relatifs** de chaque passe, agrégés par la médiane
 *   (une seule note d'un modèle est peu fiable, et les notes brutes discriminent mal) ;
 * - les seuils éliminatoires reposent sur les **notes brutes** médianes (une idée incohérente
 *   reste incohérente, même si toutes les autres le sont davantage).
 */
export function agregerNotes(ids: string[], passes: NoteBrute[][], audace: Audace): NoteAgregee[] {
  const poids = POIDS[audace];

  // Rangs relatifs par passe et par critère.
  const rangs = new Map<string, Record<Critere, number[]>>();
  for (const id of ids) rangs.set(id, { banalite: [], pertinence: [], coherence: [], faisabilite: [] });
  for (const passe of passes) {
    const notees = passe.filter((n) => rangs.has(n.id));
    for (const c of CRITERES) {
      const r = rangsRelatifs(notees.map((n) => borner(n[c])));
      notees.forEach((n, i) => rangs.get(n.id)![c].push(r[i]!));
    }
  }

  return ids.map((id) => {
    const notes = passes.flatMap((p) => p.filter((n) => n.id === id));
    const brut = (c: Critere) => mediane(notes.map((n) => borner(n[c])));
    const relatif = (c: Critere) => mediane(rangs.get(id)![c]);
    const banalite = brut("banalite");
    const pertinence = brut("pertinence");
    const coherence = brut("coherence");
    const faisabilite = brut("faisabilite");
    const score =
      poids.nouveaute * (10 - relatif("banalite")) +
      poids.pertinence * relatif("pertinence") +
      poids.coherence * relatif("coherence") +
      poids.faisabilite * relatif("faisabilite");

    let ecarte: string | null = null;
    if (notes.length === 0) ecarte = "non noté";
    else if (coherence < SEUIL_COHERENCE) ecarte = "cohérence insuffisante";
    else if (pertinence < SEUIL_PERTINENCE) ecarte = "pertinence insuffisante";
    else if (audace === 1 && faisabilite < SEUIL_FAISABILITE_CLASSIQUE) ecarte = "faisabilité insuffisante";

    return {
      id,
      banalite,
      pertinence,
      coherence,
      faisabilite,
      score: Math.round(score * 100) / 100,
      passes: notes.length,
      commentaires: notes.map((n) => n.commentaire),
      ecarte,
    };
  });
}

export function selectionner(notes: NoteAgregee[], nombre: number): NoteAgregee[] {
  return notes
    .filter((n) => n.ecarte === null)
    .sort((a, b) => b.score - a.score)
    .slice(0, nombre);
}

/** Mélange déterministe (pour varier l'ordre de présentation entre passes de notation sans hasard non reproductible). */
export function melanger<T>(elements: T[], graine: number): T[] {
  const copie = [...elements];
  let etat = graine * 2654435761 + 1;
  const aleatoire = () => {
    etat = (etat * 1103515245 + 12345) % 2147483648;
    return etat / 2147483648;
  };
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(aleatoire() * (i + 1));
    [copie[i], copie[j]] = [copie[j]!, copie[i]!];
  }
  return copie;
}
