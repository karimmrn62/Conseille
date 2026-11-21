# Résumé du passage sur le banc d'essai

> ⚠ Ce fichier révèle des informations techniques mais **pas** l'identité de A et B. La clé est dans `cle.md`, à n'ouvrir qu'après l'évaluation.

| Cas | Coût Bishop | Durée cumulée des appels Bishop | Coût témoin | Chiffres non sourcés (Bishop) | Juge automatique |
|---|---|---|---|---|---|
| interim-marge | 1.41 $ (11 appels) | 383 s | 0.29 $ | aucun | préférence contraire (voir clé) |
| banque-credit-conso | 1.40 $ (11 appels) | 441 s | 0.25 $ | aucun | préférence contraire (voir clé) |
| bricolage-ecommerce | 0.93 $ (10 appels) | 323 s | 0.21 $ | aucun | préférence contraire (voir clé) |

## Coût de Bishop par étape

**interim-marge**

| Étape | Modèle | Jetons produits | Coût |
|---|---|---|---|
| lecture | claude-opus-5-5 | 3653 | 0.13 $ |
| divergence | claude-opus-5-5 | 9487 | 0.37 $ |
| notation | claude-sonnet-5-5 | 3976 | 0.16 $ |
| kpi | claude-opus-5-5 | 8634 | 0.24 $ |
| verification | claude-opus-5-5 | 4874 | 0.16 $ |
| formulation | claude-opus-5-5 | 7607 | 0.23 $ |
| conseil | claude-opus-5-5 | 3275 | 0.13 $ |

**banque-credit-conso**

| Étape | Modèle | Jetons produits | Coût |
|---|---|---|---|
| lecture | claude-opus-5-5 | 4907 | 0.14 $ |
| divergence | claude-opus-5-5 | 12714 | 0.40 $ |
| notation | claude-sonnet-5-5 | 4013 | 0.14 $ |
| kpi | claude-opus-5-5 | 9048 | 0.23 $ |
| verification | claude-opus-5-5 | 5785 | 0.17 $ |
| formulation | claude-opus-5-5 | 8116 | 0.23 $ |
| conseil | claude-opus-5-5 | 2294 | 0.09 $ |

**bricolage-ecommerce**

| Étape | Modèle | Jetons produits | Coût |
|---|---|---|---|
| lecture | claude-opus-5-5 | 5331 | 0.13 $ |
| divergence | claude-opus-5-5 | 11549 | 0.33 $ |
| notation | claude-sonnet-5-5 | 3925 | 0.12 $ |
| verification | claude-opus-5-5 | 4321 | 0.13 $ |
| formulation | claude-opus-5-5 | 4275 | 0.13 $ |
| conseil | claude-opus-5-5 | 3604 | 0.10 $ |

