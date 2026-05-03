// Interactive Bible Timeline renderer.
//
// Year scale is piecewise:
//   primeval band   (-4500 to -2100 BC)  compressed at PRIMEVAL_PX_PER_YEAR
//   historical band (-2100 onward)       at HISTORICAL_PX_PER_YEAR
// This keeps Methuselah's 969-year bar from dominating the page while still
// giving real space to David, Jesus, Paul, etc.

(function () {
  "use strict";

  const TIMELINE_TOP = 20;
  const PRIMEVAL_START = -4500;
  const PRIMEVAL_END = -2100;
  let PRIMEVAL_PX_PER_YEAR = 0.5;
  let HISTORICAL_PX_PER_YEAR = 4;
  const HISTORICAL_END = 110; // AD 110

  const COL_GAP = 4;
  const MIN_BAR_HEIGHT = 14;
  const COL_WIDTH = 130;

  let zoom = 1;

  // ----- year/pixel mapping --------------------------------------------------
  function yearToY(year) {
    const a = PRIMEVAL_PX_PER_YEAR * zoom;
    const b = HISTORICAL_PX_PER_YEAR * zoom;
    if (year <= PRIMEVAL_END) {
      return TIMELINE_TOP + (year - PRIMEVAL_START) * a;
    }
    const primevalSpan = (PRIMEVAL_END - PRIMEVAL_START) * a;
    return TIMELINE_TOP + primevalSpan + (year - PRIMEVAL_END) * b;
  }
  function totalHeight() {
    return yearToY(HISTORICAL_END) + 40;
  }

  function formatYear(y) {
    if (y == null) return "";
    if (y < 0) return Math.abs(y) + " BC";
    if (y === 0) return "1 BC"; // shouldn't occur
    return "AD " + y;
  }
  function formatYearRange(a, b) {
    if (a == null && b == null) return "";
    if (a != null && b == null) return formatYear(a) + " – ?";
    if (a == null && b != null) return "? – " + formatYear(b);
    return formatYear(a) + " – " + formatYear(b);
  }

  // ----- DOM refs ------------------------------------------------------------
  const yearAxis = document.getElementById("yearAxis");
  const timeline = document.getElementById("timeline");
  const detailPanel = document.getElementById("detailPanel");
  const detailContent = document.getElementById("detailContent");
  const closeDetail = document.getElementById("closeDetail");
  const searchInput = document.getElementById("search");
  const eraFilters = document.getElementById("eraFilters");
  const categoryFilters = document.getElementById("categoryFilters");
  const toggleEvents = document.getElementById("toggleEvents");
  const toggleTextual = document.getElementById("toggleTextual");
  const toggleOT = document.getElementById("toggleOT");
  const toggleNT = document.getElementById("toggleNT");
  const zoomSlider = document.getElementById("zoom");
  const resetBtn = document.getElementById("resetFilters");

  // ----- index for relations -------------------------------------------------
  const peopleById = {};
  BibleTimeline.people.forEach((p) => { peopleById[p.id] = p; });

  // ----- column packing ------------------------------------------------------
  // Assign each person to the leftmost column whose last-used person doesn't
  // overlap their lifespan.
  function assignColumns(people) {
    const sorted = people.slice().sort((a, b) => a.birthYear - b.birthYear);
    const columnEnds = []; // columnIndex -> latest deathYear in that column
    sorted.forEach((p) => {
      const death = p.deathYear != null ? p.deathYear : p.birthYear + 5;
      let col = -1;
      for (let i = 0; i < columnEnds.length; i++) {
        if (columnEnds[i] <= p.birthYear) { col = i; break; }
      }
      if (col === -1) {
        col = columnEnds.length;
        columnEnds.push(death);
      } else {
        columnEnds[col] = death;
      }
      p._column = col;
    });
    return columnEnds.length;
  }

  // ----- filter state --------------------------------------------------------
  const state = {
    search: "",
    eras: new Set(),       // empty = show all
    categories: new Set(),
    showEvents: true,
    showTextual: true,
    showOT: true,
    showNT: true,
  };

  // ----- filter UI build -----------------------------------------------------
  function buildFilterCheckboxes(container, values, set) {
    container.innerHTML = "";
    values.forEach((v) => {
      const id = "f-" + container.id + "-" + v;
      const wrap = document.createElement("label");
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.id = id;
      cb.value = v;
      cb.checked = true;
      cb.addEventListener("change", () => {
        if (cb.checked) set.delete(v); else set.add(v);
        // we use "in set" to mean "hidden" to keep "no filter" = show all
        applyFilters();
      });
      wrap.appendChild(cb);
      const span = document.createElement("span");
      span.textContent = " " + v.replace(/-/g, " ");
      wrap.appendChild(span);
      container.appendChild(wrap);
    });
  }

  const eraOrder = ["primeval","patriarchal","exodus","conquest","judges",
    "united-monarchy","divided-monarchy","exile","post-exile","second-temple",
    "nt-gospels","early-church"];
  const categoryOrder = ["patriarch","matriarch","judge","priest","prophet",
    "king-judah","king-israel","queen","foreign-king","apostle","messiah","other"];

  buildFilterCheckboxes(eraFilters, eraOrder, state.eras);
  buildFilterCheckboxes(categoryFilters, categoryOrder, state.categories);

  // ----- match logic ---------------------------------------------------------
  function matchesPerson(p) {
    if (state.eras.has(p.era)) return false;
    if (state.categories.has(p.category)) return false;
    if (!state.showOT && p.testament === "OT") return false;
    if (!state.showNT && p.testament === "NT") return false;
    if (!state.showTextual && p.dateCertainty === "textual") return false;
    if (state.search) {
      const q = state.search.toLowerCase();
      const hay = (p.name + " " + (p.tags || []).join(" ") + " " + (p.book || "") + " " + (p.description || "")).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  }
  function matchesEvent(ev) {
    if (!state.showEvents) return false;
    if (!state.showOT && ev.testament === "OT") return false;
    if (!state.showNT && ev.testament === "NT") return false;
    if (state.search) {
      const q = state.search.toLowerCase();
      const hay = (ev.name + " " + (ev.tags || []).join(" ") + " " + (ev.description || "")).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  }

  // ----- year axis -----------------------------------------------------------
  function renderYearAxis() {
    yearAxis.innerHTML = "";
    yearAxis.style.height = totalHeight() + "px";
    const ticks = [];
    // primeval ticks every 500 years
    for (let y = -4500; y <= -2500; y += 500) ticks.push({ year: y, major: y % 1000 === 0 });
    // historical ticks every 100 years; majors every 500
    for (let y = -2100; y <= 100; y += 100) ticks.push({ year: y, major: y % 500 === 0 });

    ticks.forEach((t) => {
      const el = document.createElement("div");
      el.className = "year-label" + (t.major ? " major" : "");
      el.style.top = yearToY(t.year) + "px";
      el.textContent = formatYear(t.year);
      yearAxis.appendChild(el);
    });
  }

  // ----- gridlines (rendered into timeline) ----------------------------------
  function renderGrid() {
    [-4000, -3000, -2500, -2000, -1500, -1000, -500, 0, 100].forEach((y) => {
      const line = document.createElement("div");
      line.className = "grid-line major";
      line.style.top = yearToY(y) + "px";
      timeline.appendChild(line);
    });
    for (let y = -2000; y <= 100; y += 100) {
      if (y % 500 === 0) continue;
      const line = document.createElement("div");
      line.className = "grid-line";
      line.style.top = yearToY(y) + "px";
      timeline.appendChild(line);
    }
  }

  // ----- person bar ----------------------------------------------------------
  function makePersonEl(p) {
    const el = document.createElement("div");
    el.className = "person cat-" + p.category + " cert-" + p.dateCertainty;
    if (p.reignStart != null) el.classList.add("has-reign");
    el.dataset.id = p.id;

    const death = p.deathYear != null ? p.deathYear : p.birthYear + 5;
    const top = yearToY(p.birthYear);
    const bottom = yearToY(death);
    const height = Math.max(MIN_BAR_HEIGHT, bottom - top);
    el.style.top = top + "px";
    el.style.height = height + "px";
    el.style.left = (p._column * (COL_WIDTH + COL_GAP)) + "px";
    el.style.width = COL_WIDTH + "px";

    if (p.reignStart != null && p.reignEnd != null) {
      const rTop = yearToY(p.reignStart) - top;
      const rBot = yearToY(p.reignEnd) - top;
      el.style.setProperty("--reign-top", rTop + "px");
      el.style.setProperty("--reign-height", (rBot - rTop) + "px");
    }

    const name = document.createElement("span");
    name.className = "name";
    name.textContent = p.name;
    el.appendChild(name);

    const years = document.createElement("span");
    years.className = "years";
    years.textContent = formatYearRange(p.birthYear, p.deathYear) +
      (p.textualAge ? " · " + p.textualAge + " yr" : "");
    el.appendChild(years);

    el.addEventListener("click", (e) => {
      e.stopPropagation();
      selectPerson(p.id);
    });
    return el;
  }

  // ----- event band ----------------------------------------------------------
  function makeEventEl(ev) {
    const el = document.createElement("div");
    const isSpan = ev.endYear != null && ev.endYear !== ev.year;
    el.className = "event-band" + (isSpan ? " span" : "");
    el.dataset.id = ev.id;

    const top = yearToY(ev.year);
    const bottom = isSpan ? yearToY(ev.endYear) : top + 2;
    el.style.top = top + "px";
    el.style.height = Math.max(2, bottom - top) + "px";

    const line = document.createElement("div");
    line.className = "event-line";
    line.style.height = (bottom - top) + "px";
    el.appendChild(line);

    const label = document.createElement("div");
    label.className = "event-label";
    label.textContent = ev.name + " (" + (isSpan
      ? formatYear(ev.year) + " – " + formatYear(ev.endYear)
      : formatYear(ev.year)) + ")";
    el.appendChild(label);

    el.addEventListener("click", (e) => {
      e.stopPropagation();
      selectEvent(ev.id);
    });
    return el;
  }

  // ----- main render ---------------------------------------------------------
  let selectedId = null;

  function render() {
    timeline.innerHTML = "";
    timeline.style.height = totalHeight() + "px";
    renderGrid();

    // events first so people overlay them
    BibleTimeline.events.forEach((ev) => {
      if (!matchesEvent(ev)) return;
      timeline.appendChild(makeEventEl(ev));
    });

    const visiblePeople = BibleTimeline.people.filter(matchesPerson);
    const colCount = assignColumns(visiblePeople);
    const minWidth = colCount * (COL_WIDTH + COL_GAP) + 320; // leave room for event labels
    timeline.style.minWidth = minWidth + "px";

    visiblePeople.forEach((p) => timeline.appendChild(makePersonEl(p)));

    if (selectedId) {
      const sel = timeline.querySelector('.person[data-id="' + selectedId + '"]');
      if (sel) sel.classList.add("selected");
    }

    renderYearAxis();
  }

  function applyFilters() {
    render();
  }

  // ----- detail panel --------------------------------------------------------
  function selectPerson(id) {
    selectedId = id;
    const p = peopleById[id];
    if (!p) return;
    detailContent.innerHTML = renderPersonDetail(p);
    openDetail();
    timeline.querySelectorAll(".person.selected").forEach((el) => el.classList.remove("selected"));
    const sel = timeline.querySelector('.person[data-id="' + id + '"]');
    if (sel) sel.classList.add("selected");
    wireRelationLinks();
  }
  function selectEvent(id) {
    const ev = BibleTimeline.events.find((e) => e.id === id);
    if (!ev) return;
    detailContent.innerHTML = renderEventDetail(ev);
    openDetail();
    wireRelationLinks();
  }
  function openDetail() {
    detailPanel.classList.add("open");
    detailPanel.setAttribute("aria-hidden", "false");
  }
  function close() {
    detailPanel.classList.remove("open");
    detailPanel.setAttribute("aria-hidden", "true");
  }
  closeDetail.addEventListener("click", close);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

  function escape(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  function field(key, value) {
    if (!value) return "";
    return '<div class="field"><div class="key">' + escape(key) + '</div><div class="val">' + value + '</div></div>';
  }

  function relationLinks(ids) {
    if (!ids || !ids.length) return "";
    return ids.map((id) => {
      const p = peopleById[id];
      const label = p ? p.name : id;
      return '<a class="relation" data-id="' + escape(id) + '">' + escape(label) + '</a>';
    }).join("");
  }
  function tagLinks(tags) {
    if (!tags || !tags.length) return "";
    return tags.map((t) => '<span class="tag">' + escape(t) + '</span>').join("");
  }

  function renderPersonDetail(p) {
    const subtitle = [
      p.category && p.category.replace(/-/g, " "),
      p.era && p.era.replace(/-/g, " "),
      p.testament,
    ].filter(Boolean).join(" · ");

    const dates = formatYearRange(p.birthYear, p.deathYear) +
      (p.textualAge ? " &nbsp;·&nbsp; lived " + p.textualAge + " years (text)" : "");
    const reign = (p.reignStart != null && p.reignEnd != null)
      ? formatYearRange(p.reignStart, p.reignEnd) + " (" + (p.reignEnd - p.reignStart) + " yr)"
      : "";

    const certaintyNote = {
      firm: "Widely accepted academic date.",
      approximate: "Mainstream academic estimate; scholars differ.",
      textual: "Date derived from biblical text (Genesis 5/11), not historical evidence.",
      legendary: "Figure not historically attested."
    }[p.dateCertainty] || "";

    const refs = (p.references || []).map((r) => "<li>" + escape(r) + "</li>").join("");

    return [
      '<h2>' + escape(p.name) + '</h2>',
      '<div class="subtitle">' + escape(subtitle) + '</div>',
      field("Dates", escape(dates)),
      field("Reign", escape(reign)),
      field("Book", escape(p.book || "")),
      field("Parents", relationLinks(p.parents)),
      field("Spouses", relationLinks(p.spouses)),
      field("Children", relationLinks(p.children)),
      p.description ? '<div class="desc">' + escape(p.description) + '</div>' : "",
      refs ? '<div class="field"><div class="key">Refs</div><div class="val"><ul class="refs">' + refs + "</ul></div></div>" : "",
      p.tags && p.tags.length ? '<div class="field"><div class="key">Tags</div><div class="val">' + tagLinks(p.tags) + "</div></div>" : "",
      certaintyNote ? '<div class="field"><div class="key">Certainty</div><div class="val">' + escape(certaintyNote) + "</div></div>" : ""
    ].join("");
  }

  function renderEventDetail(ev) {
    const isSpan = ev.endYear != null && ev.endYear !== ev.year;
    const dates = isSpan ? formatYear(ev.year) + " – " + formatYear(ev.endYear) : formatYear(ev.year);
    const refs = (ev.references || []).map((r) => "<li>" + escape(r) + "</li>").join("");
    return [
      '<h2>' + escape(ev.name) + '</h2>',
      '<div class="subtitle">' + escape((ev.category || "event").replace(/-/g, " ") + " · " + (ev.testament || "")) + '</div>',
      field("Date", escape(dates)),
      ev.description ? '<div class="desc">' + escape(ev.description) + '</div>' : "",
      ev.participants && ev.participants.length ? field("Participants", relationLinks(ev.participants)) : "",
      refs ? '<div class="field"><div class="key">Refs</div><div class="val"><ul class="refs">' + refs + "</ul></div></div>" : "",
      ev.tags && ev.tags.length ? '<div class="field"><div class="key">Tags</div><div class="val">' + tagLinks(ev.tags) + "</div></div>" : ""
    ].join("");
  }

  function wireRelationLinks() {
    detailContent.querySelectorAll("a.relation").forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const id = a.dataset.id;
        if (peopleById[id]) {
          selectPerson(id);
          scrollPersonIntoView(id);
        }
      });
    });
  }

  function scrollPersonIntoView(id) {
    const el = timeline.querySelector('.person[data-id="' + id + '"]');
    if (!el) return;
    const top = parseFloat(el.style.top) - 200;
    window.scrollTo({ top, behavior: "smooth" });
  }

  // ----- input wiring --------------------------------------------------------
  let searchTimer = null;
  searchInput.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.search = searchInput.value.trim();
      applyFilters();
    }, 150);
  });
  toggleEvents.addEventListener("change", () => { state.showEvents = toggleEvents.checked; applyFilters(); });
  toggleTextual.addEventListener("change", () => { state.showTextual = toggleTextual.checked; applyFilters(); });
  toggleOT.addEventListener("change", () => { state.showOT = toggleOT.checked; applyFilters(); });
  toggleNT.addEventListener("change", () => { state.showNT = toggleNT.checked; applyFilters(); });
  zoomSlider.addEventListener("input", () => {
    zoom = parseFloat(zoomSlider.value);
    render();
  });
  resetBtn.addEventListener("click", () => {
    state.search = ""; searchInput.value = "";
    state.eras.clear(); state.categories.clear();
    [...eraFilters.querySelectorAll('input')].forEach(cb => cb.checked = true);
    [...categoryFilters.querySelectorAll('input')].forEach(cb => cb.checked = true);
    state.showEvents = true; toggleEvents.checked = true;
    state.showTextual = true; toggleTextual.checked = true;
    state.showOT = true; toggleOT.checked = true;
    state.showNT = true; toggleNT.checked = true;
    applyFilters();
  });

  document.addEventListener("DOMContentLoaded", render);
  // also run immediately if DOM already ready
  if (document.readyState !== "loading") render();
})();
