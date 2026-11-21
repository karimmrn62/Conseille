/**
 * Banc d'essai de Bishop.
 *
 * Pour chaque cas, fait tourner Bishop (la méthode complète) et le témoin
 * (même modèle, très bon prompt, sans la méthode), puis prépare une comparaison
 * à l'aveugle : les deux réponses sont rangées en A et B dans un ordre tiré au sort.
 *
 * Usage :
 *   npm run bench -- --essai                    # vérifie les cas sans appeler l'API
 *   npm run bench -- --cas=interim-marge         # un ou plusieurs cas (séparés par des virgules)
 *   npm run bench -- --tous --juge               # tous les cas, avec le juge automatique
 */
import { randomInt } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { analyser, type ResultatAnalyse } from "../src/analyser.js";
import { chargerConfig } from "../src/config.js";
import { calculerFaits } from "../src/compute/faits.js";
import { construireContexte } from "../src/contexte.js";
import { juger, type VerdictJuge } from "../src/juge.js";
import { ModeleAnthropic } from "../src/llm/anthropic.js";
import { bilan, type BilanCout, detailParEtape } from "../src/llm/cout.js";
import { repondreTemoin } from "../src/temoin.js";
import type { DefinitionIndicateur, Position } from "../src/types.js";

const ICI = path.dirname(fileURLToPath(import.meta.url));
const DOSSIER_CAS = path.join(ICI, "cases");
const DOSSIER_RUNS = path.join(ICI, "runs");

interface FichierCas {
  id: string;
  titre: string;
  type: Position["type"];
  question: string;
  audace?: Position["audace"];
  registre?: Position["registre"];
  documents: string[];
  donnees?: {
    nom: string;
    fichier: string;
    colonnePeriode: string;
    dimensions: string[];
    indicateurs: DefinitionIndicateur[];
  }[];
}

export function chargerCas(id: string): Position {
  const dossier = path.join(DOSSIER_CAS, id);
  const cas = JSON.parse(readFileSync(path.join(dossier, "cas.json"), "utf8")) as FichierCas;
  return {
    id: cas.id,
    titre: cas.titre,
    type: cas.type,
    question: cas.question,
    audace: cas.audace,
    registre: cas.registre,
    langue: "fr",
    documents: cas.documents.map((nom) => ({ nom, contenu: readFileSync(path.join(dossier, nom), "utf8") })),
    donnees: cas.donnees?.map((d) => ({
      nom: d.nom,
      colonnePeriode: d.colonnePeriode,
      dimensions: d.dimensions,
      indicateurs: d.indicateurs,
      csv: readFileSync(path.join(dossier, d.fichier), "utf8"),
    })),
  };
}

function listerCas(): string[] {
  return readdirSync(DOSSIER_CAS, { withFileTypes: true })
    .filter((e) => e.isDirectory() && existsSync(path.join(DOSSIER_CAS, e.name, "cas.json")))
    .map((e) => e.name)
    .sort();
}

function argument(nom: string): string | undefined {
  const prefixe = `--${nom}=`;
  return process.argv.find((a) => a.startsWith(prefixe))?.slice(prefixe.length);
}

function drapeau(nom: string): boolean {
  return process.argv.includes(`--${nom}`);
}

function horodatage(): string {
  return new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
}

function dollars(b: BilanCout): string {
  return b.dollars === null ? "n.c." : `${b.dollars.toFixed(2)} $`;
}

function secondes(ms: number): string {
  return `${Math.round(ms / 1000)} s`;
}

interface ResultatCas {
  id: string;
  titre: string;
  erreur?: string;
  bishop?: ResultatAnalyse;
  temoin?: string;
  ordre?: { A: "bishop" | "temoin"; B: "bishop" | "temoin" };
  coutBishop?: BilanCout;
  coutTemoin?: BilanCout;
  coutJuge?: BilanCout;
  verdict?: VerdictJuge;
  detail?: ReturnType<typeof detailParEtape>;
}

