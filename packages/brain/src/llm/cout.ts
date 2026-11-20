import type { Consommation } from "./types.js";

/**
 * Tarifs publics en dollars par million de jetons (novembre 2026), pour une estimation.
 * La facture réelle fait foi.
 */
const TARIFS: Record<string, { entree: number; sortie: number; cacheLu: number; cacheEcrit: number }> = {
  "claude-opus-5-5": { entree: 4, sortie: 20, cacheLu: 0.2, cacheEcrit: 5 },
  "claude-sonnet-5-5": { entree: 2, sortie: 10, cacheLu: 0.1, cacheEcrit: 2.5 },
  "claude-haiku-5-5": { entree: 0.1, sortie: 0.5, cacheLu: 0.01, cacheEcrit: 0.125 },
};

export interface BilanCout {
  appels: number;
  entree: number;
  sortie: number;
  cacheLu: number;
  cacheEcrit: number;
  dureeMs: number;
  /** null si le modèle n'est pas dans la table des tarifs. */
  dollars: number | null;
}

export function bilan(modele: string, journal: Consommation[]): BilanCout {
  const somme = journal.reduce(
    (acc, c) => ({
      entree: acc.entree + c.entree,
      sortie: acc.sortie + c.sortie,
      cacheLu: acc.cacheLu + c.cacheLu,
      cacheEcrit: acc.cacheEcrit + c.cacheEcrit,
      dureeMs: acc.dureeMs + c.dureeMs,
    }),
    { entree: 0, sortie: 0, cacheLu: 0, cacheEcrit: 0, dureeMs: 0 },
  );
  const tarif = TARIFS[modele];
  const dollars = tarif
    ? (somme.entree * tarif.entree +
        somme.sortie * tarif.sortie +
        somme.cacheLu * tarif.cacheLu +
        somme.cacheEcrit * tarif.cacheEcrit) /
      1_000_000
    : null;
  return { appels: journal.length, ...somme, dollars };
}
