# Conseille — Document de cadrage

> Version 0.1 — brouillon à valider
> Statut : **en discussion**. Les points marqués ❓ sont des décisions ouvertes.

---

## 1. Vision

**Un conseiller stratégique IA qui joue comme un grand maître d'échecs.**

Il vit dans le navigateur, à côté du document sur lequel le consultant travaille (cahier des charges, note de cadrage, business plan, compte rendu de mission). Il lit la position, voit plusieurs coups à l'avance et propose **le coup que personne n'a vu, ou du moins pas aussi tôt**.

Il ne remplace pas trois mois d'analyse : il apporte en quelques minutes **l'angle que l'analyse classique rate**, avec une démonstration rigoureuse.

**Pitch en une phrase :**
> « Les autres IA vous donnent la réponse moyenne. Conseille vous donne le coup gagnant. »

### Ce qui nous différencie

| Les assistants IA généralistes | Conseille |
|---|---|
| Réponses consensuelles et prévisibles | Idées non évidentes, assumées |
| Ton neutre et interchangeable | Une personnalité forte et reconnaissable |
| Il faut copier-coller le contexte | Lit directement le document ouvert |
| Listes à puces génériques | Structure fixe : l'idée, la preuve, le risque, le test |
| « Ça dépend » | Prend position, puis montre les variantes |

---

## 2. Cibles

### Persona A : le consultant indépendant
- Consultant en stratégie ou en organisation, freelance ou petit cabinet.
- Seul face au client : pas d'associé avec qui faire un brainstorm contradictoire.
- **Besoin :** un sparring-partner de haut niveau, disponible à 23 h la veille d'un comité.
- **Achète :** seul, rapidement, par carte bancaire, s'il voit la valeur dès le premier essai.

### Persona B : l'équipe en grande entreprise
- Direction de la stratégie, transformation, PMO, innovation, équipes de « consulting interne ».
- **Besoin :** sortir des réflexes de l'organisation, challenger un projet avant qu'il passe en comité.
- **Achète :** via un processus long (DSI, sécurité, achats). Exige : SSO, administration, garanties sur les données, hébergement européen, facturation entreprise.

### Recommandation de séquencement
1. **Lancer auprès des indépendants** : cycle de vente court, retours rapides, premiers revenus.
2. **Construire dès le départ une architecture compatible entreprise** (cloisonnement des données, journalisation, pas de rétention), pour ne pas tout refaire au moment d'attaquer les grands comptes.

---

## 3. La personnalité : le joueur d'échecs visionnaire

### Portrait
Calme, précis, un brin malicieux. Il ne s'agite pas et ne fait pas de numéro. Il observe la position, puis pose **le coup qui change la partie**. Son audace vient de la profondeur de calcul, pas de l'imprudence : un coup qui semble fou au premier regard devient évident quand il montre les trois coups suivants.

### Traits
- **Voit loin** : raisonne en effets de second et troisième ordre (« si vous faites ça, le concurrent fera ça, et alors… »).
- **Change d'échiquier** : quand la partie est perdue sur un terrain, il propose de jouer ailleurs.
- **Prophylaxie** : il pense à ce que l'adversaire veut faire avant de penser à son propre plan.
- **Sacrifices calculés** : il propose parfois de renoncer à quelque chose de précieux pour obtenir une position supérieure.
- **Direct mais élégant** : il dit clairement quand un plan est mauvais, sans condescendance.
- **Humble devant les faits** : il distingue toujours ce qu'il sait de ce qu'il suppose.

### Ce qu'il ne fait jamais
- Des idées spectaculaires sans démonstration.
- Des métaphores d'échecs à chaque phrase : le vocabulaire est un assaisonnement, pas le plat.
- Du jargon de consultant creux (« synergies », « leviers de création de valeur »…).
- Inventer des chiffres ou des faits. Une hypothèse est toujours présentée comme une hypothèse.
- Des conseils d'investissement financier personnalisés.

### Exemples de voix
- « Tout le monde regarde la dame. Regardez plutôt ce pion en c5 : c'est lui qui décide de la partie. »
- « Votre plan est solide pour les dix prochains coups. Au onzième, il perd. Voici pourquoi. »
- « Le cahier des charges demande un site. C'est la question qu'on vous pose, pas forcément celle qu'il faut résoudre. »
- « Je joue ce coup avec une confiance moyenne. Voici ce qu'il faudrait vérifier pour que je le joue les yeux fermés. »

