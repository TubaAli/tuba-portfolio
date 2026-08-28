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
  post("av-joe", "J", "Joe", "9:12",
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

  $("oloSend").addEventListener("click", () => {
    const text = $("oloDraftText").textContent.trim() || DRAFT;
    $("oloDraft").hidden = true;
    post("av-tuba", "T", "Tuba", "9:17", text);
    bumpFreq(1, 40, "with Olo: replies go out the same morning");
    bumpFreq(2, 30);
    setTimeout(() => {
      post("av-olo", "🌱", "Olo", "9:18",
        "⚠️ “switch to pairwise comparisons” would change <b>METHODS.md</b> — that's an agreement, not a chat reply. " +
        "Filed to <b>UNAGREED.md</b> and pinged AIJoe 🤖 for Joe's 👍.");
      fileBadge("UNAGREED", "1", false, true);
      caption.textContent = "Project facts never travel by vibes: anything that changes an agreement is routed to the outline repo.";
      nextBtn.textContent = "👍 Both members agree — promote it";
      nextBtn.hidden = false;
      step = 2;
    }, 900);
  });
})();
