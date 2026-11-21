import { describe, expect, it } from "vitest";
import { lireCsv, lireNombre } from "../src/compute/csv.js";
import { calculerFaits } from "../src/compute/faits.js";
import { chiffresNonSources } from "../src/compute/verification.js";
import type { JeuDeDonnees } from "../src/types.js";

describe("lecture CSV", () => {
  it("détecte le point-virgule et lit les nombres français", () => {
    const { colonnes, lignes } = lireCsv('region;ca\n"Est";1 234,5\nOuest;10\n');
    expect(colonnes).toEqual(["region", "ca"]);
    expect(lignes).toHaveLength(2);
    expect(lireNombre(lignes[0]?.ca)).toBe(1234.5);
  });

  it("lit les nombres anglais avec séparateur de milliers", () => {
    expect(lireNombre("1,234.5")).toBe(1234.5);
    expect(lireNombre("12.5%")).toBe(12.5);
    expect(lireNombre("")).toBeNull();
  });
});

// Deux régions : chacune voit son taux de marge baisser,
// mais le poids de la région à forte marge augmente → le taux global monte.
const SIMPSON: JeuDeDonnees = {
  nom: "Ventes",
  colonnePeriode: "periode",
  dimensions: ["region"],
  indicateurs: [
    { nom: "ca", type: "somme", unite: "k€" },
    { nom: "marge", type: "somme", unite: "k€" },
    { nom: "taux de marge", type: "ratio", numerateur: "marge", denominateur: "ca" },
  ],
  csv: [
    "periode,region,ca,marge",
    "2025,Nord,100,40",
    "2025,Sud,100,10",
    "2026,Nord,180,70",
    "2026,Sud,20,1",
  ].join("\n"),
};

describe("calcul des faits", () => {
  const faits = calculerFaits(SIMPSON, "fr");

  it("calcule le total et sa variation", () => {
    const ca = faits.find((f) => f.texte.includes("total — ca"));
    expect(ca?.texte).toContain("200 k€ → 200 k€");
  });

  it("décompose effet taux et effet de mix de façon exacte", () => {
    const deco = faits.find((f) => f.texte.includes("décomposition"));
    expect(deco).toBeDefined();
    const [delta, taux, mix] = deco!.valeurs;
    // Taux global : 25 % → 35,5 % soit +10,5 pt
    expect(delta).toBeCloseTo(10.5, 2);
    expect(taux! + mix!).toBeCloseTo(delta!, 1);
    expect(taux).toBeLessThan(0);
    expect(mix).toBeGreaterThan(0);
  });

  it("signale le paradoxe de Simpson", () => {
    expect(faits.some((f) => f.texte.includes("PARADOXE DE SIMPSON"))).toBe(true);
  });

  it("numérote les faits", () => {
    expect(faits[0]?.id).toBe("F1");
    expect(new Set(faits.map((f) => f.id)).size).toBe(faits.length);
  });
});

describe("contrôle des chiffres", () => {
  const faits = calculerFaits(SIMPSON, "fr");

  it("accepte les chiffres issus des faits et des documents", () => {
    const texte = "Le taux passe à 35,5 % (+10,5 pt) ; budget de 450 000 € prévu.";
    expect(chiffresNonSources(texte, faits, ["Budget : 450 000 €"])).toEqual([]);
  });

  it("repère un chiffre inventé", () => {
    expect(chiffresNonSources("La marge atteint 47,3 %.", faits, [])).toEqual(["47,3"]);
  });

  it("ignore les petits entiers et les années", () => {
    expect(chiffresNonSources("3 priorités d'ici 2027, test de 2 semaines.", faits, [])).toEqual([]);
  });
});

describe("client de l'API", async () => {
  const { creerClient } = await import("../src/llm/anthropic.js");

  it("lit la clé dans BISHOP_ANTHROPIC_API_KEY et fixe l'adresse de l'API", () => {
    const client = creerClient({ BISHOP_ANTHROPIC_API_KEY: "sk-test", ANTHROPIC_BASE_URL: "https://relais.example" });
    expect(client.apiKey).toBe("sk-test");
    expect(client.baseURL).toBe("https://api.anthropic.com");
  });

  it("explique quoi faire quand la clé manque", () => {
    expect(() => creerClient({})).toThrow(/BISHOP_ANTHROPIC_API_KEY/);
  });
});

describe("contrôle des chiffres et identifiants", () => {
  it("ignore les identifiants de faits et de candidats", () => {
    expect(chiffresNonSources("Voir F40, F66 et F2.3 ; candidat C1.2.", [], [])).toEqual([]);
  });

  it("repère toujours un chiffre inventé à côté d'un identifiant", () => {
    expect(chiffresNonSources("Marge de 47,3 % (F5).", [], [])).toEqual(["47,3"]);
  });
});

describe("contrôle des chiffres et dates", () => {
  it("ignore les jours du mois", () => {
    expect(chiffresNonSources("Échéance : 31 janvier 2027, puis 28 février.", [], [])).toEqual([]);
  });
});
