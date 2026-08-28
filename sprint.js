/* ============ AI SPRINT HUB — lanterns, goals, loop, case index ============ */
(function () {
  const $ = id => document.getElementById(id);
  const live = n => SPRINT.cases.find(c => c.n === n && c.status === "live");

  /* ---------------- lanterns (progress) ---------------- */
  const host = $("lanterns");
  const msg = $("lanternMsg");
  $("lanternCount").textContent =
    `${SPRINT.done} of ${SPRINT.total} businesses helped — then I raise the bar`;

  for (let i = 1; i <= SPRINT.total; i++) {
    const c = live(i);
    const lit = i <= SPRINT.done;
    const d = document.createElement(c ? "a" : "button");
    d.className = "lantern" + (lit ? " lit" : "");
    if (c) { d.href = c.page; d.title = c.title; }
    d.setAttribute("aria-label", c ? `Sprint ${i} — ${c.title}` : lit ? `Sprint ${i} — complete` : `Sprint ${i} — open slot`);
    d.innerHTML =
      `<svg viewBox="0 0 44 64" aria-hidden="true">
         <rect x="14" y="2" width="16" height="6" rx="2" class="ln-cap"/>
         <ellipse cx="22" cy="32" rx="18" ry="24" class="ln-body"/>
         <path d="M8 22 Q22 26 36 22 M6 32 Q22 36 38 32 M8 42 Q22 46 36 42" class="ln-ridge" fill="none"/>
         <rect x="14" y="56" width="16" height="6" rx="2" class="ln-cap"/>
         <text x="22" y="38" text-anchor="middle" class="ln-txt">${i}</text>
       </svg>`;
    if (c) {
      d.addEventListener("mouseenter", () => { msg.textContent = `Sprint 0${i} — ${c.title}. ${c.oneliner}`; });
    } else {
      d.addEventListener("click", () => {
        document.querySelectorAll(".lantern").forEach(n => n.classList.remove("sel"));
        d.classList.add("sel");
        msg.innerHTML = `Sprint ${i < 10 ? "0" + i : i} — open slot. Know a small business drowning in one task? <a href="${SPRINT.site}" target="_blank" rel="noopener">Send them here →</a>`;
      });
    }
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

  /* ---------------- case index ---------------- */
  const grid = $("caseGrid");
  SPRINT.cases.filter(c => c.status === "live").forEach(c => {
    const a = document.createElement("a");
    a.className = "case-card open";
    a.href = c.page;
    a.innerHTML = `<span class="cc-n">0${c.n} · ${c.icon}</span><strong>${c.title}</strong><span>${c.oneliner}</span><span class="cc-n" style="margin-top:6px">play the demo →</span>`;
    grid.appendChild(a);
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