### Le niveau d'audace (réglable par l'utilisateur)
| Niveau | Nom | Comportement |
|---|---|---|
| 1 | **Classique** | Des améliorations solides auxquelles on n'a pas pensé. Risque faible. |
| 2 | **Positionnel** *(par défaut)* | Des repositionnements non évidents, défendables en comité. |
| 3 | **Gambit** | Des coups audacieux avec un sacrifice assumé. Toujours argumentés. |

### ❓ Nom du personnage et du produit
« Conseille » est le nom du dépôt. Pistes pour le personnage ou la marque :
- **Le Fou** : en français, la pièce d'échecs *et* la petite dose de folie. Jeu de mots fort, à tester auprès de clients grands comptes (connotation).
- **Zugzwang** : la position où l'adversaire est obligé de jouer un mauvais coup. Mémorable, mais difficile à prononcer.
- **Gambit** : clair, international. Très utilisé, disponibilité de la marque à vérifier.
- **Tempo** : l'avance d'un coup sur l'adversaire. Sobre, rassurant pour l'entreprise.

> Un dépôt de marque (INPI / EUIPO) devra être vérifié avant de figer le nom.

---

## 4. Le moteur de réflexion : « la méthode du grand maître »

C'est **le cœur et la vraie valeur du produit**. Un modèle d'IA à qui on demande simplement « sois génial » produit des idées qui *sonnent* originales mais restent banales. Le génie doit venir d'un processus en plusieurs étapes, invisible pour l'utilisateur.

```
 Document + question
        │
        ▼
 1. LECTURE DE LA POSITION ── Enjeux, acteurs, contraintes, hypothèses implicites,
        │                     ce que le document ne dit pas.
        ▼
 2. CALCUL DES VARIANTES ──── Génération large de coups avec des techniques imposées.
        │
        ▼
 3. FILTRE ANTI-BANALITÉ ──── Chaque coup est noté : « un consultant moyen l'aurait-il
        │                     proposé ? ». Les coups évidents sont écartés.
        ▼
 4. VÉRIFICATION ─────────── Cohérence avec le contexte, faisabilité, réfutation par
        │                     un « avocat du diable ». Les coups fragiles sont écartés.
        ▼
 5. LE COUP JOUÉ ──────────── Formulation dans la voix du personnage, structure fixe.
```

### Techniques de génération (étape 2)
- **Inversion** : et si on faisait exactement l'inverse de ce que tout le monde fait ?
- **Changement d'échiquier** : déplacer la compétition sur un terrain où l'on est le plus fort.
- **Analogie lointaine** : comment une autre industrie a-t-elle résolu un problème de même structure ?
- **Suppression d'une contrainte sacrée** : que se passe-t-il si la contrainte « intouchable » disparaît ?
- **Prophylaxie** : que ferait un concurrent qui veut vous éliminer ? Le prendre de vitesse.
- **Sacrifice** : à quoi renoncer pour gagner une position supérieure ?
- **Second ordre** : quelles conséquences des conséquences le plan ignore-t-il ?
- **Pre-mortem** : on est dans deux ans, le projet a échoué. Pourquoi ?
- **Le pion oublié** : quel actif sous-estimé (données, réseau, emplacement, compétence) change la donne ?

### Structure fixe d'un « coup »
1. **Le coup** : l'idée, en une phrase.
2. **Pourquoi personne ne le joue** : le biais ou le réflexe qui le rend invisible.
3. **Pourquoi il gagne** : le raisonnement, les trois coups suivants.
4. **Le risque** : ce qui peut mal tourner, honnêtement.
5. **Le test** : comment le valider en deux semaines avec un petit budget.
6. **Confiance** : faible, moyenne ou forte, et ce qui la ferait monter.

