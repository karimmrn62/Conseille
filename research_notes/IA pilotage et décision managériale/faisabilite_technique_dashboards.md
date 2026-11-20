# Technical feasibility: an AI advisor ("Bishop") reading business dashboards and performance data (browser extension and/or data connectors)

State as of November 2026. Notes in English. Every claim carries a source; unsourced points are in "Inferences" or "Gaps".

**Research limitations (read first):** in this research session `learn.microsoft.com` and `medium.com` could not be fetched (blocked by the session's network policy). Microsoft Learn content below therefore comes from search-engine summaries of the Learn pages, not from full-page reads. The writer should treat exact Microsoft wording as "to verify". Several benchmark figures come from secondary aggregators. Those are flagged.

---

## Q1. Can a Chrome extension read the underlying data of dashboards open in the browser (Power BI, Tableau, Looker/Looker Studio, Qlik, Excel Online, Google Sheets)? What do existing extensions do?

### Takeaway
A content script can reach the DOM and iframes of these apps, but the rendered DOM does not reliably expose the underlying numbers. Charts are drawn as SVG or canvas inside nested iframes, values are often aggregated or truncated, and vendors change the markup without notice. Google Docs, for example, moved to canvas rendering and broke extensions. Of the browser-side options, only those that call the vendor's own query layer return exact data: the Power BI JS `exportData` call (embedded scenarios only, and flaky) or an official API/MCP call made with the user's identity. Scraping or screenshots should be treated as "context and orientation". Neither is a source of truth for numbers.

### Cited Findings
- **Power BI, DOM access is possible but structural only:** the open-source PowBility Chrome extension "connects to the DOM of the user's Power BI report" to list accessibility issues, using the `tabs` permission, URL matching and CSS selectors such as `.visual-chart`. This shows DOM access to report structure. It does not show extraction of data values. — [GitHub rklein324/PowerBIAccessibility](https://github.com/rklein324/PowerBIAccessibility/)
- **Power BI, iframe architecture:** a Power BI "Visuals Auto-Refresh" extension works by finding the report-viewer URL in the iframe `src` attribute and redirecting to it, which shows that reports run inside iframes. — [Chrome Web Store](https://chrome.google.com/webstore/detail/power-bi-visuals-auto-ref/ibokhlknbmjoocecdfobnhgpapppnpin)
- **Power BI, custom visuals are sandboxed:** custom visuals render in their own iframes, and PBIVIZ tools encapsulate CSS by prefixing selectors with the visual's GUID. — [Microsoft Power BI Community](https://community.powerbi.com/t5/Developer/Referring-to-the-visual-s-iframe-element-from-CSS/td-p/235389)
- **Browser-security changes affect these iframes:** after Chrome 142 introduced Local Network Access restrictions, calls from Power BI custom visuals to the local network still failed even when the user granted permission. The poster said only the host (Microsoft) can fix this. — [Fabric Community](https://community.fabric.microsoft.com/t5/Developer/Allow-Local-Network-Access-on-custom-visual-iframes/m-p/4894274)
- **Power BI, the official way to get a visual's data in the browser is the JS API `visual.exportData()`, with caveats:** a Fabric community thread reports that `exportData(models.ExportDataType.Underlying, 100)` failed with "Error running visual data query" while summarized export worked. A reply says underlying-data export via the JS API is supported in embed-for-your-organization scenarios but "may fail in some cases — even if the same export works through the UI". — [Fabric Community](https://community.fabric.microsoft.com/t5/Developer/Export-underlaying-data-from-visual-using-the-Power-BI-embedded/m-p/4668979)
- **Power BI export limits:** Desktop and the service can export at most 30,000 rows to CSV, and Excel export is cited at 150,000 rows. "Summarized" exports the data exactly as shown in the visual. "Underlying" adds the other fields of the underlying table. — [Microsoft Learn, export data from visuals](https://learn.microsoft.com/power-bi/visuals/power-bi-visualization-export-data) (via search summary); [TheBricks guide](https://www.thebricks.com/resources/guide-how-to-export-large-data-from-power-bi)
- **Google Workspace, canvas rendering breaks DOM-based extensions (2021, older info):** Google moved Docs from HTML-based to canvas-based rendering and warned that "some Chrome extensions may not function as intended" because they rely on specific bits of HTML. Google advised in-house extensions to migrate to the Workspace Add-ons framework. Assistive technologies were said not to be affected. — [Google Workspace Updates, May 2021](https://workspaceupdates.googleblog.com/2021/05/Google-Docs-Canvas-Based-Rendering-Update.html); [The New Stack](https://thenewstack.io/google-docs-switches-to-canvas-rendering-sidelining-the-dom/)
- **Screenshot pipelines have their own attack surface:** Brave showed that in Perplexity Comet, a user-initiated screenshot of a page with camouflaged text could lead to prompt injection, because text recognition extracted text that humans could not see. It was reported on 1 Oct 2025 and disclosed on 21 Oct 2025. — [Brave blog](https://brave.com/blog/unseeable-prompt-injections/)

### Inferences
- **Realistic extension strategy, layered:** (1) detect which app and report is open (URL, report/workspace IDs in the URL or iframe src). (2) Use that context to call the official API/MCP server for the same report with the user's delegated identity, which returns exact data. (3) Use DOM text (titles, KPI cards, table cells rendered as HTML, filter and slicer state) plus a screenshot only as orientation ("what is the user looking at"). Do not treat these as the numeric source.
- Power BI, Tableau and Qlik largely render charts as SVG/canvas inside cross-origin iframes. A content script injected with `all_frames` and host permissions for those origins can technically read them. However, labels are often abbreviated (e.g. "1.2M"), tooltips are hidden, and only the visible data points are present. This is reasoning from the sources above plus general platform knowledge. A per-vendor DOM audit was not found in this session.
- Fragility risk is high: vendors change class names and rendering engines without notice (Google precedent, Chrome LNA change), so a scraping layer needs continuous maintenance.

### Gaps
- No source found describing how Tableau Cloud/Server, Looker Studio, Qlik Sense or Excel Online render visuals today (SVG vs canvas vs HTML tables), or any extension that extracts their values reliably. Needs a hands-on technical spike.
- No source found confirming whether Google Sheets uses canvas rendering for the grid (the 2021 announcement covered Docs). This is probable from general knowledge but unverified.
- No public description was found of how commercial AI side-panel assistants (e.g. Claude in Chrome, Gemini in Chrome, Copilot in Edge) read BI dashboards, whether by screenshot or DOM/accessibility tree.
- No source found on whether scraping Power BI or Tableau UIs breaches vendor terms of service.

---

## Q2. How accurately do multimodal LLMs read charts and tables from screenshots? Benchmarks, error types, mitigations

### Takeaway
Frontier models answer about 70-80% of hard chart-reasoning questions correctly (CharXiv Reasoning: Gemini 3 Pro 81.4%, GPT-5.1 about 69.5%, Claude Sonnet 4.5 68.5%, late-2025 figures). That means roughly 1 in 5 to 1 in 3 answers is wrong on complex charts, which is unacceptable for "numbers must be accurate". Errors concentrate on charts without data labels, where values must be estimated from axis scales. Mitigations: extract the underlying data rather than reading pixels, ground each reading step on the chart, and do the calculations in code.

### Cited Findings
- **CharXiv Reasoning, frontier model results (Nov 2025):** Gemini 3 Pro 81.4%, GPT-5.1 69.5%, Claude Sonnet 4.5 68.5%, as reported from Google DeepMind's Gemini 3 evaluation table. There is a minor discrepancy (69.5% vs 69.6%) between secondary sources, and the original model card was not reached. — [scrapbox analysis of Gemini 3 benchmarks](https://scrapbox.io/tomiokario/Gemini_3.0%E3%81%AE%E3%83%99%E3%83%B3%E3%83%81%E3%83%9E%E3%83%BC%E3%82%AF%E7%B5%90%E6%9E%9C%E5%88%86%E6%9E%90%EF%BD%9CGPT-5); [timkellogg.me thread on Gemini 3 model card](https://timkellogg.me/threads/2025-11-18-gemini-3-model-card-leaked-the-url-is-taken-down/); [benchlm.ai](https://benchlm.ai/compare/gemini-3-pro-vs-gpt-5-1)
- **CharXiv, other aggregated entries (third-party aggregator, mixed protocols, not directly comparable):** GPT-5 mini (reasoning high) 68.6 on CharXiv RQ; Gemini 2.5 Pro 67.8; Claude 3.7 Sonnet 64.2; GPT-5 Nano 51.2; Qwen3.5-27B 79.5 (open weights). — [SOTA2 CharXiv RQ](https://www.sota2.com/research/sota/scientific-chart-understanding-on-charxiv-rq); [SOTA2 combined CharXiv](https://www.sota2.com/research/sota/chart-understanding-and-reasoning-on-charxiv)
- **Error type 1, values not printed on the chart:** "Do MLLMs Really Understand the Charts?" (arXiv 2509.04457, 2025) builds a benchmark of charts without data labels, where the model must identify the axes and their numeric scales and map a mark's position onto that scale. It finds that models hallucinate much more often on such charts. The authors' ChartVR model is claimed to beat GPT-4o and Gemini-2.5-Flash there. — [arXiv 2509.04457](https://arxiv.org/html/2509.04457v2)
- **Error type 2, over-reliance on OCR text:** ChartPoint (ICCV 2025) argues that chart MLLMs rely heavily on OCR-extracted text and fail when annotations are sparse. It proposes grounding each reasoning step to a location on the chart. — [ChartPoint, ICCV 2025](https://openaccess.thecvf.com/content/ICCV2025/papers/Xu_ChartPoint_Guiding_MLLMs_with_Grounding_Reflection_for_Chart_Reasoning_ICCV_2025_paper.pdf)
- **Error type 3, scale reading vs derived calculation:** PlotChain (arXiv 2602.13232, 2026) grades intermediate reads (e.g. axis scale) separately from final answers, with per-field tolerances. This separates errors in reading the scale from errors in the downstream calculation. — [PlotChain](https://arxiv.org/html/2602.13232)
- **Error type 4, injected or invisible text in screenshots:** invisible text in a screenshot can be read by the model and act as instructions (see Q1, Brave). — [Brave blog](https://brave.com/blog/unseeable-prompt-injections/)

### Inferences
- For a manager-facing advisor, a 70-80% accuracy level on chart questions means vision must not be the numeric source of record. Reading a KPI card with a printed label is far more reliable than estimating a bar height. This follows from the arXiv 2509.04457 finding.
- **Best practice, in decreasing reliability:** (a) query the semantic model or API and return a table. (b) Read HTML table or KPI text from the DOM. (c) Ask the vision model to transcribe printed labels only, and flag any value estimated from the axis as "approximate". (d) Never let the LLM do arithmetic in-token. Run it in a code sandbox on the extracted table.
- **Cross-check pattern:** compare vision-transcribed values against API values when both exist, and alert on mismatches.

### Gaps
- No verified 2025-2026 frontier results found for ChartQA, ChartBench, MMMU (chart subset) or TableBench in this session. ChartQA is widely reported to be near saturation (about 90%+) for frontier models, but this was not verified here.
- The CharXiv human baseline (about 80% on reasoning questions, per the original 2024 paper, from memory) was not verified in this session.
- No benchmark specifically on BI dashboard screenshots (dense multi-visual pages, abbreviated numbers, filters) was found. That is the most relevant case for Bishop, and an internal evaluation set is needed.
- No 2026 figures found for the newest models (e.g. GPT-5.x later versions, Claude Opus 4.x, Gemini 3.x) on CharXiv.

---

## Q3. Official connectors, APIs and MCP servers; authentication and admin-consent hurdles

### Takeaway
By 2025-2026 every major BI vendor offers an official or vendor-supported MCP/API path that returns exact query results. Microsoft has a remote Power BI MCP server (preview), a local Modeling MCP server, and Fabric data agent MCP / Fabric IQ MCP. Tableau has an officially supported Tableau MCP (hosted at mcp.tableau.com with OAuth 2.1, released Sep 2025). Google has a Looker MCP via MCP Toolbox and announced a managed Looker-native MCP server (Preview, Next '26). dbt and Cube offer semantic-layer APIs. The main hurdles are tenant admin enablement (Power BI tenant setting), OAuth app consent, preview status, and published-data-source-only scopes (Tableau).

### Cited Findings
**Microsoft Power BI / Fabric**
- **Remote Power BI MCP server, preview:** tools let agents retrieve model schemas, generate DAX and execute DAX queries against semantic models and return results. Admins must enable the tenant setting "Users can use the Power BI Model Context Protocol server endpoint (preview)". DAX generation uses the same engine as Copilot for Power BI. Complex logic may not translate well from natural language, and the server keeps no query state between requests. — [Microsoft Learn, remote MCP server tools](https://learn.microsoft.com/en-us/power-bi/developer/mcp/remote-mcp-server-tools) (via search summary); [Get started](https://learn.microsoft.com/en-us/power-bi/developer/mcp/remote-mcp-server-get-started)
- **Remote MCP and row-level security:** RLS is "currently not enforced when using Service Principal authentication". A service principal accesses all data it is authorized for. With user (delegated) authentication, queries run in the user's context and RLS is enforced. — [Microsoft Learn](https://learn.microsoft.com/power-bi/developer/mcp/remote-mcp-server-tools) (via search summary)
- **Known bug:** the remote MCP `ExecuteQuery` failed from an Azure Foundry/Python client using bearer-token auth. The same DAX worked from VS Code/Copilot and via the Power BI REST `executeQueries` endpoint. No resolution was found. — [GitHub microsoft/powerbi-modeling-mcp #103](https://github.com/microsoft/powerbi-modeling-mcp/issues/103)
- **Power BI Modeling MCP server (local):** runs locally and connects to the semantic model using the user's existing credentials and permissions. It is a modeling and authoring tool rather than an end-user Q&A tool. — [GitHub microsoft/powerbi-modeling-mcp](https://github.com/microsoft/powerbi-modeling-mcp)
- **Fabric data agent MCP server:** the token can represent a user or a service principal. Microsoft's Ignite 2025 post says the hosted MCP server respects user permissions including RLS and column-level security. Copilot Studio is a listed consumption channel. — [Microsoft Learn, data agent MCP server](https://learn.microsoft.com/en-us/fabric/data-science/data-agent-mcp-server) (via search summary); [Fabric blog, Ignite 2025](https://blog.fabric.microsoft.com/es-es/blog/whats-new-for-fabric-data-agents-at-ignite-2025-unlocking-deeper-data-reasoning-and-seamless-ai-interoperability?ft=All)
- **Fabric IQ MCP (secondary sources):** described as GA, delegated OAuth only, each call runs as the signed-in user, so RLS and OLS apply as in the Power BI portal. — [datatako blog](https://datatako.com/blog/fabric-iq-mcp-server-client-reporting); [Atlan](https://atlan.com/know/microsoft-fabric/fabric-mcp-servers/) (third-party, to verify)
- **Community wrappers around REST `executeQueries`** exist (e.g. a DAX-query MCP server, and an authenticated MCP using Azure identity). — [mbmccormick/powerbi-mcp-server](https://github.com/mbmccormick/powerbi-mcp-server); [bcperry/pbi-mcp](https://github.com/bcperry/pbi-mcp)
- **Expert view:** SQLBI's article "AI in Power BI: Time to pay attention" is listed in results as context for the maturity of these tools. Its content was not read in detail. — [SQLBI](https://www.sqlbi.com/articles/ai-in-power-bi-time-to-pay-attention/)

**Tableau**
- **Tableau MCP is officially supported:** it is a suite of tools, resources and prompts. A hosted service at `https://mcp.tableau.com` serves Tableau Cloud with OAuth 2.1, "so every user signs in with their own Tableau Cloud identity". A self-hosted npx/Docker setup uses a personal access token (PAT). Tableau Server customers use the self-hosted or enterprise deployment. It requires Node.js 22.7.5 or later. — [GitHub tableau/tableau-mcp](https://github.com/tableau/tableau-mcp)
- **Release date and scope (secondary):** released 16 Sep 2025 with a "Tableau Supported" badge. Its query tool runs VizQL against *published data sources* and requires VizQL Data Service and the Metadata API to be enabled. Workbooks and unpublished data are not supported. — [DEV Community overview (2026)](https://dev.to/dataworkersteam/mcp-servers-for-bi-tools-looker-tableau-power-bi-mode-2026-29le); [Knowi comparison (2026)](https://www.knowi.com/blog/bi-mcp-comparison/)

**Google Looker**
- **Looker MCP through MCP Toolbox:** agents query Looker's semantic layer. "There is no need for AI to write SQL... Looker generates the correct, optimized SQL." — [Google Cloud blog, Introducing Looker MCP Server](https://cloud.google.com/blog/products/business-intelligence/introducing-looker-mcp-server/); [Looker docs, MCP Toolbox](https://docs.cloud.google.com/looker/docs/2604/connect-ide-to-looker-using-mcp-toolbox)
- **Google Cloud Next '26 (22 Apr 2026):** "Open BI and MCP" is in Preview via MCP Toolbox, plus a new managed MCP server native to Looker (no separate status given). The Conversational Analytics core agent is GA, with an upgraded reasoning/semantic grounding version in Preview. Embedded Conversational Experiences (UI or API) are GA. Dashboard Agents and Agentic Workflows (metric monitoring, irregularity detection, recommendations) are Preview. No accuracy figures were given. — [Google Cloud blog, Looker at Next '26](https://cloud.google.com/blog/products/business-intelligence/looker-updates-for-agentic-bi-at-next26)
- **Build-vs-buy framing (Oct 2025 webinar):** Looker's Conversational Analytics options are lower-effort, while building on Looker MCP Toolbox or the CA API gives more control. — [Google Looker MCP webinar PDF](https://services.google.com/fh/files/misc/lookermcpserverwebinar.pdf)
- **Third-party Looker MCP servers:** Ultrathink (160 tools covering the full Looker API) and datadaddy89 (Conversational Analytics MCP). — [glama.ai](https://glama.ai/mcp/servers/Ultrathink-Solutions/looker-mcp-server); [lobehub](https://lobehub.com/es/mcp/datadaddy89-looker-mcp)

**Semantic layers**
- **dbt Semantic Layer and Cube** are both positioned as LLM data interfaces, with benchmark evidence (see Q4). — [dbt blog](https://www.getdbt.com/blog/semantic-layer-as-the-data-interface-for-llms); [Cube blog](https://cube.dev/blog/why-semantic-layers-make-llm-analytics-reliable-a-paired-benchmark-across-three-frontier-models)

### Inferences
- **Authentication pattern for Bishop:** use delegated OAuth (Entra ID for Power BI/Fabric, Tableau Cloud OAuth 2.1, Google OAuth for Looker/Sheets) so that each manager sees only what they are entitled to (RLS preserved). Avoid service principals for end-user Q&A, because with the Power BI remote MCP they bypass RLS.
- **Admin hurdles to plan for:** (1) the Power BI tenant setting must be enabled by a Fabric admin. (2) The Entra ID app registration for Bishop needs admin consent for Power BI API scopes in most enterprises. (3) Tableau needs VizQL Data Service and Metadata API enabled and data sources published. (4) Preview status of several servers (Power BI remote MCP, Looker managed MCP) means SLA and support risk.
- **Mapping problem:** a dashboard visual does not map one-to-one to a semantic-model query. Bishop must translate "this visual" into a DAX/VizQL/LookML query: read the visual's fields and filters (e.g. via the Power BI JS API or report metadata), then run an equivalent query via MCP/API. This is the hardest engineering piece.

### Gaps
- Microsoft Graph Excel REST API and Google Sheets API details (scopes, admin consent, limits) were not researched in this session. Both are mature, well-documented APIs that read exact cell values, so the extension should prefer them over DOM reading for Excel Online and Sheets.
- No official Qlik Sense MCP server or Qlik Answers API details were found in this session.
- Looker Studio (as opposed to Looker) has no MCP/API path identified. Looker Studio's API is limited (asset management), so data typically must be reached through its underlying source (BigQuery, Sheets). Unverified.
- Exact GA dates of the Power BI remote MCP and the Fabric data agent MCP were not confirmed because Microsoft Learn was blocked.

---

## Q4. LLM accuracy on text-to-SQL / numerical analysis over business data, and the role of semantic layers

### Takeaway
Raw text-to-SQL on realistic enterprise schemas is still unreliable. dbt reports 50-65% for most frontier models in 2026, and Spider 2.0 started at 21.3% for an o1-preview agent in 2024-2025. Top leaderboard scores have climbed fast, but they come from heavily engineered agent systems and are scored more leniently. Routing questions through a governed semantic layer (dbt, Cube, LookML, Power BI semantic model) gives consistently large gains: near-100% on covered questions (dbt 2026) or +17 to +23 percentage points (Cube 2026).

### Cited Findings
- **Spider 2.0 (ICLR 2025):** a code-agent framework on o1-preview solved 21.3% of enterprise-workflow tasks, versus 91.2% on Spider 1.0 and 73.0% on BIRD. Real enterprise schemas and dialects are much harder. — [Spider 2.0 paper, ICLR 2025](https://proceedings.iclr.cc/paper_files/paper/2025/file/46c10f6c8ea5aa6f267bcdabcb123f97-Paper-Conference.pdf)
- **Later leaderboard scores (secondary, unverified):** a 2026 post says the top Spider 2.0-Snow entry scores 96.70. An older guide gave about 59% (Snow) and 38% (Lite). BIRD's top system is reported at about 81.67% against a 92.96% human baseline. BIRD uses strict evaluation, while Spider 2.0-Snow uses a more lenient script, so the scores are not comparable. — [Promethium guide](https://promethium.ai/guides/text-to-sql-evaluation-benchmarks-metrics/); [Onvo blog 2026](https://www.onvo.ai/blog/text-to-sql-accuracy-in-2026-the-performance-cliff-nobody-mentions); Medium post by kalingwu (could not be fetched)
- **dbt Labs 2026 benchmark:** for questions a well-modeled Semantic Layer covers, accuracy "approaches or hits 100%" thanks to deterministic query generation. Text-to-SQL scored mostly 50-65% across models (e.g. Claude Sonnet 4.6 62.5%, GPT-5.2 68%, GPT-5.3 Codex 84.1%, per search summary). With 3 additional models, the Semantic Layer answered every benchmark question. Some questions had needed too many entity hops for MetricFlow. — [dbt docs blog, Semantic layer vs text-to-SQL 2026](https://docs.getdbt.com/blog/semantic-layer-vs-text-to-sql-2026); [dbt LLM SL benchmark](https://dbt-labs.github.io/dbt-llm-sl-bench)
- **dbt Labs 2024 replication:** 83% accuracy via the Semantic Layer on 8 addressable questions, versus a 16.7% baseline with GPT-4 zero-shot over enterprise SQL. Questions needing too many joins failed 100% in the Semantic Layer. — [dbt blog](https://www.getdbt.com/blog/semantic-layer-as-the-data-interface-for-llms)
- **Cube paired benchmark (vendor study, 2026):** 100 questions on Contoso retail data. A semantic layer improved accuracy by +17 to +23 percentage points across three frontier models (e.g. Claude Opus 4.7: 50.5% to 67.7%). — [Cube blog](https://cube.dev/blog/why-semantic-layers-make-llm-analytics-reliable-a-paired-benchmark-across-three-frontier-models)
- **Vendor qualitative claims:** Google says a governed semantic layer is "a strong way to prevent AI hallucinations and ensure a single source of truth" (no data given). Microsoft notes that complex logic may not translate well from natural language to DAX. — [Google Cloud Next '26 blog](https://cloud.google.com/blog/products/business-intelligence/looker-updates-for-agentic-bi-at-next26); [Microsoft Learn remote MCP](https://learn.microsoft.com/en-us/power-bi/developer/mcp/remote-mcp-server-tools)

### Inferences
- Bishop should query the existing semantic models (Power BI datasets, Tableau published data sources, LookML, dbt/Cube) rather than raw warehouses. The governed measure definitions (e.g. "gross margin %") are where accuracy comes from, and they also guarantee consistency with what the manager sees on the dashboard.
- Even with a semantic layer, accuracy is not 100% on uncovered questions. Bishop needs a refusal or "out of model coverage" path and must show the generated query.

### Gaps
- No independent (non-vendor) 2026 benchmark comparing DAX generation accuracy (Power BI) or VizQL query accuracy (Tableau) was found.
- The official current BIRD and Spider 2.0 leaderboard pages were not fetched. The numbers above are secondary.

---

## Q5. Security and compliance: enterprise concerns about extensions reading internal dashboards, data residency, RLS, audit, Chrome Enterprise policies

### Takeaway
Enterprises can and do tightly control extensions. Chrome's `ExtensionSettings` policy can block an extension from interacting with specific hosts (`runtime_blocked_hosts`), allow-list installs, and pin host permissions. Security bodies (CSA, April 2026) now recommend treating AI-capable browser extensions as a distinct risk tier with allow-list-only installation. An extension that reads internal dashboard pages and ships content to an LLM is exactly what CISOs fear (DOM read/write, prompt injection, data exfiltration). The API/MCP route with delegated identity keeps RLS and vendor audit logs, which makes it much easier to approve.

### Cited Findings
- **`runtime_blocked_hosts`:** it prevents extensions from interacting with specified sites, including injecting JavaScript, viewing or altering webRequest/webNavigation, and viewing or altering cookies. Host patterns resemble match patterns without paths (e.g. `*://*.example.com`). `runtime_allowed_hosts` overrides blocked entries. At most 100 entries are allowed. ExtensionSettings overrides older extension policies. — [Chromium, Extension Settings full description](https://chromium.org/administrators/policy-list-3/extension-settings-full); [Google Chrome Enterprise help, Configure ExtensionSettings](https://support.google.com/chrome/a/answer/9867568?hl=en)
- **The same policy exists in Microsoft Edge** (ExtensionSettings), which matters for M365-centric customers. — [Microsoft Learn, Edge ExtensionSettings](https://learn.microsoft.com/el-gr/deployedge/microsoft-edge-browser-policies/extensionsettings)
- **"Man-in-the-Prompt" (LayerX/Akamai, July 2025):** any extension with DOM access, even without special permissions, can read or inject prompts into AI tools in the page. Akamai says 99% of enterprise users have extensions installed (a vendor figure). Traditional SWG/CASB/DLP tools lack visibility into DOM-level manipulation. — [Akamai security research](https://www.akamai.com/blog/security-research/2025/jul/man-in-the-prompt-top-ai-tools-vulnerable-to-injection); [CyberInsider](https://cyberinsider.com/the-top-ai-tools-exposed-to-man%e2%80%91in%e2%80%91the%e2%80%91prompt-browser-extension-attack/)
- **Cloud Security Alliance research note (10 Apr 2026):** recommends that organizations "treat AI-capable browser extensions as a distinct risk tier requiring allowlist-based installation control", and recommends auditing and monitoring extension DOM interactions. — [CSA research note PDF](https://labs.cloudsecurityalliance.org/wp-content/uploads/2026/04/CSA_research_note_ai-browser-extension-attack-surface_20260410-csa-styled.pdf)
- **Screenshot-based injection** (invisible text acting as instructions). — [Brave](https://brave.com/blog/unseeable-prompt-injections/)
- **RLS preservation:** Power BI remote MCP enforces RLS only with user authentication, not with a service principal. Fabric data agent MCP and Fabric IQ MCP respect user permissions, RLS and CLS. Tableau hosted MCP uses each user's own identity. — [Microsoft Learn](https://learn.microsoft.com/power-bi/developer/mcp/remote-mcp-server-tools); [Fabric blog Ignite 2025](https://blog.fabric.microsoft.com/es-es/blog/whats-new-for-fabric-data-agents-at-ignite-2025-unlocking-deeper-data-reasoning-and-seamless-ai-interoperability?ft=All); [GitHub tableau/tableau-mcp](https://github.com/tableau/tableau-mcp)

### Inferences
- **Approvability ranking for a CISO:** (1) API/MCP with delegated OAuth, where data stays under vendor RLS, calls appear in vendor audit logs, and scopes are narrow. (2) An extension with narrowly scoped `host_permissions` limited to the BI domains, activated only on user click (`activeTab`-style), sending structured context rather than full pages. (3) Broad `<all_urls>` scraping or screenshots, which will often be blocked by policy.
- Bishop should publish its extension ID and the hosts it needs so admins can force-install it with `runtime_allowed_hosts` scoped to the BI domains and block everything else.
- **Data residency:** if the LLM provider processes dashboard data, EU customers will require EU processing regions and no-training/zero-retention terms. The extension path makes this harder to control than a server-side connector, because page content leaves the browser directly.
- **Prompt-injection defense:** treat any text read from dashboards (comments, labels, dataset values) as data, not instructions, and never let page content trigger actions.

### Gaps
- Audit-log specifics (e.g. whether Power BI MCP calls appear in the Power BI/Fabric activity log, or Tableau MCP calls in Tableau admin insights) were not verified in this session.
- No source found on data residency options of the BI vendors' hosted MCP servers (e.g. is mcp.tableau.com region-pinned?).
- No survey data found on the share of enterprises blocking AI browser extensions.

---

## Q6. Recommended architecture patterns for "numbers you can trust"

### Takeaway
The pattern supported by the evidence is "LLM as orchestrator, never as calculator or data source". (1) Retrieve exact data through the governed semantic layer or API with the user's identity. (2) Do all arithmetic (variances, growth, ratios, forecasts) in sandboxed code on the retrieved table. (3) Cite each figure to its source query or visual and timestamp. (4) Flag confidence: exact (API), transcribed (printed label read by vision or DOM), estimated (read from an axis). (5) Refuse or escalate when the question falls outside model coverage.

### Cited Findings
- **Semantic layers make query generation deterministic**, giving near-100% accuracy on covered questions versus 50-65% for text-to-SQL. — [dbt 2026](https://docs.getdbt.com/blog/semantic-layer-vs-text-to-sql-2026)
- **Looker's design principle:** the AI queries the semantic layer and Looker generates the SQL. — [Google Cloud blog](https://cloud.google.com/blog/products/business-intelligence/introducing-looker-mcp-server/)
- **Grounding each reasoning step to a chart region improves chart reasoning** (ChartPoint), and scale-reading errors are a distinct failure mode (PlotChain, arXiv 2509.04457), which supports separate confidence levels for estimated values. — [ChartPoint](https://openaccess.thecvf.com/content/ICCV2025/papers/Xu_ChartPoint_Guiding_MLLMs_with_Grounding_Reflection_for_Chart_Reasoning_ICCV_2025_paper.pdf); [PlotChain](https://arxiv.org/html/2602.13232); [arXiv 2509.04457](https://arxiv.org/html/2509.04457v2)
- **Vendors are moving toward agentic monitoring** (Looker Agentic Workflows: monitor metrics, detect irregularities, surface correlations and recommendations, Preview). This competes directly with Bishop's "conclusions and action plans" value proposition. — [Google Cloud Next '26](https://cloud.google.com/blog/products/business-intelligence/looker-updates-for-agentic-bi-at-next26)

### Inferences (proposed Bishop architecture)
1. **Context layer (extension):** detect app, report ID, page, active filters and slicers, plus the visible titles and KPI labels via the DOM. Optionally take a screenshot for layout. Send only to the Bishop backend, never directly to the LLM vendor.
2. **Data layer (backend connectors):** Power BI remote MCP / REST `executeQueries` / Fabric data agent; Tableau MCP (VizQL Data Service); Looker MCP; Graph Excel API; Sheets API; dbt/Cube semantic APIs. All use delegated OAuth so RLS is preserved.
3. **Compute layer:** a code sandbox (Python/pandas) for every calculation. The LLM writes code, and code produces numbers.
4. **Answer layer:** every number is linked to its query (DAX/VizQL/LookML), source, filter context and refresh timestamp. A three-level confidence badge is shown. A reconciliation check confirms that the numbers retrieved via the API match those shown on screen in the extension (same filters), and a mismatch is flagged.
5. **Fallback mode, screenshot or DOM only:** allowed for qualitative reading ("trend down since March"), with explicit "approximate" labels. No action plan should be based on estimated values without confirmation.
6. **Governance:** admin-deployed extension with scoped hosts, per-tenant region, zero-retention LLM terms, and a Bishop-side audit log of every query and answer.

### Gaps
- No published reference architecture from a vendor or academic source specifically for "verified numbers" in BI copilots was found. The pattern above is a synthesis.
- No quantitative evidence was found on how much code execution reduces numerical errors in business analysis specifically, as opposed to math benchmarks in general.
