(function (root) {
  const TITLE_KEYS = ["title", "titel", "name", "movie", "film", "product", "produkt", "video title", "video_title", "content title"];
  const LINK_KEYS = ["url", "link", "uri", "title url", "title_url", "watch url", "watch_url", "video url", "video_url"];
  const YEAR_KEYS = ["year", "jahr", "release year", "release_year", "veröffentlichungsjahr"];
  const DATE_KEYS = ["purchase date", "purchase_date", "purchased", "gekauft", "kaufdatum", "date", "datum"];
  const PROVIDER_KEYS = ["provider", "anbieter", "service"];

  function key(value) {
    return String(value || "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[-_]+/g, " ").replace(/\s+/g, " ");
  }

  function valueFor(record, aliases) {
    const entries = Object.entries(record || {});
    for (const alias of aliases) {
      const match = entries.find(([name]) => key(name) === key(alias));
      if (match && match[1] !== null && typeof match[1] !== "object") return String(match[1]).trim();
    }
    return "";
  }

  function findUrl(record) {
    const direct = valueFor(record, LINK_KEYS);
    if (direct) return direct;
    for (const value of Object.values(record || {})) {
      if (typeof value !== "string") continue;
      const match = value.match(/https?:\/\/[^\s"<>]+/i);
      if (match) return match[0];
    }
    return "";
  }

  function parseCsv(text) {
    const firstLine = String(text).split(/\r?\n/, 1)[0] || "";
    const candidates = [",", ";", "\t"];
    const delimiter = candidates.sort((a, b) => firstLine.split(b).length - firstLine.split(a).length)[0];
    const rows = [];
    let row = [], cell = "", quoted = false;
    for (let i = 0; i < text.length; i += 1) {
      const char = text[i];
      if (char === '"') {
        if (quoted && text[i + 1] === '"') { cell += '"'; i += 1; }
        else quoted = !quoted;
      } else if (char === delimiter && !quoted) { row.push(cell); cell = ""; }
      else if ((char === "\n" || char === "\r") && !quoted) {
        if (char === "\r" && text[i + 1] === "\n") i += 1;
        row.push(cell); if (row.some(value => value.trim())) rows.push(row); row = []; cell = "";
      } else cell += char;
    }
    row.push(cell); if (row.some(value => value.trim())) rows.push(row);
    if (rows.length < 2) return [];
    const headers = rows[0].map(header => header.replace(/^\uFEFF/, "").trim());
    return rows.slice(1).map(values => Object.fromEntries(headers.map((header, index) => [header, values[index] || ""])));
  }

  function collectJsonRecords(data) {
    const records = [];
    const visit = value => {
      if (Array.isArray(value)) { value.forEach(visit); return; }
      if (!value || typeof value !== "object") return;
      const names = Object.keys(value).map(key);
      if (names.some(name => TITLE_KEYS.map(key).includes(name))) records.push(value);
      else Object.values(value).forEach(visit);
    };
    visit(data);
    return records;
  }

  function normalizeRecord(record) {
    let title = valueFor(record, TITLE_KEYS);
    const link = findUrl(record);
    if (!title && link) {
      try { title = decodeURIComponent(new URL(link).pathname.split("/").filter(Boolean).pop() || ""); } catch {}
    }
    if (!title) return null;
    const rawYear = valueFor(record, YEAR_KEYS);
    const yearMatch = rawYear.match(/(?:18|19|20|21)\d{2}/);
    const provider = valueFor(record, PROVIDER_KEYS) || "Google TV / YouTube";
    const purchased = valueFor(record, DATE_KEYS);
    return {
      title,
      link,
      year: yearMatch ? Number(yearMatch[0]) : "",
      runtime: "",
      director: "",
      genre: "",
      cover: "",
      trailer: "",
      status: "prüfen",
      rating: "",
      description: "",
    };
  }

  function parseLibrary(text, type) {
    let records;
    if (type === "json") records = collectJsonRecords(JSON.parse(text));
    else records = parseCsv(text);
    const seen = new Set();
    const films = [];
    let duplicates = 0;
    for (const record of records) {
      const film = normalizeRecord(record);
      if (!film) continue;
      const identity = `${key(film.title)}|${key(film.link)}`;
      if (seen.has(identity)) { duplicates += 1; continue; }
      seen.add(identity); films.push(film);
    }
    return { films, duplicates, examined: records.length };
  }

  const PASTE_NOISE = new Set([
    "startseite", "shorts", "abos", "mediathek", "verlauf", "meine videos", "meine filme und serien", "meine filme & serien",
    "später ansehen", "downloads", "gekauft", "käufe", "filme", "serien", "mehr anzeigen", "weniger anzeigen", "anmelden",
    "einstellungen", "feedback senden", "hilfe", "datenschutz", "impressum", "youtube", "google tv", "wiedergabe", "teilen"
  ]);

  function cleanPastedLine(line) {
    return String(line || "").replace(/^\s*[•·▶►✓–—-]+\s*/, "").replace(/\s+/g, " ").trim();
  }

  function isProbableTitle(line) {
    const normalized = key(line);
    if (!normalized || normalized.length < 2 || normalized.length > 180 || PASTE_NOISE.has(normalized)) return false;
    if (/^(https?:\/\/|www\.)/i.test(line)) return false;
    if (/^\d{1,2}:\d{2}(?::\d{2})?$/.test(line) || /^\d+$/.test(line)) return false;
    if (/^(gekauft|ausgeliehen|ansehen|abspielen|trailer|staffel|folge|fsk|uhd|hd|sd|kostenlos|werbung|offline|verfügbar|nicht verfügbar)\b/i.test(line)) return false;
    if (/^(home|subscriptions|library|history|your movies|your films|purchases|settings|help|feedback|privacy|terms)$/i.test(line)) return false;
    return /[\p{L}\p{N}]/u.test(line);
  }

  function parsePastedLibrary(text) {
    const lines = String(text || "").split(/\r?\n/).map(cleanPastedLine).filter(Boolean);
    const films = [];
    const seen = new Set();
    let ignored = 0;
    for (let index = 0; index < lines.length; index += 1) {
      const original = lines[index];
      const urls = [...original.matchAll(/https?:\/\/[^\s"<>]+/gi)].map(match => match[0]);
      const titlePart = cleanPastedLine(original.replace(/https?:\/\/[^\s"<>]+/gi, ""));
      if (urls.length && !titlePart && films.length && !films[films.length - 1].link) {
        films[films.length - 1].link = urls[0];
        films[films.length - 1].status = "verfügbar";
        continue;
      }
      if (!isProbableTitle(titlePart)) { ignored += 1; continue; }
      const identity = key(titlePart);
      if (seen.has(identity)) continue;
      seen.add(identity);
      const link = urls[0] || `https://www.youtube.com/results?search_query=${encodeURIComponent(titlePart)}`;
      films.push({title:titlePart,link,year:"",runtime:"",director:"",genre:"",cover:"",trailer:"",status:"prüfen",rating:"",description:urls[0]?"":"Automatisch erzeugter YouTube-Suchlink; der direkte Wiedergabelink wurde beim Kopieren nicht übertragen."});
    }
    return { films, ignored, examined: lines.length };
  }

  const api = { parseCsv, collectJsonRecords, normalizeRecord, parseLibrary, parsePastedLibrary };
  root.VideothekImport = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
