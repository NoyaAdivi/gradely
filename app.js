/* Gradely: bilingual credit-weighted degree GPA calculator */
const KEY = "gradely-v1";
const $ = (id) => document.getElementById(id);

const T = {
  he: {
    title: "מחשבון ממוצע תואר", subtitle: "ממוצע משוקלל לפי נקודות זכות, לכל תואר ולכל מוסד",
    avg: "ממוצע משוקלל", credits: "נקודות זכות", courses: "קורסים", progress: "התקדמות בתואר",
    ofTotal: 'סה"כ נ"ז בתואר', addSem: "הוספת סמסטר", semester: "סמסטר", course: "שם הקורס",
    cr: 'נ"ז', grade: "ציון", inAvg: "בממוצע", addCourse: "הוספת קורס", coursePh: "למשל: מבני נתונים",
    delSem: "מחיקת סמסטר", targetT: "🎯 כמה צריך כדי להגיע ליעד?", targetAvg: "ממוצע יעד", left: 'נ"ז שנשארו',
    tEmpty: "מלאו את שני השדות כדי לראות", tNeed: (n) => `צריך ממוצע ${n} בנ"ז שנשארו ✨`,
    tOver: (n) => `צריך ${n}, מעל הציון המקסימלי 😕`, tDone: "כבר הגעת ליעד! 🎉",
    chartT: "📊 ממוצע לפי סמסטר", chartEmpty: "הוסיפו ציונים כדי לראות גרף",
    settings: "⚙️ הגדרות", scale: "סולם ציונים", reset: "איפוס הכל", resetQ: "למחוק את כל הנתונים?",
    saved: "הכל נשמר אוטומטית בדפדפן שלך, בלי הרשמה", portfolio: "תיק עבודות",
    export: "ייצוא", import: "ייבוא", exportT: "שמירת הנתונים כקובץ", importT: "טעינת נתונים מקובץ",
    pText: (d, t) => `${d} מתוך ${t} נ"ז`, pEmpty: 'הזינו סה"כ נ"ז כדי לראות התקדמות',
    exported: "הקובץ ירד ✓", imported: "הנתונים נטענו ✓", badFile: "הקובץ לא תקין",
  },
  en: {
    title: "Degree GPA Calculator", subtitle: "Credit-weighted average for any degree, at any school",
    avg: "Weighted average", credits: "Credits", courses: "Courses", progress: "Degree progress",
    ofTotal: "Total degree credits", addSem: "Add semester", semester: "Semester", course: "Course",
    cr: "Credits", grade: "Grade", inAvg: "Count", addCourse: "Add course", coursePh: "e.g. Data Structures",
    delSem: "Delete semester", targetT: "🎯 What do I need for my goal?", targetAvg: "Target average", left: "Credits left",
    tEmpty: "Fill both fields to see", tNeed: (n) => `You need a ${n} average in the remaining credits ✨`,
    tOver: (n) => `You'd need ${n}, above the max grade 😕`, tDone: "You already reached it! 🎉",
    chartT: "📊 Average by semester", chartEmpty: "Add grades to see the chart",
    settings: "⚙️ Settings", scale: "Grade scale", reset: "Reset everything", resetQ: "Delete all data?",
    saved: "Everything is saved in your browser, no sign-up", portfolio: "Portfolio",
    export: "Export", import: "Import", exportT: "Save your data as a file", importT: "Load data from a file",
    pText: (d, t) => `${d} of ${t} credits`, pEmpty: "Enter total credits to see progress",
    exported: "File downloaded ✓", imported: "Data loaded ✓", badFile: "Invalid file",
  },
};

const blankCourse = () => ({ name: "", cr: "", gr: "", inc: true });
const blankSem = () => ({ name: "", open: true, courses: [blankCourse()] });

let state = load();
let shownAvg = 0;
let wasDone = false;

function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (s && Array.isArray(s.semesters)) return s;
  } catch {}
  return { lang: "he", scale: 100, degreeCredits: "", tAvg: "", tLeft: "", semesters: [blankSem()] };
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {} }
const t = () => T[state.lang];
const fmt = (n) => (Math.round(n * 100) / 100).toString();

/* ---------- language ---------- */
function applyLang() {
  const L = t();
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === "he" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = L[el.dataset.i18n]));
  document.querySelectorAll("[data-i18n-title]").forEach((el) => (el.title = L[el.dataset.i18nTitle]));
  $("langBtn").textContent = state.lang === "he" ? "EN" : "עב";
  $("langBtn").title = state.lang === "he" ? "Switch to English" : "מעבר לעברית";
  document.title = `Gradely · ${L.title}`;
}

