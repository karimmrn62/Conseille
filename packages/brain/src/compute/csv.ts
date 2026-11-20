/**
 * Lecture minimale de CSV : séparateur virgule ou point-virgule (détecté sur l'en-tête),
 * champs entre guillemets, nombres au format anglais (1234.5) ou français (1 234,5).
 */

export type Ligne = Record<string, string>;

export function lireCsv(texte: string): { colonnes: string[]; lignes: Ligne[] } {
  const brutes = texte
    .replace(/^﻿/, "")
    .split(/\r?\n/)
    .filter((l) => l.trim() !== "");
  const entete = brutes[0];
  if (entete === undefined) return { colonnes: [], lignes: [] };

  const separateur = compter(entete, ";") > compter(entete, ",") ? ";" : ",";
  const colonnes = decouper(entete, separateur).map((c) => c.trim());
  const lignes = brutes.slice(1).map((brute) => {
    const champs = decouper(brute, separateur);
    const ligne: Ligne = {};
    colonnes.forEach((col, i) => {
      ligne[col] = (champs[i] ?? "").trim();
    });
    return ligne;
  });
  return { colonnes, lignes };
}

export function lireNombre(valeur: string | undefined): number | null {
  if (valeur === undefined) return null;
  let v = valeur.replace(/[\s  €$%]/g, "");
  if (v === "") return null;
  if (v.includes(",") && !v.includes(".")) v = v.replace(",", ".");
  else v = v.replace(/,/g, "");
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function compter(texte: string, caractere: string): number {
  return texte.split(caractere).length - 1;
}

function decouper(ligne: string, separateur: string): string[] {
  const champs: string[] = [];
  let courant = "";
  let entreGuillemets = false;
  for (let i = 0; i < ligne.length; i++) {
    const c = ligne[i];
    if (c === '"') {
      if (entreGuillemets && ligne[i + 1] === '"') {
        courant += '"';
        i++;
      } else {
        entreGuillemets = !entreGuillemets;
      }
    } else if (c === separateur && !entreGuillemets) {
      champs.push(courant);
      courant = "";
    } else {
      courant += c;
    }
  }
  champs.push(courant);
  return champs;
}
