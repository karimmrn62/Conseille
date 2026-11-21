import { libelles } from "../i18n.js";
import type { AnalyseKpi, ConseilDeGuerre, Formulation, Lecture } from "../schemas.js";
import type { Fait, Locale } from "../types.js";

export interface ElementsRendu {
  langue: Locale;
  lecture: Lecture;
  formulation: Formulation;
  kpi: AnalyseKpi | null;
  conseil: ConseilDeGuerre | null;
  chiffresNonSources?: string[];
  /** Faits calculés, pour expliciter les sources citées. */
  faits?: Fait[];
}

/**
 * Retire du texte destiné au lecteur les références internes (faits « F12 », candidats « C1.2 »),
 * qui n'ont de sens que pour le moteur. Les chiffres eux-mêmes sont écrits en clair.
 */
export function nettoyerReferences(texte: string): string {
  const ref = String.raw`(?:F|C)\d+(?:\.\d+)?`;
  return texte
    .replace(new RegExp(String.raw`\s*[(\[]\s*(?:faits?\s*:?\s*)?${ref}(?:\s*(?:,|;|et|à|-|–)\s*${ref})*\s*[)\]]`, "g"), "")
    .replace(new RegExp(String.raw`(?<![\p{L}\d])${ref}(?![\p{L}\d])`, "gu"), "")
    .replace(/« \d+\.\d+ »/g, "")
    .replace(/ {2,}/g, " ")
    .replace(/ ([,.])/g, "$1");
}

/**
 * Synthèse destinée au lecteur (dirigeant, consultant) : l'essentiel, les coups, les indicateurs
 * et les acteurs, sans les détails de travail. Doit se lire en quelques minutes.
 */
export function rendreSynthese(e: ElementsRendu): string {
  const t = libelles(e.langue).rendu;
  const f = e.formulation;
  const n = nettoyerReferences;
  const l: string[] = [];

  l.push(`## ${t.essentiel}`, "", `**${t.vraieQuestion} :** ${n(e.lecture.vraieQuestion)}`, "");
  if (f.coups.length > 0) {
    f.coups.forEach((c, i) => l.push(`${i + 1}. **${n(c.titre)}** — ${n(c.coup)}`));
    l.push("", `**${t.unSeulCoup} :** ${n(f.siJeNeDevaisJouerQuUnCoup)}`, "");
  } else {
    l.push(n(f.siJeNeDevaisJouerQuUnCoup), "");
  }

  l.push(`## ${t.lecture}`, "", n(f.ouverture), "");
  if (f.coupEvident) l.push(`**${t.coupEvident} :** ${n(f.coupEvident)}`, "");

  if (f.coups.length > 0) {
    l.push(`## ${t.coups}`, "");
    f.coups.forEach((c, i) => {
      l.push(`### ${i + 1}. ${n(c.titre)}`, "", `**${n(c.coup)}**`, "");
      l.push(`- **${t.pourquoiPersonne} :** ${n(c.pourquoiPersonne)}`);
      l.push(`- **${t.pourquoiIlGagne} :** ${n(c.pourquoiIlGagne)}`);
      l.push(`- **${t.risque} :** ${n(c.risque)}`);
      l.push(`- **${t.test} :** ${n(c.test)}`);
      l.push(`- **${t.confiance} :** ${c.confiance}. ${t.pourMonter} : ${n(c.pourMonterLaConfiance)}`, "");
    });
  }

  if (e.kpi) {
    const k = e.kpi;
    l.push(`## ${t.kpi}`, "", n(k.diagnostic), "");
    for (const m of k.kpiQuiMentent) l.push(`- **${n(m.kpi)}** : ${n(m.explication)} → ${n(m.consequence)}`);
    if (k.kpiQuiMentent.length > 0) l.push("");
    if (k.indicateursManquants.length > 0) {
      l.push(`**${t.manquants} :**`, "");
      for (const m of k.indicateursManquants) l.push(`- **${n(m.indicateur)}** (${n(m.frequence)}) : ${n(m.pourquoi)}`);
      l.push("");
    }
    if (k.revue.length > 0) {
      l.push(`## ${t.revue}`, "");
      k.revue.forEach((r, i) => {
        l.push(`**${i + 1}. ${n(r.priorite)}** — ${n(r.justification)}`, "");
        for (const a of r.actions) l.push(`- ${n(a.action)} — ${n(a.responsable)}, ${n(a.echeance)}`);
        l.push("");
      });
    }
  }

  if (e.conseil) {
    const c = e.conseil;
    l.push(`## ${t.conseil}`, "", `_${t.avertissementConseil}_`, "");
    for (const a of c.acteurs) {
      l.push(`- **${n(a.acteur)}** : ${n(a.reaction)} **${t.contreCoup} :** ${n(a.contreCoup)}`);
    }
    l.push("", `**${t.ordreDeJeu} :** ${n(c.ordreDeJeu)}`, "");
  }

  const questions = e.lecture.questionsAPoser.slice(0, 5);
  if (questions.length > 0) l.push(`## ${t.questions}`, "", ...questions.map((q) => `- ${n(q)}`), "");

  if (e.chiffresNonSources && e.chiffresNonSources.length > 0) {
    l.push(`> ${t.alerteChiffres} : ${e.chiffresNonSources.join(", ")}.`, "");
  }
  return l.join("\n").trim() + "\n";
}