/* ---------- render ---------- */
function render() {
  const wrap = $("semesters");
  wrap.innerHTML = "";
  state.semesters.forEach((sem, si) => {
    const el = $("semTpl").content.firstElementChild.cloneNode(true);
    el.dataset.s = si;
    el.classList.toggle("closed", !sem.open);
    const name = el.querySelector(".sem-name");
    name.value = sem.name;
    name.placeholder = `${t().semester} ${si + 1}`;
    sem.courses.forEach((c, ci) => el.querySelector(".courses").appendChild(courseEl(c, ci)));
    wrap.appendChild(el);
  });
  applyLang();
  courses();
}

function courseEl(c, ci) {
  const row = $("courseTpl").content.firstElementChild.cloneNode(true);
  row.dataset.c = ci;
  row.querySelector(".name").value = c.name;
  row.querySelector(".name").placeholder = t().coursePh;
  row.querySelector(".cr").value = c.cr;
  row.querySelector(".gr").value = c.gr;
  row.querySelector(".gr").max = state.scale;
  row.querySelector(".inc").checked = c.inc;
  return row;
}

function courses() {
  // placeholders that depend on language
  document.querySelectorAll(".crow .name").forEach((i) => (i.placeholder = t().coursePh));
  document.querySelectorAll(".sem").forEach((el, si) => (el.querySelector(".sem-name").placeholder = `${t().semester} ${si + 1}`));
  update();
}

/* ---------- math ---------- */
function valid(c) {
  const cr = parseFloat(c.cr), gr = parseFloat(c.gr);
  return c.inc && cr > 0 && gr >= 0 && gr <= state.scale ? { cr, gr } : null;
}

function update() {
  let sum = 0, credits = 0, count = 0;
  const perSem = state.semesters.map((sem, si) => {
    let s = 0, c = 0;
    sem.courses.forEach((co) => {
      const v = valid(co);
      if (!v) return;
      s += v.cr * v.gr; c += v.cr; count++;
    });
    sum += s; credits += c;
    return c ? s / c : null;
  });
  const avg = credits ? sum / credits : 0;

  // ring + count-up
  $("ringBar").style.strokeDashoffset = 326.73 * (1 - avg / state.scale);
  countUp($("avg"), shownAvg, avg, 2);
  shownAvg = avg;
  bump($("credits"), fmt(credits));
  bump($("count"), String(count));

  // per semester badges + invalid fields
  document.querySelectorAll(".sem").forEach((el, si) => {
    const a = perSem[si];
    el.querySelector(".sem-avg").textContent = a == null ? "…" : a.toFixed(2);
    el.querySelectorAll(".crow:not(.head)").forEach((row, ci) => {
      const c = state.semesters[si].courses[ci];
      const gr = parseFloat(c.gr), cr = parseFloat(c.cr);
      row.querySelector(".gr").classList.toggle("bad", c.gr !== "" && (gr < 0 || gr > state.scale));
      row.querySelector(".cr").classList.toggle("bad", c.cr !== "" && cr < 0);
    });
  });

  progress(credits);
  target(sum, credits);
  chart(perSem);
  save();
}

