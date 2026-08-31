/* ============ CASE PAGES — shared chrome ============
   Each case page sets <body data-case="slug">. This renders the hero,
   pager, story blocks, "what shipped" chips, and links from SPRINT.cases
   in data.js — the demo itself lives in the page's own script. */
(function () {
  const $ = id => document.getElementById(id);
  const slug = document.body.dataset.case;
  const cases = SPRINT.cases;
  const c = cases.find(x => x.slug === slug);
  if (!c) return;

  document.title = `Tuba Ali — Sprint 0${c.n} · ${c.title}`;
  const tag = $("caseTagline");
  if (tag) tag.textContent = c.tagline;

  /* ---- hero ---- */
  const hero = $("caseHero");
  if (hero) {
    hero.innerHTML =
      `<span class="noren">${c.icon}</span>
       <div>
         <span class="case-eyebrow">AI Sprint — case 0${c.n} of ${SPRINT.total}</span>
         <h2 class="case-title">${c.title}</h2>
       </div>`;
  }

  /* ---- pager (top + bottom) ---- */
  function pagerHTML() {
    const chips = cases.map(k =>
      k.slug === slug
        ? `<span class="pg-chip current" aria-current="page"><b>0${k.n}</b> ${k.icon}</span>`
        : `<a class="pg-chip" href="${k.page}" title="${k.title}"><b>0${k.n}</b> ${k.icon}</a>`
    ).join("");
    const i = cases.indexOf(c);
    const prev = cases[i - 1], next = cases[i + 1];
    return `<a class="pg-end" href="sprint.html">← all sprints</a>
            <span class="pg-chips">${chips}</span>
            <span class="pg-arrows">
              ${prev ? `<a class="pg-end" href="${prev.page}">← 0${prev.n}</a>` : ""}
              ${next ? `<a class="pg-end" href="${next.page}">0${next.n} →</a>`
                     : `<a class="pg-end" href="${SPRINT.site}" target="_blank" rel="noopener">06 — your business? →</a>`}
            </span>`;
  }
  ["casePager", "casePagerFoot"].forEach(id => { const el = $(id); if (el) el.innerHTML = pagerHTML(); });

  /* ---- story ---- */
  const story = $("caseStory");
  if (story) {
    story.innerHTML = c.story
      ? c.story.map(b =>
          `<div class="story-block${b.hl ? " insight" : ""}"><span class="story-k">${b.k}</span><p>${b.p}</p></div>`).join("")
      : `<div class="story-block"><span class="story-k">The business</span><p>${c.biz}.</p></div>
         <div class="story-block"><span class="story-k">The pain</span><p>${c.pain}</p></div>
         <div class="story-block insight"><span class="story-k">The honest call</span><p>${c.insight}</p></div>
         <div class="story-block"><span class="story-k">The solution</span><p>${c.solution}</p></div>`;
  }

  /* ---- what shipped + links ---- */
  const ship = $("shipChips");
  if (ship && c.ship) ship.innerHTML = c.ship.map(s => `<span class="ship-chip">${s}</span>`).join("");

  const links = $("caseLinks");
  if (links) {
    links.innerHTML = (c.links && c.links.length)
      ? c.links.map(l => l.url
          ? `<a href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`
          : `<span class="lk-private">🔒 ${l.label}</span>`).join(" · ")
      : "";
    if (!links.innerHTML) links.remove();
  }
})();
