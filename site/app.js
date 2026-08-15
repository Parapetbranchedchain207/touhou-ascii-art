const CHARACTER_ACCENTS = {
  "aya-shameimaru": "#d86d3d",
  cirno: "#64c7df",
  "marisa-kirisame": "#e2bd54",
  "reimu-hakurei": "#d12645",
  "yukari-yakumo": "#a172d1",
};

const state = {
  entries: [],
  artwork: new Map(),
  character: "all",
  query: "",
  activeEntry: null,
  zoom: 8,
};

const elements = {
  grid: document.querySelector("#gallery-grid"),
  template: document.querySelector("#art-card-template"),
  filters: document.querySelector("#character-filters"),
  search: document.querySelector("#search-input"),
  results: document.querySelector("#results-label"),
  empty: document.querySelector("#empty-state"),
  clear: document.querySelector("#clear-search"),
  workCount: document.querySelector("#work-count"),
  characterCount: document.querySelector("#character-count"),
  viewer: document.querySelector("#viewer"),
  viewerCharacter: document.querySelector("#viewer-character"),
  viewerTitle: document.querySelector("#viewer-title"),
  viewerDetails: document.querySelector("#viewer-details"),
  viewerArt: document.querySelector("#viewer-art"),
  viewerClose: document.querySelector("#viewer-close"),
  zoomOut: document.querySelector("#zoom-out"),
  zoomIn: document.querySelector("#zoom-in"),
  zoomLabel: document.querySelector("#zoom-label"),
  copy: document.querySelector("#copy-art"),
  download: document.querySelector("#download-art"),
  source: document.querySelector("#source-art"),
};

function searchableText(entry) {
  return [
    entry.title,
    entry.description,
    entry.character,
    entry.character_name,
    ...entry.artists,
    ...entry.tags,
  ].join(" ").toLocaleLowerCase();
}

function filteredEntries() {
  const terms = state.query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return state.entries.filter((entry) => {
    const matchesCharacter = state.character === "all" || entry.character === state.character;
    const haystack = searchableText(entry);
    return matchesCharacter && terms.every((term) => haystack.includes(term));
  });
}

function renderFilters() {
  const characters = [...new Map(state.entries.map((entry) => [entry.character, entry.character_name]))];
  const options = [["all", "All residents"], ...characters];
  elements.filters.replaceChildren();

  options.forEach(([slug, label]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "filter-button";
    button.textContent = label;
    button.setAttribute("aria-pressed", String(state.character === slug));
    button.addEventListener("click", () => {
      state.character = slug;
      renderFilters();
      renderGallery();
    });
    elements.filters.append(button);
  });
}

function createCard(entry) {
  const fragment = elements.template.content.cloneNode(true);
  const card = fragment.querySelector(".art-card");
  const button = fragment.querySelector(".card-open");
  const preview = fragment.querySelector(".art-preview");
  const accent = CHARACTER_ACCENTS[entry.character] || "#d12645";

  card.style.setProperty("--accent", accent);
  fragment.querySelector(".card-character").textContent = entry.character_name;
  fragment.querySelector(".card-title").textContent = entry.title;
  fragment.querySelector(".card-description").textContent = entry.description;
  fragment.querySelector(".card-canvas").textContent = `${entry.canvas.width} × ${entry.canvas.height}`;
  preview.textContent = state.artwork.get(entry.id) || "Artwork unavailable";
  button.setAttribute("aria-label", `Open ${entry.title} by ${entry.character_name}`);
  button.addEventListener("click", () => openViewer(entry));
  return fragment;
}

function renderGallery() {
  const entries = filteredEntries();
  elements.grid.replaceChildren(...entries.map(createCard));
  elements.results.textContent = `${entries.length} ${entries.length === 1 ? "work" : "works"} shown`;
  elements.empty.hidden = entries.length !== 0;
}

function updateZoom() {
  elements.viewerArt.style.fontSize = `${state.zoom}px`;
  elements.zoomLabel.textContent = `${Math.round((state.zoom / 8) * 100)}%`;
}

function openViewer(entry, updateHash = true) {
  state.activeEntry = entry;
  state.zoom = 8;
  elements.viewerCharacter.textContent = entry.character_name;
  elements.viewerTitle.textContent = entry.title;
  elements.viewerDetails.textContent = `${entry.canvas.width} × ${entry.canvas.height} · ${entry.charset} · ${entry.license}`;
  elements.viewerArt.textContent = state.artwork.get(entry.id) || "Artwork unavailable";
  elements.download.href = entry.art_url;
  elements.download.download = `${entry.character}-${entry.id.split("/").at(-1)}.txt`;
  elements.source.href = entry.repository_url;
  updateZoom();
  if (!elements.viewer.open) elements.viewer.showModal();
  if (updateHash) history.replaceState(null, "", `#${encodeURIComponent(entry.id)}`);
}

function closeViewer() {
  elements.viewer.close();
  state.activeEntry = null;
  history.replaceState(null, "", `${location.pathname}${location.search}`);
}

async function copyArtwork() {
  if (!state.activeEntry) return;
  await navigator.clipboard.writeText(state.artwork.get(state.activeEntry.id));
  const oldLabel = elements.copy.textContent;
  elements.copy.textContent = "Copied";
  setTimeout(() => { elements.copy.textContent = oldLabel; }, 1200);
}

function openFromHash() {
  if (!location.hash) return;
  const id = decodeURIComponent(location.hash.slice(1));
  const entry = state.entries.find((candidate) => candidate.id === id);
  if (entry) openViewer(entry, false);
}

async function loadGallery() {
  try {
    const response = await fetch("./data/gallery.json");
    if (!response.ok) throw new Error(`Gallery index returned ${response.status}`);
    state.entries = await response.json();

    await Promise.all(state.entries.map(async (entry) => {
      try {
        const artResponse = await fetch(entry.art_url);
        if (!artResponse.ok) throw new Error(`Artwork returned ${artResponse.status}`);
        state.artwork.set(entry.id, await artResponse.text());
      } catch (error) {
        state.artwork.set(entry.id, `Unable to load artwork.\n${error.message}`);
      }
    }));

    elements.workCount.textContent = state.entries.length;
    elements.characterCount.textContent = new Set(state.entries.map((entry) => entry.character)).size;
    renderFilters();
    renderGallery();
    openFromHash();
  } catch (error) {
    elements.results.textContent = "The archive could not be opened.";
    elements.empty.hidden = false;
    elements.empty.querySelector("h3").textContent = "The archive is sleeping";
    elements.empty.querySelector("p").textContent = error.message;
    elements.clear.hidden = true;
  }
}

elements.search.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderGallery();
});

elements.clear.addEventListener("click", () => {
  state.query = "";
  state.character = "all";
  elements.search.value = "";
  renderFilters();
  renderGallery();
  elements.search.focus();
});

elements.viewerClose.addEventListener("click", closeViewer);
elements.viewer.addEventListener("click", (event) => {
  if (event.target === elements.viewer) closeViewer();
});
elements.viewer.addEventListener("close", () => {
  if (state.activeEntry) {
    state.activeEntry = null;
    history.replaceState(null, "", `${location.pathname}${location.search}`);
  }
});
elements.zoomOut.addEventListener("click", () => {
  state.zoom = Math.max(4, state.zoom - 1);
  updateZoom();
});
elements.zoomIn.addEventListener("click", () => {
  state.zoom = Math.min(18, state.zoom + 1);
  updateZoom();
});
elements.copy.addEventListener("click", copyArtwork);

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && document.activeElement !== elements.search && !elements.viewer.open) {
    event.preventDefault();
    elements.search.focus();
  }
});

loadGallery();
