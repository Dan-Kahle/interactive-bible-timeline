// Interactive Bible Timeline — renderer
//
// Year scale is piecewise:
//   Primeval band  (-4500 to -2100 BC) compressed
//   Historical band(-2100 to +110 AD)  normal
//
// Desktop: bar chart with column-packed people. Event labels live in a
//   dedicated column to the right of all people, with vertical stagger so
//   their labels never overlap each other or the people bars.
// Mobile (<768px): single-column chronological card list with sticky era
//   headers, intersection-observer entrance animations, bottom-sheet detail.

(function () {
  "use strict";

  // ── Scale ────────────────────────────────────────────────────────────────
  const TIMELINE_TOP   = 24;
  const PRIMEVAL_START = -4500;
  const PRIMEVAL_END   = -2100;
  const HISTORICAL_END = 110;
  const BASE_PX_PRIMEVAL   = 0.5;
  const BASE_PX_HISTORICAL = 4;
  let zoom = 1;

  const pxPrimeval   = () => BASE_PX_PRIMEVAL   * zoom;
  const pxHistorical = () => BASE_PX_HISTORICAL * zoom;

  function yearToY(year) {
    if (year <= PRIMEVAL_END) return TIMELINE_TOP + (year - PRIMEVAL_START) * pxPrimeval();
    const primevalPx = (PRIMEVAL_END - PRIMEVAL_START) * pxPrimeval();
    return TIMELINE_TOP + primevalPx + (year - PRIMEVAL_END) * pxHistorical();
  }
  const totalHeight = () => yearToY(HISTORICAL_END) + 60;

  function fmt(y) {
    if (y == null) return "?";
    return y < 0 ? Math.abs(y) + " BC" : "AD " + y;
  }
  function fmtRange(a, b) {
    if (a == null && b == null) return "";
    if (b == null) return fmt(a) + " – ?";
    if (a == null) return "? – " + fmt(b);
    return fmt(a) + " – " + fmt(b);
  }

  // ── DOM ──────────────────────────────────────────────────────────────────
  const $ = (id) => document.getElementById(id);
  const yearAxis       = $("yearAxis");
  const timelineEl     = $("timeline");
  const timelineScroll = $("timelineScroll");
  const detailPanel    = $("detailPanel");
  const detailContent  = $("detailContent");
  const detailScrim    = $("detailScrim");
  const closeDetailBtn = $("closeDetail");
  const menuToggle     = $("menuToggle");
  const filterDrawer   = $("filterDrawer");
  const drawerScrim    = $("drawerScrim");
  const closeDrawerBtn = $("closeDrawer");
  const searchInput    = $("search");
  const eraContainer   = $("eraFilters");
  const catContainer   = $("categoryFilters");
  const toggleEvents   = $("toggleEvents");
  const toggleTextual  = $("toggleTextual");
  const toggleOT       = $("toggleOT");
  const toggleNT       = $("toggleNT");
  const zoomSlider     = $("zoom");
  const zoomInBtn      = $("zoomIn");
  const zoomOutBtn     = $("zoomOut");
  const resetBtn       = $("resetFilters");
  const themeToggle    = $("themeToggle");
  const themeChips     = $("themeChips");
  const topbar         = $("topbar");
  const scrollProgress = $("scrollProgress");
  const currentEraEl   = $("currentEra");
  const scrollTopBtn   = $("scrollTopBtn");

  // ── Data index ───────────────────────────────────────────────────────────
  const byId = {};
  BibleTimeline.people.forEach((p) => { byId[p.id] = p; });

  // ── Filter state ─────────────────────────────────────────────────────────
  const state = {
    search: "",
    hiddenEras: new Set(),
    hiddenCats: new Set(),
    showEvents:  true,
    showTextual: true,
    showOT:      true,
    showNT:      true,
  };

  // ── Column packing ───────────────────────────────────────────────────────
  const COL_GAP   = 4;
  const MIN_BAR_H = 14;
  function colWidth() {
    return window.innerWidth < 600 ? 90 : window.innerWidth < 1024 ? 110 : 130;
  }
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

  // ── Match predicates ─────────────────────────────────────────────────────
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

  // ── Filter chips ─────────────────────────────────────────────────────────
  const ERA_ORDER = ["primeval","patriarchal","exodus","conquest","judges",
    "united-monarchy","divided-monarchy","exile","post-exile","second-temple",
    "nt-gospels","early-church"];
  const CAT_ORDER = ["patriarch","matriarch","judge","priest","prophet",
    "king-judah","king-israel","queen","foreign-king","apostle","messiah","other"];

  function buildChips(container, values, hiddenSet) {
    container.innerHTML = "";
    values.forEach((v) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip active";
      chip.textContent = v.replace(/-/g, " ");
      chip.dataset.value = v;
      chip.addEventListener("click", () => {
        if (hiddenSet.has(v)) { hiddenSet.delete(v); chip.classList.add("active"); }
        else { hiddenSet.add(v); chip.classList.remove("active"); }
        render();
      });
      container.appendChild(chip);
    });
  }
  buildChips(eraContainer, ERA_ORDER, state.hiddenEras);
  buildChips(catContainer, CAT_ORDER, state.hiddenCats);

  // ── Year axis ────────────────────────────────────────────────────────────
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

    ERA_LABELS.forEach(({ year, label }) => {
      const el = document.createElement("div");
      el.className = "era-label";
      el.style.top = (yearToY(year) + 2) + "px";
      el.textContent = label;
      yearAxis.appendChild(el);
    });
  }

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

  // ── Person bar ───────────────────────────────────────────────────────────
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

  // ── Event band — line spans full width, label sits in dedicated column ──
  // labelX is the X-coordinate (within .timeline) where event labels start.
  // labelY may be different from the event's natural Y because of stagger
  //   to prevent overlap. A connector is drawn from naturalY to labelY.
  function makeEventEl(ev, labelX, labelY) {
    const isSpan = ev.endYear != null && ev.endYear !== ev.year;
    const naturalTop = yearToY(ev.year);
    const naturalBot = isSpan ? yearToY(ev.endYear) : naturalTop;

    const el = document.createElement("div");
    el.className = "event-band" + (isSpan ? " span" : "");
    el.dataset.id = ev.id;
    el.style.top    = naturalTop + "px";
    el.style.height = Math.max(2, naturalBot - naturalTop) + "px";

    // The horizontal/vertical line at the event's true year
    const line = document.createElement("div");
    line.className = "event-line";
    el.appendChild(line);

    // If the label is staggered away from the natural Y, draw a small connector
    if (Math.abs(labelY - naturalTop) > 2) {
      const conn = document.createElement("div");
      conn.className = "event-connector";
      conn.style.left  = (labelX - 24) + "px";
      conn.style.width = "24px";
      conn.style.top   = (labelY - naturalTop + 10) + "px"; // align to label centre
      el.appendChild(conn);
    }

    const label = document.createElement("div");
    label.className = "event-label";
    label.style.left = labelX + "px";
    label.style.top  = (labelY - naturalTop) + "px";
    label.textContent = ev.name + " · " +
      (isSpan ? fmt(ev.year) + "–" + fmt(ev.endYear) : fmt(ev.year));
    label.addEventListener("click", (e) => { e.stopPropagation(); selectEvent(ev.id); });
    el.appendChild(label);

    return el;
  }

  // ── Breakpoint + render dispatch ─────────────────────────────────────────
  const isMobile = () => window.innerWidth < 768;
  let selectedId = null;

  function render() {
    if (isMobile()) renderMobileList();
    else renderDesktop();
  }

  // ── Desktop bar-chart render ─────────────────────────────────────────────
  function renderDesktop() {
    timelineScroll.classList.remove("mobile-mode");
    timelineEl.classList.remove("list-view");
    yearAxis.style.display = "";
    timelineEl.innerHTML = "";
    timelineEl.style.height = totalHeight() + "px";

    renderGrid();

    const visible = BibleTimeline.people.filter(matchPerson);
    const cols    = assignColumns(visible);
    const cw      = colWidth();

    // Event-label column starts after the rightmost person column
    const eventLabelX = cols * (cw + COL_GAP) + 16;
    const minW = eventLabelX + 320;
    timelineEl.style.minWidth = minW + "px";

    // Append people first
    visible.forEach((p) => timelineEl.appendChild(makePersonEl(p)));

    // Smart event label placement: sort by year, push labels down if too close
    const LABEL_MIN_GAP = 26;
    let lastLabelY = -Infinity;

    BibleTimeline.events
      .filter(matchEvent)
      .sort((a, b) => a.year - b.year)
      .forEach((ev) => {
        const naturalY = yearToY(ev.year);
        const labelY = Math.max(naturalY, lastLabelY + LABEL_MIN_GAP);
        lastLabelY = labelY;
        timelineEl.appendChild(makeEventEl(ev, eventLabelX, labelY));
      });

    if (selectedId) {
      const sel = timelineEl.querySelector(`.person[data-id="${selectedId}"]`);
      if (sel) sel.classList.add("selected");
    }

    renderAxis();
  }

  // ── Mobile list-view render ──────────────────────────────────────────────
  const ERA_DISPLAY = {
    "primeval":         "Primeval Era",
    "patriarchal":      "Patriarchs",
    "exodus":           "Exodus & Wilderness",
    "conquest":         "Conquest of Canaan",
    "judges":           "Period of the Judges",
    "united-monarchy":  "United Kingdom",
    "divided-monarchy": "Divided Kingdom",
    "exile":            "Babylonian Exile",
    "post-exile":       "Return & Restoration",
    "second-temple":    "Second Temple Period",
    "nt-gospels":       "Gospels & Jesus' Life",
    "early-church":     "Early Church",
  };

  function renderMobileList() {
    timelineScroll.classList.add("mobile-mode");
    yearAxis.style.display = "none";
    timelineEl.classList.add("list-view");
    timelineEl.style.height = "";
    timelineEl.style.minWidth = "";
    timelineEl.innerHTML = "";

    const items = [];
    BibleTimeline.people.forEach((p) => {
      if (matchPerson(p)) items.push({ type: "person", year: p.birthYear ?? 0, data: p });
    });
    BibleTimeline.events.forEach((ev) => {
      if (matchEvent(ev)) items.push({ type: "event", year: ev.year, data: ev });
    });
    items.sort((a, b) => a.year - b.year);

    if (items.length === 0) {
      const empty = document.createElement("p");
      empty.className = "list-empty";
      empty.textContent = "No results. Try adjusting your filters or search.";
      timelineEl.appendChild(empty);
      return;
    }

    const topbarH = topbar?.offsetHeight ?? 104;
    let lastEra = null;

    items.forEach((item) => {
      const era = item.type === "person" ? item.data.era : null;
      if (era && era !== lastEra) {
        lastEra = era;
        const heading = document.createElement("div");
        heading.className = "list-era-head";
        heading.style.top = topbarH + "px";
        heading.dataset.era = era;
        heading.textContent = ERA_DISPLAY[era] ?? era.replace(/-/g, " ");
        timelineEl.appendChild(heading);
      }
      const card = item.type === "person"
        ? makePersonCard(item.data)
        : makeEventCard(item.data);
      timelineEl.appendChild(card);
    });

    setupRevealObserver();
    setupEraScrollObserver();
  }

  function makePersonCard(p) {
    const card = document.createElement("div");
    card.className = `list-card list-card--${p.category}`;
    card.dataset.id = p.id;
    card.dataset.era = p.era;
    if (selectedId === p.id) card.classList.add("selected");

    const left = document.createElement("div");
    left.className = "list-card__left";
    const dot = document.createElement("div");
    dot.className = "list-card__dot";
    left.appendChild(dot);
    const line = document.createElement("div");
    line.className = "list-card__line";
    left.appendChild(line);

    const body = document.createElement("div");
    body.className = "list-card__body";

    const yearBadge = document.createElement("span");
    yearBadge.className = "list-card__year";
    yearBadge.textContent = fmt(p.birthYear);

    const catBadge = document.createElement("span");
    catBadge.className = `list-card__cat cat-badge--${p.category}`;
    catBadge.textContent = (p.category ?? "").replace(/-/g, " ");

    const badgeRow = document.createElement("div");
    badgeRow.className = "list-card__badges";
    badgeRow.appendChild(yearBadge);
    badgeRow.appendChild(catBadge);

    const name = document.createElement("div");
    name.className = "list-card__name";
    name.textContent = p.name;

    const dates = document.createElement("div");
    dates.className = "list-card__dates";
    dates.textContent = fmtRange(p.birthYear, p.deathYear) +
      (p.textualAge ? ` · ${p.textualAge} yrs` : "");

    body.appendChild(badgeRow);
    body.appendChild(name);
    body.appendChild(dates);

    if (p.description) {
      const desc = document.createElement("div");
      desc.className = "list-card__desc";
      desc.textContent = p.description.length > 140
        ? p.description.slice(0, 137) + "…"
        : p.description;
      body.appendChild(desc);
    }

    card.appendChild(left);
    card.appendChild(body);

    card.addEventListener("click", () => {
      selectedId = p.id;
      timelineEl.querySelectorAll(".list-card.selected")
        .forEach((el) => el.classList.remove("selected"));
      card.classList.add("selected");
      openDetail(personDetailHTML(p));
    });
    return card;
  }

  function makeEventCard(ev) {
    const card = document.createElement("div");
    card.className = "list-card list-card--event";

    const left = document.createElement("div");
    left.className = "list-card__left";
    const dot = document.createElement("div");
    dot.className = "list-card__dot list-card__dot--event";
    left.appendChild(dot);
    const line = document.createElement("div");
    line.className = "list-card__line";
    left.appendChild(line);

    const body = document.createElement("div");
    body.className = "list-card__body";

    const isSpan = ev.endYear != null && ev.endYear !== ev.year;
    const yearBadge = document.createElement("span");
    yearBadge.className = "list-card__year";
    yearBadge.textContent = isSpan ? fmt(ev.year) + " – " + fmt(ev.endYear) : fmt(ev.year);

    const catBadge = document.createElement("span");
    catBadge.className = "list-card__cat cat-badge--event";
    catBadge.textContent = (ev.category ?? "event").replace(/-/g, " ");

    const badgeRow = document.createElement("div");
    badgeRow.className = "list-card__badges";
    badgeRow.appendChild(yearBadge);
    badgeRow.appendChild(catBadge);

    const name = document.createElement("div");
    name.className = "list-card__name list-card__name--event";
    name.textContent = "★ " + ev.name;

    body.appendChild(badgeRow);
    body.appendChild(name);

    if (ev.description) {
      const desc = document.createElement("div");
      desc.className = "list-card__desc";
      desc.textContent = ev.description.length > 120
        ? ev.description.slice(0, 117) + "…"
        : ev.description;
      body.appendChild(desc);
    }

    card.appendChild(left);
    card.appendChild(body);
    card.addEventListener("click", () => openDetail(eventDetailHTML(ev)));
    return card;
  }

  // ── Reveal animations on mobile ──────────────────────────────────────────
  let revealObserver = null;
  function setupRevealObserver() {
    if (revealObserver) revealObserver.disconnect();
    if (!("IntersectionObserver" in window)) {
      timelineEl.querySelectorAll(".list-card").forEach((c) => c.classList.add("reveal"));
      return;
    }
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    timelineEl.querySelectorAll(".list-card").forEach((c) => revealObserver.observe(c));
  }

  // ── Current-era tracking on scroll (mobile) ──────────────────────────────
  let eraObserver = null;
  function setupEraScrollObserver() {
    if (eraObserver) eraObserver.disconnect();
    if (!("IntersectionObserver" in window)) return;

    const headers = timelineEl.querySelectorAll(".list-era-head");
    if (!headers.length) return;

    const topbarH = topbar?.offsetHeight ?? 104;
    eraObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const era = entry.target.dataset.era;
          if (era && currentEraEl) {
            currentEraEl.textContent = ERA_DISPLAY[era] ?? era.replace(/-/g, " ");
          }
        }
      });
    }, { rootMargin: `-${topbarH + 1}px 0px -70% 0px`, threshold: 0 });

    headers.forEach((h) => eraObserver.observe(h));
  }

  // ── Detail panel ─────────────────────────────────────────────────────────
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
      firm:        "Widely accepted academic date.",
      approximate: "Mainstream academic estimate; scholars differ.",
      textual:     "Derived from biblical genealogies (Genesis 5/11), not independent historical evidence.",
      legendary:   "Not historically attested."
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
    detailContent.querySelectorAll("a.relation").forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const id = a.dataset.id;
        if (byId[id]) { selectPerson(id); scrollToPerson(id); }
      });
    });
  }
  function closeDetail() {
    detailPanel.classList.remove("open");
    detailPanel.setAttribute("aria-hidden", "true");
    detailScrim.classList.remove("open");
    timelineEl.querySelectorAll(".person.selected, .list-card.selected")
      .forEach((el) => el.classList.remove("selected"));
    selectedId = null;
  }
  function selectPerson(id) {
    selectedId = id;
    timelineEl.querySelectorAll(".person.selected, .list-card.selected")
      .forEach((el) => el.classList.remove("selected"));
    const sel = timelineEl.querySelector(`[data-id="${id}"]`);
    if (sel) sel.classList.add("selected");
    openDetail(personDetailHTML(byId[id]));
  }
  function selectEvent(id) {
    const ev = BibleTimeline.events.find((e) => e.id === id);
    if (ev) openDetail(eventDetailHTML(ev));
  }
  function scrollToPerson(id) {
    const el = timelineEl.querySelector(`[data-id="${id}"]`);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const targetY = window.scrollY + rect.top - (topbar?.offsetHeight ?? 104) - 16;
    window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
  }

  // ── Drawer ───────────────────────────────────────────────────────────────
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

  closeDetailBtn.addEventListener("click", closeDetail);
  detailScrim.addEventListener("click", closeDetail);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (filterDrawer.classList.contains("open")) { closeDrawer(); return; }
      if (detailPanel.classList.contains("open"))  { closeDetail(); }
    }
  });

  // ── Theme handling ───────────────────────────────────────────────────────
  function getTheme() {
    return localStorage.getItem("bt-theme") || "auto";
  }
  function applyTheme(t) {
    if (t === "auto") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("bt-theme", t); } catch (e) {}
    updateThemeChips(t);
  }
  function updateThemeChips(active) {
    if (!themeChips) return;
    themeChips.querySelectorAll(".chip").forEach((c) => {
      c.classList.toggle("active", c.dataset.themeValue === active);
    });
  }
  function effectiveTheme() {
    const explicit = document.documentElement.getAttribute("data-theme");
    if (explicit) return explicit;
    return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  themeToggle.addEventListener("click", () => {
    const next = effectiveTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
  });
  themeChips?.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip[data-theme-value]");
    if (btn) applyTheme(btn.dataset.themeValue);
  });
  applyTheme(getTheme());

  // ── Zoom ─────────────────────────────────────────────────────────────────
  function setZoom(z) {
    zoom = Math.min(2, Math.max(0.4, Math.round(z * 10) / 10));
    zoomSlider.value = zoom;
    render();
  }
  zoomSlider.addEventListener("input", () => setZoom(parseFloat(zoomSlider.value)));
  zoomInBtn.addEventListener("click",  () => setZoom(zoom + 0.2));
  zoomOutBtn.addEventListener("click", () => setZoom(zoom - 0.2));

  // ── Toggles + search ─────────────────────────────────────────────────────
  toggleEvents.addEventListener("change",  () => { state.showEvents  = toggleEvents.checked;  render(); });
  toggleTextual.addEventListener("change", () => { state.showTextual = toggleTextual.checked; render(); });
  toggleOT.addEventListener("change",      () => { state.showOT      = toggleOT.checked;      render(); });
  toggleNT.addEventListener("change",      () => { state.showNT      = toggleNT.checked;      render(); });

  let searchTimer;
  searchInput.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { state.search = searchInput.value.trim(); render(); }, 150);
  });

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

  // ── Resize ───────────────────────────────────────────────────────────────
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(render, 120);
  });

  // ── Scroll-driven UI: progress bar, topbar elevation, FAB ────────────────
  function updateScrollUI() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = pct + "%";

    const scrolled = window.scrollY > 8;
    topbar?.classList.toggle("scrolled", scrolled);

    if (scrollTopBtn) scrollTopBtn.classList.toggle("show", window.scrollY > 600);
  }
  window.addEventListener("scroll", updateScrollUI, { passive: true });
  scrollTopBtn?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // ── Boot ─────────────────────────────────────────────────────────────────
  function boot() {
    render();
    updateScrollUI();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
