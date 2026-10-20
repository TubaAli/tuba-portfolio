/* ============================================================
   TUBA PORTFOLIO — DATA
   Edit this file to add / remove / move anything.
   No other file needs to change.
   ============================================================ */

/* ---------- COMPASS (Krebs Cycle of Creativity — SDS) ----------
   Quadrants: science (top) → engineering (right) → design (bottom) → art (left)
   Each project: quadrant, t = position within quadrant (0 = counter-clockwise
   edge, 1 = clockwise edge), r = distance from center (0.35–0.95).
*/
const QUADRANTS = {
  science:     { label: "SCIENCE",     output: "produces knowledge",  angle:  90 },
  engineering: { label: "ENGINEERING", output: "produces utility",    angle:   0 },
  design:      { label: "DESIGN",      output: "produces behavior",   angle: 270 },
  art:         { label: "ART",         output: "produces perception", angle: 180 },
};

const PROJECTS = [
  /* --- SCIENCE --- */
  { quadrant: "science", t: 0.50, r: 0.62,
    title: "AI vs Human Care",
    org: "SDS · Chiba Institute of Technology", year: "2026–",
    blurb: "LLM evaluation study benchmarking moral-judgment coherence of open-source LLMs (Llama 4, Qwen 3, DeepSeek R1) and frontier models (Gemini 3.1 Pro, Claude Opus 4.8, GPT-5.5) against human judgment. Bradley-Terry scoring, bootstrap confidence intervals.",
    link: "https://tuba-sds.github.io/Final-APS/APS_Presentation.html" },
  { quadrant: "science", t: 0.22, r: 0.82,
    title: "ICACM 2019 — published research",
    org: "Delhi Technological University", year: "2019",
    blurb: "Peer-reviewed paper; chapter included in the Springer book “Advances in Computing and Intelligent Systems.”" },
  { quadrant: "science", t: 0.85, r: 0.78,
    title: "Rog Alert — outbreak prediction",
    org: "Smart India Hackathon (Winner)", year: "2019",
    blurb: "ML-based application to report, track, and predict disease outbreaks. Winner of India's largest hackathon. Sits on the science–engineering boundary." },

  /* --- ENGINEERING --- */
  { quadrant: "engineering", t: 0.30, r: 0.60,
    title: "Documentation RAG chatbot",
    org: "Rakuten Payment", year: "2025–",
    blurb: "Internal LLM-powered RAG chatbot across Confluence, Box, and Microsoft-ecosystem content (Onyx, Docker, Rakuten LLM gateway). Adopted by ~300 employees, saving ~8 hours per employee weekly." },
  { quadrant: "engineering", t: 0.58, r: 0.48,
    title: "Customer-support AI agent (POC → buy-in)",
    org: "Rakuten Payment", year: "2026–",
    blurb: "Built the working POC with Claude Code, connected via MCP to Box and BigQuery — FAQ grounding, human-escalation logic, privacy-first guardrails. Won executive sponsorship; now in development with the AI team." },
  { quadrant: "engineering", t: 0.80, r: 0.72,
    title: "Rakuten Pay Web SDK",
    org: "Rakuten Payment", year: "2023",
    blurb: "Developer-facing B2B SDK enabling QR payments inside external partner apps; trusted advisor to partner executives and engineering teams." },
  { quadrant: "engineering", t: 0.14, r: 0.86,
    title: "Authentication & risk platform",
    org: "Fast Retailing (Uniqlo)", year: "2020",
    blurb: "Led auth and system-risk detection across 10+ microservice teams; centralized credential audit system built from zero, zero UX regressions." },
  { quadrant: "engineering", t: 0.48, r: 0.90,
    title: "7 granted Japanese patents",
    org: "Payments · advertising · campaign tech", year: "2023–2025",
    blurb: "JP7540062B, JP7603130B1, JP7713543B1, JP7649903B1, JP7749071B1, JP7711276B1, JP7730963B1." },
  { quadrant: "engineering", t: 0.92, r: 0.66,
    title: "AI Sprint — 10 businesses challenge",
    org: "Independent challenge · Tokyo", year: "2026–",
    blurb: "My challenge to help 10 small businesses with AI, free: consult → build → real feedback → improve → ≥95% satisfaction. 5 of 10 complete. Building a library of real industry pain points, an AI-native services playbook — and startups from what we learn. Sits on the engineering–design boundary.",
    link: "sprint.html" },

  /* --- DESIGN --- */
  { quadrant: "design", t: 0.55, r: 0.55,
    title: "FinTech One App",
    org: "Rakuten Payment", year: "2024–",
    blurb: "Six financial services unified into a single UX on a platform serving 50M+ customers. Beta shipped in 4 sprints; executive and 400-employee beta secured investment for full release." },
  { quadrant: "design", t: 0.80, r: 0.72,
    title: "LINE conversational experience",
    org: "Fast Retailing (Uniqlo)", year: "2021",
    blurb: "Personalized in-chat web experience across Uniqlo's 40M-user LINE channel — conversational commerce improving reach, retention, and repeat purchase." },
  { quadrant: "design", t: 0.30, r: 0.80,
    title: "Offline payments — perceived connectivity",
    org: "Rakuten Payment", year: "2024",
    blurb: "Discovery insight: QR visibility creates perceived connectivity. Lab benchmarking and prototype interviews reshaped the UX for low/no-connectivity environments." },
  { quadrant: "design", t: 0.10, r: 0.62,
    title: "QR/barcode scannability standardization",
    org: "Rakuten Payment · 3 partner companies", year: "2026–",
    blurb: "Multi-company standardization program, coordinated end-to-end in Japanese. Sits on the design–engineering boundary." },
  { quadrant: "design", t: 0.92, r: 0.88,
    title: "Self-serve widgets platform",
    org: "Rakuten Payment", year: "2023",
    blurb: "No-code operations dashboard for non-technical business users: +10% click-rate, −50% partner person-hours." },

  /* --- ART --- */
  { quadrant: "art", t: 0.45, r: 0.60,
    title: "VISTORA — AI sign-language translation",
    org: "JITTN", year: "2025–",
    blurb: "Initiated an AI sign-language translation system for children under 6 — technology in service of perception, expression, and inclusion." },
  { quadrant: "art", t: 0.75, r: 0.80,
    title: "Live-Tech Highway",
    org: "JITTN · Salzburg Global", year: "2025–",
    blurb: "Speculative bilateral Japan–India platform for investment and value creation — imagining new cultural and economic corridors." },
  { quadrant: "art", t: 0.15, r: 0.82,
    title: "Cultivating Japan's AI culture",
    org: "WIT Tokyo · AI hackathons", year: "2022–",
    blurb: "Judge at 3 AI hackathons, mentor at 2; lectures at 4 Japanese universities and 20+ Tokyo companies — shaping how a community perceives and practices AI." },
];