async function traiterCas(id: string, dossierRun: string, avecJuge: boolean): Promise<ResultatCas> {
  const config = chargerConfig();
  const position = chargerCas(id);
  const modeleBishop = new ModeleAnthropic(config);
  const modeleTemoin = new ModeleAnthropic(config);
  console.log(`▶ ${id} : analyse en cours…`);

  try {
    const [bishop, temoin] = await Promise.all([
      analyser(position, modeleBishop, config),
      repondreTemoin(position, modeleTemoin, config),
    ]);

    const bishopEnA = randomInt(2) === 0;
    const ordre = bishopEnA ? ({ A: "bishop", B: "temoin" } as const) : ({ A: "temoin", B: "bishop" } as const);
    const texte = { bishop: bishop.markdown, temoin };

    const dossier = path.join(dossierRun, id);
    const coulisses = path.join(dossier, "coulisses");
    mkdirSync(coulisses, { recursive: true });
    const entete = (lettre: "A" | "B") =>
      `# Réponse ${lettre} — ${position.titre}\n\n> **Question :** ${position.question}\n\n`;
    writeFileSync(path.join(dossier, "A.md"), entete("A") + texte[ordre.A]);
    writeFileSync(path.join(dossier, "B.md"), entete("B") + texte[ordre.B]);
    writeFileSync(path.join(coulisses, "bishop.json"), JSON.stringify(bishop, null, 2));
    writeFileSync(path.join(coulisses, "bishop.md"), bishop.markdown);
    writeFileSync(path.join(coulisses, "temoin.md"), temoin);
    writeFileSync(path.join(coulisses, "cle.json"), JSON.stringify(ordre, null, 2));

    const resultat: ResultatCas = {
      id,
      titre: position.titre,
      bishop,
      temoin,
      ordre,
      coutBishop: bilan(modeleBishop.consommation()),
      coutTemoin: bilan(modeleTemoin.consommation()),
    };

    const detail = detailParEtape(modeleBishop.consommation());
    writeFileSync(path.join(coulisses, "consommation.json"), JSON.stringify(detail, null, 2));
    resultat.detail = detail;

    if (avecJuge) {
      const modeleJuge = new ModeleAnthropic(config);
      resultat.verdict = await juger(position, bishop.markdown, temoin, modeleJuge, config);
      resultat.coutJuge = bilan(modeleJuge.consommation());
      writeFileSync(path.join(coulisses, "juge.json"), JSON.stringify(resultat.verdict, null, 2));
    }

    console.log(`✔ ${id} terminé (${dollars(resultat.coutBishop!)} pour Bishop)`);
    return resultat;
  } catch (e) {
    const erreur = e instanceof Error ? e.message : String(e);
    console.error(`✖ ${id} : ${erreur}`);
    return { id, titre: position.titre, erreur };
  }
}

function ecrireGrille(dossierRun: string, resultats: ResultatCas[]): void {
  const lignes = [
    "# Grille d'évaluation à l'aveugle",
    "",
    "Pour chaque cas, lisez `A.md` et `B.md` dans le dossier du cas, sans ouvrir le dossier `coulisses`.",
    "Notez chaque réponse de 1 à 10 sur chaque critère, puis indiquez votre préférence.",
    "",
    "- **Originalité** : des idées que vous n'auriez pas eues en quinze minutes, mais crédibles ?",
    "- **Pertinence** : répond-elle à la vraie question du dossier ?",
    "- **Rigueur** : chiffres exacts et sourcés, raisonnement solide, risques honnêtes ?",
    "- **Actionnabilité** : peut-on agir lundi matin ?",
    "- **Crédibilité** : la présenteriez-vous à un comité de direction ?",
    "",
  ];
  for (const r of resultats.filter((x) => !x.erreur)) {
    lignes.push(
      `## ${r.titre} (\`${r.id}\`)`,
      "",
      "| Critère | A | B |",
      "|---|---|---|",
      "| Originalité | | |",
      "| Pertinence | | |",
      "| Rigueur | | |",
      "| Actionnabilité | | |",
      "| Crédibilité | | |",
      "",
      "**Préférence (A / B / égalité) :** ",
      "",
      "**Commentaire :** ",
      "",
    );
  }
  writeFileSync(path.join(dossierRun, "grille.md"), lignes.join("\n"));
}

