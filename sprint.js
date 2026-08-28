/* ============ AI SPRINT — lanterns, goals, loop, izakaya game ============ */
(function () {
  const $ = id => document.getElementById(id);

  /* ---------------- lanterns (progress) ---------------- */
  const host = $("lanterns");
  const msg = $("lanternMsg");
  $("lanternCount").textContent =
    `${SPRINT.done} of ${SPRINT.total} businesses helped — then I raise the bar`;

  for (let i = 1; i <= SPRINT.total; i++) {
    const lit = i <= SPRINT.done;
    const d = document.createElement("button");
    d.className = "lantern" + (lit ? " lit" : "");
    d.setAttribute("aria-label", lit ? `Sprint ${i} — complete` : `Sprint ${i} — open slot`);
    d.innerHTML =
      `<svg viewBox="0 0 44 64" aria-hidden="true">
         <rect x="14" y="2" width="16" height="6" rx="2" class="ln-cap"/>
         <ellipse cx="22" cy="32" rx="18" ry="24" class="ln-body"/>
         <path d="M8 22 Q22 26 36 22 M6 32 Q22 36 38 32 M8 42 Q22 46 36 42" class="ln-ridge" fill="none"/>
         <rect x="14" y="56" width="16" height="6" rx="2" class="ln-cap"/>
         <text x="22" y="38" text-anchor="middle" class="ln-txt">${i}</text>
       </svg>`;
    d.addEventListener("click", () => {
      document.querySelectorAll(".lantern").forEach(n => n.classList.remove("sel"));
      d.classList.add("sel");
      if (i === 1) {
        msg.textContent = "Sprint 01 — the izakaya menu. Story and playable demo below ↓";
        document.querySelector(".izakaya").scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (lit) {
        msg.textContent = `Sprint 0${i} — complete. Story coming soon; I write them up one at a time.`;
      } else {
        msg.innerHTML = `Sprint ${i < 10 ? "0" + i : i} — open slot. Know a small business drowning in one task? <a href="${SPRINT.site}" target="_blank" rel="noopener">Send them here →</a>`;
      }
    });
    host.appendChild(d);
  }

  /* ---------------- goals (flip cards) ---------------- */
  const goals = $("goals");
  SPRINT.goals.forEach(g => {
    const card = document.createElement("button");
    card.className = "goal-card";
    card.innerHTML =
      `<span class="goal-inner">
         <span class="goal-face goal-front"><span class="goal-icon">${g.icon}</span><span>${g.front}</span><span class="goal-hint">tap to flip</span></span>
         <span class="goal-face goal-back">${g.back}</span>
       </span>`;
    card.addEventListener("click", () => card.classList.toggle("flipped"));
    goals.appendChild(card);
  });

  /* ---------------- process loop (svg) ---------------- */
  (function loop() {
    const svg = $("loopSvg");
    const NS = "http://www.w3.org/2000/svg";
    const el = (n, a, p) => {
      const x = document.createElementNS(NS, n);
      for (const k in a) x.setAttribute(k, a[k]);
      (p || svg).appendChild(x);
      return x;
    };
    const steps = SPRINT.loop;
    const n = steps.length, y = 84, x0 = 80, x1 = 820;
    const gap = (x1 - x0) / (n - 1);
    const m = el("marker", { id: "loopArrow", viewBox: "0 0 8 8", refX: 6, refY: 4, markerWidth: 6, markerHeight: 6, orient: "auto" });
    el("path", { d: "M0,0 L8,4 L0,8 z", fill: "var(--muted)" }, m);
    steps.forEach((s, i) => {
      const x = x0 + gap * i;
      const last = i === n - 1;
      el("circle", { cx: x, cy: y, r: 26, fill: last ? "var(--q-engineering)" : "var(--surface)", stroke: last ? "var(--q-engineering)" : "var(--baseline)", "stroke-width": 1.6 });
      const t = el("text", { x, y: y + 5, "text-anchor": "middle", "font-size": 15, "font-weight": 700, fill: last ? "var(--surface)" : "var(--ink)" });
      t.textContent = i + 1;
      const lbl = el("text", { x, y: y + 52, "text-anchor": "middle", "font-size": 12.5, fill: "var(--ink-2)" });
      lbl.textContent = s;
      if (i < n - 1) el("line", { x1: x + 32, y1: y, x2: x + gap - 32, y2: y, stroke: "var(--baseline)", "stroke-width": 1.4, "marker-end": "url(#loopArrow)" });
    });
    /* the honesty loop: below 95% → back to improve/consult */
    el("path", {
      d: `M ${x1 - 8} ${y - 26} C ${x1 - 40} ${y - 78}, ${x0 + 40} ${y - 78}, ${x0 + 8} ${y - 26}`,
      fill: "none", stroke: "var(--baseline)", "stroke-width": 1.4, "stroke-dasharray": "4 5", "marker-end": "url(#loopArrow)"
    });
    const back = el("text", { x: (x0 + x1) / 2, y: y - 62, "text-anchor": "middle", "font-size": 11.5, fill: "var(--muted)" });
    back.textContent = "below 95%? go around again";
  })();

  /* ---------------- case 01 story ---------------- */
  const c1 = SPRINT.cases.find(c => c.status === "live");
  $("caseStory").innerHTML =
    `<div class="story-block"><span class="story-k">The business</span><p>${c1.biz}.</p></div>
     <div class="story-block"><span class="story-k">The pain</span><p>${c1.pain}</p></div>
     <div class="story-block insight"><span class="story-k">The honest call</span><p>${c1.insight}</p></div>
     <div class="story-block"><span class="story-k">The solution</span><p>${c1.solution}</p></div>`;

  /* ---------------- izakaya game ---------------- */
  const STICKERS = [
    { type: "sold",    jp: "売り切れ", en: "SOLD OUT" },
    { type: "notoday", jp: "本日なし", en: "not today" },
    { type: "photo",   jp: "🐟",       en: "dish photo" },
  ];
  const DYN_COUNT = 5;
  let dayNo = 1;

  const staticUl = $("staticMenu");
  SPRINT_STATIC.forEach(it => {
    const li = document.createElement("li");
    li.className = "menu-item";
    li.innerHTML = `<span class="mi-jp">${it.jp}</span><span class="mi-en">${it.en}</span><span class="mi-price">${it.price}</span>`;
    staticUl.appendChild(li);
  });

  const dynUl = $("dynamicMenu");
  const caption = $("izCaption");

  function todaysCatch() {
    const pool = SPRINT_FISH.slice();
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, DYN_COUNT);
  }

  function renderDay() {
    dynUl.innerHTML = "";
    todaysCatch().forEach(it => {
      const li = document.createElement("li");
      li.className = "menu-item dyn-item";
      li.innerHTML = `<span class="mi-jp">${it.jp}</span><span class="mi-en">${it.en}</span><span class="mi-price">${it.price}</span>`;
      dynUl.appendChild(li);
    });
    $("dayNote").textContent = `Day ${dayNo} — whatever was freshest at the market this morning.`;
    caption.innerHTML = "&nbsp;";
  }

  function coveredCount() {
    return dynUl.querySelectorAll(".sticker.applied").length;
  }
  function updateCaption() {
    const n = coveredCount();
    if (n === 0) caption.innerHTML = "&nbsp;";
    else if (n < DYN_COUNT) caption.textContent = `${n} item${n > 1 ? "s" : ""} updated in seconds — nothing rewritten, nothing reprinted.`;
    else caption.textContent = "閉店ガラガラ — everything's gone! In the old world, tomorrow meant rewriting the whole menu. Now: peel the stickers off.";
  }

  /* tray */
  const tray = $("tray");
  STICKERS.forEach(s => {
    const d = document.createElement("div");
    d.className = `sticker st-${s.type}`;
    d.dataset.type = s.type;
    d.innerHTML = `<b>${s.jp}</b><i>${s.en}</i>`;
    tray.appendChild(d);
  });

  /* drag: pointer events, works for touch + mouse */
  let ghost = null, ghostType = null;
  tray.addEventListener("pointerdown", e => {
    const src = e.target.closest(".sticker");
    if (!src) return;
    e.preventDefault();
    ghostType = src.dataset.type;
    ghost = src.cloneNode(true);
    ghost.classList.add("dragging");
    document.body.appendChild(ghost);
    moveGhost(e);
  });
  function moveGhost(e) {
    if (!ghost) return;
    ghost.style.left = e.clientX + "px";
    ghost.style.top = e.clientY + "px";
  }
  window.addEventListener("pointermove", e => { if (ghost) { e.preventDefault(); moveGhost(e); } }, { passive: false });
  window.addEventListener("pointerup", e => {
    if (!ghost) return;
    ghost.style.display = "none";
    const under = document.elementFromPoint(e.clientX, e.clientY);
    const item = under && under.closest(".dyn-item");
    ghost.remove(); ghost = null;
    if (item && !item.querySelector(".sticker.applied")) {
      const s = STICKERS.find(x => x.type === ghostType);
      const applied = document.createElement("button");
      applied.className = `sticker applied st-${s.type}`;
      applied.title = "click to peel off";
      applied.style.setProperty("--rot", (Math.random() * 10 - 5).toFixed(1) + "deg");
      applied.innerHTML = `<b>${s.jp}</b><i>${s.en}</i>`;
      applied.addEventListener("click", () => { applied.remove(); updateCaption(); });
      item.appendChild(applied);
      updateCaption();
    }
    ghostType = null;
  });

  $("newDay").addEventListener("click", () => { dayNo++; renderDay(); });
  $("oldWorld").addEventListener("click", () => {
    const p = $("oldWorldPanel");
    p.hidden = !p.hidden;
    $("oldWorld").textContent = p.hidden ? "See their old morning" : "Hide the old morning";
  });

  renderDay();

  /* ---------------- other cases grid ---------------- */
  const grid = $("caseGrid");
  SPRINT.cases.filter(c => c.status === "soon").forEach(c => {
    const d = document.createElement("div");
    d.className = "case-card soon";
    d.innerHTML = `<span class="cc-n">0${c.n}</span><strong>Sprint complete</strong><span>story coming soon</span>`;
    grid.appendChild(d);
  });
  for (let i = SPRINT.done + 1; i <= SPRINT.total; i++) {
    const a = document.createElement("a");
    a.className = "case-card open";
    a.href = SPRINT.site;
    a.target = "_blank";
    a.rel = "noopener";
    a.innerHTML = `<span class="cc-n">${i < 10 ? "0" + i : i}</span><strong>Open slot</strong><span>apply on the sprint page →</span>`;
    grid.appendChild(a);
  }
})();
