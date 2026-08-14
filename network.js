/* ============ NETWORK — orgs in main view, click an org to reveal its people ============ */
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

  /* ---- persistent node objects (positions survive expand/collapse) ---- */
  const center = { id: "tuba", label: "Tuba Ali", center: true, r: 26, x: W / 2, y: H / 2, vx: 0, vy: 0, fixed: true };
  const orgNodes = ORGS.map((o, i) => {
    const a = (i / ORGS.length) * Math.PI * 2 - Math.PI / 2;
    return {
      id: "org" + i, org: o, label: o.name, role: o.role, cat: o.cat,
      r: 13, expandable: o.people.length > 0, expanded: false,
      x: W / 2 + Math.cos(a) * 225, y: H / 2 + Math.sin(a) * 225, vx: 0, vy: 0,
    };
  });
  const personNodes = new Map(); /* orgNode.id -> [nodes] */

  let nodes = [], links = [], raf = null, alpha = 0;

  function rebuild() {
    nodes = [center, ...orgNodes];
    links = orgNodes.map(o => ({ s: center, t: o, len: 235 }));
    orgNodes.forEach(o => {
      if (!o.expanded) return;
      if (!personNodes.has(o.id)) {
        const n = o.org.people.length;
        const perRing = 12;
        personNodes.set(o.id, o.org.people.map((p, j) => {
          const ring = Math.floor(j / perRing);
          const inRing = Math.min(perRing, n - ring * perRing);
          const radius = 110 + ring * 78;
          const a = n <= 8
            ? Math.atan2(o.y - center.y, o.x - center.x) + (j - (n - 1) / 2) * 0.55
            : ((j % perRing) / inRing) * Math.PI * 2 + ring * 0.26;
          return {
            id: o.id + "p" + j, label: p.name, role: p.role + " — " + o.org.name, cat: o.cat,
            r: 8, person: true, radius,
            url: p.url || "https://www.linkedin.com/search/results/all/?keywords=" + encodeURIComponent(p.name),
            x: o.x + Math.cos(a) * radius, y: o.y + Math.sin(a) * radius, vx: 0, vy: 0,
          };
        }));
      }
      personNodes.get(o.id).forEach(p => {
        nodes.push(p);
        links.push({ s: o, t: p, len: p.radius });
      });
    });
    /* grow the canvas when a large cluster is open */
    H = nodes.length > 30 ? 860 : 640;
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svg.style.height = H + "px";
    center.y = H / 2;
    draw();
    kick();
  }

  /* ---- legend ---- */
  legend.innerHTML = [...new Set(ORGS.map(o => o.cat))]
    .map(c => `<span><i style="background:${catColor(c)}"></i>${CATEGORIES[c].label}</span>`)
    .join("");

  /* ---- render ---- */
  let edgeEls = [], nodeEls = [];
  function draw() {
    svg.innerHTML = "";
    edgeEls = links.map(() => {
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
      if (!node.center) {
        c.setAttribute("fill", catColor(node.cat));
        if (node.person) c.setAttribute("fill-opacity", "0.75");
      }
      g.appendChild(c);
      if (node.expandable && !node.expanded) {
        const plus = document.createElementNS(NS, "text");
        plus.setAttribute("text-anchor", "middle");
        plus.setAttribute("y", 4);
        plus.setAttribute("font-size", 13);
        plus.setAttribute("font-weight", 700);
        plus.setAttribute("fill", "var(--page)");
        plus.setAttribute("pointer-events", "none");
        plus.textContent = "+";
        g.appendChild(plus);
      }
      const t = document.createElementNS(NS, "text");
      t.setAttribute("text-anchor", "middle");
      t.setAttribute("y", node.r + 15);
      if (node.person) t.setAttribute("font-size", 11);
      t.textContent = node.label;
      g.appendChild(t);
      if (node.expandable) {
        const s = document.createElementNS(NS, "text");
        s.setAttribute("class", "sub");
        s.setAttribute("text-anchor", "middle");
        s.setAttribute("y", node.r + 28);
        s.textContent = node.expanded ? "click to collapse" : `+ ${node.org.people.length} people`;
        g.appendChild(s);
      }
      svg.appendChild(g);
      attachDrag(g, node);
      attachTip(g, node);
      if (node.org) {
        g.style.cursor = "pointer";
        g.addEventListener("click", () => {
          if (g.__dragged) return;
          if (!node.expandable) return;
          node.expanded = !node.expanded;
          rebuild();
        });
      }
      if (node.person && node.url) {
        g.style.cursor = "pointer";
        g.addEventListener("click", () => {
          if (g.__dragged) return;
          window.open(node.url, "_blank", "noopener");
        });
      }
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
    links.forEach(l => {
      const dx = l.t.x - l.s.x, dy = l.t.y - l.s.y;
      const d = Math.max(Math.hypot(dx, dy), 1);
      const f = (d - l.len) * 0.02;
      const fx = (dx / d) * f, fy = (dy / d) * f;
      if (!l.t.fixed) { l.t.vx -= fx; l.t.vy -= fy; }
      if (!l.s.fixed) { l.s.vx += fx; l.s.vy += fy; }
    });
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = b.x - a.x, dy = b.y - a.y;
        let d2 = dx * dx + dy * dy;
        if (d2 < 1) d2 = 1;
        const k = (a.person || b.person) ? 2100 : 4200;
        const f = k / d2;
        const d = Math.sqrt(d2);
        const fx = (dx / d) * f, fy = (dy / d) * f;
        if (!a.fixed) { a.vx -= fx; a.vy -= fy; }
        if (!b.fixed) { b.vx += fx; b.vy += fy; }
      }
    }
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

  /* ---- drag (click vs drag disambiguation) ---- */
  function attachDrag(g, node) {
    let dragging = false, moved = 0;
    g.addEventListener("pointerdown", e => {
      if (node.center) return;
      dragging = true; moved = 0; g.__dragged = false;
      node.fixed = true;
      g.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    g.addEventListener("pointermove", e => {
      if (!dragging) return;
      moved++;
      if (moved > 3) g.__dragged = true;
      const box = svg.getBoundingClientRect();
      node.x = ((e.clientX - box.left) / box.width) * W;
      node.y = ((e.clientY - box.top) / box.height) * H;
      kick();
    });
    const up = () => {
      dragging = false;
      node.fixed = false;
      setTimeout(() => (g.__dragged = false), 0);
    };
    g.addEventListener("pointerup", up);
    g.addEventListener("pointercancel", up);
  }

  /* ---- tooltip ---- */
  function attachTip(g, node) {
    g.addEventListener("pointermove", e => {
      if (node.center) return;
      const hint = node.expandable && !node.person
        ? `<br><em>${node.expanded ? "click to hide people" : "click to see people"}</em>`
        : node.person && node.url
          ? `<br><em>click → ${node.url.includes("/search/") ? "find on LinkedIn" : "profile"}</em>` : "";
      tip.innerHTML = `<strong>${node.label}</strong><span class="t-meta">${node.role || ""}${hint}</span>`;
      tip.style.opacity = 1;
      let x = e.clientX + 14, y = e.clientY + 14;
      if (x + 290 > innerWidth) x = e.clientX - 290;
      tip.style.left = x + "px"; tip.style.top = y + "px";
    });
    g.addEventListener("pointerleave", () => (tip.style.opacity = 0));
  }

  dark.addEventListener("change", rebuild);

  /* deep-link: network.html?expand=sds pre-opens matching orgs */
  const exp = new URLSearchParams(location.search).get("expand");
  if (exp) orgNodes.forEach(o => {
    if (o.expandable && o.label.toLowerCase().includes(exp.toLowerCase())) o.expanded = true;
  });
  rebuild();
})();
