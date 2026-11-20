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
 * Agrège plusieurs passes de notation indépendantes par la médiane
 * (une seule note d'un modèle est peu fiable), calcule un score pondéré selon l'audace
 * et applique les seuils éliminatoires.
 */
export function agregerNotes(ids: string[], passes: NoteBrute[][], audace: Audace): NoteAgregee[] {
  const poids = POIDS[audace];
  return ids.map((id) => {
    const notes = passes.flatMap((p) => p.filter((n) => n.id === id));
    const crit = (c: "banalite" | "pertinence" | "coherence" | "faisabilite") =>
      mediane(notes.map((n) => borner(n[c])));
    const banalite = crit("banalite");
    const pertinence = crit("pertinence");
    const coherence = crit("coherence");
    const faisabilite = crit("faisabilite");
    const score =
      poids.nouveaute * (10 - banalite) +
      poids.pertinence * pertinence +
      poids.coherence * coherence +
      poids.faisabilite * faisabilite;

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
