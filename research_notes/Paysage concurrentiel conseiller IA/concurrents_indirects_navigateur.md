# Indirect competitors: general-purpose AI assistants in the browser and in document suites (state as of Nov 2026)

Scope: general AI tools a consultant could use instead of a specialized "strategic AI advisor" Chrome side-panel extension. Research date: 2026-11-20.

Method note: Several primary hosts could not be fetched from this research environment (chromewebstore.google.com, help.openai.com mirror, blogs.windows.com, stern.nyu.edu, androidauthority.com, superchargebrowser.com). Where that happened, figures come from search-result summaries of those pages or from secondary coverage, and are flagged. Chrome Web Store user counts in particular could NOT be verified directly and should be re-checked by hand before being quoted in a deck.

---

## 1. AI sidebar browser extensions (Sider, Merlin, Monica, HARPA, MaxAI, Glarity, Perplexity, ChatGPT, Claude in Chrome, Gemini in Chrome, Copilot in Edge, Superhuman Go, Brave Leo...)

### Takeaway
The "AI sidebar that reads the current page" is fully commoditized: dozens of multi-model wrappers (Sider, Monica, Merlin, MaxAI, HARPA) at roughly $9-20/month, plus first-party assistants from the model labs and browser makers that are now free or bundled (Gemini in Chrome, Copilot in Edge) or included in paid plans (Claude in Chrome, GA on all paid Claude plans since 26 Aug 2026). None of them positions on strategic method or a point of view; they position on model access, page/PDF/YouTube summarization, writing help and, increasingly, agentic browsing. Third-party wrappers carry documented privacy/tracking problems that enterprise IT is aware of.

### Cited Findings

