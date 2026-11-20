import { libelles } from "../i18n.js";
import type { AnalyseKpi, ConseilDeGuerre, Formulation, Lecture } from "../schemas.js";
import type { Locale } from "../types.js";

export interface ElementsRendu {
  langue: Locale;
  lecture: Lecture;
  formulation: Formulation;
  kpi: AnalyseKpi | null;
  conseil: ConseilDeGuerre | null;
  chiffresNonSources?: string[];
}

/** Met en forme l'analyse de Bishop en Markdown lisible par un consultant ou un comité. */
export function rendreAnalyse(e: ElementsRendu): string {
  const t = libelles(e.langue).rendu;
  const f = e.formulation;
  const lignes: string[] = [];

  lignes.push(`## ${t.lecture}`, "", f.ouverture, "");
  lignes.push(`**${t.vraieQuestion} :** ${e.lecture.vraieQuestion}`, "");

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
  if (f.coups.length > 0) lignes.push(`**${t.unSeulCoup} :** ${f.siJeNeDevaisJouerQuUnCoup}`, "");

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

  if (e.chiffresNonSources && e.chiffresNonSources.length > 0) {
    lignes.push(`> ${t.alerteChiffres} : ${e.chiffresNonSources.join(", ")}.`, "");
  }

  return lignes.join("\n").trim() + "\n";
}