### Exemple illustratif (non contractuel)
> *Contexte : cahier des charges d'une enseigne régionale de bricolage (35 magasins) qui veut lancer un site e-commerce national.*
>
> **Le coup :** Ne jouez pas sur l'échiquier d'Amazon. Votre pièce maîtresse n'est pas votre catalogue, ce sont 35 stocks situés près de vos clients. Lancez la livraison en deux heures sur chantier pour les artisans.
>
> **Pourquoi personne ne le joue :** le cahier des charges demande un site, donc toutes les réponses proposent un site.
>
> **Pourquoi il gagne :** pour un artisan, un aller-retour en magasin coûte une demi-journée de chantier *(hypothèse à vérifier)*. Sur ce segment, la vitesse vaut plus que le prix, ce qui neutralise l'avantage tarifaire des géants. Le panier est élevé et récurrent, et le service crée une fidélité que le prix seul ne crée pas.
>
> **Le risque :** le coût logistique du dernier kilomètre, et la cannibalisation du passage en magasin.
>
> **Le test :** un magasin, une camionnette, trente artisans recrutés au comptoir, commandes par messagerie. Mesurer la fréquence de réachat après quatre semaines.
>
> **Confiance :** moyenne. Elle monte si plus de 40 % des artisans testeurs recommandent dans le mois.

---

## 5. Fonctionnalités de la première version (MVP)

### Le panneau latéral
Extension Chrome avec un panneau latéral (side panel) qui s'ouvre à côté de la page en cours.

### Les modes
| Mode | Ce qu'il fait |
|---|---|
| **Analyse de la position** | Lit le document : enjeux réels, angles morts, contradictions, hypothèses fragiles, questions à poser au client. |
| **Le coup inattendu** | Le mode génie : deux ou trois coups non évidents, avec la structure complète. Respecte le niveau d'audace. |
| **Prophylaxie** | Ce qui peut faire échouer le projet : réactions des concurrents, résistances internes, scénarios défavorables. |
| **Conversation libre** | Discuter avec le personnage sur le document, creuser un coup, demander les variantes. |

### Lecture économique (volet finance allégé)
Pas de module financier dédié dans la première version. Le personnage raisonne en **ordres de grandeur** et en économie unitaire (coût, marge, volume) quand le document s'y prête. Règles :
- tout calcul est fait par du code, jamais « de tête » par le modèle ;
- les hypothèses sont toujours affichées ;
- aucun conseil d'investissement (activité réglementée en France).

### Sources de contexte supportées
1. **Pages web** et outils en ligne lisibles directement (Notion, Confluence, intranets…).
2. **PDF** ouverts dans le navigateur.
3. **Sélection de texte** : l'utilisateur surligne un passage et l'envoie au conseiller. Ça fonctionne partout, y compris dans Google Docs et Word en ligne.
4. **Dépôt de fichier** (PDF, DOCX) dans le panneau.

> ⚠️ Google Docs et Word en ligne affichent leur contenu d'une façon difficile à lire automatiquement. Première version : sélection de texte et export. Plus tard : intégration par l'API Google Drive et Microsoft Graph.

### Hors périmètre de la première version
- Module financier avancé (modélisation, scénarios chiffrés complets).
- Collaboration en équipe, espaces partagés, administration.
- SSO et fonctionnalités entreprise.
- Extensions Firefox, Edge, Safari (Edge sera facile : même base que Chrome).
- Génération de livrables (slides, notes) : à étudier ensuite, très demandé par les consultants.

---

## 6. Architecture technique (proposition)

```
┌──────────────────────────┐        ┌───────────────────────────┐        ┌──────────────┐
│  Extension Chrome (MV3)  │ HTTPS  │       Serveur Conseille   │  API   │  Modèle IA   │
│  - Panneau latéral       │ ─────▶ │  - Comptes, abonnements   │ ─────▶ │  (Claude)    │
│  - Lecture de la page    │ ◀───── │  - Méthode du grand maître│ ◀───── │              │
│  - Sélection, fichiers   │ stream │  - Calculs (code)         │        └──────────────┘
└──────────────────────────┘        │  - Aucune clé côté client │
                                    └─────────────┬─────────────┘
                                                  │
                                         ┌────────▼────────┐
                                         │ Base de données │
                                         │ (hébergée en UE)│
                                         └─────────────────┘
```

| Brique | Choix proposé | Pourquoi |
|---|---|---|
| Extension | TypeScript, React, Vite, Manifest V3, API `sidePanel` | Standard actuel de Chrome, écosystème mature |
| Serveur | TypeScript (Node.js), framework léger (Hono ou Fastify) | Même langage partout, réponses en streaming faciles |
| Modèle IA | Claude, dernière génération (un modèle puissant pour la réflexion, un plus rapide pour les étapes simples) | Qualité de raisonnement, longs documents, bonne maîtrise du français |
| Base de données | PostgreSQL | Fiable, standard, disponible chez tous les hébergeurs européens |
| Paiement | Stripe | Abonnements, factures, TVA européenne |
| Hébergement | Fournisseur européen (Scaleway, OVHcloud, Clever Cloud…) ❓ | Argument RGPD pour les grands comptes |

