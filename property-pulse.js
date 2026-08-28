/* ============ SPRINT 02 — PropertyPulse: import the mess, get one truth ============ */
(function () {
  const $ = id => document.getElementById(id);

  const MONTHS = ["3月", "4月", "5月", "6月", "7月", "8月"];
  const REPORTS = [
    { id: "shibuya", emo: "🏙", name: "Shibuya loft", sub: "Airbnb transaction history · English · per-guest rows",
      fmt: "CSV", cls: "csv", color: "var(--q-science)", jp: "渋谷ロフト",
      parse: "Airbnb CSV detected — prorating revenue per night, host service fee → OTA手数料…",
      monthly: [48, 51, 55, 58, 54, 61.2], occ: 88, adr: 23400, yoyRev: 14.1, yoyOcc: 5, yoyAdr: 1.8, fee: 73440 },
    { id: "hakone", emo: "♨️", name: "Hakone house", sub: "管理会社の月次レポート · PDF · Shift_JIS",
      fmt: "PDF", cls: "pdf", color: "var(--sold)", jp: "箱根ハウス",
      parse: "Shift_JIS detected — extracting the 月次レポート table from the PDF…",
      monthly: [39, 35, 42, 47, 40, 43.8], occ: 71, adr: 31200, yoyRev: 3.9, yoyOcc: -2, yoyAdr: -3.5, fee: 52560 },
    { id: "osaka", emo: "🏨", name: "Osaka apart-hotel", sub: "daily bookings export · Excel",
      fmt: "XLSX", cls: "xls", color: "var(--q-design)", jp: "大阪アパートホテル",
      parse: "applying the saved column mapping — 日付・売上・泊数・チャネル…",
      monthly: [62, 66, 71, 69, 75, 80.3], occ: 82, adr: 17800, yoyRev: 11.2, yoyOcc: 6, yoyAdr: 2.4, fee: 96360 },
  ];
  const imported = [];

  /* ---- KPI tiles ---- */
  const KPIS = [
    { id: "rev",    k: "売上 — 8月",  fmt: v => "¥" + Math.round(v * 10000).toLocaleString("ja-JP") },
    { id: "occ",    k: "稼働率",      fmt: v => v.toFixed(0) + "%" },
    { id: "adr",    k: "ADR",         fmt: v => "¥" + Math.round(v).toLocaleString("ja-JP") },
    { id: "revpar", k: "RevPAR",      fmt: v => "¥" + Math.round(v).toLocaleString("ja-JP") },
  ];
  const kpiHost = $("ppKpis");
  KPIS.forEach(k => {
    const d = document.createElement("div");
    d.className = "pp-kpi";
    d.innerHTML = `<span class="k">${k.k}</span><span class="v" id="ppv-${k.id}">—</span><span class="d" id="ppd-${k.id}"></span>`;
    kpiHost.appendChild(d);
  });

  function kpiValues() {
    if (!imported.length) return null;
    const rev = imported.reduce((s, r) => s + r.monthly[5], 0);
    const occ = imported.reduce((s, r) => s + r.occ, 0) / imported.length;
    const adr = imported.reduce((s, r) => s + r.adr, 0) / imported.length;
    const avg = key => imported.reduce((s, r) => s + r[key], 0) / imported.length;
    return { rev, occ, adr, revpar: occ / 100 * adr,
             yoy: { rev: avg("yoyRev"), occ: avg("yoyOcc"), adr: avg("yoyAdr") } };
  }

  const shown = { rev: 0, occ: 0, adr: 0, revpar: 0 };
  function animateKpis() {
    const v = kpiValues();
    if (!v) return;
    const t0 = performance.now(), from = { ...shown };
    function tick() {
      const p = Math.max(0, Math.min(1, (performance.now() - t0) / 550)), e = 1 - Math.pow(1 - p, 3);
      KPIS.forEach(k => {
        const val = from[k.id] + (v[k.id] - from[k.id]) * e;
        $("ppv-" + k.id).textContent = k.fmt(val);
      });
      if (p < 1) requestAnimationFrame(tick);
      else Object.assign(shown, { rev: v.rev, occ: v.occ, adr: v.adr, revpar: v.revpar });
    }
    requestAnimationFrame(tick);
    const dd = (id, val, unit) => {
      const el = $("ppd-" + id);
      el.textContent = (val >= 0 ? "▲ +" : "▼ ") + val.toFixed(1) + unit + " 前年比";
      el.classList.toggle("down", val < 0);
    };
    dd("rev", v.yoy.rev, "%"); dd("occ", v.yoy.occ, "pt"); dd("adr", v.yoy.adr, "%");
    dd("revpar", (v.yoy.rev + v.yoy.occ) / 2, "%");
  }

  /* ---- stacked chart ---- */
  const svg = $("ppSvg"), NS = "http://www.w3.org/2000/svg";
  function el(n, a, p) { const x = document.createElementNS(NS, n); for (const k in a) x.setAttribute(k, a[k]); (p || svg).appendChild(x); return x; }
  function drawChart() {
    svg.innerHTML = "";
    const W = 640, H = 225, x0 = 38, x1 = W - 12, yBase = H - 26, yTop = 14;
    const maxTotal = 190; // 万円 headroom for all three stacked
    const scale = (yBase - yTop) / maxTotal;
    [0, 50, 100, 150].forEach(g => {
      const y = yBase - g * scale;
      el("line", { x1: x0, y1: y, x2: x1, y2: y, stroke: "var(--hairline)", "stroke-width": 1 });
      const t = el("text", { x: x0 - 6, y: y + 4, "text-anchor": "end", "font-size": 10, fill: "var(--muted)" });
      t.textContent = g ? g + "万" : "0";
    });
    const bw = 34, gap = (x1 - x0) / MONTHS.length;
    MONTHS.forEach((m, i) => {
      const cx = x0 + gap * i + gap / 2;
      let y = yBase;
      imported.forEach(r => {
        const h = r.monthly[i] * scale;
        el("rect", { x: cx - bw / 2, y: y - h, width: bw, height: Math.max(h - 1.5, 0), rx: 3, fill: r.color });
        y -= h;
      });
      const t = el("text", { x: cx, y: yBase + 16, "text-anchor": "middle", "font-size": 11, fill: "var(--ink-2)" });
      t.textContent = m;
    });
    if (!imported.length) {
      const t = el("text", { x: (x0 + x1) / 2, y: (yTop + yBase) / 2, "text-anchor": "middle", "font-size": 12.5, fill: "var(--muted)" });
      t.textContent = "売上推移 — waiting for the first report…";
    }
    $("ppLegend").innerHTML = imported.map(r =>
      `<span><i style="background:${r.color}"></i>${r.name}</span>`).join("");
  }

  /* ---- captions / export ---- */
  const caption = $("ppCaption");
  const CAPTIONS = {
    1: "One property in. The other two arrive in completely different languages — that used to be the weekend.",
    2: "Two in — the dashboard doesn't care what format they arrived in. Mapped once, remembered forever.",
    3: "3 properties · 3 formats · one truth — 前日比・前月比・前年比 at a glance. Nothing left the owner's machine.",
  };
  function updateAfterImport() {
    animateKpis(); drawChart();
    caption.textContent = CAPTIONS[imported.length] || "";
    if (imported.length === REPORTS.length) {
      $("ppExport").disabled = false;
      $("ppFootNote").textContent = "the accountant's re-typing, gone";
    }
  }
  $("ppExport").addEventListener("click", () => {
    const rows = imported.map(r =>
      `収入,2026-08-31,売上高,課税売上10%,${Math.round(r.monthly[5] * 10000)},${r.jp},PropertyPulse 8月分\n` +
      `支出,2026-08-31,支払手数料,課対仕入10%,${r.fee},${r.jp},OTA手数料`).join("\n");
    const box = $("ppCsv");
    box.textContent = "収支区分,発生日,勘定科目,税区分,金額,品目,備考\n" + rows;
    box.hidden = false;
    caption.textContent = "freee「取引インポート」形式 — open freee, import, done. マネーフォワード仕訳帳 works too.";
  });

  /* ---- import flow (drag like a sticker, or tap) ---- */
  const drop = $("ppDrop"), tray = $("ppReports");
  let busy = false;
  function importReport(card) {
    const r = REPORTS.find(x => x.id === card.dataset.id);
    if (!r || card.classList.contains("done") || busy) return;
    busy = true;
    drop.classList.add("busy");
    drop.textContent = "⚙ " + r.parse;
    setTimeout(() => {
      card.classList.add("done");
      imported.push(r);
      busy = false;
      drop.classList.remove("busy", "over");
      drop.textContent = imported.length === REPORTS.length
        ? "✓ inbox zero — every format absorbed"
        : "✓ imported — next report ⇣";
      updateAfterImport();
    }, 750);
  }

  REPORTS.forEach(r => {
    const d = document.createElement("div");
    d.className = "pp-report";
    d.dataset.id = r.id;
    d.title = "drag onto the importer, or tap";
    d.innerHTML = `<span class="emo">${r.emo}</span>
      <span class="t"><b>${r.name}</b><span>${r.sub}</span></span>
      <span class="fmt fmt-${r.cls}">${r.fmt}</span>`;
    tray.appendChild(d);
  });

  let ghost = null, srcCard = null, moved = false;
  tray.addEventListener("pointerdown", e => {
    const card = e.target.closest(".pp-report");
    if (!card || card.classList.contains("done") || busy) return;
    e.preventDefault();
    srcCard = card; moved = false;
    ghost = card.cloneNode(true);
    ghost.classList.add("drag-ghost");
    ghost.style.width = card.offsetWidth + "px";
    document.body.appendChild(ghost);
    move(e);
  });
  function move(e) {
    if (!ghost) return;
    ghost.style.left = e.clientX + "px";
    ghost.style.top = e.clientY + "px";
    const under = document.elementFromPoint(e.clientX, e.clientY);
    drop.classList.toggle("over", !!(under && under.closest("#ppDrop")));
  }
  window.addEventListener("pointermove", e => {
    if (ghost) { e.preventDefault(); moved = true; move(e); }
  }, { passive: false });
  window.addEventListener("pointerup", e => {
    if (!ghost) return;
    ghost.style.display = "none";
    const under = document.elementFromPoint(e.clientX, e.clientY);
    const onDrop = under && under.closest("#ppDrop");
    ghost.remove(); ghost = null;
    drop.classList.remove("over");
    if (onDrop || !moved) importReport(srcCard); /* tap = import too */
    srcCard = null;
  });

  drawChart();
})();
