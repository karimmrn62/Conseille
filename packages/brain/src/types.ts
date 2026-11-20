/**
 * Types de base du cerveau de Bishop.
 *
 * Une « position » est la situation que Bishop analyse : une mission de conseil,
 * un reporting de performance, un projet présenté en comité…
 */

export type Locale = "fr" | "en";

/** 1 = Classique, 2 = Positionnel (défaut), 3 = Gambit. */
export type Audace = 1 | 2 | 3;

/** Registre de voix : sobre (comités, grands comptes) ou incarné (plus de personnalité). */
export type Registre = "sobre" | "incarne";

export type TypePosition = "mission" | "pilotage";

export interface Document {
  nom: string;
  contenu: string;
}

/**
 * Déclaration d'un indicateur présent dans un jeu de données.
 * - "somme" : additif (chiffre d'affaires, volumes…)
 * - "ratio" : calculé à partir de deux colonnes additives (taux de marge = marge / CA)
 */
export type DefinitionIndicateur =
  | { nom: string; type: "somme"; unite?: string }
  | { nom: string; type: "ratio"; numerateur: string; denominateur: string; unite?: string };

/**
 * Jeu de données tabulaire au format « long » :
 * une colonne de période, des colonnes de dimensions (texte) et des colonnes numériques.
 */
export interface JeuDeDonnees {
  nom: string;
  csv: string;
  colonnePeriode: string;
  dimensions: string[];
  indicateurs: DefinitionIndicateur[];
}

export interface Position {
  id: string;
  titre: string;
  type: TypePosition;
  /** La question posée à Bishop par l'utilisateur. */
  question: string;
  documents: Document[];
  donnees?: JeuDeDonnees[];
  audace?: Audace;
  registre?: Registre;
  langue?: Locale;
}

/** Un fait calculé par du code. C'est la seule source de chiffres autorisée pour le modèle. */
export interface Fait {
  id: string;
  texte: string;
  valeurs: number[];
}
