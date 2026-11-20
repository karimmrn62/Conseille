import { describe, expect, it } from "vitest";
import { analyser } from "../src/analyser.js";
import { chargerConfig } from "../src/config.js";
import { ModeleSimule } from "../src/llm/mock.js";
import { agregerNotes, mediane, melanger, selectionner } from "../src/pipeline/selection.js";
import type { Position } from "../src/types.js";

describe("sélection des coups", () => {
  it("calcule la médiane", () => {
    expect(mediane([3, 9, 1])).toBe(3);
    expect(mediane([1, 2, 3, 4])).toBe(2.5);
    expect(mediane([])).toBe(0);
  });

  it("agrège par la médiane et écarte les idées incohérentes même très originales", () => {
    const note = (id: string, banalite: number, coherence: number) => ({
      id,
      banalite,
      pertinence: 8,
      coherence,
      faisabilite: 6,
      commentaire: "",
    });
    const passes = [
      [note("a", 2, 8), note("b", 0, 2), note("c", 9, 9)],
      [note("a", 3, 7), note("b", 1, 3), note("c", 8, 9)],
      [note("a", 9, 8), note("b", 0, 2), note("c", 9, 8)], // note aberrante sur « a »
    ];
    const notes = agregerNotes(["a", "b", "c"], passes, 2);
    const a = notes.find((n) => n.id === "a")!;
    expect(a.banalite).toBe(3); // la médiane ignore la note aberrante
    expect(notes.find((n) => n.id === "b")!.ecarte).toBe("cohérence insuffisante");
    const choisis = selectionner(notes, 2).map((n) => n.id);
    expect(choisis).toEqual(["a", "c"]); // l'idée originale et cohérente passe devant la banale
  });

  it("favorise davantage la nouveauté en mode Gambit qu'en mode Classique", () => {
    const passes = [
      [
        { id: "osee", banalite: 1, pertinence: 7, coherence: 7, faisabilite: 5, commentaire: "" },
        { id: "sure", banalite: 7, pertinence: 9, coherence: 9, faisabilite: 9, commentaire: "" },
      ],
    ];
    const classique = selectionner(agregerNotes(["osee", "sure"], passes, 1), 1)[0]!.id;
    const gambit = selectionner(agregerNotes(["osee", "sure"], passes, 3), 1)[0]!.id;
    expect(classique).toBe("sure");
    expect(gambit).toBe("osee");
  });

  it("mélange de façon reproductible", () => {
    expect(melanger([1, 2, 3, 4, 5], 7)).toEqual(melanger([1, 2, 3, 4, 5], 7));
    expect(melanger([1, 2, 3, 4, 5], 1).sort()).toEqual([1, 2, 3, 4, 5]);
  });
});

const POSITION: Position = {
  id: "test",
  titre: "Réseau de test",
  type: "pilotage",
  question: "Que faire ?",
  documents: [{ nom: "note.md", contenu: "Budget de 450 000 €." }],
  donnees: [
    {
      nom: "Ventes",
      colonnePeriode: "periode",
      dimensions: ["region"],
      indicateurs: [
        { nom: "ca", type: "somme" },
        { nom: "marge", type: "somme" },
        { nom: "taux de marge", type: "ratio", numerateur: "marge", denominateur: "ca" },
      ],
      csv: "periode,region,ca,marge\n2025,Nord,100,40\n2025,Sud,100,10\n2026,Nord,180,70\n2026,Sud,20,1",
    },
  ],
};

