/**
 * Réglages du cerveau. Tout est surchargeable par variables d'environnement
 * pour pouvoir comparer des configurations sur le banc d'essai.
 */

export type Effort = "low" | "medium" | "high" | "xhigh" | "max";

export interface ConfigCerveau {
  modele: string;
  /** Effort pour les étapes de génération et de jugement final. */
  effortReflexion: Effort;
  /** Effort pour les étapes de notation (répétées plusieurs fois). */
  effortNotation: Effort;
  /** Nombre de passes de notation indépendantes (agrégées par la médiane). */
  passesNotation: number;
  /** Nombre de coups candidats conservés pour la vérification. */
  candidatsVerifies: number;
  /** Nombre maximal de coups présentés à l'utilisateur. */
  coupsFinaux: number;
  maxTokens: number;
}

function entier(valeur: string | undefined, defaut: number): number {
  const n = valeur ? Number.parseInt(valeur, 10) : Number.NaN;
  return Number.isFinite(n) && n > 0 ? n : defaut;
}

function effort(valeur: string | undefined, defaut: Effort): Effort {
  const valides: Effort[] = ["low", "medium", "high", "xhigh", "max"];
  return valides.includes(valeur as Effort) ? (valeur as Effort) : defaut;
}

export function chargerConfig(env: NodeJS.ProcessEnv = process.env): ConfigCerveau {
  return {
    modele: env.BISHOP_MODELE ?? "claude-opus-5-5",
    effortReflexion: effort(env.BISHOP_EFFORT_REFLEXION, "high"),
    effortNotation: effort(env.BISHOP_EFFORT_NOTATION, "medium"),
    passesNotation: entier(env.BISHOP_PASSES_NOTATION, 3),
    candidatsVerifies: entier(env.BISHOP_CANDIDATS_VERIFIES, 5),
    coupsFinaux: entier(env.BISHOP_COUPS_FINAUX, 3),
    maxTokens: entier(env.BISHOP_MAX_TOKENS, 16000),
  };
}
