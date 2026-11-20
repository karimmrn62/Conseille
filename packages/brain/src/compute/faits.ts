import type { DefinitionIndicateur, Fait, JeuDeDonnees, Locale } from "../types.js";
import { lireCsv, lireNombre, type Ligne } from "./csv.js";

/**
 * Calcule les « faits » d'un jeu de données : totaux, variations, contributions,
 * décomposition effet taux / effet de mix et paradoxes de Simpson.
 *
 * Règle d'or : le modèle d'IA ne calcule jamais. Il ne peut citer que ces faits.
 * On compare la première et la dernière période du jeu de données.
 */
export function calculerFaits(jeu: JeuDeDonnees, langue: Locale = "fr", prefixe = "F"): Fait[] {
  const { lignes } = lireCsv(jeu.csv);
  const periodes = [...new Set(lignes.map((l) => l[jeu.colonnePeriode] ?? ""))]
    .filter((p) => p !== "")
    .sort();
  const p0 = periodes[0];
  const p1 = periodes[periodes.length - 1];
  if (p0 === undefined || p1 === undefined || p0 === p1) return [];

  const t = TEXTES[langue];
  const fmt = formateur(langue);
  const faits: Fait[] = [];
  const ajouter = (texte: string, valeurs: number[]) => {
    faits.push({ id: `${prefixe}${faits.length + 1}`, texte, valeurs });
  };

  const lignesP0 = lignes.filter((l) => l[jeu.colonnePeriode] === p0);
  const lignesP1 = lignes.filter((l) => l[jeu.colonnePeriode] === p1);

  // 1. Niveau global
  for (const ind of jeu.indicateurs) {
    const v0 = valeurIndicateur(ind, lignesP0);
    const v1 = valeurIndicateur(ind, lignesP1);
    if (v0 === null || v1 === null) continue;
    const d = decrireVariation(ind, v0, v1, fmt, t);
    ajouter(`${jeu.nom} — ${t.global} — ${ind.nom} : ${d.texte} (${p0} → ${p1})`, d.valeurs);
  }

  // 2. Par dimension
  for (const dim of jeu.dimensions) {
    const segments = [...new Set(lignes.map((l) => l[dim] ?? ""))].filter((s) => s !== "").sort();
    if (segments.length < 2) continue;

    for (const ind of jeu.indicateurs) {
      const lignesSegment = segments.map((s) => ({
        segment: s,
        l0: lignesP0.filter((l) => l[dim] === s),
        l1: lignesP1.filter((l) => l[dim] === s),
      }));

      // 2a. Valeur et variation de chaque segment
      for (const { segment, l0, l1 } of lignesSegment) {
        const v0 = valeurIndicateur(ind, l0);
        const v1 = valeurIndicateur(ind, l1);
        if (v0 === null || v1 === null) continue;
        const d = decrireVariation(ind, v0, v1, fmt, t);
        ajouter(`${jeu.nom} — ${dim} « ${segment} » — ${ind.nom} : ${d.texte}`, d.valeurs);
      }

      if (ind.type === "somme") {
        // 2b. Contributions à la variation totale
        const total0 = valeurIndicateur(ind, lignesP0);
        const total1 = valeurIndicateur(ind, lignesP1);
        if (total0 === null || total1 === null) continue;
        const deltaTotal = total1 - total0;
        if (deltaTotal === 0) continue;
        const contributions = lignesSegment
          .map(({ segment, l0, l1 }) => {
            const a = valeurIndicateur(ind, l0) ?? 0;
            const b = valeurIndicateur(ind, l1) ?? 0;
            return { segment, delta: b - a };
          })
          .sort((x, y) => Math.abs(y.delta) - Math.abs(x.delta))
          .slice(0, 3);
        // Les parts n'ont de sens que si tous les segments vont dans le sens du total.
        const parts = contributions.map((c) => arrondir((c.delta / deltaTotal) * 100, 1));
        const partsLisibles = parts.every((x) => x >= 0 && x <= 100);
        const morceaux = contributions.map((c, i) => {
          const part = parts[i]!;
          const suffixe = partsLisibles ? ` (${fmt.nombre(part)} % ${t.duTotal})` : "";
          return {
            texte: `« ${c.segment} » ${signe(fmt.nombre(arrondir(c.delta, 2)))}${suffixe}`,
            valeurs: partsLisibles ? [arrondir(c.delta, 2), part] : [arrondir(c.delta, 2)],
          };
        });
        ajouter(
          `${jeu.nom} — ${ind.nom} — ${t.contributions(dim)} : ${morceaux.map((m) => m.texte).join(" ; ")}`,
          morceaux.flatMap((m) => m.valeurs),
        );
      } else {
        // 2c. Effet taux / effet de mix et paradoxe de Simpson
        const mix = decomposerMix(ind, lignesSegment);
        if (mix === null) continue;
        const { echelle, unite } = uniteRatio(ind);
        const pts = (x: number) => arrondir(x * echelle, 2);
        ajouter(
          `${jeu.nom} — ${ind.nom} — ${t.decomposition(dim)} : ${t.variationGlobale} ${signe(
            fmt.nombre(pts(mix.delta)),
          )} ${unite} = ${t.effetTaux} ${signe(fmt.nombre(pts(mix.effetTaux)))} ${unite} + ${t.effetMix} ${signe(
            fmt.nombre(pts(mix.effetMix)),
          )} ${unite}`,
          [pts(mix.delta), pts(mix.effetTaux), pts(mix.effetMix)],
        );
        const sensGlobal = Math.sign(mix.delta);
        const contraires = mix.segments.filter((s) => Math.sign(s.delta) === -sensGlobal && s.delta !== 0);
        if (sensGlobal !== 0 && contraires.length > mix.segments.length / 2) {
          ajouter(
            `⚠ ${jeu.nom} — ${ind.nom} — ${t.simpson(dim, contraires.length, mix.segments.length, sensGlobal > 0)}`,
            [contraires.length, mix.segments.length],
          );
        }
        // 2d. Dispersion sur la dernière période
        const derniers = mix.segments.filter((s) => s.r1 !== null) as { segment: string; r1: number }[];
        if (derniers.length >= 2) {
          const tri = [...derniers].sort((a, b) => a.r1 - b.r1);
          const bas = tri[0]!;
          const haut = tri[tri.length - 1]!;
          const ecart = pts(haut.r1 - bas.r1);
          ajouter(
            `${jeu.nom} — ${ind.nom} (${p1}) — ${t.dispersion(dim)} : ${t.min} « ${bas.segment} » ${afficherRatio(
              ind,
              bas.r1,
              fmt,
            )}, ${t.max} « ${haut.segment} » ${afficherRatio(ind, haut.r1, fmt)}, ${t.ecart} ${fmt.nombre(ecart)} ${unite}`,
            [pts(bas.r1), pts(haut.r1), ecart],
          );
        }
      }
    }
  }
  return faits;
}