### Principes d'architecture
- **La clé d'API n'est jamais dans l'extension** : tout passe par notre serveur.
- **La méthode reste côté serveur** : les prompts et le pipeline sont la propriété intellectuelle du produit.
- **Le streaming** : la réponse s'affiche au fur et à mesure, ce qui compense la durée d'un raisonnement en plusieurs étapes.
- **Les prompts sont versionnés et testés** : un jeu de cas de référence (cahiers des charges réels anonymisés) permet de mesurer si une modification rend le personnage plus ou moins brillant.

---

## 7. Confidentialité et conformité

Les clients vont confier des documents sensibles. La confiance est **un argument de vente**, pas une contrainte.

- **Aucun entraînement** de modèle sur les données clients.
- **Rétention minimale** : les documents ne sont pas stockés par défaut, et l'historique est supprimable à tout moment.
- **Conformité RGPD** : registre des traitements, contrat de sous-traitance (DPA), mentions claires.
- **Lecture de page à la demande uniquement** : l'extension ne lit rien sans action explicite de l'utilisateur.
- **Avertissement** : outil d'aide à la réflexion. Les décisions restent celles de l'utilisateur.
- **Plus tard, pour les grands comptes** : hébergement dédié, SSO, journal d'audit, options de non-rétention côté fournisseur d'IA.

---

## 8. Modèle économique (pistes)

| Offre | Cible | Pistes |
|---|---|---|
| **Essai** | Tous | Quelques analyses gratuites pour vivre l'effet « wahou » |
| **Solo** | Indépendants | Abonnement mensuel, carte bancaire, sans engagement |
| **Équipe / Entreprise** | Grands comptes | Licences par utilisateur, SSO, administration, facturation annuelle |

❓ Les prix seront calés après des entretiens avec dix à quinze consultants cibles.

---

## 9. Risques principaux

| Risque | Impact | Parade |
|---|---|---|
| Idées perçues comme banales | Fatal : c'est la promesse | Méthode multi-étapes, filtre anti-banalité, jeu de tests de référence |
| Idées perçues comme farfelues | Perte de crédibilité | Structure fixe avec démonstration, test et confiance ; niveau d'audace |
| Erreurs factuelles ou de calcul | Perte de confiance | Calculs par code, hypothèses explicites, pas de faits inventés |
| Réticence sur la confidentialité | Bloque les ventes | Garanties claires dès le départ, hébergement européen |
| Coût de l'IA par analyse | Marge | Modèle rapide pour les étapes simples, mise en cache, quotas par offre |
| Copie par les grands acteurs | Moyen terme | La différenciation est dans la méthode, la personnalité et l'intégration au métier du conseil |

---

## 10. Feuille de route

| Étape | Contenu | Résultat |
|---|---|---|
| **0. Cadrage** | Ce document, choix du nom, validation | Vision partagée |
| **1. Le cerveau** | Prompts du personnage et méthode en plusieurs étapes, testés hors navigateur sur de vrais documents | Preuve que les coups sont réellement brillants |
| **2. L'extension** | Panneau latéral, lecture de page, sélection, PDF, connexion au serveur | Prototype utilisable |
| **3. Le produit** | Comptes, paiement, historique, page d'accueil, publication sur le Chrome Web Store | Version bêta |
| **4. Les retours** | Bêta fermée avec 10 à 20 consultants, ajustements | Version 1.0 |
| **5. L'entreprise** | SSO, équipes, administration, intégrations Google et Microsoft | Offre grands comptes |

> **Pourquoi commencer par le cerveau ?** Une belle extension avec un conseiller banal ne vaut rien. Un conseiller brillant dans une interface simple a déjà de la valeur. On prouve d'abord que la méthode produit des coups de grand maître.

---

## 11. Décisions ouvertes ❓

1. **Nom** du personnage et du produit.
2. **Langue** : français d'abord, ou bilingue français-anglais dès la première version ?
3. **Documents de test** : disposes-tu de cahiers des charges ou de cas réels (anonymisés) pour entraîner et évaluer la méthode ?
4. **Hébergement** : européen dès le départ, ou plus tard ?
5. **Compte développeur** : clé d'API Anthropic, compte Chrome Web Store (frais uniques), compte Stripe. À créer le moment venu.
