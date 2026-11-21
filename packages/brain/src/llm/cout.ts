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

export function bilan(journal: Consommation[]): BilanCout {
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
  let dollars: number | null = 0;
  for (const c of journal) {
    const tarif = TARIFS[c.modele];
    if (!tarif || dollars === null) {
      dollars = null;
      continue;
    }
    dollars +=
      (c.entree * tarif.entree + c.sortie * tarif.sortie + c.cacheLu * tarif.cacheLu + c.cacheEcrit * tarif.cacheEcrit) /
      1_000_000;
  }
  return { appels: journal.length, ...somme, dollars };
}

/** Détail par étape, pour savoir où part l'argent. */
export function detailParEtape(journal: Consommation[]): { etape: string; modele: string; sortie: number; dollars: number | null }[] {
  return journal.map((c) => ({ etape: c.etape, modele: c.modele, sortie: c.sortie, dollars: bilan([c]).dollars }));
}
