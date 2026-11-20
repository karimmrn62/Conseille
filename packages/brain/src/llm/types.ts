import type { z } from "zod";
import type { Effort } from "../config.js";

/**
 * Le contexte partagé par toutes les étapes d'une analyse.
 * Il est identique d'un appel à l'autre pour une même position,
 * ce qui permet de le mettre en cache côté API.
 */
export interface ContextePartage {
  /** Doctrine de Bishop (personnalité, règles d'or). Stable entre toutes les positions. */
  doctrine: string;
  /** La position : documents, faits calculés, réglages. Stable pendant une analyse. */
  position: string;
}

export interface RequeteJson<S extends z.ZodType> {
  /** Nom de l'étape, pour les journaux et le suivi des coûts. */
  etape: string;
  contexte: ContextePartage;
  consigne: string;
  schema: S;
  effort: Effort;
}

export interface RequeteTexte {
  etape: string;
  systeme: string;
  consigne: string;
  effort: Effort;
}

export interface Consommation {
  etape: string;
  entree: number;
  sortie: number;
  cacheLu: number;
  cacheEcrit: number;
  dureeMs: number;
}

/** Abstraction du modèle d'IA, pour pouvoir tester le pipeline sans appel réel. */
export interface ModeleIA {
  json<S extends z.ZodType>(requete: RequeteJson<S>): Promise<z.infer<S>>;
  texte(requete: RequeteTexte): Promise<string>;
  consommation(): Consommation[];
}
