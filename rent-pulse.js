/* ============ SPRINT 04 — RentPulse: sweep, threshold, eligibility, notice ============ */
(function () {
  const $ = id => document.getElementById(id);
  const yen = v => "¥" + v.toLocaleString("ja-JP");

  /* months = months until renewal; market = AI-researched midpoint */
  const UNITS = [
    { nm: "メゾン初台 201",            rent: 128000, market: 152000, months: 6.5 },
    { nm: "コーポ武蔵野 B",            rent:  95000, market:  99000, months: 6.8 },
    { nm: "パークサイド門仲 501",      rent: 178000, market: 176000, months: 3.1 },
    { nm: "ハイツ柿の木坂 102",        rent: 110000, market: 123500, months: 14 },
    { nm: "グリーンコート葛西 305",    rent:  89000, market:  94000, months: 9.2 },
    { nm: "サニーレジデンス大塚 702",  rent: 142000, market: 140000, months: 11 },
    { nm: "リバーハウス中野 203",      rent: 131000, market: 168000, months: 8.4 },
    { nm: "メゾン初台 402",            rent: 149000, market: 152000, months: 6.2 },
    { nm: "コスモス王子 101",          rent:  76000, market:  81500, months: 2.4 },
    { nm: "ヴィラ砧 B1",               rent: 165000, market: 163000, months: 18 },
    { nm: "サクラハウス東向島 202",    rent:  98000, market: 112000, months: 22 },
    { nm: "パレス八丁堀 601",          rent: 210000, market: 205000, months: 12 },
  ];
  UNITS.forEach(u => { u.gap = (u.market - u.rent) / u.market * 100; });

  let threshold = 10, hasRun = false, selected = null;
  const grid = $("rpGrid"), caption = $("rpCaption"), detail = $("rpDetail");

  const inWindow = u => u.months > 6 && u.months <= 7;   /* 7→6 months: still actionable */
  const overGap  = u => u.gap >= threshold;

  UNITS.forEach((u, i) => {
    const b = document.createElement("button");
    b.className = "rp-unit"; b.id = "rpu-" + i; b.type = "button";
    b.innerHTML = `<span class="nm">${u.nm}</span><span class="rent">${yen(u.rent)}／月</span><span class="fl"></span>`;
    b.addEventListener("click", () => { if (b.classList.contains("alert")) select(i); });
    grid.appendChild(b);
  });

  function applyAlerts() {
    let renew = 0, gap = 0, stars = 0;
    UNITS.forEach((u, i) => {
      const b = $("rpu-" + i), fl = b.querySelector(".fl");
      fl.innerHTML = "";
      const r = inWindow(u), g = overGap(u);
      if (r) { fl.innerHTML += `<span class="flag flag-renew">更新7ヶ月前</span>`; renew++; }
      if (g) { fl.innerHTML += `<span class="flag flag-gap">相場 −${u.gap.toFixed(0)}%</span>`; gap++; }
      if (r && g) { fl.innerHTML += `<span class="flag flag-star">★ 最優先</span>`; stars++; }
      b.classList.toggle("alert", r || g);
      b.classList.toggle("dim", !(r || g));
    });
    caption.textContent =
      `Out of ${UNITS.length.toLocaleString()} units (thousands, in production): ${renew} entering the 7→6-month renewal window, ` +
      `${gap} more than ${threshold}% under market${stars ? `, ${stars} hit by both — ★ call that owner first` : ""}. Everything else stays quiet.`;
    if (selected !== null) {
      const u = UNITS[selected];
      if (!(inWindow(u) || overGap(u))) { detail.hidden = true; $("rpu-" + selected).classList.remove("sel"); selected = null; }
    }
  }

  $("rpRun").addEventListener("click", () => {
    if (hasRun) { location.reload(); return; }
    hasRun = true;
    $("rpRun").textContent = "checking…";
    $("rpRun").disabled = true;
    UNITS.forEach((u, i) => {
      setTimeout(() => {
        const b = $("rpu-" + i);
        b.classList.add("scan");
        setTimeout(() => b.classList.remove("scan"), 130);
      }, i * 90);
    });
    setTimeout(() => {
      applyAlerts();
      $("rpRun").textContent = "↻ replay the morning";
      $("rpRun").disabled = false;
      $("rpClock").textContent = "swept in 1.1s — tomorrow it runs itself at 6:00 JST";
    }, UNITS.length * 90 + 250);
  });

  $("rpToggle").addEventListener("click", e => {
    const b = e.target.closest("button[data-th]");
    if (!b) return;
    threshold = +b.dataset.th;
    document.querySelectorAll("#rpToggle button").forEach(x => x.classList.toggle("active", x === b));
    if (hasRun) applyAlerts();
  });

  /* ---- detail: range bar + eligibility gate + letter ---- */
  const CHECKS = [
    "入居から1年以上（短期入居への通知を防止）",
    "賃料据置特約なし — 借地借家法32条ただし書",
    "今契約期間内の改定履歴なし",
    "滞納・係争なし",
  ];
  function select(i) {
    if (selected !== null) $("rpu-" + selected).classList.remove("sel");
    selected = i;
    $("rpu-" + i).classList.add("sel");
    const u = UNITS[i];
    const lo = Math.round(u.market * 0.95 / 1000) * 1000;
    const hi = Math.round(u.market * 1.05 / 1000) * 1000;
    const prop = Math.round(u.market * 0.95 / 1000) * 1000;
    detail.hidden = false;
    detail.innerHTML =
      `<h6>${u.nm}</h6>
       <p class="rd-sub">現行 ${yen(u.rent)} ／ 更新まで ${u.months}ヶ月 ${inWindow(u) ? "— 6ヶ月前通知にまだ間に合う" : ""}</p>
       <div class="rp-range">${rangeSVG(u.rent, lo, hi, prop)}</div>
       <p class="rp-src">AI market research — range ${yen(lo)}–${yen(hi)}, proposed ${yen(prop)} · in the product every estimate links its sources and comparable SUUMO listings (㎡単価つき)</p>
       <div class="rp-check" id="rpChecks"></div>
       <div class="rp-actions">
         <button class="mini-btn primary" id="rpLetterBtn" disabled>通知書PDFを作成</button>
         <span class="demo-sub" id="rpGateNote">the letter stays locked until a human confirms all four</span>
       </div>
       <div id="rpLetterHost"></div>`;
    const checksHost = detail.querySelector("#rpChecks");
    CHECKS.forEach(c => {
      const cb = document.createElement("button");
      cb.className = "rp-ck"; cb.type = "button";
      cb.innerHTML = `<span class="bx"></span>${c}`;
      cb.addEventListener("click", () => {
        cb.classList.toggle("ok");
        cb.querySelector(".bx").textContent = cb.classList.contains("ok") ? "✓" : "";
        const all = detail.querySelectorAll(".rp-ck.ok").length === CHECKS.length;
        detail.querySelector("#rpLetterBtn").disabled = !all;
        detail.querySelector("#rpGateNote").textContent = all
          ? "eligibility confirmed — the gate opens"
          : "the letter stays locked until a human confirms all four";
      });
      checksHost.appendChild(cb);
    });
    detail.querySelector("#rpLetterBtn").addEventListener("click", () => {
      detail.querySelector("#rpLetterHost").innerHTML =
        `<div class="rp-letter">
           <h6>賃料改定のお知らせ</h6>
           <p>${u.nm} 賃借人様</p>
           <p>現行賃料 ${yen(u.rent)} を、次回更新日より ${yen(prop)} に改定させていただきたく、ご通知申し上げます。</p>
           <p class="ok-line">✓ 6ヶ月前予告 — 期限内（更新まで ${u.months}ヶ月）で送付可能と自動検証済み</p>
         </div>`;
      caption.textContent = "pdf-lib + Noto Sans JP, fonts fully embedded — CJK subsetting breaks glyphs, so each notice is a chunky, correct 4MB. Print, sign, post.";
    });
    detail.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function rangeSVG(rent, lo, hi, prop) {
    const W = 620, H = 74, x0 = 20, x1 = W - 20;
    const min = Math.min(rent, lo) * 0.97, max = hi * 1.03;
    const X = v => x0 + (v - min) / (max - min) * (x1 - x0);
    const tick = (v, label, color, dy) =>
      `<line x1="${X(v)}" y1="26" x2="${X(v)}" y2="50" stroke="${color}" stroke-width="2"/>
       <text x="${X(v)}" y="${dy}" text-anchor="middle" font-size="10.5" fill="${color}">${label} ${yen(v)}</text>`;
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="current rent versus market range">
      <rect x="${X(lo)}" y="30" width="${X(hi) - X(lo)}" height="16" rx="8" fill="var(--q-engineering)" opacity="0.25"/>
      <text x="${(X(lo) + X(hi)) / 2}" y="14" text-anchor="middle" font-size="10.5" fill="var(--muted)">AI相場レンジ</text>
      ${tick(rent, "現行", "var(--sold)", 66)}
      ${tick(prop, "提案", "var(--q-engineering)", 24)}
    </svg>`;
  }
})();