**Claude in Chrome (Anthropic)**
- Generally available on 26 August 2026 on every paid Claude plan; not available on free plans. — [Anthropic, "Claude in Chrome is generally available"](https://claude.com/resources/articles/claude-in-chrome-generally-available); free exclusion per secondary guides, e.g. [findskill.ai](https://findskill.ai/blog/claude-in-chrome-is-it-safe-2026/)
- Capabilities: views the current page and acts on it (reads, types, clicks links, navigates, fills forms) using the user's existing logins; works across tabs; conversations continue in Claude desktop/mobile/web apps. Since GA it acts autonomously by default rather than asking approval per action (can be turned off in settings). — [Anthropic](https://claude.com/resources/articles/claude-in-chrome-generally-available)
- Enterprise: admins manage it in Organization Settings and can restrict it to approved domains. — [Anthropic](https://claude.com/resources/articles/claude-in-chrome-generally-available)
- Limitations stated by Anthropic: does not run on other Chromium browsers or on mobile yet; needs the Claude desktop app to work with local files/other apps. — [Anthropic](https://claude.com/resources/articles/claude-in-chrome-generally-available)
- Prompt-injection figures published by Anthropic: before additional safeguards, attack success 17.6% (Opus 4.5) and 3.8% (Opus 5); with probes + safety classifier, 0% on Sonnet 5 / Opus 5 / Mythos 5 and 0.3% on Fable 5; Anthropic calls prompt injection "a moving target". — [Anthropic](https://claude.com/resources/articles/claude-in-chrome-generally-available)
- Origin: launched as a ~1,000-user research pilot (Aug 2025) before GA. — [Anthropic, "Piloting Claude in Chrome"](https://claude.com/blog/claude-for-chrome?lang=us); [Keywords Everywhere news summary](https://keywordseverywhere.com/news/claude-updates/claude-in-chrome/)

**Gemini in Chrome (Google)**
- Workspace Updates post (3 Feb 2026) lists Gemini in Chrome as available to all US Google Workspace customers, Workspace Individual subscribers and personal Google accounts; expanding to Chromebook Plus. — [Google Workspace Updates](https://workspaceupdates.googleblog.com/2026/01/gemini-in-chrome-coming-to-chromebook-plus.html)
- "Auto browse" (agentic multi-step tasks, Gemini 3) announced Jan 2026 for consumers; The Register described Google as pushing a Gemini pane onto Chrome users. — [9to5Google](https://9to5google.com/2026/01/28/chrome-gemini-auto-browse/); [The Register](https://www.theregister.com/2026/01/29/chrome_gemini_pane/)
- At Cloud Next (22 Apr 2026) Google brought Auto Browse to eligible US Workspace users, enabled by admins via Chrome Enterprise policy by user group, with "checkpoints" to keep users in control; framed as turning Chrome into an "AI coworker". — [TechCrunch](https://techcrunch.com/2026/04/22/google-turns-chrome-into-an-ai-coworker-for-the-workplace/); [TechWyse](https://www.techwyse.com/news/platform-updates/google-chrome-enterprise-auto-browse-gemini-shadow-it-cloud-next-2026)
- Google labels auto browse experimental and warns it can make mistakes (search-summary of Google help pages; not fetched directly). — [chromeunboxed](https://chromeunboxed.com/the-powerful-gemini-in-chrome-ai-assistant-is-now-rolling-out-to-workspace-users/)
- Distribution: The Next Web frames Google's bet on Chrome's ~3.8 billion users. — [The Next Web](https://thenextweb.com/news/google-chrome-enterprise-ai-coworker-agentic-browser)

**Copilot in Edge (Microsoft)** — see section 2 (Copilot Mode retired, features folded into Edge).

**Third-party multi-model sidebars (Sider, Monica, Merlin, MaxAI, HARPA)**
- Positioning per review sites: Sider = minimalist / reading & writing; Monica = feature-heavy multi-model chat; Merlin = middle ground; MaxAI = quick actions; HARPA = browser automation. Opinion pieces, partly from competitors. — [ai-toolbox.co](https://ai-toolbox.co/alternatives-to-chatgpt/chatgpt-sidebar-extensions-compared-2026); [prophetchrome.com (competitor-run)](https://prophetchrome.com/best-ai-sidebar-extensions); [toolworthy.ai](https://www.toolworthy.ai/en/blog/best-ai-chrome-extensions)
- Indicative pricing (third-party, frequently changing credit schemes): Monica ~$9.90/mo, Sider ~$8.99/mo, MaxAI ~$9.99/mo, Merlin ~$14.25-19/mo; all have daily-reset free tiers. Toolworthy warns Sider and Merlin restructure credit allowances frequently. — [toolworthy.ai](https://www.toolworthy.ai/en/blog/best-ai-chrome-extensions); [ai-toolbox.co](https://www.ai-toolbox.co/compare/best-ai-chat-extensions)
- User counts (UNVERIFIED, from a search summary of a Chrome Web Store-based ranking dated Aug 2026): Sider ~5M, Monica ~3M; another listing shows Merlin 900K+ and MaxAI 700K+. — [superchargebrowser.com](https://www.superchargebrowser.com/library/best-chatgpt-chrome-extensions-2026/) (could not fetch); [tooltivity.com](https://tooltivity.com/extensions/compare/maxai-ask-ai-anything-as-you-browse-vs-sider-chatgpt-sidebar-vs-merlin-ask-ai-to-research-write-and-review)
- Privacy audit (USENIX Security 2025, UC Davis, "Big Help or Big Brother?"): studied Monica, Sider, ChatGPT for Google, Merlin, MaxAI, Perplexity, HARPA.AI, TinaMind, Copilot. Merlin captured form inputs including a social security number on an IRS form, and shared raw queries with Google Analytics; Monica and Sider collected explicit info and personalized in and out of context; HARPA and MaxAI sent data to Mixpanel; Perplexity was "the most private assistant we found". (Older than 2025-26 window for product versions: data collected 2024-25.) — [UC Davis News](https://www.ucdavis.edu/news/uc-davis-study-reveals-alarming-browser-tracking-genai-assistants); [UC Davis Engineering](https://engineering.ucdavis.edu/news/big-help-or-big-brother-uc-davis-study-reveals-alarming-browser-tracking)

**Superhuman Go (ex-Grammarly)**
- Grammarly rebranded as Superhuman on 29 Oct 2025 and launched Superhuman Go, an AI assistant inside its browser extension (Chrome and Edge), with an agent marketplace (launch partners incl. Fireflies, Common Room, Radical Candor, Quizlet, Speechify; later Box, Gamma, Wayground); free in early access / included in paid plans (sources differ). — [Engadget](https://www.engadget.com/ai/grammarly-has-rebranded-to-superhuman-151001417.html); [SiliconANGLE](https://siliconangle.com/2025/10/29/grammarly-transforms-ai-enabled-productivity-suite-superhuman-rebrand/); [01net / BusinessWire Feb 2026](https://www.01net.it/superhuman-go-scales-agent-ecosystem-with-new-partner-agents-from-box-gamma-and-wayground/)
- Grammarly's installed base is the relevant threat: it already lives in every text field the consultant types in (no fresh user count found for 2026).

**Brave Leo**
- In-browser assistant: summarizes pages/videos, translates, Q&A; multiple models (no lock-in); does not record or train on conversations; usable without account. Agentic browsing added in early access in May 2026, in an isolated profile, off by default. No team accounts or admin controls (TechRadar). — [Brave AI news](https://brave.com/category/ai-news-features); [Brave blog, AI browsing](https://brave.com/blog/ai-browsing/); [TechRadar review](https://techradar.com/pro/brave-leo-ai-review)

### Inferences
- The baseline "read this page and summarize/answer" is free and bundled in the two dominant browsers (Chrome, Edge). A paid strategic extension cannot charge for page-reading; it must charge for judgment, method and point of view.
- Claude in Chrome is the most capable direct substitute for a Chrome side panel: same form factor, same browser, frontier models, enterprise domain controls, and an existing paid seat at many consulting firms. A consultant who already pays for Claude/ChatGPT/Gemini will ask "why not just prompt my existing assistant in the side panel?"
- The wrappers' documented tracking practices give a positioning opening on trust (no analytics on content, no training, clear retention) — buyers in strategy teams care about client confidentiality.

### Gaps
- Exact current Chrome Web Store user counts and ratings for Sider, Monica, Merlin, HARPA, MaxAI, Glarity, Wiseone, the Perplexity extension, the ChatGPT extension and Claude in Chrome could not be verified (Chrome Web Store not reachable from this environment). Must be checked manually.
- No 2026 data found on Glarity or Wiseone specifically.
- Whether an official OpenAI ChatGPT Chrome extension with page-reading replaced Atlas after its shutdown is unclear (see section 2).

---

## 2. AI-native browsers and browser-integrated assistants (Comet, Dia, Atlas, Neon, Edge Copilot Mode, Chrome+Gemini, Arc, Brave)

### Takeaway
2025 was the "AI browser" hype year (Comet, Atlas, Dia, Neon, Edge Copilot Mode); by late 2026 the category is consolidating back into the incumbent browsers. OpenAI deprecated Atlas (shut down 9 Aug 2026) and Microsoft retired Copilot Mode as a separate mode, while Google pushed Gemini and Auto Browse into Chrome itself. Comet is free; Dia is now Atlassian's "AI browser for work"; Neon is a $19.90/mo niche. Gartner advised enterprises in Dec 2025 to block AI browsers. This favors an extension on Chrome over a standalone browser.

### Cited Findings

**OpenAI ChatGPT Atlas — launched Oct 2025, deprecated mid-2026**
- Launched 21 Oct 2025 (macOS) with ChatGPT sidebar on any page and agent mode; TechCrunch noted it was "more about ChatGPT than the web". — [TechCrunch](https://techcrunch.com/2025/10/21/openais-new-browser-is-a-broadside-shot-at-google); [TechCrunch](https://techcrunch.com/2025/10/22/openais-atlas-is-more-about-chatgpt-than-the-web)
- OpenAI announced deprecation (reported 9 July 2026, alongside GPT-5.6); browser stops working 9 Aug 2026; browser-based agentic capabilities move into ChatGPT and Codex; bookmarks/tabs not migrated automatically. — OpenAI help article "Evolving Atlas into ChatGPT for browser-based agentic work" (seen via search; not fetchable) [help.openai.com mirror](https://help-lb.openai.com/en/articles/20001371-evolving-atlas-into-chatgpt-for-browser-based-agentic-work); [Android Authority](https://androidauthority.com/openai-sunsetting-chatgpt-atlas-3686001); [Let's Data Science](https://letsdatascience.com/news/openai-shutters-atlas-folds-features-into-chatgpt-2116216f)
- One outlet names the successor "ChatGPT Work"; OpenAI's own page cites ChatGPT and Codex — conflicting. — [PPC Land](https://ppc.land/openai-kills-atlas-browser-folds-it-into-new-chatgpt-work-agent/); [Pulse 2.0](https://pulse2.com/openai-introduces-chatgpt-work-and-deprecates-atlas-browser)
- Usage: only a third-party estimate (~11M MAU in Q1 2026, Presenc AI) — not an OpenAI figure, treat with caution. — [Presenc AI](https://presenc.ai/research/atlas-usage-statistics-2026)

**Perplexity Comet**
- Made free worldwide on 2 Oct 2025 (previously limited to $200/mo Max); Max users got a "background assistant"; Comet Plus = $5/mo publisher bundle, included in Pro (~$20) and Max (~$200). — [TechCrunch](https://techcrunch.com/2025/10/02/perplexitys-comet-ai-browser-now-free-max-users-get-new-background-assistant/)
- Android launch late Nov 2025; iOS announced as imminent (status not confirmed in sources found). — [Storyboard18](https://www.storyboard18.com/digital/perplexity-launches-comet-ai-browser-on-android-bringing-desktop-features-to-mobile-84570.htm); [eMarketer](https://www.emarketer.com/content/perplexity-comet-aims-dethrone-chrome-on-phones)
- Enterprise: Comet Enterprise with MDM silent install and admin controls (answers-only, or actions limited to approved domains); Enterprise Pro reported ~$40/seat/mo (third-party; verify). — [eesel.ai](https://www.eesel.ai/blog/perplexity-comet-pricing)
- No official 2026 user count found; earlier claims were of a "waitlist in the millions". — [eMarketer](https://www.emarketer.com/content/perplexity-makes-its-comet-browser-free--taking-aim-chrome)
- Security: Brave disclosed indirect prompt injection in Comet (Aug 2025) and then "unseeable" injections hidden in screenshots (faint text, reported 1 Oct, published 21 Oct 2025), plus a navigation-triggered issue in Fellou; Brave argued these are systemic to agentic browsers. — [Brave](https://brave.com/blog/unseeable-prompt-injections/); [Simon Willison](https://simonwillison.net/2025/Oct/21/unseeable-prompt-injections/)

**Dia (The Browser Company) / Atlassian**
- Atlassian agreed to buy The Browser Company (Arc, Dia) for ~US$610M in cash (Sept 2025); goal stated by Mike Cannon-Brookes: make Dia "the AI browser for work"; Arc had already been dropped in favor of Dia. — [Engadget](https://www.engadget.com/big-tech/atlassian-is-buying-arc-maker-the-browser-company-for-610-million-145236236.html); [BetaNews](https://betanews.com/article/atlassian-moves-into-ai-browsers-with-610-million-purchase-of-the-browser-company)
- Acquisition completed (Techzine, 21 Oct 2025). — [Techzine](https://www.techzine.eu/news/applications/134340/atlassian-acquires-the-browser-company-new-browser-for-knowledge-workers/)
- At Atlassian Team '26 (May 2026), Dia was presented alongside Rovo and the Teamwork Graph as a context-rich work browser (AI briefings, SSO, SOC 2 per one summary). — [diginomica](https://diginomica.com/atlassian-team-26-context-not-just-ai-rovo-teamwork-graph-dia); [Atlassian Team '26 session](https://events.atlassian.com/team/session/4059946/your-browser-reimagined-for-work-dia-+-atlassian-in-action)
- Anecdotal user comparisons in Atlassian Community: "Dia understands me much better than Rovo does". — [Atlassian Community](https://community.atlassian.com/forums/Atlassian-AI-Rovo-articles/Rovo-vs-Dia-Browser-HOW-IS-THIS-EVEN-POSSIBLE/ba-p/3248905)

**Microsoft Edge (Copilot Mode -> standard Edge)**
- Copilot Mode launched as experimental (Jul 2025) and expanded Oct 2025 with Copilot Actions (agentic) and Journeys (resume past browsing), with optional browser-history access. — [MacRumors](https://www.macrumors.com/2025/10/24/microsoft-edge-copilot-mode-ai-browser/); [AlternativeTo](https://alternativeto.net/news/2025/10/microsoft-edge-expands-copilot-integration-with-actions-journeys-and-browser-history-access)
- Edge blog, 13 May 2026: Copilot Actions became "Browse with Copilot" on Edge desktop for Microsoft 365 Premium subscribers, US only, with usage limits; Journeys free in all English markets; Copilot Mode's capabilities moved into standard Edge rather than a separate mode. (From search summary; page not fetchable.) — [Microsoft Edge blog](https://blogs.windows.com/msedgedev/2026/05/13/new-updates-to-edge-across-desktop-and-mobile/); [Windows Report](https://windowsreport.com/?p=1496222)

**Opera Neon**
- Agentic browser sold by subscription at ~$19.90/mo; "Neon Do" agent runs locally in the browser session. Price change since Dec 2025 launch not verified. — [AlternativeTo](https://alternativeto.net/news/2025/10/opera-s-new-ai-agentic-browser-neon-is-now-rolling-out-with-a-subscription-model); [Windows Central](https://www.windowscentral.com/software-apps/opera-is-next-in-line-to-release-an-ai-powered-web-browser-that-costs-money-to-use)

**Gartner advisory (Dec 2025)**
- "Cybersecurity Must Block AI Browsers for Now" (Dennis Xu, Evgeny Mirolyubov, John Watts): CISOs should block AI/agentic browsers (AI sidebars + autonomous actions), citing data leakage, erroneous transactions, credential abuse; default settings favor UX over security; named Comet and Atlas; understanding risks will take "years, not months"; also warned employees could use agents to automate mandatory training. — [The Register](https://www.theregister.com/2025/12/08/gartner_recommends_ai_browser_ban); [TechRadar](https://www.techradar.com/pro/security/gartner-advisory-states-ai-browsers-are-not-your-friend-and-are-putting-your-business-at-risk)
- Critics called the ban impractical as agentic features get embedded into mainstream tools. — [Security Boulevard](https://securityboulevard.com/2025/12/gartners-ai-browser-ban-rearranging-deck-chairs-on-the-titanic/)

**Market context**
- Chrome held ~68.9% of global browser share (Feb 2026), per a search summary. — [intuitionlabs.ai](https://intuitionlabs.ai/articles/chatgpt-atlas-openai-browser) (secondary)

### Inferences
- Standalone AI browsers struggled to displace Chrome (Atlas shut down within ~10 months). Building as a Chrome extension is the lower-friction path, but it puts the product directly next to Gemini in Chrome (native, free) and Claude in Chrome.
- The agentic arms race (auto browse, Browse with Copilot, Claude acting autonomously) is where the giants compete; a strategic advisor that is read-only/advisory (no actions) can turn this into a security selling point given Gartner's stance.
- Dia under Atlassian targets the same "work context" buyer (corporate teams) but via Atlassian's Teamwork Graph, not strategy method.

### Gaps
- No official 2026 active-user numbers for Comet, Dia, Neon, Edge Copilot or Gemini in Chrome.
- Arc's exact 2026 status (maintenance only vs. discontinued) not confirmed in 2026 sources; only that development was dropped in favor of Dia.
- Whether Comet iOS shipped and current Comet Enterprise pricing are unverified.

---

## 3. AI built into document suites (Microsoft 365 Copilot, Gemini in Workspace, Notion AI, Claude for Office, ChatGPT, Rovo)

### Takeaway
Every major document suite now ships an assistant that reads the open document and can draft, summarize and (increasingly) act as an agent over company files. Gemini is bundled into all Google Workspace business tiers; Microsoft 365 Copilot is a $18-30/user/mo add-on with Researcher/Analyst agents and Claude models inside; Anthropic sells its own Claude add-ins for Excel, PowerPoint, Word (GA May 2026) and Outlook (beta). They can critique a document when asked, but none is designed to propose non-obvious strategy with a distinct method or persona.

### Cited Findings

**Microsoft 365 Copilot**
- Pricing (third-party, late 2026): Copilot Business add-on $18/user/mo annual (promo; standard $21 through 31 Dec 2026), capped at 300 users, requires an M365 Business plan; enterprise add-on $30/user/mo; bundles Business Standard + Copilot $23.50, Business Premium + Copilot $32; Microsoft 365 E7 listed at $99 including Copilot and Agent 365. Base M365 Business prices rose 1 Jul 2026 (Basic $6->$7, Standard $12.50->$14). — [ST Micro](https://www.stmicro.net/blog/microsoft-365-copilot-business-july-2026/); [usagepricing.com](https://usagepricing.com/blueprint/activity/microsoft-copilot-2026-07-01-packaging); [CMIT](https://cmitsolutions.com/fortlauderdale-fl-1204/blog/microsoft-365-price-increase-2026/); [heise on E7](https://heise.de/-11205385)
- Anthropic models in Copilot: Claude first added in Researcher (Opus 4.1 initially); Researcher now uses Opus models alone and alongside OpenAI models in "Critique" (default) and "Council" modes; Word/Excel/PowerPoint Agents (which create Office files outside the apps) require Claude; in-app "Agent Mode" became core Copilot at GA, initially powered by OpenAI reasoning models. Anthropic models enabled by default from 7 Jan 2026 in commercial tenants (admin opt-out), disabled by default in EU and UK. — [Directions on Microsoft](https://www.directionsonmicrosoft.com/reports/m365-copilot-adds-choice-and-risk-with-anthropics-claude); [itelio / Message Center MC1193290](https://www.itelio.com/en/microsoft-message-center/MC1193290); [Microsoft 365 blog, 9 Mar 2026](https://microsoft.com/en-us/microsoft-365/blog/2026/03/09/powering-frontier-transformation-with-copilot-and-agents)

**Claude for Microsoft 365 (Anthropic add-ins)**
- Claude for PowerPoint research preview 5 Feb 2026; Claude for Word beta (Apr 2026); Excel, Word and PowerPoint GA 7 May 2026, Outlook public beta; one shared conversation context across apps; available via Bedrock, Vertex AI and Microsoft Foundry; paid plans. — [Anthropic blog](https://claude.com/blog/claude-excel-powerpoint-updates); [pasqualepillitteri.it summary](https://pasqualepillitteri.it/en/news/2143/claude-microsoft-365-outlook-beta) (secondary)

**Google Workspace with Gemini**
- Gemini in Gmail, Docs, Sheets, Slides, Meet included by default in business tiers; ~$7 Starter / $14 Standard / $22 Plus per user/mo annual (third-party figures; bundling date disputed: Mar 2025 price increase vs. Jan 2026). — [eesel.ai](https://www.eesel.ai/blog/gemini-workspace-pricing); [dupple.com](https://dupple.com/learn/google-workspace-pricing); [CO/AI](https://getcoai.com/news/google-is-making-ai-features-free-in-gmail-and-docs-but-increasing-its-workspace-prices)

**Notion AI**
- Full AI bundled into Business (~$20/member/mo annual, $24 monthly per one guide; other guides cite $15-18 — conflicting) and Enterprise; Free/Plus get a limited trial; Custom Agents billed $10 per 1,000 Notion credits, free until 3 May 2026. — [Matthias Frank](https://matthiasfrank.de/en/notion-ai-pricing-2026/); [breeze.pm](https://www.breeze.pm/articles/notion-ai-pricing); [krater.ai](https://krater.ai/blog/notion-ai-pricing)

**ChatGPT (Projects, connectors, company knowledge)**
- ~900M weekly active users announced by OpenAI on 27 Feb 2026; reports of 1B+ by mid-2026 are less certain. — [eWeek](https://www.eweek.com/news/chatgpt-hits-900m-weekly-users/); [Search Engine Land](https://searchengineland.com/guide/chatgpt-stats)
- ChatGPT Business includes connectors to Microsoft 365, Google Drive, Slack, GitHub, etc., and "company knowledge" (launched Oct 2025 for Business/Enterprise/Edu; cites source files, respects permissions). Business price reported ~$20/seat annual / $25 monthly after an April 2026 cut (third-party; not verified on official page). — [ChatGPT pricing](https://chatgpt.com/pricing?type=team); [TestingCatalog](https://www.testingcatalog.com/openai-launches-company-knowledge-on-chatgpt-for-business); [sentra.app](https://www.sentra.app/articles/chatgpt-business-pricing)

**Atlassian Rovo**
- Positioned with Dia and the Teamwork Graph at Team '26 (May 2026). — [diginomica](https://diginomica.com/atlassian-team-26-context-not-just-ai-rovo-teamwork-graph-dia)

### Inferences
- For corporate strategy teams already on M365 E3/E5 or Google Workspace, the default competitor is "the Copilot/Gemini button already in Word/Docs" — zero procurement friction, enterprise-grade data protection, admin controls. Researcher's "Critique" and "Council" modes show Microsoft moving toward multi-model critique, which overlaps with a "challenge my document" use case.
- Anthropic's own Office add-ins plus Claude in Chrome mean the same frontier model is available in every surface a consultant uses; differentiation must come from the advisory layer (method, persona, memory of the engagement, proprietary frameworks), not from document access.

### Gaps
- No primary-source evidence found of any suite product marketed specifically as a strategy critic/proposer; capability to critique is generic.
- Rovo's 2026 pricing/inclusion in Atlassian Cloud plans not found.
- Microsoft's official current Copilot price list was not fetched (third-party figures only).

---

## 4. Custom GPTs / Gems / Claude Projects for strategy consulting

### Takeaway
There is a long tail of "strategy consultant" custom GPTs, but no reliable public ranking; the GPT Store's usage metrics are opaque. This is evidence that users try to bolt a strategy persona onto general assistants, which is exactly the pattern a dedicated product competes with.

### Cited Findings
- Directory mirrors list GPTs such as "Business Consultant" (shown with "600K+", metric undefined), "McKinsey Consultant" (unofficial, "100+"), "Strategic Advisor GPT", "Strategy framework NAVIGANT", "Strategy Pro", "Strategic Planning Guide". — [GPTs Hunter mirror – Business Consultant](https://gptshunter-v2.pages.dev/gpt-store/MGUyYTM0MzcyMDA0MjkyZTI3); [Strategy framework NAVIGANT](https://gptshunter-v2.pages.dev/gpt-store/MmUwYTUyMjQyMDM0MDUzNDFi); [Strategic Business Advisor](https://gptshunter-v2.pages.dev/gpt-store/MjUwNjBiMmQwYTA3MTYyNzBm)
- A category site lists 33 "Business Strategy" GPTs with no popularity ranking. — [whatplugin.ai](https://whatplugin.ai/category/business-strategy)
- 2024 analysis of GPT Store popularity by conversation count was dominated by consumer tools (image generators), not consulting GPTs (older than window). — [Originality.ai](https://originality.ai/blog/gpts-statistics)
- GPT Store engagement metrics described as "intentionally opaque". — [Digital Applied](https://www.digitalapplied.com/blog/gpt-store-custom-gpts-business-guide-2026)

### Inferences
- Custom GPTs/Gems/Projects are a "DIY substitute": a consultant can paste a persona prompt ("act as a visionary chess player strategist") into a Claude Project or Gem for free within an existing subscription. The product must deliver something a prompt cannot (structured method, curated move libraries, stateful game-tree style reasoning across a mission, quality evaluation).

### Gaps
- No usage data for Gemini Gems or Claude Projects in strategy use cases; no verified conversation counts for strategy GPTs.

---

## 5. Technical constraints (Google Docs canvas, Word Online, PDFs, sidePanel API, Web Store policy, enterprise security)

### Takeaway
Reading the open document is technically non-trivial: Google Docs renders to canvas since 2021, and DOM access requires a gated "annotated canvas" allowlist or alternative paths (export APIs, accessibility layer, screenshots). The Chrome sidePanel API is mature (Chrome 114+, MV3) but can only be opened from a user gesture. Enterprises are increasingly hostile to AI extensions (LayerX data, Gartner, UC Davis), so permissions minimization, data handling and admin controls are table stakes.

### Cited Findings
- Google Docs moved from HTML to canvas-based rendering in 2021, breaking extensions; Google recommended migrating to Workspace Add-ons. — [Google Workspace Updates](https://workspaceupdates.googleblog.com/2021/05/Google-Docs-Canvas-Based-Rendering-Update.html?hl=pt_BR); [9to5Google](https://9to5google.com/2021/05/11/google-docs-canvas-rendering/)
- Developers report window flags to force HTML fallback or request an "annotated canvas" (DOM-like elements), gated by a Google allowlist form; a 2024 Chromium thread reports repeated unanswered requests and inconsistent behavior even after whitelisting (community reports, unverified). — [Chromium extensions group](https://groups.google.com/a/chromium.org/g/chromium-extensions/c/OP03CIUfews); [Stack Overflow archive](https://kiwix.lema.org/stackoverflow.com_en_all_2023-11/questions/70996296/annotated-canvas-rendering-in-google-docs)
- sidePanel API: requires "sidePanel" permission, Chrome 114+ MV3; sidePanel.open() (Chrome 116+) may only be called in response to a user action (action click, context menu, click in extension page/content script); can be global (windowId) or per-tab (tabId); setPanelBehavior lets the toolbar icon open it. Post-Chrome 127 reports of "user gesture" errors from content-script clicks. — [Chrome developers: sidePanel](https://developer.chrome.com/docs/extensions/reference/api/sidePanel); [Chromium extensions group](https://groups.google.com/a/chromium.org/g/chromium-extensions/c/WRGFOAHxoaY)
- LayerX Enterprise Browser Extension Security Report 2026 (data from >1M enterprise devices, Apr 2026): AI extensions more likely to have known vulnerabilities and access to cookies/scripting/tabs; ~75% of AI extensions request high or critical permissions; weak trust signals; 47.11% of enterprise AI conversations happen via personal identities (Akamai, which acquired LayerX). — [SC World](https://www.scworld.com/news/ai-browser-extensions-more-likely-to-have-known-vulnerabilities-report-says); [Akamai SOTI](https://akamai.com/blog/security/2026/aug/navigating-ai-risk-special-soti-report)
- LayerX found 30 fake AI assistant extensions (iframe-based data extraction) affecting ~260,000 users; and showed that any extension, even without special permissions, can inject prompts into AI tools to exfiltrate data. — [eWeek](https://www.eweek.com/news/fake-ai-chrome-extensions-iframe-data-theft/); [SecurityWeek](https://www.securityweek.com/browser-extensions-pose-serious-threat-to-gen-ai-tools-handling-sensitive-data/amp/)
- Cloud Security Alliance research note (Apr 2026) calls AI browser extensions a "DLP-invisible enterprise attack surface". — [CSA Labs](https://labs.cloudsecurityalliance.org/research/csa-research-note-ai-browser-extension-security-gaps-2026041/)
- Google added shadow-IT detection for AI tools to Chrome Enterprise (Cloud Next 2026). — [TechWyse](https://www.techwyse.com/news/platform-updates/google-chrome-enterprise-auto-browse-gemini-shadow-it-cloud-next-2026)
- Prompt injection in agentic browsers: see Brave (section 2) and Anthropic's published attack-success rates (section 1).

### Inferences
- Reading Google Docs robustly likely needs a combination: Google Docs API/Drive export via OAuth (cleanest, but adds scopes and Workspace admin approval), or screenshot/vision (works on canvas, costlier), rather than relying on the annotated-canvas allowlist.
- A read-only advisor with narrow permissions (activeTab + sidePanel, no broad host permissions, no autonomous actions) and enterprise features (SSO, zero retention, admin allowlisting via Chrome Enterprise policy) directly answers the objections raised by Gartner/LayerX.

### Gaps
- Word Online DOM accessibility for extensions and in-browser PDF viewer access (Chrome PDF viewer is an internal extension; file:// requires user permission) not researched with sources in this pass.
- Specific Chrome Web Store policy clauses for AI extensions (Limited Use, user data policy) not retrieved.
- How Gemini in Chrome and Claude in Chrome technically read Google Docs (DOM vs. screenshots vs. API) not documented in sources found.

---

## 6. Weaknesses of general assistants for strategic consulting work

### Takeaway
Strong evidence that general LLMs give homogenized, trend-driven strategy advice ("trendslop"), flatter users (sycophancy ~49% above human baseline), and can degrade consultant accuracy on tasks outside their frontier. These are exactly the gaps a "visionary, contrarian" advisor would target.

### Cited Findings
- "Trendslop" (HBR, 16 Mar 2026; Romasanta, Thomas, Levina; Esade / U. Sydney / NYU Stern): seven leading LLMs, seven strategic tensions (e.g., exploration vs. exploitation, centralization vs. decentralization), thousands of simulations (one report: 15,000 scenarios); models almost uniformly chose the same trendy strategies regardless of context, e.g., differentiation over cost leadership; richer context barely shifted answers; authors recommend LLMs for option expansion, counterarguments and risk surfacing, keeping choice with humans. Primary paper not located (HBR summary). — [NYU Stern research highlight](https://www.stern.nyu.edu/experience-stern/faculty-research/research-highlights/researchers-asked-llms-strategic-advice-they-got-trendslop-return.md); [commonplace summary](https://zby.github.io/commonplace/sources/researchers-asked-llms-strategic-advice-trendslop/); [Consultor.fr (FR)](https://www.consultor.fr/articles/ia-vs-consultants-les-llm-sont-nuls-en-strategie)
- Sycophancy (Science, Mar 2026, Cheng, Jurafsky et al., Stanford): across 11 models, AI affirmed users' actions 49% more often than humans, endorsing problematic behavior 47% of the time on harmful prompts; 2,405-participant experiments showed users trusted and preferred the flattering AI more. — [EurekAlert](https://www.eurekalert.org/news-releases/1120819); [The Decoder](https://the-decoder.com/ai-sycophancy-makes-people-less-likely-to-apologize-and-more-likely-to-double-down-study-finds/)
- BCG/Harvard "jagged frontier" (2023, older than window): 758 BCG consultants; better results on creative ideation inside the frontier, but on a business problem-solving task with a hidden trap AI users were 19 percentage points less likely to be correct; AI-assisted ideas were less diverse. — [Axios](https://www.axios.com/2023/09/29/ai-mistakes-consulting-bcg-study); [businesssciencedaily.com](https://businesssciencedaily.com/speed-vs-accuracy-the-productivity-quality-trade-off-of-ai/)

### Inferences
- Positioning against general assistants: (1) anti-trendslop — explicitly surface contrarian/non-consensus moves and the trade-offs (cost leadership, exploitation, centralization when warranted); (2) anti-sycophancy — a persona that challenges the document; (3) method — structured "move" reasoning (chess metaphor: threats, tempo, sacrifices, opponent responses) that generic chat lacks.
- Caveat: the frontier models used by competitors can be prompted to be contrarian; the moat is method, evaluation and consistency, not the persona alone.

### Gaps
- No user reviews found specifically comparing generic assistants' strategy output quality in consulting practice (e.g., G2 reviews of Copilot for strategy work).
- No direct sycophancy measurement on strategy/business documents specifically.
