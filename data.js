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
};

/* Organizations are the main view. Click an org node to reveal its people.
   To add a connection (e.g. from LinkedIn): copy a line inside `people`,
   change the name and role, save, push. Empty `people: []` is fine. */
const ORGS = [
  { name: "Rakuten Payment", role: "Senior Product Manager, 2023–present", cat: "work",
    people: [
      { name: "Hiroshi Mikitani", role: "Chairman & CEO, Rakuten Group" },
      /* { name: "ADD FROM LINKEDIN", role: "their role" }, */
    ] },
  { name: "Fast Retailing (Uniqlo)", role: "PM & Social Platform Lead, 2019–2022", cat: "work",
    people: [
      { name: "Tadashi Yanai", role: "Chairman & CEO, Fast Retailing" },
      /* { name: "ADD FROM LINKEDIN", role: "their role" }, */
    ] },
  { name: "SDS · Chiba Institute of Technology", role: "Master's in Design and Science, 2026–", cat: "education",
    people: [
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
      { name: "Abir Bhakta", role: "Executive, EnAble India" },
      { name: "Nidhi Bhasin", role: "CEO, Digital Green Trust" },
      { name: "Arwa Borsadwala", role: "Industrial Designer, JVCKENWOOD Design" },
      { name: "Siddarth Daga", role: "Co-Founder & Chief Impact Officer, NeoMotion" },
      { name: "Ayako Fujiwara", role: "Lead Service Designer, EPAM Systems" },
      { name: "Tomofumi Fukamiya", role: "CEO, The Elements" },
      { name: "Ai Grant", role: "Teacher & Event Planner, Tosa Juku" },
      { name: "Takeshi Hidaka", role: "Director, Obuse Town Innovation HUB" },
      { name: "Tomokazu Iwabuchi", role: "CEO, Urbanix Co., Ltd." },
      { name: "Pragya Jain", role: "Senior Research Manager, Ipsos" },
      { name: "Juhi Jain", role: "Associate Director, Busara" },
      { name: "Junichi Kanebako", role: "Associate Professor, Kobe Design University" },
      { name: "Pawani Khandelwal", role: "Founder, Aatm Nirbhar Learning" },
      { name: "Mio Kitajima", role: "Medical Doctor, Japan Self-Defense Forces" },
      { name: "Masayuki Kubota", role: "Director, Lean on Me Inc." },
      { name: "Neha Malhotra", role: "Founder & Managing Partner, MeritX Ventures" },
      { name: "Makoto Matsuura", role: "Director, G-experience LLC" },
      { name: "Anish Michael", role: "Lead, Centre for Future Mobility, OMI Foundation" },
      { name: "Swagatika Mishra", role: "Assistant Professor, Sri Sri University" },
      { name: "Sayomdeb Mukherjee", role: "Senior Manager, EnAble India" },
      { name: "Misaki Murase", role: "Global Shapers Community, Yokohama Hub" },
      { name: "Asmita Naik Africawala", role: "Senior Manager, Ambuja Foundation" },
      { name: "Kenji Narushima", role: "Senior Director, Ridecell" },
      { name: "Yoshifumi Nin", role: "President, ASHA" },
      { name: "Asami Okada", role: "Founder, Welsib" },
      { name: "Bhargav Padhiyar", role: "Founder & Design Lead, Studio IF" },
      { name: "Meghana Rao Pahlajani", role: "Technical Lead, 2030 WRG, World Bank" },
      { name: "Archana Pandey", role: "Founder, Aaryavart Centre for Autism" },
      { name: "Jennifer Pandiyan", role: "Founder & CEO, Thales Cleantech" },
      { name: "Ashish Pandya", role: "Lead Consultant, ideaship Inc." },
      { name: "Dinesh Rathod", role: "Electrical Design Engineer, EBARA" },
      { name: "Hikari Sandhu", role: "President, MusicAid LLC" },
      { name: "Dhiraj Santdasani", role: "Technical Advisor, C40 Cities" },
      { name: "Bhavisha Prakashbhai Sheth", role: "COO, Technology Enabling Centre, BITS" },
      { name: "Veeresh Singh", role: "CEO, NIFientreC" },
      { name: "Neha Soneji", role: "Program Director, Tech Mahindra Foundation" },
      { name: "Avinash Sosale", role: "Managing Director, Stanzen Engineering" },
      { name: "Shingo Takemoto", role: "Board Chairman, SOCIAL DESIGNERS FOR D." },
      { name: "Yuki Takishima", role: "VP of Social Impact Design, READYFOR" },
      { name: "Nikita Tiwari", role: "Senior Research Manager, Sambodhi" },
      { name: "Mai Tomabechi", role: "Director, Mirairo Inc." },
      { name: "Ryo Toyoda", role: "Data Scientist, AKKODiS Consulting" },
      { name: "Rie Toyomoto", role: "Assistant Professor, Kyoto University" },
      { name: "Aman Trehan", role: "VP, Institutional Partnerships, PropEquity" },
      { name: "Philip Varghese", role: "Assistant Professor, Christ University" },
      { name: "Eri Yamamoto", role: "Director, Nippon Foundation Parasports Support Center" },
      { name: "Yusuke Yasude", role: "CEO, Kizuki Co., Ltd." },
    ] },
  { name: "Smart India Hackathon", role: "Winner 2019 — Rog Alert", cat: "recognition", people: [] },
  { name: "Harvard Project for Asian and International Affairs", role: "Delegate 2018", cat: "recognition", people: [] },
];