function countUp(el, from, to, dec) {
  const start = performance.now(), dur = 700;
  const step = (now) => {
    const p = Math.min(1, (now - start) / dur);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = (from + (to - from) * e).toFixed(dec);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function bump(el, text) {
  if (el.textContent === text) return;
  el.textContent = text;
  el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop");
}

function progress(credits) {
  const total = parseFloat(state.degreeCredits);
  if (!(total > 0)) { $("pfill").style.width = "0"; $("ptext").textContent = t().pEmpty; return; }
  $("pfill").style.width = Math.min(100, (credits / total) * 100) + "%";
  $("ptext").textContent = t().pText(fmt(credits), fmt(total));
}

function target(sum, credits) {
  const out = $("tResult"), goal = parseFloat(state.tAvg), left = parseFloat(state.tLeft);
  out.className = "result";
  if (isNaN(goal) || !(left > 0)) { out.textContent = t().tEmpty; wasDone = false; return; }
  const need = (goal * (credits + left) - sum) / left;
  if (need > state.scale) { out.textContent = t().tOver(need.toFixed(2)); out.classList.add("no"); wasDone = false; }
  else if (need <= 0) {
    out.textContent = t().tDone; out.classList.add("ok");
    if (!wasDone) confetti();
    wasDone = true;
  } else { out.textContent = t().tNeed(need.toFixed(2)); out.classList.add("ok"); wasDone = false; }
}

function chart(perSem) {
  const box = $("chart");
  const data = perSem.map((a, i) => ({ a, label: `${state.lang === "he" ? "ס׳" : "S"}${i + 1}`, full: state.semesters[i].name || `${t().semester} ${i + 1}` })).filter((d) => d.a != null);
  if (!data.length) { box.innerHTML = `<p class="empty">${t().chartEmpty}</p>`; return; }
  box.innerHTML = data.map((d, i) => `
    <div class="col">
      <div class="bar-v" style="height:${Math.max(6, (d.a / state.scale) * 100)}%;animation-delay:${i * 0.08}s"><b>${d.a.toFixed(1)}</b></div>
      <span title="${esc(d.full)}">${d.label}</span>
    </div>`).join("");
}
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* ---------- fun ---------- */
function confetti() {
  const colors = ["#FFB4A2", "#B3A9FA", "#A9E3CD", "#F5B8C8", "#FFE08A"];
  for (let i = 0; i < 70; i++) {
    const d = document.createElement("span");
    d.className = "confetti";
    d.style.left = Math.random() * 100 + "vw";
    d.style.background = colors[i % colors.length];
    d.style.animationDuration = 1.8 + Math.random() * 1.6 + "s";
    d.style.animationDelay = Math.random() * 0.4 + "s";
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 4000);
  }
}

let toastTimer;
function toast(msg) {
  const el = $("toast");
  el.textContent = msg; el.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}

function animateOut(el, done) {
  el.classList.add("out");
  el.addEventListener("animationend", done, { once: true });
}

/* ---------- events ---------- */
$("semesters").addEventListener("input", (e) => {
  const semEl = e.target.closest(".sem"); if (!semEl) return;
  const sem = state.semesters[+semEl.dataset.s];
  if (e.target.classList.contains("sem-name")) { sem.name = e.target.value; return update(); }
  const row = e.target.closest(".crow"); if (!row) return;
  const c = sem.courses[+row.dataset.c];
  const f = e.target.classList;
  if (f.contains("name")) c.name = e.target.value;
  if (f.contains("cr")) c.cr = e.target.value;
  if (f.contains("gr")) c.gr = e.target.value;
  if (f.contains("inc")) c.inc = e.target.checked;
  update();
});

$("semesters").addEventListener("click", (e) => {
  const semEl = e.target.closest(".sem"); if (!semEl) return;
  const si = +semEl.dataset.s, sem = state.semesters[si];
  if (e.target.closest(".fold")) { sem.open = !sem.open; semEl.classList.toggle("closed", !sem.open); save(); }
  if (e.target.closest(".add-course")) {
    sem.courses.push(blankCourse());
    const row = courseEl(sem.courses.at(-1), sem.courses.length - 1);
    semEl.querySelector(".courses").appendChild(row);
    row.querySelector(".name").focus();
    update();
  }
  if (e.target.closest(".del")) {
    const row = e.target.closest(".crow");
    animateOut(row, () => { sem.courses.splice(+row.dataset.c, 1); render(); });
  }
  if (e.target.closest(".del-sem")) {
    animateOut(semEl, () => {
      state.semesters.splice(si, 1);
      if (!state.semesters.length) state.semesters.push(blankSem());
      render();
    });
  }
});

$("addSem").onclick = () => {
  state.semesters.push(blankSem());
  render();
  const last = document.querySelector(".sem:last-child");
  last.scrollIntoView({ behavior: "smooth", block: "center" });
  last.querySelector(".sem-name").focus();
};

$("langBtn").onclick = () => { state.lang = state.lang === "he" ? "en" : "he"; save(); render(); };
$("brand").onclick = (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); };

$("degreeCredits").oninput = (e) => { state.degreeCredits = e.target.value; update(); };
$("tAvg").oninput = (e) => { state.tAvg = e.target.value; update(); };
$("tLeft").oninput = (e) => { state.tLeft = e.target.value; update(); };
$("scale").onchange = (e) => { state.scale = +e.target.value; render(); };

$("resetBtn").onclick = () => {
  if (!confirm(t().resetQ)) return;
  const lang = state.lang;
  localStorage.removeItem(KEY);
  state = load(); state.lang = lang;
  syncInputs(); render();
};

$("exportBtn").onclick = () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "gradely-grades.json";
  a.click();
  URL.revokeObjectURL(a.href);
  toast(t().exported);
};
$("importBtn").onclick = () => $("importFile").click();
$("importFile").onchange = async (e) => {
  const file = e.target.files[0]; if (!file) return;
  try {
    const s = JSON.parse(await file.text());
    if (!Array.isArray(s.semesters)) throw 0;
    state = { ...load(), ...s };
    syncInputs(); render(); toast(t().imported);
  } catch { toast(t().badFile); }
  e.target.value = "";
};

function syncInputs() {
  $("degreeCredits").value = state.degreeCredits || "";
  $("tAvg").value = state.tAvg || "";
  $("tLeft").value = state.tLeft || "";
  $("scale").value = String(state.scale);
}

syncInputs();
render();
