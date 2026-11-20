# Buyer and user side of an AI management advisor ("Bishop"): who managers are, how many, how they use KPIs and dashboards, pain points, AI adoption, budgets and buying

Method note: built from web searches (Nov 2026). Direct fetches of bls.gov and grantthornton.fr were blocked in this session (host not allowed). So several figures come from search-result extracts of primary pages, not full-text reads; they are marked "[extract]". Vendor-sponsored studies are flagged. Older data (pre-2024) is flagged.

---

## 1. How many managers / regional managers / BU heads / management controllers (US, UK, France/EU)?

### Takeaway
The core US population is large and well measured: about 3.7M "general and operations managers" plus about 1.1M management analysts (consultants). France has about 23% of employed people classed as cadres (2024). The EU has roughly 10M+ managers (ISCO 1), an inferred figure. No official statistic isolates "regional/area directors of networks" or "contrôleurs de gestion"; those have to be estimated bottom-up.

### Cited Findings
- US: general and operations managers (SOC 11-1021) held about 3.7 million jobs in 2024. Median annual wage was $102,950 (May 2024) and mean wage $133,120 [extract] — [BLS OOH Top Executives](https://www.bls.gov/ooh/management/top-executives.htm); [BLS OEWS May 2024 featured data](https://www.bls.gov/oes/2024/may/featured_data.htm)
- US: the projection table figure is 3,712,900 employed in 2024 (BLS projections, quoted via a secondary blog) — [BLS employment by detailed occupation](https://www.bls.gov/emp/tables/emp-by-detailed-occupation.htm); [rezscore blog](https://blog.rezscore.com/general-operations-management-job-market-2026/)
- US: largest employing industries for general and operations managers are retail trade (12%), professional/scientific/technical services (12%), construction (8%) and wholesale trade (7%) [extract] — [BLS OOH Top Executives](https://www.bls.gov/ooh/management/top-executives.htm)
- US: about 308,700 projected openings per year for general and operations managers (2024-34) — [BLS TED 2026](https://www.bls.gov/opub/ted/2026/projected-job-openings-in-occupations-typically-requiring-a-bachelors-degree-2024-34.htm); [rezscore](https://blog.rezscore.com/general-operations-management-job-market-2026/)
- US consultants proxy: management analysts held about 1.1 million jobs (1,075,100) in 2024. Projected growth is 9% for 2024-34 (a newer entry says 10% for 2025-35) [extract] — [BLS OOH Management Analysts](https://www.bls.gov/ooh/business-and-financial/management-analysts.htm)
- France: 23.0% of employed people were cadres in 2024 (Enquête Emploi). Earlier figures: 21.7% in 2022 and 20.4% in 2020 for "cadres et professions intellectuelles supérieures" — [INSEE, Professions et secteurs d'activité (Emploi, chômage, revenus du travail éd. 2025)](https://www.insee.fr/fr/statistiques/8376826); [INSEE 2022 edition](https://www.insee.fr/fr/statistiques/8305522)
- France: the number of cadres grew by 1.8% in 2024. Apec forecast about 292,600 cadre hires in 2025 (-4% vs 303,400 in 2024) — [Le Journal des Entreprises / Apec](https://www.lejournaldesentreprises.com/article/les-recrutements-de-cadres-devraient-diminuer-de-4-en-2025-selon-lapec-2117054); [France Travail](https://francetravail.fr/employeur/des-conseils-pour-gerer-vos-ress/decryptage-culture-gestion-rh/marche-du-travail-des-cadres--te.html)
- France: the Apec 2024 median salary for all cadres is €54,000 gross per year (via a secondary source) — [houseblend.io](https://www.houseblend.io/articles/fr/marche-emploi-daf-controleur-2025)
- EU: 3.7 million women held managerial positions (ISCO-08) in 2023, when women were 34.8% of managers. In 2024 women held 35.2% of managerial positions. The EU had 197.6M employed people aged 20-64 in 2024 — [Eurostat news 2025-03-05](https://ec.europa.eu/eurostat/web/products-eurostat-news/w/edn-20250305-1); [Eurostat employment 2024](https://ec.europa.eu/eurostat/de/web/products-eurostat-news/w/ddn-20250415-1)
- EU: sales, marketing and development managers had the highest EU job vacancy rate in 2024 (8.4%) — [Eurostat news 2025-12-10](https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20251210-3)
- EU detailed counts sit in Eurostat tables lfsa_egais and lfsa_egai2d (ISCO 2-digit, e.g. 11 chief executives, 12 administrative and commercial managers, 13 production and specialised services managers, 14 hospitality/retail managers). Values were not retrieved — [EIGE mirror of lfsa_egai2d](https://dgs-p.eige.europa.eu/data/information/ta_wrklab_lab_employ_gen__lfsa_egai2d)
- UK: an older Statista figure (2018) gives about 2.4M full-time "managers, directors and senior officials" (SOC major group 1). Flagged as old — [Statista](https://statista.com/statistics/770071/managers-directors-and-senior-officials-employed-uk)
- Ireland (not UK; the "QLF29" series is the Irish CSO): about 238k employed managers, directors and senior officials in Q4 2024, presumed in thousands — [DBnomics CSO QLF29](https://db.nomics.world/CSO/QLF29/QLF29.-.1)

### Inferences
- EU managers (ISCO 1), inferred: 3.7M women at 34.8% share implies about 10.6M managers in the EU in 2023. This is an order of magnitude (about 5% of employment), not an official total. Verify in lfsa_egais.
- France cadres, inferred: 23% of about 30M employed implies about 7M cadres. The total-employment figure is not sourced here; use the INSEE table. Only a fraction are managers with P&L or multi-site responsibility. Apec's "manager vs non-manager" split (Section 4) shows managers are a sizeable sub-group of cadres.
- Serviceable segment for Bishop (multi-site/regional operational managers plus BU heads plus controllers plus consultants): in the US, plausibly a few hundred thousand to about 1M+ "regional/area/district" level managers inside the 3.7M general and operations managers. This is unquantified. Build it bottom-up from network counts (bank branches, retail stores, agencies) times the typical span (about 8-15 sites per area manager), which is an assumption to validate.
- Consultants are a large, reachable early segment (about 1.1M US management analysts) and an individual/SMB buyer.

### Gaps
- No official count of "regional/area managers" or "BU heads" in any country. SOC/ISCO/PCS codes do not isolate them.
- No count of contrôleurs de gestion in France was found (INSEE PCS 3727/"cadres de gestion" or Apec job data would be needed). DFCG publishes no headcount.
- UK 2024 SOC major group 1 count from ONS LFS was not retrieved (Labour Force Survey EMP04 table needed).
- Eurostat absolute 2024 ISCO 1 count was not retrieved.

---

## 2. How managers use KPIs and dashboards in practice (data-rich / insight-poor, dashboard fatigue, unused BI, time on reviews)

### Takeaway
Evidence consistently shows low active BI usage (about 25-29% of employees) that has barely moved in a decade. Workers report feeling overwhelmed by data, and many decision-makers still go with gut feel. The often-quoted "60-70% of dashboards go unused" has no verifiable primary source and should not be used. Good recent data on time spent preparing business reviews is scarce.

### Cited Findings
- BARC/Eckerson (2021, 214 leaders): on average 25% of employees actively use BI/analytics tools, with "minimal growth in the past seven years". Main barriers: lack of training (50%), data quality (41%), budget (36%), ease of use (33%). Pre-2024 — [BI-Survey / BARC](https://bi-survey.com/?p=21462)
- Gartner (as reported by IBM): analytics/BI use grew in 87% of surveyed organizations, but only 29% of employees use it on average. Secondhand; IBM is a BI vendor — [IBM Think](https://www.ibm.com/think/insights/business-intelligence-adoption)
- TDWI (2011): BI adoption "stubbornly flat at 25 percent of employees". Old, but it shows the plateau is structural — [TDWI](https://tdwi.org/Articles/2011/11/29/Impactful-BI-Remains-Elusive.aspx)
- The "60-70% of dashboards unused" claim traces to a social post, not a Gartner publication; flagged as not verifiable — [streamdata blog "The dashboard delusion"](https://sds.apps.streamdata.com/blog/the-dashboard-delusion); [QuestionPro blog](https://www.questionpro.com/blog/why-traditional-bi-dashboards-fail)
- Accenture/Qlik "Human Impact of Data Literacy" (2020, 9,000 employees in 9 countries incl. France, UK, US; sponsored by a BI vendor): 74% of employees feel overwhelmed or unhappy working with data. 48% frequently defer to gut feeling over data-driven insights. Only 37% trust their decisions more when based on data, and only about 20% are fully confident in their data literacy. Companies lose about 43 hours (more than 5 working days) per employee per year to data-related procrastination or sick leave. Older and vendor-sponsored — [Qlik press release](https://www.qlik.com/us/news/company/press-room/press-releases/data-skills-gap-is-costing-organizations-billions-in-lost-productivity); [Report PDF](https://thedataliteracyproject.org/wp-content/uploads/2022/11/QLIK_Accenture_Human_Impact_of_Data_Literacy.pdf); [Computer Weekly (UK 67%)](https://www.computerweekly.com/news/252477186/Data-Literacy-Project-research-finds-UK-workers-putting-off-data-work)
- Manager capacity: about 80% of employees and leaders say they lack the time or energy to do their work (Microsoft WTI 2025, via Petri; Microsoft sells Copilot) — [Petri](https://petri.com/microsoft-2025-work-trend-index-ai-agents/); [Microsoft WTI 2025](https://www.microsoft.com/en-us/worklab/work-trend-index/2025-the-year-the-frontier-firm-is-born)
- Gartner, July 2025 survey of 900 HR leaders: 80% agree managers are overwhelmed by the expanding scope of their responsibilities. A separate April 2025 Gartner figure says 75% of CHROs believe managers are overwhelmed — [Gartner, agentic AI for CHROs](https://www.gartner.com/en/articles/agentic-ai-for-chros); [Gartner abstract](https://www.gartner.com/en/documents/6332079)
- Gartner (May 2025): 26% of managers would prefer not to be a manager if given the choice (via secondary coverage) — [HR Dive](https://www.hrdive.com/news/empower-managers-ai-companywide-adoption/814117/)
- France / finance function: the DFCG observatory (2022) found digitalisation was the priority for over 90% of contrôleurs de gestion, held back by lack of conviction, time and budget. Pre-2024 — [Le Monde Informatique](https://www.lemondeinformatique.fr/actualites/lire-malgre-de-nombreux-freins-la-digitalisation-est-la-priorite-des-controleurs-de-gestion-pour-2022-85237.html)
- PwC/DFCG DAF priorities barometer (Sept 2025): 58% of DAFs plan to enrich their steering models to anticipate better under uncertainty (via Agicap, a vendor; primary not read) — [Agicap](https://agicap.com/fr/article/logiciel-controle-gestion-comparatif/); [PwC Priorités DAF FY25 PDF](https://images.content.pwc.com/Web/PwCGlobal/%7Bcbb8269d-ec94-4b31-8f95-1ee39b9d56fb%7D_FR_FY25_Priorit%c3%a9s_DAF_Downloads.pdf)
- Grant Thornton and Université Paris-Dauphine PSL study on contrôle de gestion, AI and innovation (fieldwork Oct-Dec 2025, more than 1,200 respondents; published 30 March 2026). The detailed results were not retrievable — [Grant Thornton press release PDF](https://www.grantthornton.fr/globalassets/1.-member-firms/france/communiques-presses/2026/2026-03-30_cp_etude_controle_gestion_2026_gt_psl.pdf)

### Inferences
- The "data-rich, insight-poor" problem is well supported. Dashboards reach a minority of staff, and even data users lack confidence interpreting them. That is the gap Bishop's "read my dashboard and tell me what matters" fills: it serves the 70%+ who don't use BI actively, rather than competing with BI.
- Overwhelmed managers (75-80% per Gartner HR surveys) suggest the value proposition should be time-to-insight and review preparation ("prepare my monthly regional review"), not more analytics.

### Gaps
- No credible 2024-2026 quantitative source was found on time managers spend preparing monthly or regional business reviews.
- No BARC "BI Trend Monitor 2025/2026" figures were retrieved. Gartner's primary source for 29% was not located.
- No primary French data (Apec/DFCG) was found on how cadres use dashboards day to day.

---

## 3. KPI pitfalls in multi-site / regional management (for a KPI-advice feature)

### Takeaway
The most authoritative management source on KPI dysfunction is HBR's "surrogation" article: people replace the strategy with the metric, and Wells Fargo's cross-selling metric is the canonical case. It is useful as a content backbone alongside Goodhart's law and leading versus lagging indicators. The counter-argument in MIT SMR, that metrics aren't the culprit and the problem is how they are used, is worth incorporating to avoid an anti-metric stance.

### Cited Findings
- Harris and Tayler, "Don't Let Metrics Undermine Your Business," HBR Sept-Oct 2019: surrogation is the tendency to mentally replace a strategy with the metrics meant to assess it, and it "destroys a lot of value". Wells Fargo "did not have a cross-selling strategy but a cross-selling metric". The remedies are using multiple metrics, involving the people who implement the strategy in shaping it, and loosening the link between metrics and incentives. Afterwards Wells Fargo gauged success with at least a dozen customer-focused metrics. Pre-2024, but a classic reference — [HBR store](https://store.hbr.org/product/don-t-let-metrics-undermine-your-business/R1905C); [NCSU ERM summary](https://erm.ncsu.edu/resource-center/preventing-metrics-from-replacing-your-strategy); [NZ Herald reprint](https://nzherald.co.nz/business/harvard-business-review-dont-let-metrics-undermine-your-business/CAZDM2RW7VDLEB5QTKCAM53DII)
- Counterpoint: MIT Sloan Management Review, "Don't Let Metric Critics Undermine Your Business," argues that blaming measurement for Wells Fargo is "profoundly unserious" and that the issue is governance and incentives — [MIT SMR (proxy link)](https://sloanreview-mit-edu.ezproxy.canberra.edu.au/article/dont-let-metric-critics-undermine-your-business)

### Inferences
- Bishop's "which KPIs mislead" feature could encode several checks.
  - Surrogation/Goodhart risk: a metric tied to incentives in network sales, such as products per customer or calls per day.
  - Lagging versus leading balance: revenue and margin versus pipeline, staffing and NPS.
  - Single-metric dominance: recommend paired metrics (volume plus quality).
  - Mix effects across regions: Simpson's paradox when comparing branch averages.
  - These checks are standard management-control doctrine. Only the HBR/MIT SMR sources were verified in this session.

### Gaps
- No primary source was retrieved for Goodhart's law (Goodhart 1975; Strathern's 1997 formulation), Campbell's law, or leading versus lagging indicator guidance (e.g. Kaplan and Norton's Balanced Scorecard). They are well known but not re-verified here.
- No empirical study was found on KPI dysfunction specifically in multi-site retail, banking or insurance networks.

---

## 4. Managers' adoption of generative AI, needs, fears; trust and accountability

### Takeaway
Managers are heavier AI users than individual contributors. BCG 2025: 78% of managers use AI regularly versus 51% of frontline staff. Apec France 2026: 55% of managers use generative AI weekly versus 47% of non-managers. Managers are also more worried about job loss than before, and training lags demand. Microsoft's WTI frames AI as a "thought partner" (46%), which supports an advisor positioning.

### Cited Findings
- BCG "AI at Work 2025: Momentum Builds, But Gaps Remain" (more than 10,600 workers, 11 countries; BCG is a consulting seller). Findings:
  - 72% of respondents use AI regularly.
  - Managers' regular use rose to 78%; frontline use stalled at 51%.
  - Only 25% of frontline workers say their managers give enough AI guidance.
  - Only 36% feel adequately trained; 54% would use unauthorized tools if needed.
  - Job-loss worry is higher among managers and leaders (43%) than frontline staff (36%).
  - Sources: [BCG publication](https://www.bcg.com/publications/2025/ai-at-work-momentum-builds-but-gaps-remain); [BCG press release 26 June 2025](https://www.bcg.com/press/26june2025-beyond-ai-adoption-full-potential); [Unleash summary](https://www.unleash.ai/artificial-intelligence/bcgs-ai-at-work-2025-report-four-takeaways-for-hr-leaders/)
- BCG 2026 edition, "AI at Work: Why Strategy Matters More Than Tools": reports 74% of frontline employees are now regular AI users (via search extract) — [BCG 2026](https://www.bcg.com/publications/2026/ai-at-work-why-strategy-matters-more-than-tools)
- Microsoft Work Trend Index 2025 (31,000 workers in 31 markets plus M365 telemetry; vendor):
  - 46% see AI as a thought partner and 52% as a command-based tool.
  - Frontier Firm leaders: 71% thriving versus 39% of workers globally; 21% versus 43% worried about AI taking their jobs.
  - Only about 844 of the 31,000 respondents qualify as Frontier Firm workers (per Creative Strategies).
  - Sources: [Microsoft WorkLab](https://www.microsoft.com/en-us/worklab/work-trend-index/2025-the-year-the-frontier-firm-is-born); [Microsoft blog](https://blogs.microsoft.com/blog/2025/04/23/the-2025-annual-work-trend-index-the-frontier-firm-is-born/); [Creative Strategies](https://creativestrategies.com/?p=2834)
- Apec, "Les cadres et l'IA" (June 2025; 2,000 cadres plus 1,000 companies):
  - More than 1 in 3 cadres (about 35%) used generative AI at least weekly; managers 42% versus non-managers 30%.
  - 56% do not hide their use from their employer.
  - Only 24% have been trained, while 72% want training (+12 pts in a year).
  - 37% see AI as an opportunity (+15 pts in 2 years) versus 22% as a threat (-8 pts).
  - Sources: [Apec](https://www.apec.fr/tendances-emploi-cadre/vie-pro-et-carriere/les-cadres-se-saisissent-de-l-intelligence-artificielle.html); [Blog du Modérateur](https://www.blogdumoderateur.com/cadres-ia-2025-taux-utilisation-transparence-impact-metier/); [Centre Inffo](https://www.centre-inffo.fr/site-centre-inffo/les-cadres-et-lia)
- Apec, March/May 2026 update:
  - 50% of cadres use generative AI weekly (vs 35% a year earlier); managers 55% (vs 42%), non-managers 47% (vs 30%).
  - 50% expect a strong AI impact on cadre jobs in general (vs 3 in 10 in 2023); 39% expect it on their own job.
  - Only 8% of companies use AI in cadre recruitment.
  - These come from search extracts of the PDF; verify — [Apec study PDF (Banque des Territoires mirror)](https://www.banquedesterritoires.fr/sites/default/files/2026-05/210526%20-%20Etude%20Apec%20-%20Cadres%20et%20IA.pdf); [Apec, banalisation de l'IA](https://www.apec.fr/tendances-emploi-cadre/evolution-des-metiers-et-competences/la-banalisation-de-l-intelligence-artificielle-va-fortement-impacter-les-cadres.html)
- Gartner HR, on managers and AI:
  - CEOs want wider spans of control and fewer middle-management layers through AI. Gartner HR advises augmenting manager effectiveness instead.
  - Agentic AI often increases managers' cognitive load.
  - By 2028, 75% of organizations that cut middle managers due to AI will rehire at least half of those roles (a prediction, not a fact).
  - Sources: [Gartner](https://www.gartner.com/en/articles/agentic-ai-for-chros); [Gartner abstract](https://www.gartner.com/en/documents/6494771)
- Gartner HR survey (via secondary source): 45% of managers report AI has lived up to their expectations in improving their teams' work — [Clover Infotech summary](https://www.cloverinfotech.com/blog/gartner-hr-survey-reveals-45-of-managers-report-ai-has-lived-up-to-their-expectations-in-improving-their-teams-work/)
- Gartner (via secondary source): only 40% of CIOs guard against AI dulling staff judgment, which is a deskilling and overreliance concern — [MarketScale](https://www.marketscale.com/industries/software-and-technology/gartner-only-40-of-cios-guard-against-ai-dulling-staff-judgment)

### Inferences
- Managers are the early-adopter layer, the target is right, and adoption is moving fast in France (42% to 55% weekly in one year). The training gap (24% trained) suggests Bishop should teach as it advises, explaining why a KPI misleads, which also suits the chess-mentor persona.
- Managers fear their own replacement (43%, BCG) and Gartner flags delayering. Bishop should be positioned as augmenting judgment ("conseiller", not decider) so it doesn't look like a delayering tool, and the manager keeps accountability.

### Gaps
- No 2025-2026 survey was found that measures specifically managers' trust in AI recommendations for operational decisions (e.g. % willing to act on an AI action plan without verification).
- The Microsoft WTI 2026 edition and Cadremploi studies were not retrieved.
- No source was found on legal or accountability concerns (EU AI Act framing for decision support) in this session.

---

## 5. Who buys, budgets per manager, procurement, pilot-to-rollout, price benchmarks

### Takeaway
Seat-price anchors are clear. Microsoft 365 Copilot costs $30/user/month (enterprise; $21 Copilot Business for SMBs). Power BI costs $14 Pro / $24 PPU per user/month since April 2025. AI-first coaching tools publish about $20-40/seat/month, while enterprise coaching platforms (BetterUp, CoachHub, Valence) are quote-only. Enterprise GenAI pilots often stall (MIT NANDA "95%"), and the same report suggests buying from specialised vendors does better than internal builds.

### Cited Findings
- Microsoft 365 Copilot is $30/user/month on an annual commitment ($31.50 monthly) and requires a qualifying M365 license. Copilot Business for organizations of 300 users or fewer costs $21/user/month, with promotional rates around $18 reported — [Microsoft 365 Copilot page](https://www.microsoft.com/en-us/microsoft-365/enterprise/microsoft-365-copilot); [Office Watch](https://office-watch.com/2025/microsoft-365-copilot-business-a-cheaper-ai-add-on-for-small-organizations/); [ITPro](https://www.itpro.com/business/business-strategy/microsoft-signals-end-to-free-ai-offerings-with-new-microsoft-365-copilot-prices)
- Power BI Pro went from $10 to $14/user/month (+40%) and Premium Per User from $20 to $24 (+20%), effective 1 April 2025. Announced 12 Nov 2024, it was the first increase in about 10 years, and M365 E5 includes Pro — [Microsoft Power BI blog](https://community.fabric.microsoft.com/t5/Power-BI-Updates-Blog/Important-update-to-Microsoft-Power-BI-pricing/ba-p/5174341); [The Register](https://www.theregister.com/software/2025/04/02/microsoft-ups-the-price-for-power-bi-pro-by-40-percent/881318)
- AI coaching and management coaching price points (mostly comparison blogs written by competitors; directional):
  - BetterUp, CoachHub and Valence (Nadia, an AI coach in Teams for managers) are quote-only enterprise contracts. One guide puts Valence in a "$10-80/user/mo AI-native" band.
  - Rocky.ai: $19.90/seat.
  - Exec: $20 (Starter) or $39 (Professional) per seat/month, billed annually.
  - Ezra (human coaching) is estimated at $3,000-5,000/user/year.
  - Sources: [Risely pricing guide](https://risely.me/compare/pricing-guide/); [Exec.com](https://www.exec.com/learn/best-leadership-coaching-platforms); [Risely AI coaching platforms](https://risely.me/compare/best-ai-coaching-platforms/); [Stratrix buyer guide](https://www.stratrix.com/buyer-guides/executive-coaching-platforms)
- MIT NANDA, "The GenAI Divide: State of AI in Business 2025" (July 2025; sample variously described as about 150 leaders interviewed or surveyed, 350 employees and 300 public deployments):
  - About 95% of organizations or pilots see no measurable P&L return on $30-40B of enterprise GenAI spend.
  - Causes cited are a "learning gap", brittle workflows, weak contextual learning and misfit with daily operations.
  - Over 50% of GenAI budget goes to sales and marketing.
  - Externally purchased tools reportedly succeed more often than internal builds (via Axios).
  - A single preliminary report; the 95% framing is contested.
  - Sources: [Computing](https://www.computing.co.uk/news/2025/ai/mit-report-95pc-corporate-generative-ai-pilots-fail?itc=refresh); [Virtualization Review](https://virtualizationreview.com/articles/2025/08/19/mit-report-finds-most-ai-business-investments-fail-reveals-genai-divide.aspx); [Tech.co](https://tech.co/news/mit-enterprise-ai-pilots-fail-revenues)
- BCG 2025: 54% would use unauthorized AI tools if company tools are lacking. This shows bottom-up demand and shadow-AI procurement pressure — [BCG](https://www.bcg.com/publications/2025/ai-at-work-momentum-builds-but-gaps-remain)
- Gartner: CEOs push AI for wider spans of control, while CHROs and HR are tasked with manager effectiveness. These are two plausible budget owners with different value narratives (efficiency versus effectiveness) — [Gartner](https://www.gartner.com/en/articles/agentic-ai-for-chros)
- PwC/DFCG 2025: 58% of DAFs plan to enrich steering models, suggesting a CFO/DAF budget line for "pilotage" tools (secondary source) — [Agicap](https://agicap.com/fr/article/logiciel-controle-gestion-comparatif/)

### Inferences
- Pricing corridor: Bishop sits above Power BI ($14-24) and around Copilot ($30), which is the reference "AI per seat" price buyers know. Specialised manager-facing AI tools publish $20-40/seat/month. An advisor that produces regional action plans could plausibly charge $30-80/manager/month, or a per-region or per-network licence for the leadership team. This is a hypothesis to test, not a sourced benchmark.
- Likely buyers by use case:
  - COO / network director: regional performance and action plans.
  - CFO/DAF and the contrôle de gestion team: KPI design and performance reviews. Good fit with the French market's DFCG ecosystem.
  - CHRO / L&D: a manager-effectiveness or "AI coach" budget, competing with BetterUp, CoachHub and Valence.
  - CIO/CDO: gatekeepers for data access (BI connectors) and security review.
  - Consultants are self-buyers (individual or SMB card purchase).
- Pilot-to-rollout risk is high (MIT NANDA). Workflow fit, such as the monthly regional review and the Power BI/Excel export, and contextual memory are cited success factors that Bishop should design for.

### Gaps
- No survey-based figure was found for typical per-manager budget for decision-support, BI or coaching tools, nor for procurement cycle length in mid-market or enterprise.
- No data was found on who formally owns budget for "AI for managers" (COO vs CFO vs CHRO vs CIO).
- No Forrester or Gartner pricing benchmark for AI coaching or AI decision support was retrieved.

---

## 6. Evidence that AI-generated management recommendations improve decisions; failure risks

### Takeaway
The best controlled evidence (Harvard/BCG "jagged frontier", 2023) shows strong gains on tasks inside AI's capability. On a business-analysis task outside it, which combined spreadsheet data with interview notes and is close to Bishop's job, consultants using AI were 19 points less likely to get the right answer. This is direct evidence of over-reliance risk with numbers and qualitative data. Bishop must surface uncertainty and its calculations.

### Cited Findings
- Dell'Acqua et al. (HBS/BCG/Wharton/MIT), "Navigating the Jagged Technological Frontier" (2023, pre-registered randomized field experiment with 758 BCG consultants, about 7% of individual contributors). Pre-2024, but still the reference study. Findings:
  - Inside the frontier, AI users completed 12.2% more tasks, 25.1% faster, with higher quality.
  - On a task outside the frontier, AI users were 19 percentage points less likely to produce correct solutions. Accuracy was 84.5% for the control group, 70.6% with GPT-4 and 60% with GPT-4 plus a prompt-engineering overview.
  - Critics note the time constraints (e.g. 18 tasks in 90 min on the creative portion).
  - Sources: [SSRN working paper (MIT Sloan mirror)](https://mitsloan.mit.edu/sites/default/files/2023-10/SSRN-id4573321.pdf); [Harvard D3 summary](https://d3.harvard.edu/?p=29980); [HackerNoon critique](https://hackernoon.com/only-time-can-defeat-your-chatgpt-loving-office-employees)
- MIT NANDA 2025: enterprise GenAI tools fail when brittle or poorly embedded in workflows and when they lack contextual learning (secondary sources) — [Virtualization Review](https://virtualizationreview.com/articles/2025/08/19/mit-report-finds-most-ai-business-investments-fail-reveals-genai-divide.aspx)
- Gartner: only 40% of CIOs guard against AI dulling staff judgment, a deskilling risk (secondary source) — [MarketScale](https://www.marketscale.com/industries/software-and-technology/gartner-only-40-of-cios-guard-against-ai-dulling-staff-judgment)
- Accenture/Qlik (2020, vendor): 48% of employees default to gut feel over data. Low data literacy means users may not detect a wrong AI number or a misread chart — [Qlik](https://www.qlik.com/us/news/company/press-room/press-releases/data-skills-gap-is-costing-organizations-billions-in-lost-productivity)

### Inferences
- Bishop's core task (reading dashboards, drawing non-obvious conclusions from data plus context) sits close to the "outside the frontier" task in the BCG experiment. Design implications:
  - Show computations and data provenance for each claim.
  - Flag confidence and alternative readings.
  - Ask for confirmation of key numbers read from images or charts.
  - Frame recommendations as hypotheses to test, which fits the chess persona: "candidate moves" with risks.
- Prompt-engineering training worsened accuracy outside the frontier (60% vs 70.6%). That suggests confident framing increases over-reliance, so the persona's confidence must not override uncertainty disclosure.

### Gaps
- No 2024-2026 RCT was found specifically on AI recommendations for operational management decisions (regional action plans, KPI selection).
- No quantified error rates were found for LLMs reading charts or dashboards (chart-QA benchmarks such as ChartQA exist but were not retrieved).
- The study on "GenAI executives forecasting overconfidence" could not be located or verified.