/** Version complète, avec tous les détails de travail et les sources des chiffres (annexe). */
export function rendreAnalyse(e: ElementsRendu): string {
  const t = libelles(e.langue).rendu;
  const f = e.formulation;
  const lignes: string[] = [];

  // L'essentiel, lisible en une minute
  lignes.push(`## ${t.essentiel}`, "", `**${t.vraieQuestion} :** ${e.lecture.vraieQuestion}`, "");
  if (f.coups.length > 0) {
    f.coups.forEach((c, i) => lignes.push(`${i + 1}. **${c.titre}** — ${c.coup}`));
    lignes.push("");
    lignes.push(`**${t.unSeulCoup} :** ${f.siJeNeDevaisJouerQuUnCoup}`, "");
  }
  const alerte = e.kpi?.kpiQuiMentent[0];
  if (alerte) lignes.push(`**${t.alerteKpi} :** ${alerte.kpi} — ${alerte.consequence}`, "");

  lignes.push(`## ${t.lecture}`, "", f.ouverture, "");
  lignes.push(`## ${t.coups}`, "");
  if (f.coups.length === 0) {
    lignes.push(f.siJeNeDevaisJouerQuUnCoup, "");
  }
  f.coups.forEach((c, i) => {
    lignes.push(`### ${i + 1}. ${c.titre}`, "", `**${c.coup}**`, "");
    lignes.push(`- **${t.pourquoiPersonne} :** ${c.pourquoiPersonne}`);
    lignes.push(`- **${t.pourquoiIlGagne} :** ${c.pourquoiIlGagne}`);
    if (c.troisCoupsSuivants.length > 0) {
      lignes.push(`- **${t.troisCoups} :**`);
      c.troisCoupsSuivants.forEach((s, j) => lignes.push(`  ${j + 1}. ${s}`));
    }
    lignes.push(`- **${t.risque} :** ${c.risque}`);
    lignes.push(`- **${t.test} :** ${c.test}`);
    lignes.push(`- **${t.confiance} :** ${c.confiance}. ${t.pourMonter} : ${c.pourMonterLaConfiance}`);
    if (c.appuis.length > 0) lignes.push(`- **${t.appuis} :** ${c.appuis.join(" ; ")}`);
    lignes.push("");
  });

  if (f.coupEvident) lignes.push(`**${t.coupEvident} :** ${f.coupEvident}`, "");

  if (e.kpi) {
    const k = e.kpi;
    lignes.push(`## ${t.kpi}`, "", `**${t.diagnostic} :** ${k.diagnostic}`, "");
    if (k.kpiQuiMentent.length > 0) {
      lignes.push(`### ${t.kpiQuiMentent}`, "");
      for (const m of k.kpiQuiMentent) {
        const faits = m.faits.length > 0 ? ` _(${m.faits.join(", ")})_` : "";
        lignes.push(`- **${m.kpi}** — ${m.pathologie.replace(/_/g, " ")}${faits} : ${m.explication} → ${m.consequence}`);
      }
      lignes.push("");
    }
    if (k.indicateursManquants.length > 0) {
      lignes.push(`### ${t.manquants}`, "");
      for (const m of k.indicateursManquants) {
        lignes.push(`- **${m.indicateur}** (${m.frequence}) : ${m.definition}. ${m.pourquoi}`);
      }
      lignes.push("");
    }
    if (k.arbreKpi.length > 0) {
      lignes.push(`### ${t.arbre}`, "");
      for (const n of k.arbreKpi) {
        const retrait = n.niveau === "objectif" ? "" : n.niveau === "pilotage" ? "  " : "    ";
        const lien = n.niveau === "objectif" ? "" : ` ← ${n.rattacheA}`;
        lignes.push(`${retrait}- ${n.indicateur}${lien}`);
      }
      lignes.push("");
    }
    if (k.revue.length > 0) {
      lignes.push(`### ${t.revue}`, "");
      k.revue.forEach((r, i) => {
        const faits = r.faits.length > 0 ? ` _(${r.faits.join(", ")})_` : "";
        lignes.push(`**${i + 1}. ${r.priorite}**${faits} — ${r.justification}`, "");
        for (const a of r.actions) lignes.push(`- ${a.action} — ${a.responsable}, ${a.echeance}`);
        lignes.push("");
      });
    }
  }

  if (e.conseil) {
    const c = e.conseil;
    lignes.push(`## ${t.conseil}`, "", `_${t.avertissementConseil}_`, "");
    for (const a of c.acteurs) {
      lignes.push(`### ${a.acteur}`, "");
      lignes.push(`- **${t.reaction} :** ${a.reaction}`);
      lignes.push(`- **${t.objection} :** ${a.objection}`);
      lignes.push(`- **${t.interetCache} :** ${a.interetCache}`);
      lignes.push(`- **${t.contreCoup} :** ${a.contreCoup}`);
      lignes.push(`- **${t.signal} :** ${a.signal}`);
      lignes.push(`- **${t.plausibilite} :** ${a.plausibilite}`, "");
    }
    lignes.push(`**${t.ordreDeJeu} :** ${c.ordreDeJeu}`, "");
    if (c.hypotheses.length > 0) {
      lignes.push(`**${t.hypotheses} :**`, "", ...c.hypotheses.map((h) => `- ${h}`), "");
    }
  }

  if (e.lecture.questionsAPoser.length > 0) {
    lignes.push(`## ${t.questions}`, "", ...e.lecture.questionsAPoser.map((q) => `- ${q}`), "");
  }

  // Sources des chiffres : on explicite chaque identifiant de fait cité
  if (e.faits && e.faits.length > 0) {
    const texteComplet = lignes.join("\n");
    const cites = e.faits.filter((fait) => new RegExp(`(?<![\\w.])${fait.id.replace(".", "\\.")}(?![\\w.])`).test(texteComplet));
    if (cites.length > 0) {
      lignes.push(`## ${t.sources}`, "", ...cites.map((fait) => `- **${fait.id}** : ${fait.texte}`), "");
    }
  }

  if (e.chiffresNonSources && e.chiffresNonSources.length > 0) {
    lignes.push(`> ${t.alerteChiffres} : ${e.chiffresNonSources.join(", ")}.`, "");
  }

  return lignes.join("\n").trim() + "\n";
}