/* ---------- NETWORK ----------
   categories drive color (fixed slot order — do not reorder):
   work, education, community, advisory, fellowship, recognition
*/
const CATEGORIES = {
  work:        { label: "Work",         light: "#2a78d6", dark: "#3987e5" },
  education:   { label: "Education",    light: "#1baf7a", dark: "#199e70" },
  community:   { label: "Community",    light: "#eda100", dark: "#c98500" },
  advisory:    { label: "Advisory",     light: "#008300", dark: "#008300" },
  fellowship:  { label: "Fellowship",   light: "#4a3aa7", dark: "#9085e9" },
  recognition: { label: "Recognition",  light: "#e34948", dark: "#e66767" },
  mentors:     { label: "Mentors & Friends", light: "#e87ba4", dark: "#d55181" },
};

/* Organizations are the main view. Click an org node to reveal its people.
   To add a connection (e.g. from LinkedIn): copy a line inside `people`,
   change the name and role, save, push. Empty `people: []` is fine. */
/* ---------- PEOPLE (encrypted) ----------
   The people inside each org are stored encrypted (AES-256-GCM, key derived
   from a passphrase with PBKDF2-SHA256). network.js asks for the passphrase
   and decrypts in the browser; nothing is sent anywhere.
   Rebuild with: node encrypt-people.mjs  (see README) */
