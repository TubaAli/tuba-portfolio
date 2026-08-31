/* ============ SPRINT 03 — Olo: draft → approve → file → promote ============ */
(function () {
  const $ = id => document.getElementById(id);
  const msgs = $("oloMsgs"), nextBtn = $("oloNext"), caption = $("oloCaption");

  /* ---- outline repo files ---- */
  const FILES = ["GOALS.md", "CONSTRAINTS.md", "METHODS.md", "DECISIONS.md", "UNAGREED.md", "TRACKING.md"];
  const filesHost = $("oloFiles");
  FILES.forEach(f => {
    const d = document.createElement("div");
    d.className = "ofile"; d.id = "of-" + f.replace(".md", "");
    d.innerHTML = `<span>📄</span>${f}`;
    filesHost.appendChild(d);
  });
  function fileBadge(name, text, ok, flash) {
    const f = $("of-" + name);
    f.querySelectorAll(".badge").forEach(b => b.remove());
    if (text) {
      const b = document.createElement("span");
      b.className = "badge" + (ok ? " ok" : "");
      b.textContent = text;
      f.appendChild(b);
    }
    if (flash) {
      f.classList.add(ok ? "flash-ok" : "flash");
      setTimeout(() => f.classList.remove("flash", "flash-ok"), 1600);
    }
  }

  /* ---- frequency meter: before = one weekly meeting; with Olo it fills ---- */
  const freq = $("oloFreq");
  const baseline = [64, 0, 0, 0, 0, 0, 0];      /* last week: the meeting */
  const week = [64, 0, 0, 0, 0, 0, 0];          /* this week, fills up   */
  function drawFreq() {
    freq.innerHTML = "";
    baseline.concat(week).forEach((h, i) => {
      const b = document.createElement("i");
      b.style.height = Math.max(h, 4) + "%";
      if (i >= 7 && h > 0 && i > 7) b.classList.add("hot");
      freq.appendChild(b);
    });
  }
  function bumpFreq(day, h, note) {
    week[day] = h; drawFreq();
    if (note) $("oloFreqNote").textContent = note;
  }
  drawFreq();

  /* ---- slack helpers ---- */
  function post(av, initial, who, when, text, cls) {
    const d = document.createElement("div");
    d.className = "smsg" + (cls ? " " + cls : "");
    d.innerHTML = `<span class="av ${av}">${initial}</span>
      <div><span class="who">${who}<span class="when">${when}</span></span><p>${text}</p></div>`;
    msgs.appendChild(d);
    d.scrollIntoView({ behavior: "smooth", block: "nearest" });
    return d;
  }
  function typing() {
    return post("av-olo", "🌱", "Olo", "…",
      `<span class="typing">drafting in Tuba's voice — VOICE.md loaded <i>·</i><i>·</i><i>·</i></span>`);
  }

  /* ---- the scripted morning ---- */
  post("av-joe", "P", "My professor", "9:12",
    "Morning! Two things — can we move the participant survey to next week? " +
    "And I keep thinking the judge model should score with <b>pairwise comparisons</b> instead of absolute ratings. Thoughts?");

  const DRAFT =
    "Next week works — Thursday? I'll shift the ops checklist and update TRACKING. " +
    "On pairwise: I like it. That changes METHODS though, so let's 👍 it properly first — Olo, file it. 🌱";

  let step = 0;
  nextBtn.addEventListener("click", () => {
    if (step === 0) {
      step = 1;
      nextBtn.hidden = true;
      const t = typing();
      setTimeout(() => {
        t.remove();
        $("oloDraftText").textContent = DRAFT;
        $("oloDraft").hidden = false;
        caption.textContent = "A draft, not a message. Nothing has been sent — Olo has no send button at all.";
      }, 1100);
    } else if (step === 2) {
      step = 3;
      nextBtn.hidden = true;
      fileBadge("UNAGREED", "", false, false);
      fileBadge("DECISIONS", "+1", true, true);
      post("av-olo", "🌱", "Olo", "9:21",
        "✅ Both members 👍'd the same resolution — promoted to <b>DECISIONS.md</b>: " +
        "“Judge model scores via pairwise comparisons (Bradley-Terry).” Humans agreed; I just remembered.");
      bumpFreq(3, 58, "with Olo: daily threads instead of a weekly meeting");
      bumpFreq(4, 44);
      caption.textContent = "Agents propose and remind — humans decide. Promotion to DECISIONS.md is human-only, after every member 👍s the same resolution.";
      nextBtn.textContent = "↻ replay the morning";
      nextBtn.hidden = false;
      step = 4;
    } else if (step === 4) {
      location.reload();
    }
  });

  /* ---- protocol v2 · the five-step flow ---- */
  const FLOW = [
    ["💬", "Someone suggests a change", "“should we switch methods?”"],
    ["🗂️", "Agent files it", "an open point, with a proof link"],
    ["👍👍", "Both humans react", "two 👍 = yes · one 🚩 = pause"],
    ["🔀", "Agent merges", "only when every item has both 👍"],
    ["📗", "Human makes it law", "moved into DECISIONS.md"],
  ];
  const flow = $("oloFlow");
  FLOW.forEach((s, i) => {
    if (i) { const a = document.createElement("span"); a.className = "flow-arrow"; a.textContent = "→"; flow.appendChild(a); }
    const d = document.createElement("div");
    d.className = "flow-step";
    d.innerHTML = `<span class="fe">${s[0]}</span><b>${s[1]}</b><span>${s[2]}</span>`;
    flow.appendChild(d);
  });

  /* ---- design philosophy cards ---- */
  const PHIL = [
    ["🧭", "Sync, not science", "The agent handles coordination — never the research itself."],
    ["📁", "Files beat chat", "Not in the six files? Then it's data, not truth."],
    ["✍️", "Agents propose, humans promote", "An agent never writes an agreement itself — it merges only what every stakeholder already 👍'd."],
    ["🔑", "Autonomy is granted, not assumed", "An explicit can / cannot / ask allowlist, widened only as trust grows."],
  ];
  const phil = $("oloPhil");
  PHIL.forEach(s => {
    const d = document.createElement("div");
    d.className = "flow-step";
    d.innerHTML = `<span class="fe">${s[0]}</span><b>${s[1]}</b><span>${s[2]}</span>`;
    phil.appendChild(d);
  });

  /* ---- key decisions ---- */
  const DECISIONS = [
    ["Git repo over shared doc", "Diffs, PRs and permalinks give provenance, review and an audit trail for free."],
    ["Agreed and unagreed live apart", "Promotion (UNAGREED → DECISIONS) is human-only — triggered by both humans 👍-ing the same per-change message."],
    ["Per-item approval threads, not per-PR", "One reaction approves exactly one unit of change."],
    ["No ping storms", "Only goal / constraint / open-point changes ping a human directly; everything else batches into the brief — and agents talk agent-to-agent instead of pinging the other human."],
    ["The humans' emoji stays theirs", "Agents never react 👍 — that signature belongs to humans. The agent's own marker is ✅."],
  ];
  $("oloDecisions").innerHTML = DECISIONS.map((d, i) =>
    `<div class="kd"><span class="kd-n">${i + 1}</span><div><b>${d[0]}</b><p>${d[1]}</p></div></div>`).join("");

  /* ---- roadmap: Shipped → Now → Next → Later ---- */
  const shipped = (SPRINT.cases.find(x => x.slug === "ai-collaborator") || {}).ship || [];
  const ROADMAP = [
    ["✅ Shipped", shipped],
    ["🔨 Now", ["an agent-recommended rulebook for designing agents for this task", "daily scheduled runs — catch changes, resolve old-vs-new conflicts", "collect the numbers: pings/week, flagged items, autonomous completions", "feedback from the human counterparts"]],
    ["🗓️ Next", ["widen the autonomy allowlist as the flagged rate drops", "onboard others at the university facing the same problem", "run multiple projects off the same registry"]],
    ["🔭 Later", ["a richer knowledge base across everyone's research and backgrounds — to surface future research directions", "publish the coordination system itself as a case study — /new-project scaffolds repo, channel, conventions and agent in one command"]],
  ];
  $("oloRoadmap").innerHTML =
    `<div class="huddle-grid">${ROADMAP.map(c =>
      `<div class="hud-col"><h5>${c[0]}</h5>${c[1].map(x => `<span class="chip">${x}</span>`).join("")}</div>`).join("")}
     </div>`;

  /* ---- protocol v2 · rulebook flip cards ---- */
  const RULES = [
    ["📁", "Files beat chat", "If it's not in the six files, it's not agreed. Chat is just talk — the repo is the truth."],
    ["✍️", "Humans hold the pen", "Goals, deadlines, methods, decisions: only humans can change them. Agents may only suggest."],
    ["👍👍", "Two thumbs = yes", "Nothing counts until both humans 👍 the same message. Agents never 👍 — that emoji belongs to humans."],
    ["🚩", "One flag = pause", "Either human can freeze any item with 🚩. It goes back to discussion, no hard feelings."],
    ["🧾", "Show your proof", "Every proposal must link the exact message that caused it. No link, no proposal."],
    ["🔕", "Don't spam the prof", "Only goal, deadline, or open-point changes ping a human right away. Everything else waits for the daily brief."],
    ["🤝", "Agents talk to agents", "Olo never pings my professor. It asks their agent — and that agent decides if a ping is really needed."],
    ["🌅", "One brief a day", "Agreed · Remaining · For Tuba · For my professor. Four lists, once a day, like a stand-up."],
    ["🙋", "Humans still meet", "One weekly sync with no agents in the room. The agents only prepare the agenda."],
    ["📊", "The agent gets graded", "Every 🚩 counts against it. Fewer flags means a better collaborator — we measure it weekly."],
  ];
  const rules = $("oloRules");
  RULES.forEach(r => {
    const c = document.createElement("div");
    c.className = "flip"; c.setAttribute("role", "button"); c.tabIndex = 0;
    c.innerHTML = `<div class="flip-inner">
        <div class="flip-face front"><span class="fe">${r[0]}</span><b>${r[1]}</b><i>tap to flip</i></div>
        <div class="flip-face back">${r[2]}</div>
      </div>`;
    const flipIt = () => c.classList.toggle("flipped");
    c.addEventListener("click", flipIt);
    c.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flipIt(); } });
    rules.appendChild(c);
  });

  /* ---- protocol v2 · the daily huddle board ---- */
  const HUDDLE = [
    ["✅ Agreed", ["pairwise scoring → DECISIONS.md", "survey moved to Thursday"]],
    ["⏳ Remaining", ["session timing test", "draft the stimuli pool"]],
    ["🙋‍♀️ For Tuba", ["pick the native-speaker checker"]],
    ["🙋 For my professor", ["confirm the ethics deadline"]],
  ];
  $("oloHuddle").innerHTML =
    `<div class="huddle-head">🌱 <b>Olo</b> — morning brief <span class="when">8:15</span></div>
     <div class="huddle-grid">${HUDDLE.map(c =>
       `<div class="hud-col"><h5>${c[0]}</h5>${c[1].map(x => `<span class="chip">${x}</span>`).join("")}</div>`).join("")}
     </div>
     <p class="huddle-foot">🤝 Anything that doesn't need a human, Olo answers directly in the other agent's brief thread — so the humans only ever see the lists that need <em>them</em>.</p>`;

  $("oloSend").addEventListener("click", () => {
    const text = $("oloDraftText").textContent.trim() || DRAFT;
    $("oloDraft").hidden = true;
    post("av-tuba", "T", "Tuba", "9:17", text);
    bumpFreq(1, 40, "with Olo: replies go out the same morning");
    bumpFreq(2, 30);
    setTimeout(() => {
      post("av-olo", "🌱", "Olo", "9:18",
        "⚠️ “switch to pairwise comparisons” would change <b>METHODS.md</b> — that's an agreement, not a chat reply. " +
        "Filed to <b>UNAGREED.md</b> and pinged my professor's agent 🤖 for their 👍.");
      fileBadge("UNAGREED", "1", false, true);
      caption.textContent = "Project facts never travel by vibes: anything that changes an agreement is routed to the outline repo.";
      nextBtn.textContent = "👍 Both members agree — promote it";
      nextBtn.hidden = false;
      step = 2;
    }, 900);
  });
})();
