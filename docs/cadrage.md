# Bishop — Document de cadrage

> Version 0.2 — vision validée le 20/11/2026
> « Bishop » est un **nom de code**. Le nom commercial sera choisi plus tard (voir § 12).
> Études de référence :
> - [Paysage concurrentiel du conseiller IA](../reports/Paysage%20concurrentiel%20conseiller%20IA.md)
> - [IA de pilotage et de décision managériale](../reports/IA%20pilotage%20et%20d%C3%A9cision%20manag%C3%A9riale.md)

---

## 1. Vision

**Bishop est un conseiller de direction IA qui joue comme un grand maître d'échecs.**

Il analyse une situation (une mission de conseil, un dashboard de performance, un projet qui part en comité), voit plusieurs coups à l'avance et propose **le coup que personne n'a vu, ou pas aussi tôt**. Il le démontre, anticipe la réponse des autres acteurs, puis suit ce qu'il est advenu de ce coup.

**Positionnement :**
> « Vos tableaux de bord vous disent ce qui s'est passé. Les IA classiques vous donnent la réponse moyenne. Bishop vous dit quel coup jouer, ce que les autres vont répondre, et quel indicateur vous trompe. »

### Le constat qui fonde le produit
- **Lire un document ou une page ne vaut plus rien** : Claude, Gemini et Copilot le font déjà, gratuitement ou presque.
- **Les IA généralistes donnent toutes la même réponse.** Elles recommandent les mêmes stratégies à la mode, même avec un contexte riche (HBR, mars 2026, le « trendslop »), et elles flattent l'utilisateur (*Science*, 2026).
- **Personne ne tranche.** Les outils de dashboard *montrent et expliquent*, la planification financière *prévoit*, les coachs IA *écoutent*. Aucun ne conteste les KPI, ne propose de coup non évident ni ne simule les acteurs.

👉 **On ne vend pas de la lecture, on vend du jugement**, démontré, fiable et mémorisé.

---

## 2. Un cerveau, deux portes d'entrée, une séquence

### Le cerveau commun
Une seule méthode de jugement (§ 5), qui s'applique à toute « position » : un cahier des charges, une note de cadrage, un reporting mensuel, un dashboard régional, un projet présenté en comité.

### Les cibles, dans l'ordre
| Ordre | Cible | Pourquoi |
|---|---|---|
| **1** | **Consultants** : indépendants et petits cabinets, en priorité ceux qui mènent des **missions de pilotage de la performance**, de transformation ou de redressement | Vente rapide, documents et exports disponibles. Ils sont **déjà dans la pièce** avec les managers de leurs clients : c'est notre canal vers eux. |
| **2** | **Contrôleurs de gestion et directeurs financiers** d'ETI organisées en réseau (distribution, agences bancaires et d'assurance, services multi-sites) | Ils conçoivent les KPI, préparent les revues et disposent d'un budget identifiable. Ils travaillent à partir d'exports, sans projet informatique lourd. |
| **3** | **Grands comptes** : directeurs régionaux, responsables de business unit, comités de direction, équipes stratégie et transformation | Les plus gros contrats, mais ils exigent SSO, hébergement européen, connecteurs officiels et certification de sécurité. |

### Les personas
- **A. Le consultant indépendant.** Seul face au client, sans associé pour le challenger. Il veut un sparring-partner de haut niveau, disponible la veille d'un comité.
- **B. Le contrôleur de gestion ou directeur financier en ETI.** Il croule sous les reportings et doit en tirer des conclusions pour la direction et les régions. Il veut savoir quels KPI suivre, ce qu'ils disent vraiment et quoi recommander.
- **C. Le directeur régional ou responsable de BU.** Débordé, il prépare sa revue mensuelle. Il veut trois priorités claires, un plan d'action et anticiper les réactions de la direction et des équipes.
- **D. L'équipe stratégie ou transformation en grand groupe.** Elle veut sortir des réflexes de l'organisation et challenger un projet avant son passage en comité.

---

## 3. Le type de SaaS

**Un espace de travail métier**, du même type que Harvey pour les avocats, organisé autour de **la mission ou de la situation**, et non autour d'une conversation.

- **L'unité de base, c'est la partie** : une mission ou une situation suivie dans le temps, avec ses documents, ses chiffres, ses acteurs, ses hypothèses, ses décisions et leurs résultats.
- **Ce qui fait rester les clients** : plus on utilise Bishop sur une partie, plus il est pertinent, et plus il est coûteux de partir.
- **Lecture seule, aucune action autonome.** Bishop conseille, l'humain décide et agit. C'est un argument de vente, pas une limite.