const PEOPLE_ENC = {
  kdf: "PBKDF2-SHA256", iterations: 310000, cipher: "AES-GCM",
  salt: "w6m+xDGkQLdvO0af0qqXLA==",
  iv: "l/Ft1HXP86oJIt/5",
  data: "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",
};

const ORGS = [
  { name: "Rakuten Payment", role: "Senior Product Manager, 2023–present", cat: "work",
    people: [], peopleCount: 8 },
  { name: "Fast Retailing (Uniqlo)", role: "PM & Social Platform Lead, 2019–2022", cat: "work",
    people: [], peopleCount: 17 },
  { name: "SDS · Chiba Institute of Technology", role: "Master's in Design and Science, 2026–", cat: "education",
    people: [], peopleCount: 8 },
  { name: "MIT Professional Education", role: "System Thinking certificate, 2024", cat: "education", people: [], peopleCount: 0 },
  { name: "Delhi Technological University", role: "B.Tech Software Engineering, 2015–2019", cat: "education", people: [], peopleCount: 0 },
  { name: "Women in Technology Japan", role: "Technology & Strategy Consultant, 900+ members", cat: "community",
    people: [], peopleCount: 11 },
  { name: "Japan Venture Academy", role: "Coach, 2023 — mentored 15 students", cat: "community", people: [], peopleCount: 0 },
  { name: "Independent AI Projects", role: "Advisor — KK myAshisuto (AI trust architecture) · NEXTPUBLIC (AI/DX, public sector)", cat: "advisory",
    people: [], peopleCount: 3 },
  { name: "JITTN — Nippon Foundation · Salzburg Global",
    role: "Fellow, 2025 Cohort — Japan-India Transformative Technology Network; Project Lead, Live-Tech Highway & VISTORA",
    cat: "fellowship",
    people: [], peopleCount: 19 },
  { name: "Smart India Hackathon", role: "Winner 2019 — Rog Alert", cat: "recognition", people: [], peopleCount: 0 },
  /* add url: "assets/hpair-certificate.pdf" once the certificate file is in assets/ */
  { name: "Harvard Project for Asian and International Relations (HPAIR)", role: "Delegate 2018", cat: "recognition",
    people: [], peopleCount: 7 },
  { name: "Mentors & Friends", role: "People who shaped my journey", cat: "mentors",
    people: [], peopleCount: 12 },
];

/* ---------- AI SPRINT (rendered on sprint.html + one page per case) ----------
   done: how many of the 10 sprints are complete — update this number
   as sprints finish. Cases with status "live" have their own page
   (slug.html) with a full story + playable demo; slots above `done`
   render as open-slot cards linking to the sprint site.              */
