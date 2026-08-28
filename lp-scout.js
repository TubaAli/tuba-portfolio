/* ============ SPRINT 05 — LP Scout: /lp in ~15 seconds, table + graph ============ */
(function () {
  const $ = id => document.getElementById(id);
  const msgs = $("lpMsgs"), cmd = $("lpCmd"), rows = $("lpRows"), caption = $("lpCaption");

  const TEAM = {
    kai:  { nm: "Kai",  sub: "GP",        x: 165, y: 150 },
    mina: { nm: "Mina", sub: "partner",   x: 340, y: 85  },
    taro: { nm: "Taro", sub: "associate", x: 420, y: 215 },
  };
  const PROSPECTS = [
    { id: "sato",  nm: "Sato Kenji",  sub: "family office" },
    { id: "emily", nm: "Emily Wu",    sub: "fund-of-funds" },
    { id: "rio",   nm: "Yamada Rio",  sub: "exited founder" },
  ];
  const MET = ["Roppongi dinner", "Kyoto conference", "intro over coffee"];
  const WARM = ["🔥🔥 hot — wants a follow-up", "🔥 warm — asked for the deck", "— cool, polite interest"];
  const logged = [];

  /* ---- discord messages ---- */
  function dmsg(html) {
    const d = document.createElement("div");
    d.className = "dmsg";
    d.innerHTML = html;
    msgs.appendChild(d);
    d.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  dmsg(`<span class="who bot">LP Scout<span class="bot-tag">BOT</span></span><span class="when">tonight</span>
        <p>Meet someone promising? <b>/lp</b> — mostly dropdowns, almost no typing.</p>`);

  /* ---- the /lp command ---- */
  let t0 = null, timer = null;
  function renderClosed() {
    const left = PROSPECTS.filter(p => !logged.find(l => l.p === p));
    if (!left.length) {
      cmd.innerHTML = `<span class="cmd-title">all three logged — the team keeps going, you get the idea 🍶</span>`;
      return;
    }
    cmd.innerHTML = `<button class="lp-open" id="lpOpen"><b>/lp</b> — log a prospect (${left.length} waiting)</button>`;
    $("lpOpen").addEventListener("click", renderForm);
  }
  function renderForm() {
    const left = PROSPECTS.filter(p => !logged.find(l => l.p === p));
    t0 = performance.now();
    cmd.innerHTML =
      `<span class="cmd-title"><b>/lp</b> — filling the form… <span class="lp-clock" id="lpClock">0.0s</span></span>
       <label>who did you meet?</label>
       <select id="lpWho">${left.map(p => `<option value="${p.id}">${p.nm} — ${p.sub}</option>`).join("")}</select>
       <label>where</label>
       <select id="lpMet">${MET.map(m => `<option>${m}</option>`).join("")}</select>
       <label>how warm</label>
       <select id="lpWarm">${WARM.map(w => `<option>${w}</option>`).join("")}</select>
       <label>who knows them</label>
       <select id="lpKnows">${Object.entries(TEAM).map(([k, t]) => `<option value="${k}">${t.nm} (${t.sub})</option>`).join("")}</select>
       <button class="lp-go" id="lpGo">⏎ log it</button>`;
    timer = setInterval(() => { $("lpClock").textContent = ((performance.now() - t0) / 1000).toFixed(1) + "s"; }, 100);
    $("lpGo").addEventListener("click", submit);
  }
  function submit() {
    clearInterval(timer);
    const secs = ((performance.now() - t0) / 1000).toFixed(1);
    const p = PROSPECTS.find(x => x.id === $("lpWho").value);
    const entry = { p, met: $("lpMet").value, warm: $("lpWarm").value.split(" — ")[0], knows: $("lpKnows").value, became: false };
    logged.push(entry);
    dmsg(`<span class="who">you</span><span class="when">now</span><p><b>/lp</b> ${p.nm.toLowerCase().split(" ")[0]} …</p>`);
    dmsg(`<span class="who bot">LP Scout<span class="bot-tag">BOT</span></span><span class="when">now</span>
          <div class="dembed"><b>✅ ${p.nm}</b> logged in <b>${secs}s</b>
          <div class="fields">${entry.met} · ${entry.warm} · knows: ${TEAM[entry.knows].nm}</div></div>`);
    renderClosed();
    renderTable();
    drawGraph();
    caption.textContent = logged.length === 1
      ? `Logged in ${secs}s, at the table — visible to the whole team before the next dish. Click a status chip to flip someone to became_lp.`
      : `Every log lands in the table and the graph at once — “who can reintroduce us?” is now a glance.`;
  }

  /* ---- table ---- */
  function renderTable() {
    rows.innerHTML = "";
    logged.forEach((l, i) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${l.p.nm}</td><td>${l.met}</td><td>${l.warm}</td><td>${TEAM[l.knows].nm}</td>
        <td><button class="lp-st${l.became ? " became" : ""}" data-i="${i}" title="${l.became ? "" : "click when they invest"}">${l.became ? "became_lp ✦" : "prospect"}</button></td>`;
      rows.appendChild(tr);
    });
  }
  rows.addEventListener("click", e => {
    const b = e.target.closest(".lp-st");
    if (!b || b.classList.contains("became")) return;
    logged[+b.dataset.i].became = true;
    renderTable(); drawGraph();
    caption.textContent = "became_lp is the exit door: a human enters them into the fund's official system by hand — LP Scout deliberately never touches it.";
  });

  /* ---- graph ---- */
  const svg = $("lpSvg"), NS = "http://www.w3.org/2000/svg";
  function el(n, a, p) { const x = document.createElementNS(NS, n); for (const k in a) x.setAttribute(k, a[k]); (p || svg).appendChild(x); return x; }
  function prospectPos(entry, idxAmongSiblings) {
    const t = TEAM[entry.knows];
    const angles = [-72, 200, 84];
    const a = angles[idxAmongSiblings % 3] * Math.PI / 180;
    return { x: t.x + Math.cos(a) * 95, y: t.y + Math.sin(a) * 74 };
  }
  function drawGraph() {
    svg.innerHTML = "";
    /* team triangle edges */
    const tk = Object.values(TEAM);
    for (let i = 0; i < tk.length; i++)
      for (let j = i + 1; j < tk.length; j++)
        el("line", { x1: tk[i].x, y1: tk[i].y, x2: tk[j].x, y2: tk[j].y, class: "lp-edge", "stroke-dasharray": "3 5" });
    /* prospect edges + nodes */
    const perKnower = {};
    logged.forEach(l => {
      const idx = perKnower[l.knows] = (perKnower[l.knows] ?? -1) + 1;
      const pos = prospectPos(l, idx);
      const t = TEAM[l.knows];
      el("line", { x1: t.x, y1: t.y, x2: pos.x, y2: pos.y, class: "lp-edge" });
      const g = el("g", { class: "lpn" });
      el("circle", { cx: pos.x, cy: pos.y, r: 11, fill: l.became ? "var(--q-design)" : "var(--q-science)" }, g);
      const nm = el("text", { x: pos.x, y: pos.y + 25, "text-anchor": "middle" }, g);
      nm.textContent = l.p.nm + (l.became ? " ✦" : "");
      const sub = el("text", { x: pos.x, y: pos.y + 37, "text-anchor": "middle", class: "sub" }, g);
      sub.textContent = l.p.sub;
    });
    /* team nodes on top */
    tk.forEach(t => {
      const g = el("g", { class: "lpn" });
      el("circle", { cx: t.x, cy: t.y, r: 15, fill: "var(--ink)" }, g);
      const nm = el("text", { x: t.x, y: t.y - 22, "text-anchor": "middle", "font-weight": 700 }, g);
      nm.textContent = t.nm;
      const sub = el("text", { x: t.x, y: t.y + 30, "text-anchor": "middle", class: "sub" }, g);
      sub.textContent = t.sub;
    });
    if (!logged.length) {
      const t = el("text", { x: 280, y: 285, "text-anchor": "middle", "font-size": 11.5, fill: "var(--muted)" });
      t.textContent = "the team, waiting — prospects appear as you log them";
    }
  }

  renderClosed();
  drawGraph();
})();
