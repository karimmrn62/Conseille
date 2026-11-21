# Le cerveau de Bishop

La méthode du grand maître (étape 0 de la feuille de route) et son banc d'essai.

## Ce que fait le cerveau

1. **Calcul des faits** (`src/compute/`) : à partir des tableaux de données, le code calcule totaux, variations, contributions, effet taux / effet de mix et paradoxes de Simpson. L'IA ne calcule jamais.
2. **Lecture de la position** : vraie question, acteurs, contraintes, hypothèses, angles morts, et les **coups évidents** qui serviront de repoussoir.
3. **Divergence imposée** : trois générations en parallèle, chacune avec des techniques différentes (inversion, changement d'échiquier, analogie lointaine, pion oublié, prophylaxie…).
4. **Filtre anti-banalité** : trois notations indépendantes, agrégées par la médiane, pondérées selon le niveau d'audace, avec des seuils éliminatoires.
5. **Vérification** : un avocat du diable tente de réfuter les meilleurs coups.
6. **Le coup joué** : au plus trois coups distincts, dans la voix de Bishop.
7. **Modules** : « Les KPI qui vous mentent » et « Revue en trois coups » (s'il y a des données), « Le conseil de guerre » sur le coup principal.
8. **Contrôle des chiffres** : tout chiffre du rendu absent des documents et des faits calculés est signalé.

Les consignes sont dans `prompts/fr/` (la version anglaise viendra dans `prompts/en/`).

## Commandes

```bash
npm install
npm test                                  # tests (sans appel à l'API)
npm run typecheck
npm run bench -- --essai                  # vérifie les cas sans appeler l'API
npm run bench -- --cas=interim-marge      # un cas : Bishop contre le témoin
npm run bench -- --tous --juge            # tous les cas, avec le juge automatique
```

Le banc d'essai écrit ses résultats dans `bench/runs/<horodatage>/` :
- `<cas>/A.md` et `<cas>/B.md` : les deux réponses, dans un ordre tiré au sort ;
- `grille.md` : la grille d'évaluation à remplir à l'aveugle ;
- `resume.md` : coûts, durées, contrôle des chiffres ;
- `cle.md` et `<cas>/coulisses/` : la clé et les détails, **à n'ouvrir qu'après l'évaluation**.

## Clé d'API

Le banc d'essai lit la clé dans la variable **`BISHOP_ANTHROPIC_API_KEY`** (et non `ANTHROPIC_API_KEY`, réservée à Claude Code dans les sessions en ligne et non transmise aux commandes). Ajoutez-la dans les variables de l'environnement cloud, puis ouvrez une nouvelle session.

## Réglages (variables d'environnement)

| Variable | Défaut | Rôle |
|---|---|---|
| `BISHOP_MODELE` | `claude-opus-5-5` | Modèle utilisé |
| `BISHOP_EFFORT_REFLEXION` | `high` | Effort des étapes de génération et de vérification |
| `BISHOP_EFFORT_NOTATION` | `medium` | Effort des notations |
| `BISHOP_PASSES_NOTATION` | `3` | Nombre de notations indépendantes |
| `BISHOP_CANDIDATS_VERIFIES` | `5` | Candidats envoyés à la vérification |
| `BISHOP_COUPS_FINAUX` | `3` | Coups présentés au maximum |

## Les cas de test

Huit cas fictifs mais réalistes dans `bench/cases/` : quatre missions de conseil et quatre situations de pilotage avec des données chiffrées contenant des pièges (paradoxe de Simpson, indicateurs trompeurs). Le fichier `attendus.md` de chaque cas décrit les pièges et ce qu'une excellente réponse devrait contenir : il n'est jamais transmis aux systèmes testés.