const SPRINT = {
  site: "https://tubaali.github.io/ai-sprint/",
  total: 10,
  done: 5,
  goals: [
    { front: "Real pain, real solutions",
      icon: "①",
      back: "Collect industry-specific pain points with real pain and a real solution that works. The process forces honesty: consult → build → collect real feedback → improve → ≥95% satisfaction in a survey. No demo-ware." },
    { front: "An AI-native playbook",
      icon: "②",
      back: "Build a knowledge base of what an AI-native service company is, what it can create, and concrete use cases for it — learned from real businesses, not from decks." },
    { front: "Startups from the learnings",
      icon: "③",
      back: "Build startups out of these learnings — and out of the clients we work with along the way. The 10 sprints are the discovery engine." },
  ],
  /* the loop shown in the process diagram */
  loop: ["Consult", "Build", "Real feedback", "Improve", "≥95% satisfaction"],
  cases: [
    { n: 1, status: "live", slug: "izakaya", page: "izakaya.html", icon: "囲",
      title: "The Izakaya menu",
      tagline: "Sprint 01 — a menu that updates in ten seconds, no AI required",
      oneliner: "A daily hand-written, printed, laminated menu became a 10-second peel-and-stick system. The honest solution had no AI in it.",
      biz: "A 2-person izakaya in Tokyo — a couple in their late 80s, famous for fresh fish",
      pain: "Their menu is dynamic by design: they buy whatever fish is freshest that morning, and if the right catch isn't there, the menu changes. So every single day they hand-wrote the menu, printed it, and laminated it. For two owners in their late 80s, that daily loop was the heaviest task in the shop.",
      insight: "This one didn't need AI — and saying so is the point. The right solution had to match the owners' technical fluency, not our tech stack.",
      solution: "We split every menu into two parts. STATIC — written once, laminated once, forever: set in a large, easy-to-read Japanese font (foreign guests photo-translate the menu with apps, so machine-readability was a design requirement). DYNAMIC — the daily catch on its own laminated sheet, plus custom stickers: 「売り切れ」 (sold out), 「本日なし」 (not today), and dish-photo stickers to cover items. Now a menu update is a 10-second peel-and-stick, not a morning of rewriting.",
      ship: ["two-part menu system", "laminate once, forever", "machine-readable typography", "custom 売り切れ・本日なし stickers", "¥0 running cost", "no app · no login · no AI"],
      links: [] },

    { n: 2, status: "live", slug: "property-pulse", page: "property-pulse.html", icon: "宿",
      title: "PropertyPulse — every property, one truth",
      tagline: "Sprint 02 — three report formats, one dashboard, zero cloud",
      oneliner: "An Airbnb owner drowning in mismatched reports from every property got one local desktop dashboard — and an accountant-ready CSV.",
      biz: "An Airbnb owner in Japan running several guesthouse and hotel properties — each reporting through a different management company, in a different format",
      pain: "Every property spoke its own language: Airbnb transaction CSVs in English, management-company monthly reports as PDFs, daily booking exports in Excel — different columns, different encodings (hello, Shift_JIS), different definitions of “revenue.” Answering “how is the business actually doing?” meant a weekend of copy-paste every month, and the accountant still re-typed everything into 会計ソフト by hand.",
      insight: "The reports were never going to standardize — five companies won't change their formats for one owner. So the tool had to absorb the mess instead: import anything, map columns once, remember the mapping. And because this is someone's complete business finances, it became a local desktop app — SQLite on the owner's own machine, nothing sent to any cloud, AI strictly optional.",
      solution: "PropertyPulse — a desktop app (Mac & Windows, double-click install, nothing else to set up). Drag in any report: Airbnb CSVs are auto-detected and revenue prorated per night of stay; everything else gets a column-mapping screen with saved mappings and optional AI suggestions. Out comes one executive summary — 売上, occupancy, ADR, RevPAR with day / month / year-over-year comparisons, channel mix, property rankings, and properties that need attention — plus a ready-to-import CSV for freee or マネーフォワード, so the accountant's re-typing disappears too.",
      ship: ["Tauri 2 desktop app", "React + TypeScript", "SQLite — local only, no cloud", "Airbnb CSV auto-detect", "Excel / PDF import + column mapping", "Shift_JIS auto-detect", "freee & マネーフォワード export", "Mac + Windows installers"],
      links: [{ label: "▶ dashboard showcase — readingnought.github.io/solutions-portfolio", url: "https://readingnought.github.io/solutions-portfolio/" },
              { label: "github.com/ReadingNought/property-dashboard", url: "https://github.com/ReadingNought/property-dashboard" }] },

    { n: 3, status: "live", slug: "ai-collaborator", page: "ai-collaborator.html", icon: "芽",
      title: "Olo — the AI collaborator",
      tagline: "Sprint 03 — an agent that drafts, remembers, and never decides",
      oneliner: "For my own research team at SDS: a pair of personal agents and a shared source-of-truth repo took us from weekly-meeting cadence to daily threads.",
      story: [
        { k: "Background",
          p: "I'm pursuing my Master's at Chiba Tech (SDS) along with my full-time job as a Product Manager in AI." },
        { k: "The problem",
          p: "My research — “Does an LLM decide who matters the way people do — and does its sense of care hold together?” — runs with my professor and his team, aiming for a paper. Deadlines, redundant documents, emails, fixed processes — spread across Slack, in-person meetings, my machine and a remote university machine. Most of what people waited on were simple yes/no and fact checks that never needed my reply — just a check, to unblock them quickly. A shared doc as source of truth didn't work: it takes effort to read and drifts out of sync. So — what if my assistant could do these tasks automatically?" },
        { k: "Why I chose this problem", hl: true,
          p: "Most of what blocked us wasn't hard thinking — it was operational: fact checks, tracking agreed vs unagreed decisions, redundant documents, deadlines. The shared doc failed because it was pull-based. The problem was never intelligence — it was communication frequency, and faster access to information without effort." },
        { k: "What I built",
          p: "Olo 🌱 — an AI collaborator that lives in our Slack, mirrored by my professor's own agent 🤖. Both are built around a shared outline repo, the single source of truth: GOALS, CONSTRAINTS, METHODS, DECISIONS, UNAGREED, TRACKING. Each agent runs daily: it reads new Slack messages, session logs and open PRs; answers what it can itself, with a citation; and files everything else as per-item 👍 threads. Only when every stakeholder has 👍'd does it merge — carrying the evidence permalink. Each run ends in a daily huddle: done / needs attention / for me / for my professor. Built as a Claude Code agent; mine drafts in my voice, learned from my real messages." },
      ],
      ship: ["Claude Code agents", "Slack drafts — never auto-send", "PERSONA.md — five-element persona", "VOICE.md — my style, from real messages", "outline repo — 6 agreement files", "👍 human-only promotion protocol", "protocol v2 — the ratified agent rulebook", "daily huddle — Agreed / Remaining / For Tuba / For my professor"],
      links: [{ label: "tuba-sds/olo (private)", url: "https://github.com/tuba-sds/olo" },
              { label: "tuba-sds/research-project-outline (private)", url: "https://github.com/tuba-sds/research-project-outline" }] },

    { n: 4, status: "live", slug: "rent-pulse", page: "rent-pulse.html", icon: "賃",
      title: "RentPulse — the 6 a.m. rent check",
      tagline: "Sprint 04 — the rent check that runs before the office wakes up",
      oneliner: "A property-management company with thousands of leases gets a morning list of exactly the units worth a phone call — and a legally-checked notice PDF.",
      biz: "A property-management company responsible for thousands of leases — with renewal deadlines and market drift hiding inside every one of them",
      pain: "Japanese lease law gives you one shot: to raise rent at renewal, the tenant must be notified six months ahead. Across thousands of contracts, the window between “worth acting on” and “legally too late” slips past unnoticed — and nobody has time to check every unit's rent against the market by hand. Under-market units quietly stay under-market for years.",
      insight: "An alert you can't act on is noise. RentPulse raises a renewal alert only inside the 7-to-6-month window — if it's already too late to notify, it stays silent. And the AI proposes but never decides: every market estimate ships with sources and linked comparable listings, and a legal eligibility checklist (借地借家法 §32 and friends) stands between every alert and every letter.",
      solution: "A dashboard that sweeps the whole portfolio every morning at 6:00 JST and surfaces exactly two kinds of alerts: renewal windows opening, and rents that drifted below an AI-researched market range by your chosen threshold — units hit by both are ★ top priority. Click one: market range, proposed rent, comparable listings with real links. Pass the eligibility check, and it generates the formal 賃料改定のお知らせ notice PDF with the six-month deadline validated. Onboarding is drag-and-drop too: マイソク and lease PDFs are auto-extracted into property records.",
      ship: ["Next.js 16 + TypeScript", "SQLite", "node-cron — 6:00 JST daily sweep", "LLM web search — Claude / OpenAI / Gemini", "マイソク・契約書 PDF extraction", "pdf-lib + Noto Sans JP notices", "日英 UI toggle", "CSV export — UTF-8 / Shift_JIS"],
      links: [{ label: "▶ live dashboard — rentpulse.onrender.com (demo data; free tier, give it a minute to wake)", url: "https://rentpulse.onrender.com/" },
              { label: "client build — repo private" }] },

    { n: 5, status: "live", slug: "lp-scout", page: "lp-scout.html", icon: "縁",
      title: "LP Scout — fifteen seconds at dinner",
      tagline: "Sprint 05 — log a future investor before the next dish arrives",
      oneliner: "A venture fund team meeting potential LPs at dinners logs them from Discord in ~15 seconds — and sees who-knows-whom as a live network graph.",
      biz: "A Tokyo venture fund team raising a fund — meeting potential LPs at dinners and conferences, then losing them in pockets: phone notes, memory, nowhere",
      pain: "The moment you meet a potential LP is the moment the data exists — who they are, who introduced you, how warm the conversation felt. By next morning it has evaporated. Nobody opens a CRM at an izakaya table, so prospects lived scattered across the team with no shared picture of who knew whom.",
      insight: "The honest call was about friction and blast radius. Logging had to happen where the team already lives (Discord) and take about fifteen seconds — dropdowns, almost no typing — or it simply wouldn't happen. And a scrappy dinner-table tool must not touch the fund's official systems: deliberately separate, its own database, zero API calls anywhere else. When a prospect actually becomes an LP, a human moves them over.",
      solution: "A Discord slash command, /lp: pick who, where you met, how warm, who knows them — logged before the next dish arrives. Everything lands in one dashboard: a table for the Monday review, and a network graph of who-knows-whom, so “who can reintroduce us?” is a glance instead of a meeting. One Python process runs the entire thing — Discord bot, API, and dashboard — on one small box with SQLite underneath. If the bot ever crashes, the dashboard keeps running.",
      ship: ["FastAPI + uvicorn", "discord.py slash commands", "SQLite — WAL mode", "vanilla JS dashboard — no build step", "vis-network who-knows-whom graph", "one process · zero external services"],
      links: [{ label: "▶ team guide — tubaali.github.io/lp-scout-guide", url: "https://tubaali.github.io/lp-scout-guide/" },
              { label: "client build — repo private" }] },
  ],
};

