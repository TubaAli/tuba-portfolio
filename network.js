/* ============ NETWORK — force-directed graph, two views ============ */
(function () {
  const svg = document.getElementById("graph");
  const NS = "http://www.w3.org/2000/svg";
  const tip = document.getElementById("tip");
  const legend = document.getElementById("legend");
  const dark = matchMedia("(prefers-color-scheme: dark)");
  const catColor = c => CATEGORIES[c][dark.matches ? "dark" : "light"];

  let W = 1030, H = 640;
  function sizeSvg() {
    W = svg.clientWidth || 1030;
    H = 640;
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  }
  sizeSvg();
  addEventListener("resize", () => { sizeSvg(); kick(); });

  let nodes = [], links = [], view = "people", raf = null, alpha = 0;

  function buildView(which) {
    view = which;
    const items = which === "people" ? PEOPLE : ORGS;
    const center = { id: "tuba", label: "Tuba Ali", center: true, r: 26, x: W / 2, y: H / 2, vx: 0, vy: 0, fixed: true };
    nodes = [center];
    links = [];
    const n = items.length;
    items.forEach((it, i) => {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      const node = {
        id: which + i,
        label: it.name,
        sub: which === "people" ? it.org : "",
        role: it.role,
        cat: it.cat,
        r: which === "people" ? 11 : 13,
        x: W / 2 + Math.cos(a) * 200 + (i % 3) * 7,
        y: H / 2 + Math.sin(a) * 200 + (i % 5) * 5,
        vx: 0, vy: 0,
      };
      nodes.push(node);
      links.push({ s: center, t: node, len: which === "people" ? 195 : 235 });
    });
    renderLegend(items);
    draw();
    kick();
  }

  function renderLegend(items) {
    const cats = [...new Set(items.map(i => i.cat))];
    legend.innerHTML = cats
      .map(c => `<span><i style="background:${catColor(c)}"></i>${CATEGORIES[c].label}</span>`)
      .join("");
  }

  /* ---- render ---- */
  let edgeEls = [], nodeEls = [];
  function draw() {
    svg.innerHTML = "";
    edgeEls = links.map(l => {
      const e = document.createElementNS(NS, "line");
      e.setAttribute("class", "edge");
      svg.appendChild(e);
      return e;
    });
    nodeEls = nodes.map(node => {
      const g = document.createElementNS(NS, "g");
      g.setAttribute("class", "node" + (node.center ? " center" : ""));
      const c = document.createElementNS(NS, "circle");
      c.setAttribute("r", node.r);
      if (!node.center) c.setAttribute("fill", catColor(node.cat));
      g.appendChild(c);
      const t = document.createElementNS(NS, "text");
      t.setAttribute("text-anchor", "middle");
      t.setAttribute("y", node.r + 15);
      t.textContent = node.label;
      g.appendChild(t);
      if (node.sub) {
        const s = document.createElementNS(NS, "text");
        s.setAttribute("class", "sub");
        s.setAttribute("text-anchor", "middle");
        s.setAttribute("y", node.r + 28);
        s.textContent = node.sub;
        g.appendChild(s);
      }
      svg.appendChild(g);
      attachDrag(g, node);
      attachTip(g, node);
      return g;
    });
    position();
  }

  function position() {
    links.forEach((l, i) => {
      edgeEls[i].setAttribute("x1", l.s.x); edgeEls[i].setAttribute("y1", l.s.y);
      edgeEls[i].setAttribute("x2", l.t.x); edgeEls[i].setAttribute("y2", l.t.y);
    });
    nodes.forEach((n, i) => nodeEls[i].setAttribute("transform", `translate(${n.x},${n.y})`));
  }

  /* ---- tiny force simulation ---- */
  function tick() {
    /* springs */
    links.forEach(l => {
      const dx = l.t.x - l.s.x, dy = l.t.y - l.s.y;
      const d = Math.max(Math.hypot(dx, dy), 1);
      const f = (d - l.len) * 0.02;
      const fx = (dx / d) * f, fy = (dy / d) * f;
      if (!l.t.fixed) { l.t.vx -= fx; l.t.vy -= fy; }
      if (!l.s.fixed) { l.s.vx += fx; l.s.vy += fy; }
    });
    /* pairwise repulsion */
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = b.x - a.x, dy = b.y - a.y;
        let d2 = dx * dx + dy * dy;
        if (d2 < 1) d2 = 1;
        const f = (view === "orgs" ? 4200 : 2600) / d2;
        const d = Math.sqrt(d2);
        const fx = (dx / d) * f, fy = (dy / d) * f;
        if (!a.fixed) { a.vx -= fx; a.vy -= fy; }
        if (!b.fixed) { b.vx += fx; b.vy += fy; }
      }
    }
    /* integrate + keep in frame */
    nodes.forEach(n => {
      if (n.fixed) return;
      n.vx *= 0.86; n.vy *= 0.86;
      n.x += n.vx * alpha; n.y += n.vy * alpha;
      const m = 58;
      n.x = Math.max(m, Math.min(W - m, n.x));
      n.y = Math.max(m + 6, Math.min(H - m, n.y));
    });
    position();
    alpha *= 0.985;
    if (alpha > 0.02) raf = requestAnimationFrame(tick);
  }
  function kick() {
    alpha = 1;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(tick);
  }

  /* ---- drag ---- */
  function attachDrag(g, node) {
    let dragging = false;
    g.addEventListener("pointerdown", e => {
      if (node.center) return;
      dragging = true;
      node.fixed = true;
      g.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    g.addEventListener("pointermove", e => {
      if (!dragging) return;
      const box = svg.getBoundingClientRect();
      node.x = ((e.clientX - box.left) / box.width) * W;
      node.y = ((e.clientY - box.top) / box.height) * H;
      kick();
    });
    const up = () => { dragging = false; node.fixed = false; };
    g.addEventListener("pointerup", up);
    g.addEventListener("pointercancel", up);
  }

  /* ---- tooltip ---- */
  function attachTip(g, node) {
    g.addEventListener("pointermove", e => {
      if (node.center) return;
      tip.innerHTML = `<strong>${node.label}</strong><span class="t-meta">${node.role || ""}</span>`;
      tip.style.opacity = 1;
      let x = e.clientX + 14, y = e.clientY + 14;
      if (x + 290 > innerWidth) x = e.clientX - 290;
      tip.style.left = x + "px"; tip.style.top = y + "px";
    });
    g.addEventListener("pointerleave", () => (tip.style.opacity = 0));
  }

  /* ---- view toggle ---- */
  const bp = document.getElementById("btnPeople");
  const bo = document.getElementById("btnOrgs");
  bp.addEventListener("click", () => { bp.classList.add("active"); bo.classList.remove("active"); buildView("people"); });
  bo.addEventListener("click", () => { bo.classList.add("active"); bp.classList.remove("active"); buildView("orgs"); });
  dark.addEventListener("change", () => buildView(view));

  const initial = new URLSearchParams(location.search).get("view") === "orgs" ? "orgs" : "people";
  if (initial === "orgs") { bo.classList.add("active"); bp.classList.remove("active"); }
  buildView(initial);
})();