function ecrireResume(dossierRun: string, resultats: ResultatCas[]): void {
  const lignes = [
    "# Résumé du passage sur le banc d'essai",
    "",
    "> ⚠ Ce fichier révèle des informations techniques mais **pas** l'identité de A et B. La clé est dans `cle.md`, à n'ouvrir qu'après l'évaluation.",
    "",
    "| Cas | Coût Bishop | Durée cumulée des appels Bishop | Coût témoin | Chiffres non sourcés (Bishop) | Juge automatique |",
    "|---|---|---|---|---|---|",
  ];
  for (const r of resultats) {
    if (r.erreur) {
      lignes.push(`| ${r.id} | ❌ ${r.erreur.replace(/\|/g, "/")} | | | | |`);
      continue;
    }
    const juge = r.verdict
      ? `${r.verdict.scoreBishop > 0 ? "préférence nette" : r.verdict.scoreBishop < 0 ? "préférence contraire" : "partagé"} (voir clé)`
      : "—";
    lignes.push(
      `| ${r.id} | ${dollars(r.coutBishop!)} (${r.coutBishop!.appels} appels) | ${secondes(r.coutBishop!.dureeMs)} | ${dollars(
        r.coutTemoin!,
      )} | ${r.bishop!.chiffresNonSources.length === 0 ? "aucun" : r.bishop!.chiffresNonSources.join(", ")} | ${juge} |`,
    );
  }
  // Où part l'argent : coût de Bishop par étape (étapes répétées regroupées)
  lignes.push("", "## Coût de Bishop par étape", "");
  for (const r of resultats.filter((x) => x.detail)) {
    const parEtape = new Map<string, { dollars: number; sortie: number; modele: string }>();
    for (const d of r.detail!) {
      const cle = d.etape.replace(/-\d+$/, "");
      const cumul = parEtape.get(cle) ?? { dollars: 0, sortie: 0, modele: d.modele };
      cumul.dollars += d.dollars ?? 0;
      cumul.sortie += d.sortie;
      parEtape.set(cle, cumul);
    }
    lignes.push(`**${r.id}**`, "", "| Étape | Modèle | Jetons produits | Coût |", "|---|---|---|---|");
    for (const [etape, c] of parEtape) lignes.push(`| ${etape} | ${c.modele} | ${c.sortie} | ${c.dollars.toFixed(2)} $ |`);
    lignes.push("");
  }
  writeFileSync(path.join(dossierRun, "resume.md"), lignes.join("\n") + "\n");

  const cle = ["# Clé (à n'ouvrir qu'après l'évaluation)", ""];
  for (const r of resultats.filter((x) => !x.erreur)) {
    const juge = r.verdict
      ? ` — juge automatique : ${r.verdict.scoreBishop > 0 ? "Bishop" : r.verdict.scoreBishop < 0 ? "témoin" : "partagé"} (score ${r.verdict.scoreBishop} sur 2 passes)`
      : "";
    cle.push(`- **${r.id}** : A = ${r.ordre!.A}, B = ${r.ordre!.B}${juge}`);
  }
  writeFileSync(path.join(dossierRun, "cle.md"), cle.join("\n") + "\n");
}

function essai(ids: string[]): void {
  console.log("Mode essai : vérification des cas, sans appel à l'API.\n");
  for (const id of ids) {
    const position = chargerCas(id);
    const faits = (position.donnees ?? []).flatMap((j) => calculerFaits(j));
    const contexte = construireContexte(position, faits);
    const taille = contexte.doctrine.length + contexte.position.length;
    console.log(
      `- ${id} : ${position.documents.length} document(s), ${faits.length} faits calculés, contexte ≈ ${Math.round(taille / 4)} jetons`,
    );
  }
}

async function principal(): Promise<void> {
  const tous = listerCas();
  const demandes = argument("cas")?.split(",").map((s) => s.trim()) ?? (drapeau("tous") || drapeau("essai") ? tous : []);
  const inconnus = demandes.filter((id) => !tous.includes(id));
  if (demandes.length === 0 || inconnus.length > 0) {
    if (inconnus.length > 0) console.error(`Cas inconnu(s) : ${inconnus.join(", ")}`);
    console.error(`Cas disponibles : ${tous.join(", ")}\nUsage : npm run bench -- --cas=<id>[,<id>] | --tous [--juge] | --essai`);
    process.exitCode = 1;
    return;
  }
  if (drapeau("essai")) {
    essai(demandes);
    return;
  }

  const dossierRun = path.join(DOSSIER_RUNS, horodatage());
  mkdirSync(dossierRun, { recursive: true });
  const parallele = Number.parseInt(argument("parallele") ?? "2", 10);
  const resultats: ResultatCas[] = [];
  for (let i = 0; i < demandes.length; i += parallele) {
    const lot = demandes.slice(i, i + parallele);
    resultats.push(...(await Promise.all(lot.map((id) => traiterCas(id, dossierRun, drapeau("juge"))))));
  }

  ecrireGrille(dossierRun, resultats);
  ecrireResume(dossierRun, resultats);
  const total = resultats.reduce(
    (acc, r) => acc + (r.coutBishop?.dollars ?? 0) + (r.coutTemoin?.dollars ?? 0) + (r.coutJuge?.dollars ?? 0),
    0,
  );
  console.log(`\nRésultats dans ${path.relative(process.cwd(), dossierRun)} — coût estimé total : ${total.toFixed(2)} $`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  principal().catch((e) => {
    console.error(e);
    process.exitCode = 1;
  });
}