/* izakaya game: the fish pool the "morning market" draws from */
const SPRINT_FISH = [
  { jp: "本日の刺身盛り",   en: "sashimi of the day",    price: "¥1,800" },
  { jp: "金目鯛の煮付け",   en: "simmered kinmedai",     price: "¥1,400" },
  { jp: "のどぐろ塩焼き",   en: "grilled nodoguro",      price: "¥1,900" },
  { jp: "炙りしめ鯖",       en: "seared shime-saba",     price: "¥900"  },
  { jp: "鰹のたたき",       en: "katsuo tataki",         price: "¥1,100" },
  { jp: "銀鱈西京焼き",     en: "gindara saikyō-yaki",   price: "¥1,300" },
  { jp: "岩牡蠣",           en: "iwagaki oyster",        price: "¥800"  },
  { jp: "鯵フライ",         en: "aji furai",             price: "¥750"  },
  { jp: "太刀魚の炙り",     en: "seared tachiuo",        price: "¥1,000" },
  { jp: "帆立バター焼き",   en: "hotate butter-yaki",    price: "¥950"  },
];

/* izakaya game: the static (laminate-once) side of the menu */
const SPRINT_STATIC = [
  { jp: "生ビール",       en: "draft beer",       price: "¥600" },
  { jp: "日本酒 冷・燗", en: "sake, cold / hot", price: "¥700" },
  { jp: "枝豆",           en: "edamame",          price: "¥400" },
  { jp: "だし巻き玉子",   en: "dashimaki tamago", price: "¥550" },
  { jp: "ポテトサラダ",   en: "potato salad",     price: "¥450" },
  { jp: "焼きおにぎり",   en: "yaki onigiri",     price: "¥350" },
];

