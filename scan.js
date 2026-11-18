/* Gradely: fill grades from a grade sheet (image, PDF, Word, Excel, CSV or pasted text).
   Everything runs in the browser. Reading libraries load only when a file is chosen. */
(() => {
  const LIBS = {
    ocr: "https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js",
    pdf: "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js",
    pdfWorker: "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js",
    docx: "https://cdn.jsdelivr.net/npm/mammoth@1.8.0/mammoth.browser.min.js",
    xlsx: "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js",
  };
  const loaded = {};
  const lib = (src) => (loaded[src] ||= new Promise((ok, fail) => {
    const s = document.createElement("script");
    s.src = src; s.async = true; s.onload = ok;
    s.onerror = () => { delete loaded[src]; fail(new Error("offline")); };
    document.head.appendChild(s);
  }));

  /* ---------- parsing: text lines -> courses ---------- */
  const SKIP = /ממוצע|סה"?כ|סך הכל|סיכום|average|total|gpa|credits earned|תאריך|ת\.ז|ת"ז|student id|page \d|עמוד \d/i;
  const SEM = /סמסטר|semester|trimester|שנה\s*[א-ד]'?|year\s*\d|תש[א-ת]"?[א-ת]|קיץ|חורף|אביב|summer|winter|spring|fall|autumn/i;
  const PASS = /עובר|פטור|הוכר|pass(ed)?\b|exempt/i;
  const LETTERS = /[A-Za-z֐-׿]{2,}/;

  function parse(text, scale = 100) {
    const groups = [];
    let cur = null;
    const take = (name) => { cur = { name, courses: [] }; groups.push(cur); };
    for (let raw of String(text).split(/\r?\n/)) {
      let line = raw.replace(/[|_\t;]+/g, "  ");
      // two or more commas means they separate cells, one comma between digits is a decimal point
      line = ((line.match(/,/g) || []).length >= 2 ? line.replace(/,/g, "  ") : line.replace(/(\d),(\d{1,2})(?!\d)/g, "$1.$2")).trim();
      if (!line || !LETTERS.test(line)) continue;
      // drop course codes like 202-1-1031, 10123, dates and years so they are not read as grades
      const clean = line
        .replace(/\b\d{1,2}[./]\d{1,2}[./]\d{2,4}\b/g, " ")
        .replace(/\b\d+(?:-\d+)+\b/g, " ")
        .replace(/\b\d{4,}\b/g, " ")
        .replace(/\d+(?:\.\d+)?\s*%/g, " ");
      let nums = (clean.match(/\d+(?:\.\d+)?/g) || []).map(Number);
      let keep = "";
      // "Calculus 1  5  88": a small whole number right after the name belongs to the name
      const tail = clean.match(/^([^\d]*\p{L}[\p{L}'".]*)\s+([1-4])(?=\s)/u);
      if (tail && nums.length >= 3) { keep = " " + tail[2]; nums = nums.slice(1); }
      const words = (tail && keep ? tail[1] + "  " + clean.slice(tail[0].length) : clean)
        .replace(/\d+(?:\.\d+)?/g, " ").replace(/[^\p{L}\p{M}\s'"+#&()\-.,:/]/gu, " ")
        .replace(/\s+/g, " ").replace(/^[\s\-.,:]+|[\s\-.,:]+$/g, "").trim();
      const name = keep && tail ? (tail[1].trim() + keep + " " + words.slice(tail[1].trim().length)).replace(/\s+/g, " ").trim() : words;
      const isPass = PASS.test(line);
      if (SKIP.test(line) && !isPass) continue;
      const pick = pickNums(nums, scale, isPass);
      if (!pick.gr && !isPass) {
        if (SEM.test(line) && name.length < 40) take(name);
        continue;
      }
      if (!LETTERS.test(name)) continue;
      if (!cur) take("");
      if (isPass && !pick.gr) pick.cr = pick.cr || (nums.find(half) ?? "") + "";
      cur.courses.push({
        name: name.replace(PASS, "").trim() || name,
        cr: pick.cr || "",
        gr: isPass && !pick.gr ? "" : pick.gr,
        inc: !(isPass && !pick.gr),
        pass: isPass && !pick.gr,
      });
    }
    return groups.filter((g) => g.courses.length);
  }

  const half = (n) => n > 0 && n <= 12 && Math.abs(n * 2 - Math.round(n * 2)) < 1e-9;
  function pickNums(nums, scale, pass) {
    const inRange = nums.map((n, i) => ({ n, i })).filter((x) => x.n >= 0 && x.n <= scale);
    if (!inRange.length) return {};
    let g;
    if (scale >= 20) {
      // big scales: the grade is the largest number that is too big to be credits; otherwise the last one
      const big = inRange.filter((x) => x.n > 12);
      g = big.length ? big.reduce((a, b) => (b.n >= a.n ? b : a)) : nums.length > 1 ? inRange.at(-1) : null;
      if (!g && nums.length === 1 && !pass) g = inRange[0];
    } else {
      g = inRange.at(-1);
    }
    if (!g) return {};
    const c = nums.map((n, i) => ({ n, i })).find((x) => x.i !== g.i && half(x.n));
    return { gr: String(g.n), cr: c ? String(c.n) : "" };
  }

  /* ---------- reading files -> text ---------- */
  let progressCb = () => {};
  async function ocr(src) {
    await lib(LIBS.ocr);
    const r = await window.Tesseract.recognize(src, "heb+eng", {
      logger: (m) => m.status === "recognizing text" && progressCb(m.progress),
    });
    return r.data.text;
  }

  async function pdfText(file) {
    await lib(LIBS.pdf);
    const pdfjs = window.pdfjsLib;
    pdfjs.GlobalWorkerOptions.workerSrc = LIBS.pdfWorker;
    const doc = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
    const pages = Math.min(doc.numPages, 15);
    let out = "";
    for (let p = 1; p <= pages; p++) {
      setStatus(t().scPage(p, pages));
      const page = await doc.getPage(p);
      const tc = await page.getTextContent();
      const rows = new Map();
      for (const it of tc.items) {
        if (!it.str || !it.str.trim()) continue;
        const y = Math.round(it.transform[5] / 3);
        if (!rows.has(y)) rows.set(y, []);
        rows.get(y).push({ x: it.transform[4], s: it.str });
      }
      let txt = [...rows.entries()].sort((a, b) => b[0] - a[0]).map(([, its]) => {
        const heb = its.filter((i) => /[֐-׿]/.test(i.s)).length > its.length / 2;
        return its.sort((a, b) => (heb ? b.x - a.x : a.x - b.x)).map((i) => i.s).join("  ");
      }).join("\n");
      if (txt.replace(/\s/g, "").length < 20) {
        // scanned page with no text layer: draw it and read it like an image
        const vp = page.getViewport({ scale: 2 });
        const cv = document.createElement("canvas");
        cv.width = vp.width; cv.height = vp.height;
        await page.render({ canvasContext: cv.getContext("2d"), viewport: vp }).promise;
        txt = await ocr(cv);
      }
      out += txt + "\n";
    }
    return out;
  }

  /* CSV -> lines with wide gaps between cells. A quote only opens a cell at its start, so
     Hebrew abbreviations like תשפ"ה stay as they are. */
  function csvText(txt) {
    const sep = (txt.split("\n")[0].match(/;/g) || []).length > (txt.split("\n")[0].match(/,/g) || []).length ? ";" : ",";
    return txt.split(/\r?\n/).map((line) => {
      const cells = []; let cell = "", q = false;
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (q) { if (ch === '"' && line[i + 1] === '"') { cell += '"'; i++; } else if (ch === '"') q = false; else cell += ch; }
        else if (ch === '"' && !cell.trim()) q = true;
        else if (ch === sep) { cells.push(cell); cell = ""; }
        else cell += ch;
      }
      cells.push(cell);
      return cells.map((c) => c.trim().replace(/^(\d+),(\d+)$/, "$1.$2")).join("  ");
    }).join("\n");
  }

  async function readFile(file) {
    const n = (file.name || "").toLowerCase();
    const type = file.type || "";
    if (type.startsWith("image/")) return ocr(file);
    if (type === "application/pdf" || n.endsWith(".pdf")) return pdfText(file);
    if (n.endsWith(".docx")) {
      await lib(LIBS.docx);
      const r = await window.mammoth.convertToHtml({ arrayBuffer: await file.arrayBuffer() });
      // keep table cells apart so each course stays on its own line
      const div = document.createElement("div");
      div.innerHTML = r.value;
      div.querySelectorAll("td,th").forEach((c) => c.append("  "));
      div.querySelectorAll("tr,p,li,h1,h2,h3,h4").forEach((c) => c.append("\n"));
      return div.textContent;
    }
    if (/\.(xlsx|xls)$/.test(n)) {
      await lib(LIBS.xlsx);
      const wb = window.XLSX.read(await file.arrayBuffer(), { type: "array" });
      return wb.SheetNames.map((s) => window.XLSX.utils.sheet_to_json(wb.Sheets[s], { header: 1, raw: false })
        .map((r) => r.join("  ")).join("\n")).join("\n");
    }
    if (/\.(csv|txt)$/.test(n) || type.startsWith("text/")) {
      const txt = await file.text();
      return n.endsWith(".csv") ? csvText(txt) : txt;
    }
    throw new Error("type");
  }

  /* ---------- UI ---------- */
  const modal = $("scanModal"), sheet = $("scanSheet");
  let found = [];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const open = (html) => {
    sheet.innerHTML = `<button class="scan-x" type="button" aria-label="close">✕</button>` + html;
    sheet.dir = state.lang === "he" ? "rtl" : "ltr";
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add("show"));
    sheet.querySelector(".scan-x").onclick = close;
  };
  const close = () => { modal.classList.remove("show"); setTimeout(() => (modal.hidden = true), 250); };
  modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) close(); });

  function setStatus(msg) { const el = sheet.querySelector(".scan-status"); if (el) el.textContent = msg; }
  function busy(msg) {
    open(`<div class="scan-busy"><div class="scan-paper"><i></i><i></i><i></i><i></i><span class="scan-beam"></span></div>
      <p class="scan-status">${esc(msg)}</p><div class="scan-bar"><span id="scanBar"></span></div></div>`);
    progressCb = (p) => { const b = $("scanBar"); if (b) b.style.width = Math.round(p * 100) + "%"; };
  }

  async function handle(file) {
    if (!file) return;
    busy(t().scLoading);
    try {
      setTimeout(() => setStatus(t().scReading), 900);
      const text = await readFile(file);
      showResults(smart(text), text);
    } catch (err) {
      close();
      toast(err && err.message === "type" ? t().scBad : navigator.onLine === false || (err && err.message === "offline") ? t().scOffline : t().scNone);
    }
  }

  function pasteView(text = "") {
    open(`<h2>${esc(t().scPasteT)}</h2><textarea class="scan-area" id="scanText" rows="9" placeholder="${esc(t().scPastePh)}">${esc(text)}</textarea>
      <div class="scan-actions"><button class="btn ghost" type="button" id="scCancel">${esc(t().scCancel)}</button>
      <button class="btn primary" type="button" id="scParse">${esc(t().scParse)}</button></div>`);
    $("scCancel").onclick = close;
    $("scParse").onclick = () => showResults(smart($("scanText").value), $("scanText").value);
    $("scanText").focus();
  }

  /* if the sheet clearly uses 0-100 while the site is set to a small scale, read it as 0-100 */
  let switchScale = false;
  function smart(text) {
    switchScale = false;
    const mine = parse(text, state.scale);
    if (state.scale >= 100) return mine;
    const big = parse(text, 100);
    const all = big.flatMap((g) => g.courses).filter((c) => c.gr !== "");
    if (all.length && all.filter((c) => +c.gr > state.scale).length > all.length / 2) { switchScale = true; return big; }
    return mine;
  }

  function showResults(groups, text) {
    found = groups;
    const total = groups.reduce((s, g) => s + g.courses.length, 0);
    if (!total) { pasteView(text || ""); setTimeout(() => toast(t().scNone), 300); return; }
    const named = groups.filter((g) => g.name).length;
    const opts = [
      ...(named > 1 ? [`<option value="file">${esc(t().scAsFile(groups.length))}</option>`] : []),
      `<option value="new">${esc(t().scNewSem)}</option>`,
      ...state.semesters.map((s, i) => `<option value="${i}">${esc(s.name || `${t().semester} ${i + 1}`)}</option>`),
    ].join("");
    let n = 0;
    const rows = groups.map((g) => `${g.name && groups.length > 1 ? `<div class="scan-gname">${esc(g.name)}</div>` : ""}` + g.courses.map((c) => {
      const k = n++;
      return `<div class="scan-row${c.pass ? " pass" : ""}" data-k="${k}" style="animation-delay:${Math.min(k, 20) * 35}ms">
        <label class="toggle"><input type="checkbox" class="on" checked><span></span></label>
        <input class="nm" value="${esc(c.name)}" aria-label="${esc(t().course)}">
        <input class="cr" type="number" min="0" step="0.5" value="${esc(c.cr)}" placeholder="${esc(t().cr)}" aria-label="${esc(t().cr)}">
        <input class="gr" type="number" min="0" step="any" value="${esc(c.gr)}" placeholder="${c.pass ? "✓" : esc(t().grade)}" aria-label="${esc(t().grade)}" ${c.pass ? `title="${esc(t().scPass)}"` : ""}>
      </div>`;
    }).join("")).join("");
    open(`<h2>✨ ${esc(t().scFound(total))}</h2>${switchScale ? `<p class="scan-note">${esc(t().scScale)}</p>` : ""}
      <div class="scan-into"><label>${esc(t().scInto)} <select id="scInto">${opts}</select></label>
        <button class="btn ghost" type="button" id="scAll">${esc(t().scAll)}</button></div>
      <div class="scan-head"><span></span><span>${esc(t().course)}</span><span>${esc(t().cr)}</span><span>${esc(t().grade)}</span></div>
      <div class="scan-list">${rows}</div>
      <div class="scan-actions"><button class="btn ghost" type="button" id="scBack">${esc(t().scBack)}</button>
        <button class="btn primary" type="button" id="scAdd"></button></div>`);
    const count = () => { const c = sheet.querySelectorAll(".scan-row .on:checked").length; $("scAdd").textContent = t().scAdd(c); $("scAdd").disabled = !c; };
    sheet.querySelector(".scan-list").addEventListener("change", (e) => {
      if (e.target.classList.contains("on")) e.target.closest(".scan-row").classList.toggle("off", !e.target.checked);
      count();
    });
    $("scAll").onclick = () => { const all = [...sheet.querySelectorAll(".scan-row .on")]; const v = all.some((x) => !x.checked); all.forEach((x) => { x.checked = v; x.closest(".scan-row").classList.toggle("off", !v); }); count(); };
    $("scBack").onclick = () => pasteView(text || "");
    $("scAdd").onclick = commit;
    count();
  }

  function commit() {
    const flat = found.flatMap((g, gi) => g.courses.map((c) => ({ ...c, gi })));
    const picked = [...sheet.querySelectorAll(".scan-row")].map((r) => {
      const c = flat[+r.dataset.k];
      if (!r.querySelector(".on").checked) return null;
      const gr = r.querySelector(".gr").value;
      return { gi: c.gi, course: { name: r.querySelector(".nm").value.trim(), cr: r.querySelector(".cr").value, gr, inc: gr !== "" && c.inc } };
    }).filter(Boolean);
    if (!picked.length) return;
    snapshot();
    if (switchScale) { state.scale = 100; syncInputs(); }
    const into = $("scInto").value;
    const isBlank = (s) => s.courses.every((c) => !c.name && !c.cr && !c.gr);
    const dropBlank = (s) => { s.courses = s.courses.filter((c) => c.name || c.cr || c.gr); };
    if (into === "file") {
      found.forEach((g, gi) => {
        const cs = picked.filter((p) => p.gi === gi).map((p) => p.course);
        if (cs.length) state.semesters.push({ name: g.name || t().scSemName, open: true, courses: cs });
      });
    } else if (into === "new") {
      state.semesters.push({ name: t().scSemName, open: true, courses: picked.map((p) => p.course) });
    } else {
      const s = state.semesters[+into];
      dropBlank(s);
      s.courses.push(...picked.map((p) => p.course));
    }
    // a starting semester that is still completely empty is no longer needed
    state.semesters = state.semesters.filter((s, i, all) => !(isBlank(s) && all.length > 1));
    close();
    render();
    toast(t().scAdded(picked.length), { label: t().undo, run: undoIt });
    if (typeof confetti === "function") confetti();
    $("semesters").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  $("scanBtn").onclick = () => $("scanFile").click();
  $("scanPaste").onclick = () => pasteView();
  $("scanFile").onchange = (e) => { handle(e.target.files[0]); e.target.value = ""; };
  $("scanCam").onclick = () => $("scanCamFile").click();
  $("scanCamFile").onchange = (e) => { handle(e.target.files[0]); e.target.value = ""; };
  const box = $("scanBox");
  ["dragenter", "dragover"].forEach((ev) => box.addEventListener(ev, (e) => { e.preventDefault(); box.classList.add("drag"); }));
  ["dragleave", "drop"].forEach((ev) => box.addEventListener(ev, (e) => { e.preventDefault(); box.classList.remove("drag"); }));
  box.addEventListener("drop", (e) => handle(e.dataTransfer.files[0]));
  document.addEventListener("paste", (e) => {
    if (e.target.closest && e.target.closest("input,textarea")) return;
    const f = [...(e.clipboardData?.files || [])].find((x) => x.type.startsWith("image/"));
    if (f) { e.preventDefault(); handle(f); }
  });

  window.GradelyScan = { parse };
})();
