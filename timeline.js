// Interactive Bible Timeline — renderer
//
// Year scale is piecewise:
//   Primeval band  (-4500 to -2100 BC)  compressed at PRIMEVAL_PX_PER_YEAR
//   Historical band(-2100 to +110 AD)   at HISTORICAL_PX_PER_YEAR
// This keeps the Genesis 5/11 patriarchs' 900-year bars from dominating while
// giving real vertical space to the historical eras.

(function () {
  "use strict";

  // ── Scale constants ───────────────────────────────────────────────────────
  const TIMELINE_TOP    = 24;
  const PRIMEVAL_START  = -4500;
  const PRIMEVAL_END    = -2100;
  const HISTORICAL_END  = 110;
  let   BASE_PX_PRIMEVAL    = 0.5;
  let   BASE_PX_HISTORICAL  = 4;
  let   zoom = 1;

  function pxPrimeval()    { return BASE_PX_PRIMEVAL  * zoom; }
  function pxHistorical()  { return BASE_PX_HISTORICAL * zoom; }

  function yearToY(year) {
    if (year <= PRIMEVAL_END) {
      return TIMELINE_TOP + (year - PRIMEVAL_START) * pxPrimeval();
    }
    const primevalPx = (PRIMEVAL_END - PRIMEVAL_START) * pxPrimeval();
    return TIMELINE_TOP + primevalPx + (year - PRIMEVAL_END) * pxHistorical();
  }
  function totalHeight() { return yearToY(HISTORICAL_END) + 60; }

  // ── Year formatting ───────────────────────────────────────────────────────
  function fmt(y) {
    if (y == null) return "?";
    if (y < 0) return Math.abs(y) + " BC";
    return "AD " + y;
  }
  function fmtRange(a, b) {
    if (a == null && b == null) return "";
    if (b == null) return fmt(a) + " – ?";
    if (a == null) return "? – " + fmt(b);
    return fmt(a) + " – " + fmt(b);
  }

  // ── DOM refs ──────────────────────────────────────────────────────────────
  const $ = (id) => document.getElementById(id);
  const yearAxis      = $("yearAxis");
  const timelineEl    = $("timeline");
  const timelineScroll= $("timelineScroll");
  const detailPanel   = $("detailPanel");
  const detailContent = $("detailContent");
  const detailScrim   = $("detailScrim");
  const closeDetailBtn= $("closeDetail");
  const menuToggle    = $("menuToggle");
  const filterDrawer  = $("filterDrawer");
  const drawerScrim   = $("drawerScrim");
  const closeDrawerBtn= $("closeDrawer");
  const searchInput   = $("search");
  const eraContainer  = $("eraFilters");
  const catContainer  = $("categoryFilters");
  const toggleEvents  = $("toggleEvents");
  const toggleTextual = $("toggleTextual");
  const toggleOT      = $("toggleOT");
  const toggleNT      = $("toggleNT");
  const zoomSlider    = $("zoom");
  const zoomInBtn     = $("zoomIn");
  const zoomOutBtn    = $("zoomOut");
  const resetBtn      = $("resetFilters");

  // ── People index ──────────────────────────────────────────────────────────
  const byId = {};
  BibleTimeline.people.forEach((p) => { byId[p.id] = p; });

  // ── Filter state ──────────────────────────────────────────────────────────
  // hiddenEras / hiddenCats: sets of values to hide. Empty = show all.
  const state = {
    search: "",
    hiddenEras: new Set(),
    hiddenCats: new Set(),
    showEvents:  true,
    showTextual: true,
    showOT:      true,
    showNT:      true,
  };

  // ── Column packing ────────────────────────────────────────────────────────
  function colWidth() {
    return window.innerWidth < 600 ? 90 : window.innerWidth < 1024 ? 110 : 130;
  }
  const COL_GAP   = 4;
  const MIN_BAR_H = 14;

  function assignColumns(people) {
    const sorted = people.slice().sort((a, b) => a.birthYear - b.birthYear);
    const ends = [];
    sorted.forEach((p) => {
      const death = p.deathYear != null ? p.deathYear : p.birthYear + 5;
      let col = ends.findIndex((e) => e <= p.birthYear);
      if (col === -1) { col = ends.length; ends.push(death); }
      else ends[col] = death;
      p._col = col;
    });
    return ends.length;
  }

  // ── Match predicates ──────────────────────────────────────────────────────
  function matchPerson(p) {
    if (state.hiddenEras.has(p.era)) return false;
    if (state.hiddenCats.has(p.category)) return false;
    if (!state.showOT && p.testament === "OT") return false;
    if (!state.showNT && p.testament === "NT") return false;
    if (!state.showTextual && p.dateCertainty === "textual") return false;
    if (state.search) {
      const q = state.search.toLowerCase();
      const hay = [p.name, ...(p.tags||[]), p.book||"", p.description||""].join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  }
  function matchEvent(ev) {
    if (!state.showEvents) return false;
    if (!state.showOT && ev.testament === "OT") return false;
    if (!state.showNT && ev.testament === "NT") return false;
    if (state.search) {
      const q = state.search.toLowerCase();
      const hay = [ev.name, ...(ev.tags||[]), ev.description||""].join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  }

  // ── Chip filter builders ──────────────────────────────────────────────────
  const ERA_ORDER = [
    "primeval","patriarchal","exodus","conquest","judges",
    "united-monarchy","divided-monarchy","exile","post-exile",
    "second-temple","nt-gospels","early-church"
  ];
  const CAT_ORDER = [
    "patriarch","matriarch","judge","priest","prophet",
    "king-judah","king-israel","queen","foreign-king",
    "apostle","messiah","other"
  ];

  function buildChips(container, values, hiddenSet) {
    container.innerHTML = "";
    values.forEach((v) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip active";
      chip.textContent = v.replace(/-/g, "​-"); // allow wrapping after hyphens
      chip.dataset.value = v;
      chip.addEventListener("click", () => {
        if (hiddenSet.has(v)) {
          hiddenSet.delete(v);
          chip.classList.add("active");
        } else {
          hiddenSet.add(v);
          chip.classList.remove("active");
        }
        render();
      });
      container.appendChild(chip);
    });
  }

  buildChips(eraContainer, ERA_ORDER, state.hiddenEras);
  buildChips(catContainer, CAT_ORDER, state.hiddenCats);

  // ── Year axis ─────────────────────────────────────────────────────────────
  const ERA_LABELS = [
    { year: -4000, label: "Primeval" },
    { year: -2000, label: "Patriarchal" },
    { year: -1250, label: "Exodus / Conquest" },
    { year: -1150, label: "Judges" },
    { year: -1020, label: "United Kingdom" },
    { year:  -931, label: "Divided Kingdom" },
    { year:  -586, label: "Exile" },
    { year:  -538, label: "Post-Exile" },
    { year:     1, label: "New Testament" },
  ];

  function renderAxis() {
    yearAxis.innerHTML = "";
    yearAxis.style.height = totalHeight() + "px";

    // year ticks
    const ticks = [];
    for (let y = -4500; y <= -2500; y += 500) ticks.push({ y, major: y % 1000 === 0 });
    for (let y = -2000; y <= HISTORICAL_END; y += 100) ticks.push({ y, major: y % 500 === 0 });

    ticks.forEach(({ y, major }) => {
      const el = document.createElement("div");
      el.className = "year-label" + (major ? " major" : "");
      el.style.top = yearToY(y) + "px";
      el.textContent = fmt(y);
      yearAxis.appendChild(el);
    });

    // era labels
    ERA_LABELS.forEach(({ year, label }) => {
      const el = document.createElement("div");
      el.className = "era-label";
      el.style.top = (yearToY(year) + 2) + "px";
      el.textContent = label;
      yearAxis.appendChild(el);
    });
  }

  // ── Grid lines ────────────────────────────────────────────────────────────
  function renderGrid() {
    [-4000,-3000,-2500,-2000,-1500,-1000,-500,1,100].forEach((y) => {
      const el = document.createElement("div");
      el.className = "grid-line major";
      el.style.top = yearToY(y) + "px";
      timelineEl.appendChild(el);
    });
    for (let y = -2000; y <= 100; y += 100) {
      if (y % 500 === 0) continue;
      const el = document.createElement("div");
      el.className = "grid-line";
      el.style.top = yearToY(y) + "px";
      timelineEl.appendChild(el);
    }
  }

  // ── Person bar ────────────────────────────────────────────────────────────
  function makePersonEl(p) {
    const cw = colWidth();
    const el = document.createElement("div");
    el.className = `person cat-${p.category} cert-${p.dateCertainty}${p.reignStart != null ? " has-reign" : ""}`;
    el.dataset.id = p.id;
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    el.setAttribute("aria-label", p.name + " (" + fmtRange(p.birthYear, p.deathYear) + ")");

    const death = p.deathYear != null ? p.deathYear : p.birthYear + 5;
    const top    = yearToY(p.birthYear);
    const height = Math.max(MIN_BAR_H, yearToY(death) - top);

    el.style.top    = top + "px";
    el.style.height = height + "px";
    el.style.left   = (p._col * (cw + COL_GAP)) + "px";
    el.style.width  = cw + "px";

    if (p.reignStart != null && p.reignEnd != null) {
      const rTop = yearToY(p.reignStart) - top;
      const rBot = yearToY(p.reignEnd)   - top;
      el.style.setProperty("--reign-top",    rTop + "px");
      el.style.setProperty("--reign-height", Math.max(0, rBot - rTop) + "px");
    }

    const name = document.createElement("span");
    name.className = "name";
    name.textContent = p.name;
    el.appendChild(name);

    const years = document.createElement("span");
    years.className = "years";
    years.textContent = fmtRange(p.birthYear, p.deathYear) +
      (p.textualAge ? " · " + p.textualAge + "yr" : "");
    el.appendChild(years);

    const activate = (e) => { e.stopPropagation(); selectPerson(p.id); };
    el.addEventListener("click", activate);
    el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") activate(e); });
    return el;
  }

  // ── Event band ────────────────────────────────────────────────────────────
  function makeEventEl(ev) {
    const isSpan = ev.endYear != null && ev.endYear !== ev.year;
    const el = document.createElement("div");
    el.className = "event-band" + (isSpan ? " span" : "");
    el.dataset.id = ev.id;

    const top    = yearToY(ev.year);
    const bottom = isSpan ? yearToY(ev.endYear) : top;
    el.style.top    = top + "px";
    el.style.height = Math.max(2, bottom - top) + "px";

    const line = document.createElement("div");
    line.className = "event-line";
    el.appendChild(line);

    const label = document.createElement("div");
    label.className = "event-label";
    label.textContent = ev.name + " (" +
      (isSpan ? fmt(ev.year) + "–" + fmt(ev.endYear) : fmt(ev.year)) + ")";
    el.appendChild(label);

    el.addEventListener("click", (e) => { e.stopPropagation(); selectEvent(ev.id); });
    return el;
  }

  // ── Main render ───────────────────────────────────────────────────────────
  let selectedId = null;

  function render() {
    timelineEl.innerHTML = "";
    timelineEl.style.height = totalHeight() + "px";
    renderGrid();

    BibleTimeline.events.forEach((ev) => {
      if (matchEvent(ev)) timelineEl.appendChild(makeEventEl(ev));
    });

    const visible = BibleTimeline.people.filter(matchPerson);
    const cols    = assignColumns(visible);
    const cw      = colWidth();
    const minW    = cols * (cw + COL_GAP) + 280;
    timelineEl.style.minWidth = minW + "px";

    visible.forEach((p) => timelineEl.appendChild(makePersonEl(p)));

    if (selectedId) {
      const sel = timelineEl.querySelector(`.person[data-id="${selectedId}"]`);
      if (sel) sel.classList.add("selected");
    }

    renderAxis();
  }

  // ── Detail panel ──────────────────────────────────────────────────────────
  function esc(s) {
    return String(s ?? "").replace(/[&<>"']/g, (c) =>
      ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
  }
  function field(key, val) {
    if (!val) return "";
    return `<div class="field"><div class="key">${esc(key)}</div><div class="val">${val}</div></div>`;
  }
  function relLinks(ids) {
    if (!ids?.length) return "";
    return ids.map((id) => {
      const p = byId[id];
      return `<a class="relation" data-id="${esc(id)}">${esc(p ? p.name : id)}</a>`;
    }).join("");
  }
  function tags(list) {
    return (list||[]).map((t) => `<span class="tag">${esc(t)}</span>`).join("");
  }

  function personDetailHTML(p) {
    const subtitle = [p.category?.replace(/-/g," "), p.era?.replace(/-/g," "), p.testament]
      .filter(Boolean).join(" · ");
    const dates = esc(fmtRange(p.birthYear, p.deathYear)) +
      (p.textualAge ? ` &nbsp;·&nbsp; ${p.textualAge} yrs (text)` : "");
    const reign = (p.reignStart != null && p.reignEnd != null)
      ? esc(fmtRange(p.reignStart, p.reignEnd)) + ` (${p.reignEnd - p.reignStart} yr)` : "";
    const certaintyMap = {
      firm:       "Widely accepted academic date.",
      approximate:"Mainstream academic estimate; scholars differ.",
      textual:    "Derived from biblical genealogies (Genesis 5/11), not independent historical evidence.",
      legendary:  "Not historically attested."
    };
    const refs = (p.references||[]).map((r) => `<li>${esc(r)}</li>`).join("");
    return `
      <h2>${esc(p.name)}</h2>
      <div class="subtitle">${esc(subtitle)}</div>
      ${field("Dates", dates)}
      ${reign ? field("Reign", reign) : ""}
      ${field("Book", esc(p.book||""))}
      ${field("Parents",  relLinks(p.parents))}
      ${field("Spouses",  relLinks(p.spouses))}
      ${field("Children", relLinks(p.children))}
      ${p.description ? `<div class="desc">${esc(p.description)}</div>` : ""}
      ${refs ? field("References", `<ul class="refs">${refs}</ul>`) : ""}
      ${p.tags?.length ? field("Tags", tags(p.tags)) : ""}
      ${field("Certainty", esc(certaintyMap[p.dateCertainty]||""))}
    `;
  }

  function eventDetailHTML(ev) {
    const isSpan = ev.endYear != null && ev.endYear !== ev.year;
    const dates  = isSpan ? fmt(ev.year)+"–"+fmt(ev.endYear) : fmt(ev.year);
    const refs   = (ev.references||[]).map((r) => `<li>${esc(r)}</li>`).join("");
    return `
      <h2>${esc(ev.name)}</h2>
      <div class="subtitle">${esc((ev.category||"event").replace(/-/g," "))} · ${esc(ev.testament||"")}</div>
      ${field("Date", esc(dates))}
      ${ev.description ? `<div class="desc">${esc(ev.description)}</div>` : ""}
      ${ev.participants?.length ? field("People", relLinks(ev.participants)) : ""}
      ${refs ? field("References", `<ul class="refs">${refs}</ul>`) : ""}
      ${ev.tags?.length ? field("Tags", tags(ev.tags)) : ""}
    `;
  }

  function openDetail(html) {
    detailContent.innerHTML = html;
    detailPanel.classList.add("open");
    detailPanel.setAttribute("aria-hidden", "false");
    detailScrim.classList.add("open");
    // wire relation links
    detailContent.querySelectorAll("a.relation").forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const id = a.dataset.id;
        if (byId[id]) { selectPerson(id); scrollTo(id); }
      });
    });
  }

  function closeDetail() {
    detailPanel.classList.remove("open");
    detailPanel.setAttribute("aria-hidden", "true");
    detailScrim.classList.remove("open");
    timelineEl.querySelectorAll(".person.selected").forEach((el) => el.classList.remove("selected"));
    selectedId = null;
  }

  function selectPerson(id) {
    selectedId = id;
    timelineEl.querySelectorAll(".person.selected").forEach((el) => el.classList.remove("selected"));
    const sel = timelineEl.querySelector(`.person[data-id="${id}"]`);
    if (sel) sel.classList.add("selected");
    openDetail(personDetailHTML(byId[id]));
  }

  function selectEvent(id) {
    const ev = BibleTimeline.events.find((e) => e.id === id);
    if (ev) openDetail(eventDetailHTML(ev));
  }

  function scrollTo(id) {
    const el = timelineEl.querySelector(`.person[data-id="${id}"]`);
    if (!el) return;
    window.scrollTo({ top: Math.max(0, parseFloat(el.style.top) - 200), behavior: "smooth" });
  }

  // ── Filter drawer wiring ──────────────────────────────────────────────────
  function openDrawer() {
    filterDrawer.classList.add("open");
    filterDrawer.setAttribute("aria-hidden", "false");
    drawerScrim.classList.add("open");
    menuToggle.setAttribute("aria-expanded", "true");
  }
  function closeDrawer() {
    filterDrawer.classList.remove("open");
    filterDrawer.setAttribute("aria-hidden", "true");
    drawerScrim.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  menuToggle.addEventListener("click", () =>
    filterDrawer.classList.contains("open") ? closeDrawer() : openDrawer());
  closeDrawerBtn.addEventListener("click", closeDrawer);
  drawerScrim.addEventListener("click", closeDrawer);

  // close drawer on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (filterDrawer.classList.contains("open")) { closeDrawer(); return; }
      if (detailPanel.classList.contains("open"))  { closeDetail(); }
    }
  });

  closeDetailBtn.addEventListener("click", closeDetail);
  detailScrim.addEventListener("click", closeDetail);

  // ── Zoom ──────────────────────────────────────────────────────────────────
  function setZoom(z) {
    zoom = Math.min(2, Math.max(0.4, Math.round(z * 10) / 10));
    zoomSlider.value = zoom;
    render();
  }
  zoomSlider.addEventListener("input", () => setZoom(parseFloat(zoomSlider.value)));
  zoomInBtn.addEventListener("click",  () => setZoom(zoom + 0.2));
  zoomOutBtn.addEventListener("click", () => setZoom(zoom - 0.2));

  // ── Toggle switches ───────────────────────────────────────────────────────
  toggleEvents.addEventListener("change",  () => { state.showEvents  = toggleEvents.checked;  render(); });
  toggleTextual.addEventListener("change", () => { state.showTextual = toggleTextual.checked; render(); });
  toggleOT.addEventListener("change",      () => { state.showOT      = toggleOT.checked;      render(); });
  toggleNT.addEventListener("change",      () => { state.showNT      = toggleNT.checked;      render(); });

  // ── Search ────────────────────────────────────────────────────────────────
  let searchTimer;
  searchInput.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { state.search = searchInput.value.trim(); render(); }, 150);
  });

  // ── Reset ─────────────────────────────────────────────────────────────────
  resetBtn.addEventListener("click", () => {
    state.search = ""; searchInput.value = "";
    state.hiddenEras.clear(); state.hiddenCats.clear();
    eraContainer.querySelectorAll(".chip").forEach((c) => c.classList.add("active"));
    catContainer.querySelectorAll(".chip").forEach((c) => c.classList.add("active"));
    state.showEvents  = true; toggleEvents.checked  = true;
    state.showTextual = true; toggleTextual.checked = true;
    state.showOT      = true; toggleOT.checked      = true;
    state.showNT      = true; toggleNT.checked      = true;
    setZoom(1);
    render();
  });

  // ── Resize ────────────────────────────────────────────────────────────────
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(render, 120);
  });

  // ── Boot ──────────────────────────────────────────────────────────────────
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