/* ---------- PROFILE SECTIONS (rendered on the compass page) ---------- */
const EXPERIENCE = [
  { role: "Senior Product Manager, Frontend Product Group", org: "Rakuten Payment, Inc.", period: "2024 – Present",
    note: "FinTech One App unifying 6 financial services on a 50M+ user platform; leading an LLM-based customer-support AI agent from POC to executive buy-in; shipped an internal RAG documentation chatbot used by ~300 employees." },
  { role: "Product Manager, Cross-Service Group", org: "Rakuten Payment, Inc.", period: "2023 – 2024",
    note: "B2B widgets platform (+10% click-rate, −50% partner person-hours); Rakuten Pay Web SDK for external partner apps." },
  { role: "Product Manager & Social Platform Lead, Core Engineering", org: "Fast Retailing (Uniqlo)", period: "2021 – 2022",
    note: "Conversational customer channel on LINE across Uniqlo's 40M-user base — reach, retention, and repeat purchase." },
  { role: "Associate Product Manager, Core Engineering", org: "Fast Retailing (Uniqlo)", period: "2020 – 2021",
    note: "Authentication and system-risk detection across 10+ microservice teams; centralized credential audit from zero." },
  { role: "Associate IT Strategist, Office of the CTO", org: "Fast Retailing (Uniqlo)", period: "2019 – 2020",
    note: "Uniqlo India launch from Japan — 30K MAUs in year one; AR/3D retail pilots with 10+ startups." },
];