### Ce que Bishop n'est pas
| Il n'est pas… | Parce que… |
|---|---|
| Un outil de dashboard ni un « chat avec vos données » | Les éditeurs de BI offrent déjà ce niveau |
| Un lecteur d'écran qui serait la source des chiffres | C'est fragile et inexact, et les services sécurité le bloquent |
| Un générateur de slides | Le marché est saturé (Gamma, Copilot…). Un export propre suffit. |
| Un outil de prévision ou de planification financière | C'est le terrain de Pigment, Anaplan et Workday. Bishop les lit, il ne les refait pas. |
| Un agent qui agit à la place de l'utilisateur | Risque de sécurité et de responsabilité |
| Un outil d'évaluation individuelle des salariés | Usage classé « à haut risque » par l'AI Act, et contraire à l'esprit du produit |
| Un coach en management des personnes | Le budget RH est déjà occupé par Valence, BetterUp et CoachHub |
| Un « board d'IA » à personas multiples sans méthode | Ça existe déjà à 0–29 $ par mois et ça se copie en cinq minutes |

---

## 4. La personnalité : le joueur d'échecs visionnaire

### Principe directeur
**La personnalité est un style de raisonnement, pas un faux humain.** Dans les décisions à fort enjeu, la confiance vient de la démonstration visible, pas du charisme. Une voix charismatique peut même faire accepter de mauvais conseils : Bishop doit donc **toujours montrer son travail**.

### Portrait
Calme, précis, un brin malicieux. Il observe la position, puis pose **le coup qui change la partie**. Son audace vient de la profondeur de calcul, pas de l'imprudence.

### Traits
- **Voit loin** : effets de second et troisième ordre.
- **Change d'échiquier** : déplace la compétition là où l'on est le plus fort.
- **Prophylaxie** : pense à ce que veulent faire les autres acteurs avant son propre plan.
- **Sacrifices calculés** : renoncer à quelque chose pour obtenir une meilleure position.
- **Direct mais élégant** : dit clairement quand un plan est mauvais, sans condescendance.
- **Honnête sur ses limites** : distingue ce qu'il sait, ce qu'il calcule, ce qu'il suppose et ce qu'il parie.
- **Conseiller, pas décideur** : il l'assume explicitement.

### Ce qu'il ne fait jamais
- Une idée spectaculaire sans démonstration.
- Un chiffre inventé ou « lu à l'œil ».
- Une métaphore d'échecs à chaque phrase.
- Du jargon de consultant creux.
- Flatter l'utilisateur ou approuver par défaut.
- Un conseil d'investissement sur des placements financiers (activité réglementée).

### Réglages
- **Registre** : *sobre* par défaut (comités de direction, grands comptes), ou *incarné* (plus de personnalité, pour les indépendants qui le souhaitent).
- **Audace** :

| Niveau | Nom | Comportement |
|---|---|---|
| 1 | **Classique** | Des améliorations solides auxquelles on n'a pas pensé |
| 2 | **Positionnel** *(par défaut)* | Des repositionnements non évidents, défendables en comité |
| 3 | **Gambit** | Des coups audacieux avec un sacrifice assumé, toujours argumentés |

### Exemples de voix
- « Tout le monde regarde la dame. Regardez plutôt ce pion en c5 : c'est lui qui décide de la partie. »
- « Votre plan tient dix coups. Au onzième, il perd. Voici pourquoi. »
- « Ce KPI monte, et c'est précisément ce qui devrait vous inquiéter. »
- « Je joue ce coup avec une confiance moyenne. Voici ce qu'il faudrait vérifier pour le jouer les yeux fermés. »

---

## 5. Le cerveau : la méthode du grand maître

C'est **le cœur du produit**. La recherche montre que l'IA peut produire une idée originale isolée, mais que ses ensembles d'idées se ressemblent, d'un modèle à l'autre comme d'un utilisateur à l'autre. Le génie doit donc venir d'un **processus**, pas d'un ton.

