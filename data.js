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
const ORGS = [
  { name: "Rakuten Payment", role: "Senior Product Manager, 2023–present", cat: "work",
    people: [
      { name: "Fernando Paulo",  role: "CTO & Senior Executive Officer",              url: "https://www.linkedin.com/in/fpaulo/" },
      { name: "Louise Jones",    role: "Senior Manager, Cross Service Development",   url: "https://www.linkedin.com/in/louisemcjones/" },
      { name: "Julien Cayzac",   role: "Distinguished Software Engineer & Architect", url: "https://www.linkedin.com/in/jcayzac/" },
      { name: "Ai Uyen Luong",   role: "Rakuten Payment",                             url: "https://jp.linkedin.com/in/ai-uyen-luong-698256183" },
      { name: "Diego Branco",    role: "Creative & Design",                           url: "https://www.linkedin.com/in/diego-branco/" },
      { name: "Daniel Orenes Ferrández", role: "Conversational AI (ex-Rakuten; now Uber Japan)", url: "https://www.linkedin.com/in/danielorenesferrandez/" },
      { name: "Jaivardhan Lal",  role: "Data & CX (ex-Rakuten Payment; now NTT Data)", url: "https://jp.linkedin.com/in/jaivardhan-lal" },
      { name: "Judson Gabriel George", role: "Vision ML Engineer (ex-Rakuten; now Blackstraw)", url: "https://in.linkedin.com/in/judson-gabriel-george-13564388" },
    ] },
  { name: "Fast Retailing (Uniqlo)", role: "PM & Social Platform Lead, 2019–2022", cat: "work",
    people: [
      { name: "Takahiro Tambara", role: "Group Executive Officer, CIO",           url: "https://uk.linkedin.com/in/takahiro-tambara-425599132" },
      { name: "Shinpei Ohtani",   role: "CTO / Technical Director",               url: "https://jp.linkedin.com/in/shinpeiohtani" },
      { name: "Makoto Hoketsu",   role: "ex-CSO/CIO/CTO; now VP & CIO, Eisai",    url: "https://jp.linkedin.com/in/mhoketsu" },
      { name: "Mayank Shukla",    role: "Principal Strategist",                   url: "https://www.linkedin.com/in/shukla3/" },
      { name: "Umang Chauhan",    role: "Product (UNIQLO)",                       url: "https://www.linkedin.com/in/thisumang/" },
      { name: "Takuya Tatsumi",   role: "Frontend Infrastructure Manager",        url: "https://jp.linkedin.com/in/takuya-tatsumi-a64598a3" },
      { name: "Thomas Karsten",   role: "Engineering Manager",                    url: "https://jp.linkedin.com/in/thomaskarsten" },
      { name: "Takashi Ishikawa", role: "Store DX & RFID lead (10+ years)",       url: "https://www.linkedin.com/in/takashi-ishikawa-b8783357/" },
      { name: "Maruti Nandan Sharma", role: "Manager, Uniqlo LINE mini-app (now Mercari)", url: "https://www.linkedin.com/in/maruti-nandan-sharma-81029934/" },
      { name: "Pankaj Ajwani",    role: "Manager, Engineering / Product",         url: "https://www.linkedin.com/in/pankaj-ajwani-0409/" },
      { name: "Swapnil Satpute",  role: "Manager, Engineering",                   url: "https://jp.linkedin.com/in/swapnil-satpute-7b670a51" },
      { name: "Takahito Yasuno",  role: "Director of EC, 2018–2022" },
      { name: "Steven Rose",      role: "Fast Retailing" },
      { name: "Vijay Kumar",      role: "Fast Retailing" },
      { name: "Faiz Alam",        role: "Fast Retailing" },
      { name: "Ruijie Zhang",     role: "Project Manager" },
      { name: "Manesh Patil",     role: "Technical Product Manager, eCommerce" },
    ] },
  { name: "SDS · Chiba Institute of Technology", role: "Master's in Design and Science, 2026–", cat: "education",
    people: [
      { name: "Joichi Ito",             role: "President, Chiba Institute of Technology · Co-Founder, Digital Garage · ex-Director, MIT Media Lab", url: "https://jp.linkedin.com/in/joiito" },
      { name: "Mizuki Oka",             role: "Engineer of Artificial Life" },
      { name: "Catharina Maracke",      role: "Legal Scholar of Digital Governance" },
      { name: "Daum Kim",               role: "Designer of Digital Culture" },
      { name: "Hiroki Kojima",          role: "Scientist of Life & Information" },
      { name: "Ira Winder",             role: "Engineer of Emergence & Complexity" },
      { name: "Joseph Austerweil",      role: "Scientist of Cognition & Machine Learning" },
      { name: "Sputniko! (Hiromi Ozaki)", role: "Designer of Speculative Futures" },
    ] },
  { name: "MIT Professional Education", role: "System Thinking certificate, 2024", cat: "education", people: [] },
  { name: "Delhi Technological University", role: "B.Tech Software Engineering, 2015–2019", cat: "education", people: [] },
  { name: "Women in Technology Japan", role: "Technology & Strategy Consultant, 900+ members", cat: "community",
    people: [ /* from womenintech.jp/team */
      { name: "Annie Chang",       role: "Founder / President",       url: "https://www.linkedin.com/in/anniechangwitj/" },
      { name: "Maaya Sato",        role: "Marketing / PR Manager",    url: "https://www.linkedin.com/in/maayasato/" },
      { name: "Cali Matsunaga",    role: "Data Analyst / Web Manager",url: "https://www.linkedin.com/in/cali-shizuru-matsunaga/" },
      { name: "Nana Kawaguchi",    role: "Partnership Manager",       url: "https://www.linkedin.com/in/nana-kawaguchi/" },
      { name: "Kana Ono",          role: "Data Analyst / Writer",     url: "https://www.linkedin.com/in/kana-ono/" },
      { name: "Xinmei Cai",        role: "Senior Advisor",            url: "https://www.linkedin.com/in/xinmeic/" },
      { name: "Rutsuko Yoshida",   role: "Mentor",                    url: "https://www.linkedin.com/in/rutsuko/" },
      { name: "Yumiko Inoue",      role: "Mentor" },
      { name: "Miho Aoki",         role: "Mentor",                    url: "https://www.linkedin.com/in/miho-aoki-0097001a/" },
      { name: "Makiko Clapper",    role: "Mentor",                    url: "https://www.linkedin.com/in/makiko-clapper-34891721/" },
      { name: "Kristina Janjetic", role: "Mentor",                    url: "https://www.linkedin.com/in/kristinajanjetic/" },
    ] },
  { name: "Japan Venture Academy", role: "Coach, 2023 — mentored 15 students", cat: "community", people: [] },
  { name: "Independent AI Projects", role: "Advisor — KK myAshisuto (AI trust architecture) · NEXTPUBLIC (AI/DX, public sector)", cat: "advisory",
    people: [
      { name: "Cali Matsunaga", role: "Founder & CEO, KK myAshisuto", url: "https://www.linkedin.com/in/cali-shizuru-matsunaga/" },
      { name: "Shoto Terui",    role: "Director & CFO, NEXTPUBLIC",   url: "https://shototerui.com/" },
    ] },
  { name: "JITTN — Nippon Foundation · Salzburg Global",
    role: "Fellow, 2025 Cohort — Japan-India Transformative Technology Network; Project Lead, Live-Tech Highway & VISTORA",
    cat: "fellowship",
    people: [ /* 2025 cohort — salzburgglobal.org; nodes link to a LinkedIn name search (replace url with exact profiles anytime) */
      { name: "Arwa Borsadwala", role: "Industrial Designer, JVCKENWOOD Design" },
      { name: "Takeshi Hidaka", role: "Director, Obuse Town Innovation HUB" },
      { name: "Tomokazu Iwabuchi", role: "CEO, Urbanix Co., Ltd." },
      { name: "Juhi Jain", role: "Associate Director, Busara" },
      { name: "Pawani Khandelwal", role: "Founder, Aatm Nirbhar Learning" },
      { name: "Neha Malhotra", role: "Founder & Managing Partner, MeritX Ventures" },
      { name: "Makoto Matsuura", role: "Director, G-experience LLC" },
      { name: "Misaki Murase", role: "Global Shapers Community, Yokohama Hub" },
      { name: "Kenji Narushima", role: "Senior Director, Ridecell" },
      { name: "Yoshifumi Nin", role: "President, ASHA" },
      { name: "Jennifer Pandiyan", role: "Founder & CEO, Thales Cleantech" },
      { name: "Dinesh Rathod", role: "Electrical Design Engineer, EBARA" },
      { name: "Avinash Sosale", role: "Managing Director, Stanzen Engineering" },
      { name: "Shingo Takemoto", role: "Board Chairman, SOCIAL DESIGNERS FOR D." },
      { name: "Yuki Takishima", role: "VP of Social Impact Design, READYFOR" },
      { name: "Nikita Tiwari", role: "Senior Research Manager, Sambodhi" },
      { name: "Yusuke Yasude", role: "CEO, Kizuki Co., Ltd." },
    ] },
  { name: "Smart India Hackathon", role: "Winner 2019 — Rog Alert", cat: "recognition", people: [] },
  /* add url: "assets/hpair-certificate.pdf" once the certificate file is in assets/ */
  { name: "Harvard Project for Asian and International Relations (HPAIR)", role: "Delegate 2018", cat: "recognition", people: [] },
  { name: "Mentors & Friends", role: "People who shaped my journey", cat: "mentors",
    people: [
      { name: "Santanu Bhattacharya", role: "Chief Technologist, NatWest · Visiting Professor, IISc · Co-Founder, S20.AI", url: "https://www.linkedin.com/in/santanub/" },
      { name: "Annie Chang",     role: "Founder / President, Women in Technology Japan", url: "https://www.linkedin.com/in/anniechangwitj/" },
      { name: "Sandeep Casi",    role: "Head of Ibex APAC · Partner at Antler · ex-Fujifilm, ex-Fuji Xerox" },
      { name: "Kaori Rei",       role: "Building AI adoption programs across Tokyo, SF & NYC" },
      { name: "Jigyasa Grover",  role: "ML @ Uber · Google Developer Advisory Board" },
      { name: "Akshi Kumar",     role: "AI academic — online safety, digital trust & responsible AI" },
      { name: "Lena Ryuji",      role: "Designs and drives Diversity, Equity & Inclusion programs" },
      { name: "Jeff Heilman",    role: "Founder & operator — 7 exits, $5B in market cap" },
      { name: "Nidhi Sharma",    role: "Computer Scientist, Adobe", url: "https://www.linkedin.com/in/nidhi1997/" },
      { name: "Aarushi Gupta",   role: "Machine Learning Engineer, Adobe", url: "https://www.linkedin.com/in/aarushi-gupta-10251401/" },
      { name: "Pavana Gupta",    role: "Senior Associate, Boston Consulting Group", url: "https://www.linkedin.com/in/pavana-gupta/" },
      { name: "Mansi Khemka",    role: "Software Engineer II, Microsoft", url: "https://www.linkedin.com/in/mansi-khemka/" },
    ] },
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