function repondeur(etape: string): unknown {
  if (etape === "lecture") {
    return {
      vraieQuestion: "La vraie question",
      enjeux: ["e"],
      acteurs: [{ nom: "DG", role: "décide", interets: "croissance", pouvoir: "fort", positionProbable: "favorable" }],
      contraintesDures: [],
      contraintesSupposees: [],
      hypothesesImplicites: [],
      anglesMorts: [],
      contradictions: [],
      nonDits: [],
      actifsSousEstimes: [],
      coupsEvidents: ["Digitaliser"],
      questionsAPoser: ["Quelle marge par client ?"],
    };
  }
  if (etape.startsWith("divergence")) {
    return {
      candidats: [1, 2, 3, 4].map((i) => ({
        titre: `Idée ${i}`,
        coup: `Coup ${i}`,
        technique: "inversion",
        mecanisme: "m",
        pourquoiInvisible: "p",
      })),
    };
  }
  if (etape.startsWith("notation")) {
    const ids = ["1", "2", "3"].flatMap((i) => [1, 2, 3, 4].map((j) => `C${i}.${j}`));
    return {
      notes: ids.map((id) => ({
        id,
        banalite: id.endsWith(".1") ? 2 : 8,
        pertinence: 8,
        coherence: 8,
        faisabilite: 7,
        commentaire: "",
      })),
    };
  }
  if (etape === "verification") {
    return {
      verifications: ["C1.1", "C2.1", "C3.1"].map((id) => ({
        id,
        refutation: "r",
        tient: id !== "C3.1",
        risque: "risque",
        conditionsDeSucces: [],
        test: "test",
        confiance: "moyenne",
        pourMonterLaConfiance: "x",
      })),
    };
  }
  if (etape === "formulation") {
    return {
      ouverture: "Tout le monde regarde le chiffre d'affaires.",
      coups: [
        {
          titre: "Le coup",
          coup: "Jouer le Nord, dont le taux passe à 38,89 %.",
          pourquoiPersonne: "p",
          pourquoiIlGagne: "g",
          troisCoupsSuivants: ["a", "b", "c"],
          risque: "r",
          test: "t",
          confiance: "moyenne",
          pourMonterLaConfiance: "x",
          appuis: ["F1"],
        },
      ],
      coupEvident: "Digitaliser",
      siJeNeDevaisJouerQuUnCoup: "Le coup, avec une marge inventée de 47,3 %.",
    };
  }
  if (etape === "kpi") {
    return {
      diagnostic: "Le taux global monte par effet de mix.",
      kpiQuiMentent: [{ kpi: "taux de marge", pathologie: "effet_de_mix", explication: "e", faits: ["F7"], consequence: "c" }],
      indicateursManquants: [],
      arbreKpi: [],
      revue: [],
    };
  }
  if (etape === "conseil") {
    return {
      acteurs: [
        { acteur: "DG", reaction: "r", objection: "o", interetCache: "i", contreCoup: "c", signal: "s", plausibilite: "forte" },
      ],
      hypotheses: ["h"],
      ordreDeJeu: "DG d'abord",
    };
  }
  throw new Error(`étape inattendue : ${etape}`);
}

describe("analyse complète avec un modèle simulé", () => {
  it("enchaîne les étapes, ne garde que les coups qui tiennent et contrôle les chiffres", async () => {
    const modele = new ModeleSimule(repondeur);
    const r = await analyser(POSITION, modele, chargerConfig({}));

    const etapes = modele.appels.map((a) => a.etape);
    expect(etapes[0]).toBe("lecture");
    expect(etapes.filter((e) => e.startsWith("divergence"))).toHaveLength(3);
    expect(etapes.filter((e) => e.startsWith("notation"))).toHaveLength(3);
    expect(etapes).toContain("kpi");
    expect(etapes.at(-1)).toBe("conseil");

    // Les coups évidents sont transmis à la divergence comme repoussoir.
    expect(modele.appels.find((a) => a.etape === "divergence-1")?.consigne).toContain("Digitaliser");

    // Seuls les candidats originaux (« .1 ») sont vérifiés, et C3.1 ne tient pas.
    expect(r.methode.verifications.map((v) => v.id).sort()).toEqual(["C1.1", "C2.1", "C3.1"]);
    const formulationConsigne = modele.appels.find((a) => a.etape === "formulation")!.consigne;
    expect(formulationConsigne).toContain("C1.1");
    expect(formulationConsigne).not.toContain("C3.1");

    // Le chiffre exact (taux du Nord, 70/180) passe ; le chiffre inventé est signalé.
    expect(r.chiffresNonSources).toEqual(["47,3"]);
    expect(r.markdown).toContain("Contrôle automatique");
    expect(r.markdown).toContain("Le conseil de guerre");
    expect(r.faits.some((f) => f.texte.includes("PARADOXE DE SIMPSON"))).toBe(true);
  });
});