```
 Partie (documents, chiffres, acteurs, historique)
        │
        ▼
 1. LECTURE DE LA POSITION ── Enjeux, acteurs, contraintes, hypothèses implicites,
        │                     non-dits. Chiffres calculés par du code.
        ▼
 2. DIVERGENCE IMPOSÉE ────── Génération large avec des techniques et des angles
        │                     différents, en demandant explicitement des pistes
        │                     éloignées les unes des autres.
        ▼
 3. FILTRE ANTI-BANALITÉ ──── « Un consultant moyen l'aurait-il proposé ? »
        │                     Notation répétée et agrégée (jamais une note unique).
        ▼
 4. VÉRIFICATION ─────────── Cohérence, faisabilité, chiffres, réfutation par
        │                     un avocat du diable. Les coups fragiles sont écartés.
        ▼
 5. LE COUP JOUÉ ──────────── Les coups restent distincts (pas de synthèse « moyenne »
                              qui les dilue), formulés dans la voix de Bishop.
```

### Techniques de divergence
Inversion · Changement d'échiquier · Analogie lointaine (un problème de même structure dans une autre industrie) · Suppression d'une contrainte sacrée · Prophylaxie · Sacrifice · Effets de second ordre · Pre-mortem · Le pion oublié (l'actif sous-estimé).

### Structure fixe d'un coup
1. **Le coup** : l'idée en une phrase.
2. **Pourquoi personne ne le joue** : le biais ou le réflexe qui le rend invisible.
3. **Pourquoi il gagne** : le raisonnement et les trois coups suivants.
4. **Le risque** : ce qui peut mal tourner.
5. **Le test** : comment le valider en deux semaines avec peu de moyens.
6. **Confiance** : faible, moyenne ou forte, et ce qui la ferait monter.
7. **Sur quoi il s'appuie** : les passages du document et les chiffres sourcés.

### Règle d'or des chiffres
**Le modèle d'IA orchestre, il ne calcule jamais et n'est jamais la source d'un chiffre.**
- Les chiffres viennent des **fichiers importés**, puis des **connecteurs officiels**.
- Tous les calculs (écarts, ratios, projections) sont faits **par du code**.
- Chaque chiffre porte un badge : **exact** (source + requête + date), **transcrit** (repris d'un document) ou **estimé** (lu sur une image, signalé comme approximatif).
- La réponse sépare toujours **ce que disent les données**, **ma lecture** et **mon pari**.

---

## 6. Les fonctionnalités signature

| Fonctionnalité | Ce qu'elle fait | Cibles |
|---|---|---|
| **Analyse de la position** | Enjeux réels, angles morts, contradictions, hypothèses fragiles, questions à poser. Disponible aussi en **relecture en un clic** du document ouvert, comme la relecture d'un associé. | Toutes |
| **Le coup inattendu** | Deux ou trois coups non évidents, avec la structure complète et le curseur d'audace | Toutes |
| **Les KPI qui vous mentent** | Audit d'un tableau de bord : indicateurs qui finissent par remplacer l'objectif qu'ils devaient mesurer (*surrogation*), indicateurs retardés sans indicateurs avancés, indicateur sans contrepartie qualité, effets de mix et paradoxe de Simpson, dénominateurs trompeurs. Propose un arbre de KPI et « les trois indicateurs que vous ne suivez pas ». | Pilotage, managers |
| **Revue en trois coups** | Prépare la revue mensuelle ou régionale : trois priorités et un plan d'action prêt à assigner | Pilotage, managers |
| **Le conseil de guerre** | Carte des acteurs tirée des documents, puis simulation des réactions du DG, du directeur financier, du CSE, des équipes, d'un concurrent. Propose des contre-coups. **Présenté comme un scénario raisonné, jamais comme une prédiction.** | Toutes |
| **Le carnet de parties** | Journal des coups proposés, retenus ou rejetés, avec leurs résultats, et des relances à 30, 60 et 90 jours : « Votre hypothèse sur les prix s'est-elle vérifiée ? » | Toutes |
| **Provenance visible** | Badges exact / transcrit / estimé, calculs affichés, sources consultables, refus explicite quand une question sort du périmètre couvert | Toutes |

---

## 7. Architecture

### Les surfaces
| Surface | Rôle | Quand |
|---|---|---|
| **Application web, l'espace de travail** | **Cœur du produit** : parties (missions ou situations), imports (PDF, DOCX, PPTX, Excel, CSV), arbre de KPI, carte des acteurs, carnet de parties, calcul en environnement isolé | MVP |
| **Extension Chrome (panneau latéral)** | **Satellite de capture** : sélection de texte, PDF ouvert, contexte de la page, rapport BI ouvert (lequel, quels filtres), relecture en un clic. Envoie tout vers la partie. **Ne sert jamais de source pour les chiffres.** | MVP, version légère |
| **Export PowerPoint et Excel** | « Revue prête pour le comité » | Étape 2 |
| **Connecteurs BI officiels** | Chiffres exacts, avec l'identité de l'utilisateur pour respecter ses droits d'accès : Power BI d'abord, puis Tableau, Looker, Excel et Google Sheets | Étape 3 |
| **Module Office (Word, Excel, PowerPoint)** | Bishop directement dans les outils des grands comptes | Étape 4 |

### Les couches côté serveur
1. **Contexte** : quel document, quel rapport, quels filtres.
2. **Données** : fichiers importés, puis connecteurs.
3. **Calcul** : du code exécuté dans un environnement isolé, jamais le modèle d'IA.
4. **Jugement** : la méthode du grand maître (§ 5).
5. **Réponse** : la voix de Bishop, la provenance des chiffres, et une vérification que les chiffres de l'écran correspondent à ceux de la source.

### Choix techniques (proposition)
| Brique | Choix |
|---|---|
| Langage | TypeScript partout |
| Application web | React (Next.js ou Vite) |
| Extension | Manifest V3 et API `sidePanel`, permissions minimales (`activeTab`, `sidePanel`) |
| Serveur | Node.js, framework léger (Hono ou Fastify), réponses en streaming |
| Calcul | Exécution de code en environnement isolé (Python ou JS) |
| Modèle IA | Claude de dernière génération, avec un modèle puissant pour le jugement et un plus rapide pour les étapes simples, traité en Europe sans conservation des données |
| Base de données | PostgreSQL, hébergée en Europe |
| Paiement | Stripe |
| Langues | **Multilingue dès le départ** : conception en français, version finale en anglais. Tous les textes de l'interface et les prompts sont externalisés et traduits, pas codés en dur. |

---

## 8. Confiance, sécurité et conformité

- **Lecture seule**, aucune action autonome.
- **Aucun entraînement** de modèle sur les données clients, **conservation minimale** des données, historique supprimable.
- **Traitement en Europe**, avec un contrat de sous-traitance des données (DPA) conforme au RGPD.
- **AI Act** : a priori pas « à haut risque », tant que Bishop n'évalue jamais les salariés individuellement. Bishop indique clairement que l'utilisateur échange avec une IA (article 50, applicable depuis le 2 août 2026).
- **Finance** : le conseil aux entreprises sur leur stratégie, leur structure financière ou une acquisition ne demande pas d'agrément. Bishop ne fait **aucune recommandation sur des placements financiers précis** (domaine réservé aux conseillers en investissements financiers, CIF).
- **Grands comptes, à partir de l'étape 3** : SSO, journal d'audit, certification de sécurité SOC 2 ou ISO 27001, connecteurs qui respectent les droits d'accès de chaque utilisateur.

---

## 9. Modèle économique (hypothèses à valider en entretiens)

| Offre | Cible | Prix indicatif |
|---|---|---|
| **Solo** | Consultant indépendant | 39–59 € par mois |
| **Pro** | Consultant senior, petit cabinet | 99–129 € par mois |
| **Mission** | Consultant en mission : il invite 3 à 5 personnes du client dans la partie | Supplément de 150–250 € par mois et par mission |
| **Manager** | Contrôleur de gestion, directeur régional, responsable de BU | 49–79 € par siège et par mois |
| **Comité / réseau** | Comité de direction, équipe de direction d'un réseau | Licence annuelle forfaitaire (10 à 30 sièges) |
| **Entreprise** | Grands comptes | Sur devis |

- **Garde-fou** : un quota d'analyses approfondies par offre, pour couvrir le coût d'un raisonnement en plusieurs étapes.
- **Mécanique de croissance** : l'offre Mission fait découvrir Bishop aux managers des clients.
- **Canaux** : les plateformes de freelances (Malt Strategy, Catalant, Eden McCallum), l'association des directeurs financiers et contrôleurs de gestion (DFCG) en France, et des licences du cerveau pour des cabinets de conseil de taille moyenne.

---

## 10. Feuille de route

| Étape | Horizon indicatif | Contenu | Critère de passage |
|---|---|---|---|
| **0. Le cerveau** | 0–3 mois | Méthode du grand maître et modules KPI et conseil de guerre, testés hors interface. Banc d'essai d'environ 20 cas « consultants » et 10 cas « managers » (cahiers des charges, revues mensuelles, exports de dashboard), fictifs mais réalistes au départ. | Jugés **à l'aveugle** par des consultants et des contrôleurs de gestion, les coups de Bishop **battent nettement** Claude ou Copilot équipés du meilleur prompt. **Aucun chiffre faux.** |
| **1. L'espace de travail** | 3–6 mois | Application web, imports, calcul isolé, badges de provenance, carnet de parties, extension légère. Bêta fermée avec 10 à 20 consultants, dont 5 en mission de pilotage. | Usage chaque semaine, au moins un coup retenu par mission, aucun incident sur un chiffre |
| **2. Lancement** | 6–12 mois | Offres Solo, Pro et Mission, places invitées pour les clients, Revue en trois coups, exports PowerPoint et Excel. 3 à 5 ETI pilotes, introduites par des consultants. | Des places invitées transformées en sièges payants ; un directeur financier ou un directeur de réseau prêt à payer |
| **3. Socle entreprise** | 12–18 mois | SSO, traitement en Europe sans conservation, DPA, journal d'audit, préparation de la certification, connecteur Power BI, Excel et Google Sheets | Premier contrat Comité ou réseau ; validation par un responsable sécurité (RSSI) |
| **4. Expansion** | 18–30 mois | Connecteurs Tableau et Looker, module Office, tableau de bord de la valeur tiré du carnet de parties, partenariats | Les comptes réseau augmentent leurs dépenses d'une année sur l'autre (rétention nette > 100 %) |

> **Si l'étape 0 échoue face aux assistants généralistes, aucune architecture ne sauvera le produit.** On ne passe pas à l'étape 1 sans cette preuve.

### Signaux à surveiller
- **Pigment (Planner Agent)** et **Looker (Agentic Workflows)** : s'ils sortent des recommandations convaincantes, il faudra accélérer sur ce qu'ils ne voient pas (documents, acteurs, KPI trompeurs).
- **Aily Labs**, **WorkBoard**, **Xavier AI**, **Cigno** : les concurrents les plus proches.
- **Claude in Chrome, Gemini in Chrome, Copilot** : le risque du « je me fais mon propre prompt de stratège ».

---

## 11. Risques principaux

| Risque | Parade |
|---|---|
| Des coups perçus comme banals | Divergence imposée, filtre anti-banalité, banc d'essai à l'aveugle |
| Des coups perçus comme farfelus | Structure fixe avec démonstration, test et confiance ; curseur d'audace ; registre sobre |
| Un chiffre faux | Règle d'or des chiffres, badges de provenance, vérification croisée |
| Une voix charismatique qui fait accepter un mauvais conseil | Démonstration visible, séparation données / lecture / pari, « conseiller, pas décideur » |
| Les utilisateurs préfèrent être flattés | Rendre la contradiction utile et respectueuse ; mesurer la valeur dans le carnet de parties |
| La copie par un simple prompt | Méthode multi-étapes, mémoire de partie, bibliothèque de coups et de pathologies de KPI, données d'usage |
| La dépendance au fournisseur d'IA | Architecture compatible avec plusieurs fournisseurs, propriété des prompts et des données d'évaluation |
| Le refus des services sécurité | Lecture seule, permissions minimales, connecteurs officiels, hébergement européen |
| La dispersion entre deux cibles | Un seul cerveau, une porte d'entrée commerciale à la fois |

---

## 12. Décisions

### Prises
- ✅ Personnalité de **joueur d'échecs visionnaire**, pas de kamikaze.
- ✅ **Finance légère** : stratégie et finance d'entreprise, pas de conseil en placements.
- ✅ **Langues** : conception en français, traduction parfaite en anglais, version finale en anglais.
- ✅ **Bishop, conseiller de direction** : un cerveau commun, les consultants d'abord, puis les managers.
- ✅ **Espace de travail web au centre**, extension Chrome en satellite.
- ✅ Le nom est **reporté** : « Bishop » sert de nom de code. Tempo est écarté (risque de marque élevé).

### Ouvertes
1. **Le nom commercial** : séparer la marque déposée de la voix du personnage ; vérification par un conseil en propriété industrielle.
2. **Les cas de test** : créer des cas fictifs réalistes, et récupérer si possible le dashboard de l'autre discussion.
3. **Les entretiens** : 10 à 15 consultants et contrôleurs de gestion, pour valider les prix et les fonctions prioritaires.
4. **Les comptes à créer le moment venu** : clé d'API Anthropic, Chrome Web Store, Stripe, hébergeur européen.
