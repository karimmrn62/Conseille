# Résumé du passage sur le banc d'essai

> ⚠ Ce fichier révèle des informations techniques mais **pas** l'identité de A et B. La clé est dans `cle.md`, à n'ouvrir qu'après l'évaluation.

| Cas | Coût Bishop | Durée cumulée des appels Bishop | Coût témoin | Chiffres non sourcés (Bishop) | Juge automatique |
|---|---|---|---|---|---|
| interim-marge | 1.06 $ (11 appels) | 409 s | 0.27 $ | 3.4 | préférence contraire (voir clé) |

## Coût de Bishop par étape

**interim-marge**

| Étape | Modèle | Jetons produits | Coût |
|---|---|---|---|
| lecture | claude-opus-5-5 | 4984 | 0.10 $ |
| divergence | claude-opus-5-5 | 9800 | 0.26 $ |
| notation | claude-sonnet-5-5 | 3725 | 0.10 $ |
| kpi | claude-opus-5-5 | 8567 | 0.19 $ |
| verification | claude-opus-5-5 | 5186 | 0.13 $ |
| formulation | claude-opus-5-5 | 7286 | 0.18 $ |
| conseil | claude-opus-5-5 | 3458 | 0.09 $ |

