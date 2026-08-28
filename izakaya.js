/* ============ SPRINT 01 — the izakaya sticker game ============ */
(function () {
  const $ = id => document.getElementById(id);

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
})();
