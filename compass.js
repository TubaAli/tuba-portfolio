/* ============ COMPASS — Krebs Cycle of Creativity ============ */
(function () {
  const svg = document.getElementById("compass");
  const NS = "http://www.w3.org/2000/svg";
  const CX = 490, CY = 410, R = 285;

  const qColor = q => getComputedStyle(document.documentElement)
    .getPropertyValue("--q-" + q).trim();

  const el = (name, attrs, parent) => {
    const n = document.createElementNS(NS, name);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    (parent || svg).appendChild(n);
    return n;
  };

  /* angle helpers: compass degrees (90 = top), SVG y grows downward */
  const pt = (deg, r) => {
    const a = (deg * Math.PI) / 180;
    return [CX + r * Math.cos(a), CY - r * Math.sin(a)];
  };

  /* ---- ring + quadrant boundaries (at 45°, 135°, 225°, 315°) ---- */
  el("circle", { cx: CX, cy: CY, r: R, fill: "none", stroke: "var(--baseline)", "stroke-width": 1.5 });
  el("circle", { cx: CX, cy: CY, r: R * 0.55, fill: "none", stroke: "var(--hairline)", "stroke-width": 1, "stroke-dasharray": "2 5" });
  [45, 135, 225, 315].forEach(d => {
    const [x1, y1] = pt(d, R * 0.16), [x2, y2] = pt(d, R);
    el("line", { x1, y1, x2, y2, stroke: "var(--hairline)", "stroke-width": 1 });
  });

  /* ---- flow arrows between quadrants (S → E → D → A → S, clockwise) ---- */
  const marker = el("marker", { id: "arrow", viewBox: "0 0 8 8", refX: 6, refY: 4, markerWidth: 6, markerHeight: 6, orient: "auto" });
  el("path", { d: "M0,0 L8,4 L0,8 z", fill: "var(--muted)" }, marker);
  [[78, 12], [348, 282], [258, 192], [168, 102]].forEach(([from, to]) => {
    const r = R + 22;
    const [x1, y1] = pt(from, r), [x2, y2] = pt(to, r);
    el("path", {
      d: `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`,
      fill: "none", stroke: "var(--hairline)", "stroke-width": 1.2, "marker-end": "url(#arrow)"
    });
  });

  /* ---- quadrant labels ---- */
  const labelPos = {
    science:     [CX, CY - R - 52, CX, CY - R - 34],
    engineering: [CX + R + 30, CY - 8, CX + R + 30, CY + 10],
    design:      [CX, CY + R + 46, CX, CY + R + 64],
    art:         [CX - R - 30, CY - 8, CX - R - 30, CY + 10],
  };
  for (const q in QUADRANTS) {
    const [lx, ly, ox, oy] = labelPos[q];
    const anchor = q === "engineering" ? "start" : q === "art" ? "end" : "middle";
    const t1 = el("text", { x: lx, y: ly, "text-anchor": anchor, class: "q-label" });
    t1.textContent = QUADRANTS[q].label;
    const t2 = el("text", { x: ox, y: oy, "text-anchor": anchor, class: "q-output" });
    t2.textContent = QUADRANTS[q].output;
  }

  /* ---- center: Tuba ---- */
  el("circle", { cx: CX, cy: CY, r: 34, fill: "var(--ink)" });
  const ci = el("text", { x: CX, y: CY + 6, "text-anchor": "middle", "font-size": 17, "font-weight": 700, fill: "var(--page)" });
  ci.textContent = "TA";
  const cn = el("text", { x: CX, y: CY + 58, "text-anchor": "middle", class: "center-name" });
  cn.textContent = "Tuba Ali";
  const cs = el("text", { x: CX, y: CY + 74, "text-anchor": "middle", class: "center-sub" });
  cs.textContent = "traversing all four";

  /* ---- project dots ----
     quadrant spans 90°; t=0..1 maps inside with 12° padding each side */
  const tip = document.getElementById("tip");
  const detail = document.getElementById("detail");
  const dots = [];

  function quadAngle(q, t) {
    const c = QUADRANTS[q].angle;
    const start = c + 45 - 12, end = c - 45 + 12; /* clockwise within quadrant */
    return start + (end - start) * t;
  }

  function showTip(evt, p) {
    tip.innerHTML = `<strong>${p.title}</strong><span class="t-meta">${p.org} · ${p.year || ""}</span>`;
    tip.style.opacity = 1;
    const pad = 14;
    let x = evt.clientX + pad, y = evt.clientY + pad;
    if (x + 300 > innerWidth) x = evt.clientX - 300;
    if (y + 80 > innerHeight) y = evt.clientY - 90;
    tip.style.left = x + "px"; tip.style.top = y + "px";
  }
  const hideTip = () => (tip.style.opacity = 0);

  function select(p, li) {
    detail.classList.remove("empty");
    detail.innerHTML =
      `<span class="eyebrow" style="color:${qColor(p.quadrant)}">${QUADRANTS[p.quadrant].label}</span>
       <h3>${p.title}</h3>
       <div class="meta">${p.org}${p.year ? " · " + p.year : ""}</div>
       <div class="blurb">${p.blurb}${p.link ? ` <a href="${p.link}" target="_blank" rel="noopener">View →</a>` : ""}</div>`;
    dots.forEach(d => d.circle.classList.toggle("dim", d.p !== p));
    document.querySelectorAll(".quad-col li").forEach(n => n.classList.toggle("hot", n === li));
  }

  PROJECTS.forEach(p => {
    const deg = quadAngle(p.quadrant, p.t);
    const [x, y] = pt(deg, R * p.r);
    const g = el("g", {});
    const circle = el("circle", { cx: x, cy: y, r: 9, fill: qColor(p.quadrant), class: "dot" }, g);
    const hit = el("circle", { cx: x, cy: y, r: 20, class: "dot-hit" }, g);
    const entry = { p, circle };
    dots.push(entry);
    const over = e => { circle.setAttribute("r", 12); showTip(e, p); };
    const out = () => { circle.setAttribute("r", 9); hideTip(); };
    hit.addEventListener("pointermove", over);
    hit.addEventListener("pointerleave", out);
    hit.addEventListener("click", () => select(p, entry.li));
  });

  /* ---- lists under the compass (also the “table view” relief) ---- */
  const lists = document.getElementById("quadLists");
  ["science", "engineering", "design", "art"].forEach(q => {
    const col = document.createElement("div");
    col.className = "quad-col";
    col.style.setProperty("--qc", qColor(q));
    col.innerHTML = `<h4><span class="swatch"></span>${QUADRANTS[q].label}</h4>`;
    const ul = document.createElement("ul");
    PROJECTS.filter(p => p.quadrant === q).forEach(p => {
      const li = document.createElement("li");
      li.textContent = p.title;
      const entry = dots.find(d => d.p === p);
      entry.li = li;
      li.addEventListener("click", () => select(p, li));
      li.addEventListener("pointerenter", () => entry.circle.setAttribute("r", 12));
      li.addEventListener("pointerleave", () => entry.circle.setAttribute("r", 9));
      ul.appendChild(li);
    });
    col.appendChild(ul);
    lists.appendChild(col);
  });
})();
