import type { Audace, Locale, Registre } from "./types.js";

/**
 * Textes de l'interface et des rendus. Toute chaîne visible par l'utilisateur passe par ici,
 * pour que la version anglaise soit une traduction et non une réécriture du code.
 */
export interface Libelles {
  langueReponse: string;
  audace: Record<Audace, string>;
  registre: Record<Registre, string>;
  techniques: string[][];
  contexte: {
    position: string;
    type: Record<"mission" | "pilotage", string>;
    question: string;
    reglages: string;
    documents: string;
    faits: string;
    faitsIntro: string;
    aucunFait: string;
    donneesBrutes: string;
    donneesBrutesIntro: string;
    tronque(total: number): string;
  };
  rendu: {
    essentiel: string;
    alerteKpi: string;
    sources: string;
    lecture: string;
    vraieQuestion: string;
    coups: string;
    pourquoiPersonne: string;
    pourquoiIlGagne: string;
    troisCoups: string;
    risque: string;
    test: string;
    confiance: string;
    pourMonter: string;
    appuis: string;
    coupEvident: string;
    unSeulCoup: string;
    kpi: string;
    diagnostic: string;
    kpiQuiMentent: string;
    manquants: string;
    arbre: string;
    revue: string;
    conseil: string;
    avertissementConseil: string;
    reaction: string;
    objection: string;
    interetCache: string;
    contreCoup: string;
    signal: string;
    plausibilite: string;
    hypotheses: string;
    ordreDeJeu: string;
    questions: string;
    alerteChiffres: string;
    aucunCoup: string;
    faitsCalcules: string;
  };
}

const FR: Libelles = {
  langueReponse: "Réponds en français.",
  audace: {
    1: "Classique : des améliorations solides auxquelles on n'a pas pensé, à faible risque.",
    2: "Positionnel : des repositionnements non évidents, défendables en comité de direction.",
    3: "Gambit : des coups audacieux avec un sacrifice assumé, toujours argumentés.",
  },
  registre: {
    sobre: "registre sobre : ton posé de comité de direction, images d'échecs très rares",
    incarne: "registre incarné : ta personnalité de joueur d'échecs s'exprime davantage, sans nuire à la précision",
  },
  techniques: [
    ["inversion (faire l'inverse de ce que tout le monde fait)", "changement d'échiquier (déplacer la compétition là où l'on est le plus fort)", "suppression d'une contrainte supposée intouchable"],
    ["analogie lointaine (un problème de même structure résolu dans une autre industrie)", "le pion oublié (un actif sous-estimé qui change la donne)", "sacrifice calculé (renoncer à quelque chose pour une meilleure position)"],
    ["prophylaxie (prendre de vitesse ce que veulent faire les autres acteurs)", "effets de second ordre (les conséquences des conséquences)", "pre-mortem (le plan a échoué dans deux ans : pourquoi, et quel coup l'aurait évité)"],
  ],
  contexte: {
    position: "Position à analyser",
    type: { mission: "mission de conseil", pilotage: "pilotage de la performance" },
    question: "Question posée",
    reglages: "Réglages",
    documents: "Documents fournis",
    faits: "Faits calculés",
    faitsIntro:
      "Les faits suivants ont été calculés par du code à partir des données fournies. Ce sont, avec les documents, les seules sources de chiffres autorisées. Cite-les par leur identifiant.",
    aucunFait: "Aucune donnée chiffrée n'a été fournie : ne cite que les chiffres des documents.",
    donneesBrutes: "Données brutes",
    donneesBrutesIntro:
      "Voici les tableaux tels qu'ils ont été fournis. Sers-t'en pour comprendre leur structure (colonnes, niveau de détail, croisements disponibles) et repérer ce qu'ils contiennent ou non. Ne fais aucun calcul toi-même à partir de ces lignes : les chiffres que tu cites viennent des faits calculés. Avant d'affirmer qu'une donnée manque, vérifie qu'elle n'est pas dans ces tableaux.",
    tronque: (total) => `… (extrait : les ${total} lignes ont toutes été prises en compte dans les faits calculés)`,
  },
  rendu: {
    essentiel: "L'essentiel",
    alerteKpi: "Attention",
    sources: "Sources des chiffres",
    lecture: "Lecture de la position",
    vraieQuestion: "La vraie question",
    coups: "Les coups",
    pourquoiPersonne: "Pourquoi personne ne le joue",
    pourquoiIlGagne: "Pourquoi il gagne",
    troisCoups: "Les trois coups suivants",
    risque: "Le risque",
    test: "Le test",
    confiance: "Confiance",
    pourMonter: "Ce qui la ferait monter",
    appuis: "Appuis",
    coupEvident: "Le coup évident, et pourquoi je ne le jouerais pas",
    unSeulCoup: "Si je ne devais jouer qu'un coup",
    kpi: "Les KPI qui vous mentent",
    diagnostic: "Ce que disent vraiment les chiffres",
    kpiQuiMentent: "Indicateurs trompeurs",
    manquants: "Les trois indicateurs que vous ne suivez pas",
    arbre: "Arbre d'indicateurs proposé",
    revue: "Revue en trois coups",
    conseil: "Le conseil de guerre",
    avertissementConseil:
      "Scénario raisonné à partir des documents, pas une prédiction. Les hypothèses sont listées en fin de section.",
    reaction: "Réaction probable",
    objection: "Objection",
    interetCache: "Intérêt caché",
    contreCoup: "Contre-coup",
    signal: "Signal à observer",
    plausibilite: "Plausibilité",
    hypotheses: "Hypothèses de la simulation",
    ordreDeJeu: "Ordre de jeu",
    questions: "Questions à poser",
    alerteChiffres:
      "⚠ Contrôle automatique : ces chiffres n'ont été retrouvés ni dans les documents ni dans les faits calculés. À vérifier avant toute utilisation",
    aucunCoup:
      "Aucun coup candidat n'a résisté à la vérification. Plutôt que de vous proposer un coup fragile, je préfère vous le dire : il faut d'abord lever les incertitudes ci-dessous.",
    faitsCalcules: "Faits calculés",
  },
};

const EN: Libelles = {
  ...FR,
  langueReponse: "Answer in English.",
  audace: {
    1: "Classic: solid improvements nobody thought of, low risk.",
    2: "Positional: non-obvious repositionings that hold up in a board meeting.",
    3: "Gambit: bold moves with a deliberate sacrifice, always argued.",
  },
  registre: {
    sobre: "restrained register: calm boardroom tone, very rare chess imagery",
    incarne: "embodied register: your chess-player personality shows more, without hurting precision",
  },
  // Les consignes et les autres libellés anglais seront traduits avant la version anglaise.
};

export function libelles(langue: Locale): Libelles {
  return langue === "en" ? EN : FR;
}
