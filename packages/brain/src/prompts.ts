import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Locale } from "./types.js";

const DOSSIER = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "prompts");

export type NomConsigne =
  | "doctrine"
  | "lecture"
  | "divergence"
  | "notation"
  | "verification"
  | "formulation"
  | "kpi"
  | "conseil"
  | "temoin"
  | "juge";

const cache = new Map<string, string>();

/**
 * Charge une consigne depuis prompts/<langue>/<nom>.md, avec repli sur le français
 * tant que la traduction n'existe pas, et remplace les variables {{nom}}.
 */
export function consigne(nom: NomConsigne, langue: Locale, variables: Record<string, string> = {}): string {
  const brut = charger(nom, langue);
  return brut.replace(/\{\{(\w+)\}\}/g, (_, cle: string) => {
    const valeur = variables[cle];
    if (valeur === undefined) throw new Error(`Variable {{${cle}}} manquante pour la consigne « ${nom} »`);
    return valeur;
  });
}

function charger(nom: NomConsigne, langue: Locale): string {
  const cle = `${langue}/${nom}`;
  const enCache = cache.get(cle);
  if (enCache !== undefined) return enCache;
  const fichier = [langue, "fr"]
    .map((l) => path.join(DOSSIER, l, `${nom}.md`))
    .find((f) => existsSync(f));
  if (!fichier) throw new Error(`Consigne introuvable : ${nom}`);
  const texte = readFileSync(fichier, "utf8").trim();
  cache.set(cle, texte);
  return texte;
}
