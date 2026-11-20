import type { Fait } from "../types.js";

/**
 * Contrôle de la règle d'or : repère dans un texte produit par le modèle
 * les chiffres qui ne viennent ni des faits calculés ni des documents fournis.
 *
 * Les petits entiers (moins de 10) et les années sont ignorés : « 3 priorités »,
 * « 2 semaines » ou « 2026 » ne sont pas des chiffres à sourcer.
 */
export function chiffresNonSources(texte: string, faits: Fait[], documents: string[]): string[] {
  const autorises = new Set<number>();
  for (const f of faits) for (const v of f.valeurs) ajouterVariantes(autorises, v);
  for (const doc of documents) for (const n of extraireNombres(doc)) ajouterVariantes(autorises, n.valeur);

  const suspects: string[] = [];
  for (const { brut, valeur } of extraireNombres(texte)) {
    if (estIgnore(valeur, brut)) continue;
    if (!correspond(valeur, autorises)) suspects.push(brut.trim());
  }
  return [...new Set(suspects)];
}

export function extraireNombres(texte: string): { brut: string; valeur: number }[] {
  const resultat: { brut: string; valeur: number }[] = [];
  // Nombres avec séparateurs de milliers (espace) et décimales (virgule ou point).
  const motif = /[−-]?\d{1,3}(?:[   ]\d{3})+(?:[.,]\d+)?|[−-]?\d+(?:[.,]\d+)?/g;
  for (const m of texte.matchAll(motif)) {
    const brut = m[0];
    const valeur = Number(
      brut
        .replace(/[   ]/g, "")
        .replace("−", "-")
        .replace(",", "."),
    );
    if (Number.isFinite(valeur)) resultat.push({ brut, valeur });
  }
  return resultat;
}

function estIgnore(valeur: number, brut: string): boolean {
  const absolu = Math.abs(valeur);
  if (Number.isInteger(valeur) && absolu < 10) return true;
  if (Number.isInteger(valeur) && absolu >= 1900 && absolu <= 2100 && !brut.includes(" ")) return true;
  return false;
}

function ajouterVariantes(ensemble: Set<number>, v: number): void {
  ensemble.add(v);
  ensemble.add(Math.abs(v));
}

function correspond(valeur: number, autorises: Set<number>): boolean {
  const cible = Math.abs(valeur);
  for (const a of autorises) {
    const tolerance = Math.max(0.051, Math.abs(a) * 0.005);
    if (Math.abs(cible - Math.abs(a)) <= tolerance) return true;
    // Même chiffre exprimé en milliers ou en millions (ex. 12 400 000 → « 12,4 M »).
    for (const echelle of [1_000, 1_000_000]) {
      if (Math.abs(cible * echelle - Math.abs(a)) <= Math.abs(a) * 0.01) return true;
    }
  }
  return false;
}