// ——— Calculs ———

function somme(colonne: string, lignes: Ligne[]): number | null {
  let total = 0;
  let trouve = false;
  for (const l of lignes) {
    const n = lireNombre(l[colonne]);
    if (n !== null) {
      total += n;
      trouve = true;
    }
  }
  return trouve ? total : null;
}

function valeurIndicateur(ind: DefinitionIndicateur, lignes: Ligne[]): number | null {
  if (ind.type === "somme") return somme(ind.nom, lignes);
  const num = somme(ind.numerateur, lignes);
  const den = somme(ind.denominateur, lignes);
  if (num === null || den === null || den === 0) return null;
  return num / den;
}

interface SegmentMix {
  segment: string;
  r0: number | null;
  r1: number | null;
  delta: number;
}

/**
 * Décomposition exacte de la variation d'un ratio agrégé :
 *   R1 − R0 = Σ (w1ᵢ − w0ᵢ) · r0ᵢ  (effet de mix)  +  Σ w1ᵢ · (r1ᵢ − r0ᵢ)  (effet taux)
 * où wᵢ est le poids du segment dans le dénominateur et rᵢ son ratio.
 */
function decomposerMix(
  ind: Extract<DefinitionIndicateur, { type: "ratio" }>,
  segments: { segment: string; l0: Ligne[]; l1: Ligne[] }[],
): { delta: number; effetTaux: number; effetMix: number; segments: SegmentMix[] } | null {
  const donnees = segments.map(({ segment, l0, l1 }) => ({
    segment,
    n0: somme(ind.numerateur, l0) ?? 0,
    d0: somme(ind.denominateur, l0) ?? 0,
    n1: somme(ind.numerateur, l1) ?? 0,
    d1: somme(ind.denominateur, l1) ?? 0,
  }));
  const D0 = donnees.reduce((a, s) => a + s.d0, 0);
  const D1 = donnees.reduce((a, s) => a + s.d1, 0);
  if (D0 === 0 || D1 === 0) return null;
  const R0 = donnees.reduce((a, s) => a + s.n0, 0) / D0;
  const R1 = donnees.reduce((a, s) => a + s.n1, 0) / D1;

  let effetMix = 0;
  let effetTaux = 0;
  const resume: SegmentMix[] = [];
  for (const s of donnees) {
    const r0 = s.d0 > 0 ? s.n0 / s.d0 : null;
    const r1 = s.d1 > 0 ? s.n1 / s.d1 : null;
    const w0 = s.d0 / D0;
    const w1 = s.d1 / D1;
    if (r0 !== null) effetMix += (w1 - w0) * r0;
    if (r0 !== null && r1 !== null) effetTaux += w1 * (r1 - r0);
    // Un segment absent en début de période n'a pas de taux de référence : on l'impute au mix.
    if (r0 === null && r1 !== null) effetMix += w1 * r1;
    resume.push({ segment: s.segment, r0, r1, delta: r0 !== null && r1 !== null ? r1 - r0 : 0 });
  }
  return { delta: R1 - R0, effetTaux, effetMix, segments: resume };
}

