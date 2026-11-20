# AI features in BI & analytics tools (state 2025-2026): how far do they go from "see" to "explain" to "decide"?

> Research notes for the "Bishop" project (AI management advisor). Date of research: 2026-11-20.
> Level scale used throughout: **L1 = see the numbers** (NL Q&A, chart generation, summaries); **L2 = explain why they moved** (drivers, anomalies, decomposition, narratives); **L3 = decide what to do / spot what nobody saw** (prescriptive recommendations, challenging assumptions, action plans).
>
> **Method caveat (important for the report writer):** in this session only the web *search* tool worked; direct page fetches failed (learn.microsoft.com, tellius.com, datatako.com were not reachable from the sandbox network). All findings below therefore come from search-result syntheses of the cited pages, not from full reads of them. Many pricing figures come from third-party blogs (often written by competing vendors) and conflict with each other; conflicts are flagged. Figures should be re-checked on vendor pages before being quoted in a client deliverable.

## Q1. Microsoft Power BI Copilot / Fabric data agents: capabilities, licensing (F64/P1 vs F2), adoption, accuracy complaints

### Takeaway
Power BI Copilot is a solid L1 tool (Q&A over a semantic model, report page generation, DAX writing, narrative summaries) with some L2 (summaries of what changed); it does not recommend decisions. The capacity floor was lowered from F64/P1 to any paid F2+/P1+ capacity in 2025 (a "Fabric Copilot capacity" lets Pro/PPU users bill against it), so cost is no longer the main barrier; accuracy, nondeterminism and semantic-model preparation are.