const CERTIFICATIONS = [
  { name: "System Thinking — Professional Certificate (2.25 CEUs)", org: "MIT Professional Education", year: "2024" },
  { name: "JLPT N2 — business-level Japanese", org: "Japanese-Language Proficiency Test", year: "" },
  { name: "IELTS Academic — Overall Band 8.0", org: "British Council", year: "2023" },
  { name: "Blockchain: Beyond the Basics (2.8 CPE, NASBA)", org: "LinkedIn Learning", year: "2022" },
  { name: "GirlScript Summer of Code — Certificate of Recognition", org: "GirlScript Foundation", year: "2018" },
  { name: "Virtual Mentorship Program for Women in Technology — Mentee", org: "WooTech", year: "2018" },
];

const VOLUNTEERING = [
  { role: "Technology & Strategy Consultant", org: "Women in Technology Japan", period: "2022 – Present",
    note: "900+ member community; lectures at 4 Japanese universities and 20+ Tokyo companies; 10+ mentees." },
  { role: "AI Hackathon Judge & Mentor", org: "Japan's AI community", period: "2023 – Present",
    note: "Judge at 3 AI hackathons, mentor at 2; active in AI safety workshops and Rakuten's AI conference." },
  { role: "Coach", org: "Japan Venture Academy", period: "2023",
    note: "Mentored 15 students on product frameworks, design thinking, customer empathy, and A/B testing." },
  { role: "Initiator, VISTORA · Project Lead, Live-Tech Highway", org: "JITTN — Nippon Foundation · Salzburg Global", period: "2025 – Present",
    note: "AI sign-language translation for children under 6; Japan–India bilateral technology platform." },
  { role: "Volunteer Teacher — 'Teach for India' campaign", org: "NSS-DTU · Youth for Seva", period: "2016",
    note: "Recognized for distinguished service teaching underserved students (Apr–Aug 2016)." },
];