function decrireVariation(
  ind: DefinitionIndicateur,
  v0: number,
  v1: number,
  fmt: Formateur,
  t: Textes,
): { texte: string; valeurs: number[] } {
  if (ind.type === "ratio" && estPourcentage(ind)) {
    const pts = arrondir((v1 - v0) * 100, 2);
    return {
      texte: `${fmt.ratio(v0)} → ${fmt.ratio(v1)} (${signe(fmt.nombre(pts))} pt)`,
      valeurs: [arrondir(v0 * 100, 2), arrondir(v1 * 100, 2), pts],
    };
  }
  const unite = ind.unite ? ` ${ind.unite}` : "";
  const valeurs = [arrondir(v0, 2), arrondir(v1, 2), arrondir(v1 - v0, 2)];
  if (v0 === 0) {
    return { texte: `${fmt.nombre(v0)}${unite} → ${fmt.nombre(v1)}${unite} (${t.nouveau})`, valeurs };
  }
  const pct = arrondir(((v1 - v0) / Math.abs(v0)) * 100, 1);
  return {
    texte: `${fmt.nombre(v0)}${unite} → ${fmt.nombre(v1)}${unite} (${signe(fmt.nombre(pct))} %)`,
    valeurs: [...valeurs, pct],
  };
}

// ——— Mise en forme ———

/** Un ratio sans unité, ou d'unité « % », s'affiche en pourcentage et varie en points. */
function estPourcentage(ind: DefinitionIndicateur): boolean {
  return ind.type === "ratio" && (ind.unite ?? "%") === "%";
}

function uniteRatio(ind: DefinitionIndicateur): { echelle: number; unite: string } {
  return estPourcentage(ind) ? { echelle: 100, unite: "pt" } : { echelle: 1, unite: ind.unite ?? "" };
}

function afficherRatio(ind: DefinitionIndicateur, x: number, fmt: Formateur): string {
  return estPourcentage(ind) ? fmt.ratio(x) : `${fmt.nombre(arrondir(x, 2))} ${ind.unite ?? ""}`.trim();
}

export function arrondir(x: number, decimales: number): number {
  const f = 10 ** decimales;
  return Math.round(x * f) / f;
}

function signe(texte: string): string {
  if (/^[−-]?0([.,]0+)?$/.test(texte)) return "0";
  return texte.startsWith("-") || texte.startsWith("−") ? texte.replace("-", "−") : `+${texte}`;
}

interface Formateur {
  nombre(x: number): string;
  ratio(x: number): string;
}

function formateur(langue: Locale): Formateur {
  const code = langue === "fr" ? "fr-FR" : "en-GB";
  const nf = new Intl.NumberFormat(code, { maximumFractionDigits: 2 });
  const pf = new Intl.NumberFormat(code, { minimumFractionDigits: 1, maximumFractionDigits: 2 });
  return {
    nombre: (x) => nf.format(x).replace(/ | /g, " "),
    ratio: (x) => `${pf.format(x * 100).replace(/ | /g, " ")} %`,
  };
}

interface Textes {
  global: string;
  duTotal: string;
  nouveau: string;
  variationGlobale: string;
  effetTaux: string;
  effetMix: string;
  min: string;
  max: string;
  ecart: string;
  contributions(dim: string): string;
  decomposition(dim: string): string;
  dispersion(dim: string): string;
  simpson(dim: string, contraires: number, total: number, hausse: boolean): string;
}

const TEXTES: Record<Locale, Textes> = {
  fr: {
    global: "total",
    duTotal: "de la variation totale",
    nouveau: "nouveau",
    variationGlobale: "variation globale",
    effetTaux: "effet taux",
    effetMix: "effet de mix",
    min: "minimum",
    max: "maximum",
    ecart: "écart",
    contributions: (dim) => `principales contributions à la variation (par ${dim})`,
    decomposition: (dim) => `décomposition par ${dim}`,
    dispersion: (dim) => `dispersion par ${dim}`,
    simpson: (dim, c, n, hausse) =>
      `PARADOXE DE SIMPSON (effet de mix) : le total ${hausse ? "monte" : "baisse"} alors que ${c} ${dim}(s) sur ${n} ${
        hausse ? "baissent" : "montent"
      }`,
  },
  en: {
    global: "total",
    duTotal: "of total change",
    nouveau: "new",
    variationGlobale: "total change",
    effetTaux: "rate effect",
    effetMix: "mix effect",
    min: "min",
    max: "max",
    ecart: "spread",
    contributions: (dim) => `main contributors to the change (by ${dim})`,
    decomposition: (dim) => `breakdown by ${dim}`,
    dispersion: (dim) => `spread by ${dim}`,
    simpson: (dim, c, n, hausse) =>
      `SIMPSON'S PARADOX (mix effect): the total ${hausse ? "rises" : "falls"} while ${c} of ${n} ${dim} values ${
        hausse ? "fall" : "rise"
      }`,
  },
};