### Cited Findings
- **Licensing:** Copilot in Power BI requires the workspace to be on paid Fabric F2+ or Power BI Premium P1+; a Pro or PPU licence alone does not enable it; trial SKUs/capacities are not supported — [Microsoft Learn, Enable Fabric Copilot for Power BI](https://learn.microsoft.com/en-us/power-bi/create-reports/copilot-enable-power-bi) (via search snippet; page ~6 months old at research time); also [Data Bear 2026 setup guide](https://databear.com/enable-copilot-power-bi/), [zapai.io](https://zapai.io/copilot-in-power-bi/).
- One blog dates the F2 floor to **28 April 2025**, replacing the earlier F64 requirement — [Lilach Bullock](https://www.lilachbullock.com/copilot-in-power-bi/) / [kanerika](https://kanerika.com/blogs/power-bi-copilot/) (search synthesis; exact date not confirmed on Microsoft's page). Several older/third-party pages still state "P-SKU or F64 or above" — e.g. as cited in [querio.ai comparison](https://querio.ai/articles/power-bi-copilot-vs-tableau-pulse-enterprise-ai-bi-compared) — these are outdated.
- **Fabric Copilot capacity:** an organisation can designate an F2+/P1+ capacity as "Fabric Copilot capacity" and assign Pro and PPU users to it so their Copilot usage (incl. in Power BI Desktop and Pro/PPU workspaces) is billed there — [Microsoft Learn](https://learn.microsoft.com/en-us/power-bi/create-reports/copilot-enable-power-bi); [Microsoft Q&A](https://learn.microsoft.com/en-us/answers/questions/6076326/power-bi-pro-to-fabric-for-copilot-use).
- **Fabric data agents:** most sources say they run on any paid F2+/P1+ capacity and are GA; one blog claims F64 + Microsoft 365 Copilot licences are needed — the M365 Copilot licence only applies when the agent is surfaced inside M365 Copilot / Copilot Studio, so the F64 claim looks like an outlier — [datatako: Copilot vs Fabric data agents](https://datatako.com/blog/power-bi-copilot-vs-fabric-data-agents); [datatako: Does Copilot need F64?](https://datatako.com/blog/power-bi-copilot-f64-capacity-cost).
- **Adoption signal (platform, not Copilot specifically):** Microsoft reported **35,000 paid Fabric customers (+60% YoY)** at FY26 Q3 (April 2026) and **over 40,000 paid Fabric customers (+60% YoY)** at FY26 Q4 (July 2026); OneLake data stored grew nearly 4x YoY — [Microsoft FY26 Q3 transcript](https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/TranscriptQandAFY26Q3); [Futurum Q3 FY26](https://www.futurumgroup.com/insights/microsoft-q3-fy-2026-earnings-show-cloud-growth-with-capacity-still-tight/); [Futurum Q4 FY26](https://futurumgroup.com/insights/microsoft-q4-fy-2026-ai-demand-accelerates-azure-and-enterprise-growth/).
- Microsoft named a Leader in the 2025 Gartner MQ for ABI platforms (June 2025) — [Power BI blog](https://powerbi.microsoft.com/en-us/blog/microsoft-named-a-leader-in-the-2025-gartner-magic-quadrant-for-analytics-and-bi-platforms/).
- **Accuracy complaints:**
  - Fabric Community user: Copilot is generally accurate when it computes itself, but "occasionally pulls answers from existing report visuals, which can be incorrect"; a moderator doubted it can be fully prevented and suggested prompting it to calculate from the dataset — [Fabric Community, "Copilot response not correct"](https://community.fabric.microsoft.com/discussions/power-bi-web-app/copilot-response-not-correct/4740572).
  - Microsoft's own guidance (as quoted): "without preparation, Copilot can misinterpret the data and return generic or inaccurate results"; behaviour is nondeterministic (same question can give different answers) — cited via [easyinsight.co.uk](https://easyinsight.co.uk/insights/copilot-in-power-bi) and [diyai.io review](https://diyai.io/ai-tools/data-analytics/reviews/power-bi-copilot-review/).
  - BI director review (May 2026): Copilot writes DAX measures that "compile and look right but return wrong numbers" (wrong column or aggregation); teams need someone able to validate every measure; claims documented configurations where Copilot can bypass row-level security (unverified secondhand claim) — [Blue Dawn Tech](https://bluedawntech.com/blog/2026-05-14-honest-review-of-power-bi-copilot-from-a-bi-director.html).
  - Explainer: Copilot matches words in the question to column names / page titles / chart labels rather than understanding meaning — [m365.fm](https://www.m365.fm/show/episodes/power-bi-copilot-simply-explained/).
  - Vendor-biased critiques (competitors): [Colrows, "Why Power BI Copilot delivers wrong answers"](https://colrows.com/blogs/power-bi-copilot-wrong-answers/); [Wordnerds](https://wordnerds.ai/cx-corner/power-bi-is-marmite/).

### Inferences
- Level reached: **L1 strong, L2 partial** (summaries/narratives of report pages; "why" depends on the semantic model and the user's prompt). No evidence of L3 (prescriptive) features in Power BI Copilot.
- The F2 floor means a mid-size retail/bank network with Power BI Pro can access Copilot for a few hundred dollars/month of capacity — the barrier for Bishop's target users is quality and trust, not access.
- Copilot's reliance on report visuals and nondeterminism is directly relevant to Bishop reading dashboards "in the browser": reading rendered visuals is exactly the mode Microsoft users report as error-prone, so Bishop should cross-check totals or flag uncertainty.

### Gaps
- No published count of Power BI Copilot users/tenants found (only Fabric customer counts).
- Exact Fabric F-SKU monthly prices and Copilot CU consumption rates not retrieved (Microsoft pricing page not reachable).
- No r/PowerBI threads surfaced by search; Reddit sentiment not captured.

## Q2. Tableau Pulse, Tableau Agent / Tableau Next, Salesforce Agentforce analytics

### Takeaway
Tableau Pulse is the most mature "proactive digest" product (L2: metric monitoring, personalised digests, "likely driver" explanations). Tableau Next (announced 2025, "agentic analytics platform") adds agents (Concierge for Q&A, Inspector for proactive anomaly alerts, Data Pro for prep) and links to Salesforce actions/workflows — the closest a major BI vendor gets to L3 is "insight → trigger an action in Salesforce", not strategic recommendation.

### Cited Findings
- Salesforce pitched Tableau Next as "the world's first agentic analytics platform" — [Cresta news / Salesforce coverage](https://cresta.com/news/salesforce-unveils-tableau-next-agentic-analytics-platform); [CX Today, 5 talking points](https://www.cxtoday.com/customer-analytics-intelligence/salesforce-unveils-tableau-next-5-big-talking-points/).
- **Concierge:** natural-language questions answered with visuals, showing reasoning behind the agent's actions and the semantic data source. **Inspector:** proactive alerts on key data trends; one source lists it as anomaly alerting in beta; another says it flags anomalies but does not decompose drivers — [jitendrazaa Tableau AI guide](https://www.jitendrazaa.com/blog/salesforce/tableau-ai-complete-guide-features-pricing-power-bilooker/); [Hex, Best AI BI tools 2026](https://hex.tech/blog/ai-bi-tools/) (Hex is a competitor).
- **Pricing:** Salesforce's Tableau Next FAQ states pricing is now **role-based**, with consumption pricing (Flex credits) removed for data queries, transforms and agentic analytics, although Data Services/Flex credits "may still apply"; an older article described per-agent-action billing (outdated) — [Salesforce Tableau Next](https://www.salesforce.com/analytics/tableau-next/); [proquestit (older)](https://proquestit.com/insights/tableau-next-analytics-ai/).
- Third-party price points: ~$40/user/month standalone for Tableau Next; Tableau+ Enterprise Creator ~$115/user/month plus Agentforce/Data Cloud credits; Salesforce publishes no standalone figure — [usedatabrain](https://www.usedatabrain.com/blog/tableau-embedded-analytics-pricing); [Tableau pricing page](https://www.tableau.com/pricing).
- Tableau Next licences are included in Salesforce Core/Advanced/Max editions of Sales, Service and Industry Clouds and in Agentforce for Sales/Service/Industries — [Salesforce Tableau Next](https://www.salesforce.com/analytics/tableau-next/).
- One source says "Agentforce for Analytics" was renamed "Tableau Agent" in July 2026; dates inconsistent across sources — search synthesis of [jitendrazaa](https://www.jitendrazaa.com/blog/salesforce/tableau-ai-complete-guide-features-pricing-power-bilooker/) (unverified).
- **Tableau Pulse:** monitors metrics defined by data stewards, delivers personalised daily digests, flags whether a metric is trending up/down/anomalous and explains the likely driver — [aiagentsquare Tableau AI review 2026](https://aiagentsquare.com/blog/tableau-ai-review-2026). Included with Tableau Cloud; **Cloud-only** (Tableau Server customers must migrate) — [thinklytics](https://thinklytics.com/insights/tableau-pulse-vs-power-bi-copilot-2026).
- **Adoption:** "Pulse has already been adopted by 5,000 customers, according to Tableau" — [TechTarget](https://www.techtarget.com/searchbusinessanalytics/news/366582836/Tableau-adds-generative-AI-tools-tightens-Databricks-bond) (**dated: ~2024**).
- Salesforce (Tableau) is a Leader in the 2025 Gartner ABI MQ — [CX Today rundown](https://www.cxtoday.com/customer-analytics-intelligence/gartner-magic-quadrant-for-analytics-and-business-intelligence-abi-platforms-2025-the-rundown/).

### Inferences
- Level: **Pulse = L2** (push digest + driver), **Tableau Next = L2 with action hooks** (agentic workflow inside Salesforce). The "do something" layer is operational (open a case, notify an owner), not managerial judgment ("close these 3 branches, reallocate staff").
- Pulse's metric-centric design (steward-defined metrics) is the opposite of Bishop's proposal to *question which KPIs to track*: Pulse assumes the KPI set is right.

### Gaps
- No current (2025-2026) Pulse or Tableau Next customer counts found.
- No independent accuracy evaluations of Concierge/Inspector found.

## Q3. Looker + Gemini (Conversational Analytics), Google

### Takeaway
Looker's Conversational Analytics (GA reportedly Nov 2025) with business-unit "data agents" grounded in the LookML semantic layer, plus a Python "Code Interpreter / Advanced Analytics" mode for forecasting and anomaly detection, reaches L1-L2. No prescriptive features documented.

### Cited Findings
- Conversational Analytics data agents are "specialized, standalone data analytics agents designed for specific business units" — [Google Cloud docs, data agents in Looker](https://cloud.google.com/looker/docs/studio/conversational-data-agents-looker); [Conversational Analytics overview](https://docs.cloud.google.com/looker/docs/conversational-analytics-overview).
- Code Interpreter (renamed "Advanced Analytics") translates NL questions into Python for advanced analysis/visuals, positioned for forecasting and anomaly detection; Google warns responses "might have more variability than the core experience"; release notes call it GA but still require the Trusted Tester Features setting — [Looker Studio Code Interpreter docs](https://docs.cloud.google.com/looker/docs/studio/conversational-analytics-looker-studio-code-interpreter); [Looker release notes](https://docs.cloud.google.com/looker/docs/release-notes).
- Limit: Conversational Analytics returns max 5,000 rows per query on Looker data — [Google docs (search synthesis)](https://docs.cloud.google.com/looker/docs/conversational-analytics-overview).
- Third-party guide: Conversational Analytics GA since November 2025; Advanced Analytics GA 7 May 2026; dashboard agents GA October 2026 (not verified on Google's pages) — [querio.ai Looker AI features](https://querio.ai/articles/looker-ai-features-natural-language-query-gemini-2025-2026).
- Conversational Analytics API lets developers use these agents as "tools" for an orchestrator agent via Google's Agent Development Kit — [Google Cloud blog](https://cloud.google.com/blog/products/data-analytics/understanding-lookers-conversational-analytics-api).
- Google is a Leader in the 2025 Gartner ABI MQ (one blog lists Looker as Visionary — conflicting) — [CX Today rundown](https://www.cxtoday.com/customer-analytics-intelligence/gartner-magic-quadrant-for-analytics-and-business-intelligence-abi-platforms-2025-the-rundown/); [MQ PDF excerpt](https://img.impactotic.co/wp-content/uploads/2025/07/04032055/Gartner-Magic-Quadrant-BI-2025.pdf).

### Inferences
- Level: **L1-L2**. The API/agent-as-tool architecture means Looker could become a data source *for* an advisor like Bishop rather than a competitor at L3.

### Gaps
- Looker/Gemini pricing (Gemini in Looker included vs add-on) not found.
- No adoption numbers or independent accuracy data found.

## Q4. Other platforms: Qlik, ThoughtSpot Spotter, Domo, Sisense, Strategy (MicroStrategy) Mosaic, Databricks Genie, Snowflake Intelligence/Cortex Analyst, Amazon Quick Suite/QuickSight

### Takeaway
Every major vendor shipped NL Q&A agents in 2025-2026 (L1), most add driver/anomaly detection (L2), and several brand themselves "agentic". Prescriptive output is limited to forecasting/what-if (Qlik Predict) or workflow automation (Domo agents, Qlik Discovery Agent). Warehouse-native agents (Genie, Snowflake Intelligence) are cheap/bundled, which commoditises L1.

### Cited Findings
**Qlik**
- Qlik Answers (agentic) is priced by number of questions; no extra cost for structured-data questions or task automation — [Qlik Answers Agentic Analytics FAQ](https://community.qlik.com/t5/Official-Support-Articles/Qlik-Answers-Agentic-Analytics-FAQ/ta-p/2542617).
- Qlik AI/ML pricing page lists 25,000 questions/month and 50,000 pages indexed (capacity add-on); plan pages show 25 questions on the lowest AI tier and 1,000 on higher tiers (conflicting granularity) — [Qlik AI/ML pricing](https://www.qlik.com/us/pricing/ai-ml-products-pricing); [Qlik Cloud plans](https://www.qlik.com/us/da/pricing).
- **Discovery Agent** requires Premium or Enterprise subscription — [Qlik Discovery Agent FAQ](https://community.qlik.com/t5/Official-Support-Articles/Qlik-Discovery-Agent-FAQ/ta-p/2544873); launch coverage: [TechTarget](https://www.techtarget.com/searchbusinessanalytics/news/366638938/Qlik-launches-agentic-experience-to-fuel-AI-powered-analysis); [Qlik Community, Introducing Agentic AI](https://community.qlik.com/t5/Support-Updates/Introducing-Agentic-AI-with-Qlik/ba-p/2542349).
- **Qlik Predict** (AutoML/predictive): "no limits for the amount of models you can train, only the number of models you choose to deploy"; Premium/Enterprise feature — [Qlik plans](https://www.qlik.com/us/da/pricing).
- Prices: Qlik Standard listed at $825/month on Qlik's page; Holistics (older) cites Starter $300/month and Premium $2,750/month — [Qlik pricing](https://www.qlik.com/us/da/pricing); [Holistics Qlik pricing](https://www.holistics.io/blog/qlik-sense-pricing/).
- Analyst view on Qlik's "production-grade agentic AI" bet — [Moor Insights & Strategy](https://moorinsightsstrategy.com/research-notes/qliks-bet-on-production-grade-agentic-ai/).

**ThoughtSpot**
- Spotter = conversational agent; SpotterViz builds Liveboards from a prompt; SpotterModel and SpotterViz were early access; SpotterCode = developer assistant via MCP in Cursor/VS Code — [upsolve.ai Spotter review](https://upsolve.ai/blog/thoughtspot-spotter) (competitor); [Holistics alternatives](https://www.holistics.io/blog/thoughtspot-alternatives/).
- Pricing (third-party): Essentials $25/user/month (5-50 users, 25M rows); Pro $50/user/month; Enterprise custom — [TechHarry](https://www.techharry.com/2026/09/thoughtspot-review-ai-data-visualization-software.html); [Draxlr](https://www.draxlr.com/blogs/thoughtspot-alternatives-2026/); Spotter on Pro is metered at **25 queries/user/month** with overage; unlimited Spotter is an add-on/Enterprise — [Valiotti Spotter review](https://valiotti.com/thoughtspot-spotter-review-2026/); [agentsql](https://agentsql.com/thoughtspot-pricing). Sources conflict on whether Essentials includes Spotter.
- Contract size: median annual contract ~$92.5k-100k (Vendr data cited by Holistics); another analysis says average ~$137k — [Holistics](https://www.holistics.io/blog/thoughtspot-alternatives/) (conflicting figures).
- ThoughtSpot a Leader in 2025 Gartner ABI MQ, positions itself as "Agentic Analytics Platform" company — [GlobeNewswire](https://www.globenewswire.com/news-release/2025/06/18/3101691/0/en/ThoughtSpot-Named-a-Leader-in-the-2025-Gartner-Magic-Quadrant-for-Analytics-and-BI-Platforms.html).

**Domo**
- Agent Catalyst (GA) lets customers build GenAI agents by choosing an LLM and connecting enterprise data; at Domopalooza Domo also unveiled automated insight generation, "AI Agent Tasks" to execute processes with agents, and GenAI data transformation — [TechTarget](https://www.techtarget.com/searchbusinessanalytics/news/366621048/Domo-unveils-agentic-AI-toolkit-to-simplify-development).
- An AI Agent Builder and MCP server reported in March 2026 — [Galaxy 2026 comparison](https://www.getgalaxy.io/articles/best-business-intelligence-analytics-platforms-2026) (unverified).
- Domo = Challenger in 2025 Gartner ABI MQ, credited for its AI agent strategy — [CX Today](https://www.cxtoday.com/customer-analytics-intelligence/gartner-magic-quadrant-for-analytics-and-business-intelligence-abi-platforms-2025-the-rundown/).

**Sisense**
- Sisense Intelligence (May 2025): NLQ assistant, narrative generation, GenAI via SDK; required customers to bring their own LLM key at launch — [Galaxy 2026](https://www.getgalaxy.io/articles/best-business-intelligence-analytics-platforms-2026).

**Strategy (ex-MicroStrategy)**
- Strategy Mosaic ("AI-powered universal intelligence layer" / semantic layer) GA announced 24 June 2025; exposes SQL (JDBC), DAX, REST and Python access for third-party tools — [Strategy press release](https://www.strategy.com/press/strategy-announces-general-availability-of-strategy-mosaic-the-ai-powered-universal-intelligence-layer_06-24-2025); [Strategy blog](https://software.strategy.com/blog/strategy-launches-the-worlds-first-universal-intelligence-layer).
- September 2025 release pairs Mosaic with **Auto Agent**, Auto Dashboard — [Strategy Sept 2025 release](https://software.strategy.com/blog/september-2025-release-reimagining-ai-powered-analytics).
- MicroStrategy = Visionary in 2025 Gartner ABI MQ — [CX Today](https://www.cxtoday.com/customer-analytics-intelligence/gartner-magic-quadrant-for-analytics-and-business-intelligence-abi-platforms-2025-the-rundown/).

**Databricks AI/BI Genie**
- Genie GA on all clouds alongside AI/BI Dashboards; "no additional licenses for Databricks SQL customers" — [Databricks blog](https://www.databricks.com/blog/aibi-genie-now-generally-available).
- Pricing page: Genie "starting at $0.07/DBU beyond free usage"; third parties say Genie One/Genie Agents free through 31 Jan 2027 — [Databricks pricing](https://www.databricks.com/product/pricing); [agentsql](https://agentsql.com/blog/databricks-genie-pricing) (free-period end date secondary-sourced).

**Snowflake Intelligence / Cortex Analyst**
- Snowflake Intelligence GA 4 November 2025; one source says since renamed "Snowflake CoWork" (unverified) — [ecorpit](https://ecorpit.com/databricks-genie-vs-snowflake-cortex-analyst-cost-2026/).
- Cortex Analyst billed ~67 credits per 1,000 messages via Analyst API; Cortex Agents billed on tokens (AI Credits ~$2 global / $2.20 regional) — [finout](https://www.finout.io/blog/snowflake-cortex-pricing); [ecorpit](https://ecorpit.com/databricks-genie-vs-snowflake-cortex-analyst-cost-2026/) (secondary).
- "Nobody publishes accuracy" for AI data analyst tools — [Colrows](https://colrows.com/blogs/ai-data-analyst-tools/) (vendor).

**Amazon QuickSight / Quick Suite**
- QuickSight list: Reader $3, Reader Pro $20, Author $24, Author Pro $40 /user/month; $250/month account fee once any Pro user or Q&A is enabled — [agentsql](https://agentsql.com/quicksight-pricing); [luzmo](https://www.luzmo.com/blog/quicksight-pricing).
- Amazon Quick (Quick Suite) plans reportedly $0-100/user across five tiers (Quick Professional $20, Quick Enterprise $40); QuickSight Authors get Quick Enterprise free until 31 Dec 2026 — [agentmarketplace.ai](https://agentmarketplace.ai/blog/amazon-quick-suite-vs-quicksight-pricing) (single source, treat with caution).
- AWS = Challenger in 2025 Gartner ABI MQ — [CX Today](https://www.cxtoday.com/customer-analytics-intelligence/gartner-magic-quadrant-for-analytics-and-business-intelligence-abi-platforms-2025-the-rundown/).

**Gartner 2025 ABI MQ (June 2025)** — Leaders: Microsoft, Salesforce (Tableau), Google, Qlik, Oracle, ThoughtSpot; Challengers: Alibaba Cloud, AWS, Domo; Visionaries: SAP, SAS, Tellius, Pyramid Analytics, IBM, MicroStrategy — [CX Today](https://www.cxtoday.com/customer-analytics-intelligence/gartner-magic-quadrant-for-analytics-and-business-intelligence-abi-platforms-2025-the-rundown/); [Oracle blog](https://blogs.oracle.com/analytics/oracle-analytics-gartner-abi-platforms-mq-leader-2025).

### Inferences
- Summary level map (inferred from features above):
  - Power BI Copilot / Fabric data agents: L1 strong, L2 partial.
  - Tableau Pulse: L2 (push digests + drivers). Tableau Next: L2 + operational action hooks.
  - Looker Conversational Analytics: L1-L2 (+ forecasting via Python).
  - Qlik Answers/Discovery Agent/Predict: L1-L2, predictive/what-if = edge of L3.
  - ThoughtSpot Spotter: L1-L2 (search heritage; driver analysis).
  - Domo: L1 + workflow automation agents.
  - Sisense, Strategy Auto: L1-L2.
  - Databricks Genie, Snowflake Intelligence, Amazon Quick: L1 (warehouse/cloud-native, near-free) with some L2.
- The L1 layer is being commoditised by warehouse vendors (Genie free until 2027, Snowflake per-message pricing), which pushes differentiation toward L2/L3 and toward domain judgement — Bishop's intended space.

### Gaps
- No independent accuracy benchmarks for any of these agents found (Colrows notes vendors don't publish accuracy).
- Domo, Sisense, Strategy AI pricing not found.
- Oracle Analytics / SAP Analytics Cloud (Joule) not covered in this pass.

## Q5. AI data analyst startups: features, funding and traction

### Takeaway
The startup layer (Julius, Hex, Fabi.ai, Zenlytic, Tellius, Pyramid…) is mostly L1-L2 for analysts; Tellius is the one that explicitly markets "next-best-action" recommendations (vertical: pharma). Funding is modest except Hex ($70M Series C) and Pyramid (acquired by ServiceNow, Feb 2026).

### Cited Findings
- **Julius AI** ("AI data analyst"): $10M seed led by Bessemer, with Horizon VC, 8VC, Y Combinator, AI Grant (July 2025) — [TechCrunch](https://www.techcrunch.com/2025/07/28/ai-data-analyst-startup-julius-nabs-10m-seed-round/); total funding ~$10.5M per [Sacra](https://sacra.com/c/julius/) vs $14.5M per [StartupIntros](https://startupintros.com/orgs/julius-ai) (conflict); users "over 2 million" vs "over 20 million" in different reports (conflict) — [Sacra](https://sacra.com/c/julius/); [aimmediahouse](https://aimmediahouse.com/ai-startups/10m-for-julius-ais-push-to-make-data-analysis-conversational).
- **Hex** (notebooks + Magic AI / Threads conversational): $70M Series C, May 2025, led by Avra with a16z, Amplify, Box Group, Redpoint, Sequoia, Snowflake Ventures; total ~$170M+ (unverified) — [BigDATAwire](https://www.hpcwire.com/bigdatawire/this-just-in/hex-lands-70m-to-advance-data-science-and-analytics-with-ai/); [rfp.wiki](https://www.rfp.wiki/artificial-intelligence/analytics-business-intelligence-platforms/agentic-analytics/hex/sigma-computing).
- **Fabi.ai:** $3M seed (July 2023; Eniac Ventures, Outlander VC, Recall Capital); ~$3M revenue with 8 people in 2025 (Latka, self-reported-type data) — [Tracxn](https://tracxn.com/d/companies/fabiai/__shy4w30yo6DVz239bWOdoTD_9WUduW88VSKL3COD_U4); [PitchBook](https://pitchbook.com/profiles/company/527344-57); [Latka](https://getlatka.com/companies/fabi.ai/funding).
- **Pyramid Analytics:** acquired by ServiceNow (announced; PitchBook close date 12 Feb 2026, undisclosed price); prior funding $236.5M-$250M, last round $50M Series E Nov 2024 (BlackRock) — [TalkMarkets](https://talkmarkets.com/article/cloud-stocks-servicenow-goes-on-an-acquisition-spree-in-israel-1772736388); [PitchBook](https://pitchbook.com/profiles/company/56328-94); [Tracxn](https://tracxn.com/d/companies/pyramid-analytics/__Y6j1SmG3H01B6F-uQZJPGDU26mD5KE3C-jjd5q9cuMI).
- **Sigma Computing:** historical raises $300M (Dec 2021, Reuters) and a later $200M (TechTarget); no 2025 round confirmed — [Wikipedia](https://en.wikipedia.org/wiki/Sigma_(analytics_company)).
- **Tellius:** Visionary in Gartner 2025 ABI MQ — [CX Today](https://www.cxtoday.com/customer-analytics-intelligence/gartner-magic-quadrant-for-analytics-and-business-intelligence-abi-platforms-2025-the-rundown/). Features: see Q6.

### Inferences
- The startups mostly target analysts (SQL/Python notebooks, ad-hoc questions), not operational managers reading a regional dashboard; a manager-facing "advisor with opinions" is not the dominant positioning.

### Gaps
- Funding/traction for Zenlytic (Zoë), Upsolve, Basedash, DataGPT, Narrative BI, Akkio, Tellius (recent), Sigma (2025) **not found** in this pass.

## Q6. Do any tools produce prescriptive recommendations ("what to do"), challenge assumptions, or propose non-obvious actions? Quality?

### Takeaway
Prescriptive output is rare and narrow. Tellius is the clearest vendor claiming agentic "diagnose → recommend next-best actions with confidence", mostly in pharma commercial use cases; Tableau Next and Domo/Qlik offer "act" as workflow automation; forecasting/what-if exists (Qlik Predict, Looker Advanced Analytics). No evidence found of any BI tool that *challenges the KPI set or the manager's assumptions* or proposes non-obvious strategic actions — that L3 "visionary" space appears unoccupied.

### Cited Findings
- Tellius materials: agents "orchestrate multi-step analysis, diagnose problems, and recommend next actions"; agent flow decomposes trend → drivers → peer benchmarks → what-if, then "recommending next-best actions with confidence and prerequisites"; positioned as a "next-best-action engine purpose-built for pharma commercial teams" — [Tellius AI analytics blog](https://www.tellius.com/resources/blog/ai-analytics); [Tellius pharma field sales](https://www.tellius.com/pharma/field-sales); [Tellius NBA in pharma](https://www.tellius.com/resources/blog/ai-for-next-best-action-in-pharma-why-most-programs-fail-and-what-actually-works) (vendor self-description).
- In a Tellius-authored comparison, Pyramid is rated "partial" on root-cause discovery, "full" on predictive AI, "none" on deep agentic workflows; Domo "no" insight discovery / deep agentic workflows, "partial" alerting — [Tellius augmented analytics comparison](https://www.tellius.com/resources/blog/best-augmented-analytics-platforms-in-2026-12-tools-compared-for-automated-insight-discovery-governance-and-analytical-depth) (vendor-biased); G2 describes Domo as offering "predictive analytics and actionable recommendations" — [G2](https://www.g2.com/products/tellius/competitors/alternatives) (conflict).
- Tableau Next connects insights to Salesforce workflows/actions (agentic "analytics closer to action") — [proquestit](https://proquestit.com/insights/tableau-next-analytics-ai/); [Salesforce](https://www.salesforce.com/analytics/tableau-next/).
- Domo "AI Agent Tasks to execute processes with agents" — [TechTarget](https://www.techtarget.com/searchbusinessanalytics/news/366621048/Domo-unveils-agentic-AI-toolkit-to-simplify-development).
- Gartner's 2025 ABI MQ coverage found did not frame the market around prescriptive/decision intelligence; "agentic" language comes from vendors — [CX Today](https://www.cxtoday.com/customer-analytics-intelligence/gartner-magic-quadrant-for-analytics-and-business-intelligence-abi-platforms-2025-the-rundown/).

### Inferences
- "Next-best-action" in BI = narrow, repeatable operational choices (which HCP to call, which account to prioritise), not managerial decisions (reallocating regional budgets, questioning the KPI system). Quality evidence is vendor-only.
- Bishop's differentiation hypothesis (L3: challenge KPIs that mislead, draw non-obvious conclusions, propose per-region action plans with a strong point of view) is not covered by any vendor product found. Risk: vendors avoid L3 because of liability and accuracy concerns — Bishop must handle "confidently wrong" carefully (show reasoning, flag data quality).

### Gaps
- No independent evaluation of the *quality* of any prescriptive BI recommendation found.
- No product found that explicitly "challenges assumptions" or critiques KPI choice — could exist in niche decision-intelligence vendors (Aera Technology, Peak, Pace Revenue, etc.), not searched here.

## Q7. Known failure modes (wrong numbers, hallucinated insights) and "dashboard fatigue" surveys

### Takeaway
Failure modes are well documented anecdotally (wrong DAX, answers pulled from visuals, nondeterminism, need for curated semantic models) but no vendor publishes accuracy. The most defensible adoption stat is BARC/Eckerson: ~25% of employees actively use the BI tools bought, flat for years; the popular "60-80% of dashboards unused" figure is weakly sourced.

### Cited Findings
- BARC + Eckerson Group survey of 214 data & analytics leaders: on average ~25% of employees actively use their company's BI tools; figure has barely moved in seven years — cited by [streamdata "Dashboard Delusion"](https://streamdata.com/blog/the-dashboard-delusion) and [fusedash](https://fusedash.ai/blog/post/why-dashboards-dont-get-used) (secondary; original not retrieved).
- "60-80% of dashboards go unused" attributed to SR Analytics (2025); another article says the "60-70% unused, per Gartner" stat is **not verifiable** and traces to a social post — [SR Analytics](https://sranalytics.io/blog/business-intelligence-dashboards/); [minditsystems](https://minditsystems.com/dashboards-vs-operational-intelligence-why-most-bi-dashboards-fail/) / [vizier.health](https://vizier.health/blog/dashboard-era-is-over/) (search synthesis; treat as weak).
- Luzmo 2025 State of Dashboards (reported: survey of ~200 product leaders/data teams): 72% of users regularly abandon dashboards for spreadsheets; 40% feel dashboards don't help them make better decisions — cited via [anyroad](https://blog.anyroad.com/post/business-intelligence-dashboards) / [elevatedsignal](https://elevatedsignal.com/insights/business-intelligence-dashboard/) (vendor-adjacent; original not verified).
- Precisely 2025 Data Quality report (cited): 67% of organisations don't completely trust their data for decision-making — via [noomaro](https://noomaro.com/articles/best-tableau-alternative) (secondary).
- AI failure modes: Copilot pulling incorrect answers from report visuals ([Fabric Community](https://community.fabric.microsoft.com/discussions/power-bi-web-app/copilot-response-not-correct/4740572)); compiling-but-wrong DAX and possible RLS bypass ([Blue Dawn Tech](https://bluedawntech.com/blog/2026-05-14-honest-review-of-power-bi-copilot-from-a-bi-director.html)); nondeterministic answers and generic/inaccurate output without data prep (Microsoft guidance via [easyinsight](https://easyinsight.co.uk/insights/copilot-in-power-bi)); Looker Code Interpreter "more variability" ([Google docs](https://docs.cloud.google.com/looker/docs/studio/conversational-analytics-looker-studio-code-interpreter)); 5,000-row cap; ThoughtSpot Spotter metered at 25 queries/user/month on Pro ([Valiotti](https://valiotti.com/thoughtspot-spotter-review-2026/)); Tableau Inspector flags anomalies without decomposing drivers ([Hex blog](https://hex.tech/blog/ai-bi-tools/), competitor).
- "Nobody publishes accuracy" for AI data analyst tools — [Colrows](https://colrows.com/blogs/ai-data-analyst-tools/) (vendor).

### Inferences
- The adoption problem (25% active use) and the trust problem (wrong numbers) are both arguments for an advisor that sits *on top of* existing dashboards and translates them into decisions — but also a warning: if Bishop gets one number wrong in front of a regional director, trust collapses. Show provenance, sanity-check totals, and separate "what the data says" from "my interpretation / my bet".

### Gaps
- Original BARC/Eckerson, Luzmo and Precisely reports not retrieved; figures are secondary.
- No Gartner primary stat on dashboard usage found (the commonly cited one appears apocryphal).
- No systematic accuracy benchmark (e.g., % correct answers) for Power BI Copilot, Tableau, Looker, Genie or Cortex found.
