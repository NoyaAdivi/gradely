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
    pill1: "⚖️ ממוצע משוקלל", pill2: "🎯 מחשבון יעדים", pill3: "🚀 מתכנן שיפור", pill4: "🔒 בלי הרשמה",
    bT: "🚀 מתכנן שיפור ממוצע", bSub: "בחרו בכמה נקודות להעלות את הממוצע, ו-Gradely יבנה לכם תוכניות הגיוניות",
    bNow: "עכשיו", bGoalL: "היעד", bBy: "להעלות את הממוצע ב-", bReal: "⚖️ מה נחשב הגיוני?",
    bCap: "ציון מקסימלי הגיוני", bJump: "שיפור מקסימלי בקורס",
    tabPlans: "תוכניות מוכנות", tabPick: "אני בוחר/ת קורסים", tabWhat: "מה אם?", tabImpact: "איפה הכי משתלם",
    bNoData: "הוסיפו קורסים עם ציונים כדי לקבל תוכניות 📚", bNoX: "בחרו בכמה נקודות לשפר, למשל +2 ✨",
    bOverMax: "היעד מעל הציון המקסימלי 😅", bMax: (m, d) => `המקסימום ההגיוני בשיפור קורסים: ${m} (\u2066+${d}\u2069)`,
    pFew: "הכי מעט קורסים", pFewD: "מתמקדים בקורסים עם הכי הרבה פוטנציאל",
    pSpread: "שיפור קטן בהרבה קורסים", pSpreadD: "אותה תוספת קטנה לכל קורס",
    pWeak: "לתקן את החלשים", pWeakD: "מתחילים מהציונים הכי נמוכים",
    pFut: "רק דרך קורסים עתידיים", pFutD: "בלי לגעת בציונים הקיימים",
    nCourses: (n) => (n === 1 ? "קורס אחד" : `${n} קורסים`), each: (d) => `\u2066+${d}\u2069 לכל קורס`,
    futNeed: (n, l) => `ממוצע ${n} ב-${l} נ"ז שנשארו`, futNoL: 'מלאו "נ"ז שנשארו" או "סה"כ נ"ז בתואר" כדי לראות',
    real: "הגיוני ✓", hard: "מאתגר", impossible: "לא ריאלי", more: (n) => `ועוד ${n}`,
    pickHint: "סמנו את הקורסים שתרצו לשפר (למשל מועד ב׳ או חזרה על קורס):",
    pickNone: "עדיין לא סומן אף קורס 👆", pickShort: (m) => `גם עם מקסימום בקורסים האלה מגיעים רק ל-${m}. נסו להוסיף עוד קורס`,
    pickOk: (n) => `מספיק שיפור של ${n} נק׳ בממוצע בכל קורס שסימנתם`,
    wiPick: "בחרו קורס", wiNew: "ציון חדש", wiRes: "הממוצע יהיה",
    impHint: "כמה כל נקודה בקורס שווה בממוצע, וכמה אפשר להרוויח ממנו לכל היותר",
    noPlan: "שיפור קורסים קיימים לא יספיק ליעד הזה, אבל אולי קורסים עתידיים כן 👇",
    perPt: (v) => `כל נק׳ = \u2066+${v}\u2069`, upTo: (v) => `עד \u2066+${v}\u2069`, best: "הכי משתלם",
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
    pill1: "⚖️ Credit-weighted", pill2: "🎯 Goal calculator", pill3: "🚀 Boost planner", pill4: "🔒 No sign-up",
    bT: "🚀 GPA Boost Planner", bSub: "Pick how many points to raise your average, and Gradely builds realistic plans",
    bNow: "Now", bGoalL: "Goal", bBy: "Raise my average by", bReal: "⚖️ What counts as realistic?",
    bCap: "Highest realistic grade", bJump: "Max jump per course",
    tabPlans: "Ready plans", tabPick: "I pick the courses", tabWhat: "What if?", tabImpact: "Best value",
    bNoData: "Add courses with grades to get plans 📚", bNoX: "Choose how many points to boost, e.g. +2 ✨",
    bOverMax: "That goal is above the max grade 😅", bMax: (m, d) => `Realistic max by improving courses: ${m} (+${d})`,
    pFew: "Fewest courses", pFewD: "Focus on the courses with the most potential",
    pSpread: "Small boost everywhere", pSpreadD: "The same small bump in every course",
    pWeak: "Fix the weak spots", pWeakD: "Start from your lowest grades",
    pFut: "Future courses only", pFutD: "Without touching existing grades",
    nCourses: (n) => (n === 1 ? "1 course" : `${n} courses`), each: (d) => `+${d} per course`,
    futNeed: (n, l) => `A ${n} average in your ${l} remaining credits`, futNoL: 'Fill "Credits left" or "Total degree credits" to see',
    real: "Realistic ✓", hard: "Challenging", impossible: "Not realistic", more: (n) => `+${n} more`,
    pickHint: "Tick the courses you'd like to improve (a retake or a second exam):",
    pickNone: "No course selected yet 👆", pickShort: (m) => `Even maxing these out only gets you to ${m}. Try adding another course`,
    pickOk: (n) => `An average bump of ${n} points in each selected course is enough`,
    wiPick: "Pick a course", wiNew: "New grade", wiRes: "Your average would be",
    impHint: "How much each point in a course is worth, and the most you can gain from it",
    noPlan: "Improving existing courses won't reach this goal, but future courses might 👇",
    perPt: (v) => `each pt = +${v}`, upTo: (v) => `up to +${v}`, best: "Best value",
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
  boost(sum, credits);
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
$("scale").onchange = (e) => { state.scale = +e.target.value; state.bX = state.bCap = state.bJump = ""; state.wiVal = null; syncInputs(); render(); };

/* ---------- GPA boost planner ---------- */
const decs = () => (state.scale >= 20 ? 2 : 3);
const fa = (n) => n.toFixed(decs());                       // averages
const fg = (n) => (state.scale >= 20 ? String(Math.round(n)) : n.toFixed(2)); // grades
const cg = (n) => Math.min(state.scale, state.scale >= 20 ? Math.ceil(n - 1e-9) : Math.ceil(n * 100 - 1e-6) / 100);
const capV = () => { const v = parseFloat(state.bCap); return v > 0 ? Math.min(v, state.scale) : state.scale * 0.95; };
const jumpV = () => { const v = parseFloat(state.bJump); return v > 0 ? v : state.scale * 0.2; };

function courseList() {
  const out = [];
  state.semesters.forEach((sem, si) => sem.courses.forEach((c, ci) => {
    const v = valid(c); if (!v) return;
    const top = Math.max(v.gr, Math.min(capV(), v.gr + jumpV()));
    out.push({ key: `${si}-${ci}`, name: c.name.trim() || `${t().course} ${ci + 1} · ${sem.name || t().semester + " " + (si + 1)}`, cr: v.cr, gr: v.gr, top, pot: v.cr * (top - v.gr) });
  }));
  return out;
}

// equal bump d for a set of courses (each capped at its own top) that adds `need` to the weighted sum
function spread(list, need) {
  const f = (d) => list.reduce((a, c) => a + c.cr * Math.min(d, c.top - c.gr), 0);
  if (f(jumpV()) + 1e-9 < need) return null;
  let lo = 0, hi = jumpV();
  for (let i = 0; i < 50; i++) { const m = (lo + hi) / 2; f(m) >= need ? (hi = m) : (lo = m); }
  return { d: hi, items: list.map((c) => ({ ...c, to: cg(c.gr + Math.min(hi, c.top - c.gr)) })).filter((c) => c.to > c.gr) };
}

// fill courses in a given order until enough
function greedy(list, need) {
  const items = []; let left = need;
  for (const c of list) {
    if (left <= 1e-9) break;
    if (c.pot <= 0) continue;
    const take = Math.min(c.pot, left);
    items.push({ ...c, to: cg(c.gr + take / c.cr) });
    left -= take;
  }
  return left > 1e-9 ? null : items;
}

function itemsHTML(items) {
  const max = 4, L = t();
  const rows = items.slice(0, max).map((c) => `<li><span class="cn" title="${esc(c.name)}">${esc(c.name)}</span><span class="move">${fg(c.gr)} <i>➜</i> <b>${fg(c.to)}</b></span><em>+${fg(c.to - c.gr)}</em></li>`).join("");
  return `<ul class="plan-list">${rows}${items.length > max ? `<li class="more">${L.more(items.length - max)}</li>` : ""}</ul>`;
}

function level(maxJump) {
  const L = t(), j = maxJump / state.scale;
  return j <= 0.1 ? `<span class="tag ok">${L.real}</span>` : `<span class="tag mid">${L.hard}</span>`;
}

function boost(sum, credits) {
  const L = t(), pane = $("bPane");
  const avg = credits ? sum / credits : 0;
  const X = parseFloat(state.bX);
  const goal = avg + (X > 0 ? X : 0);
  $("bNow").textContent = fa(avg);
  $("bGoal").textContent = fa(goal);
  $("bGoal").classList.toggle("dim", !(X > 0));

  // quick chips, relative to the scale
  const steps = [1, 2, 3, 5].map((k) => +(k * state.scale / 100).toFixed(2));
  $("bQuick").innerHTML = steps.map((v) => `<button class="qchip${X === v ? " on" : ""}" data-v="${v}">+${v}</button>`).join("");
  $("bCap").placeholder = fg(capV()); $("bJump").placeholder = fg(jumpV());
  document.querySelectorAll("#bTabs .tab").forEach((b) => b.classList.toggle("on", b.dataset.tab === tab()));

  const list = courseList();
  if (!list.length) { pane.innerHTML = `<p class="b-empty">${L.bNoData}</p>`; return; }
  if (tab() === "whatif") return whatIf(list, sum, credits);
  if (tab() === "impact") return impact(list, credits);
  if (!(X > 0)) { pane.innerHTML = `<p class="b-empty">${L.bNoX}</p>`; return; }
  if (goal > state.scale) { pane.innerHTML = `<p class="b-empty no">${L.bOverMax}</p>`; return; }

  const need = X * credits;
  if (tab() === "pick") return pick(list, need);

  const totalPot = list.reduce((a, c) => a + c.pot, 0);
  const maxAvg = (sum + totalPot) / credits;
  const cards = [];

  const few = greedy([...list].sort((a, b) => b.pot - a.pot), need);
  if (few) cards.push(card("🏆", L.pFew, L.pFewD, L.nCourses(few.length), level(Math.max(...few.map((c) => c.to - c.gr))), itemsHTML(few), true));

  const sp = spread(list, need);
  if (sp) cards.push(card("🌱", L.pSpread, L.pSpreadD, L.each(fg(cg(sp.d))), level(sp.d), itemsHTML(sp.items)));

  const weak = greedy([...list].sort((a, b) => a.gr - b.gr), need);
  if (weak) cards.push(card("🩹", L.pWeak, L.pWeakD, L.nCourses(weak.length), level(Math.max(...weak.map((c) => c.to - c.gr))), itemsHTML(weak)));

  // future credits
  let left = parseFloat(state.tLeft);
  if (!(left > 0)) left = parseFloat(state.degreeCredits) - credits;
  let fut;
  if (left > 0) {
    const n = (goal * (credits + left) - sum) / left;
    const tag = n > state.scale ? `<span class="tag no">${L.impossible}</span>` : n > capV() ? `<span class="tag mid">${L.hard}</span>` : `<span class="tag ok">${L.real}</span>`;
    fut = card("🔭", L.pFut, L.pFutD, L.futNeed(fa(Math.max(0, n)), fmt(left)), tag, "");
  } else fut = card("🔭", L.pFut, L.pFutD, `<small>${L.futNoL}</small>`, "", "");
  cards.push(fut);

  pane.innerHTML = `<p class="b-max">${L.bMax(fa(maxAvg), fa(maxAvg - avg))}</p>
    ${!few ? `<p class="b-empty no">${L.noPlan}</p>` : ""}
    <div class="plans">${cards.join("")}</div>`;
}

const tab = () => state.bTab || "plans";

function card(icon, title, desc, headline, tag, body, star) {
  return `<article class="plan${star ? " star" : ""}">
    <div class="plan-top"><span class="pi">${icon}</span><div><h3>${title}</h3><p>${desc}</p></div></div>
    <div class="plan-line"><b>${headline}</b>${tag}</div>${body}</article>`;
}

function pick(list, need) {
  const L = t();
  const sel = new Set((state.bPick || []).filter((k) => list.some((c) => c.key === k)));
  const chips = list.map((c) => `<button class="pchip${sel.has(c.key) ? " on" : ""}" data-k="${c.key}" ${c.pot <= 0 ? "disabled" : ""}><span>${sel.has(c.key) ? "✓" : "＋"}</span>${esc(c.name)} <i>${fg(c.gr)}</i></button>`).join("");
  let res = `<p class="b-empty">${L.pickNone}</p>`;
  const chosen = list.filter((c) => sel.has(c.key));
  if (chosen.length) {
    const sp = spread(chosen, need);
    if (sp) res = `<div class="plan star"><div class="plan-line"><b>${L.pickOk(fg(cg(sp.d)))}</b>${level(sp.d)}</div>${itemsHTML(sp.items)}</div>`;
    else {
      const credits = list.reduce((a, c) => a + c.cr, 0), sum = list.reduce((a, c) => a + c.cr * c.gr, 0);
      const best = (sum + chosen.reduce((a, c) => a + c.pot, 0)) / credits;
      res = `<p class="b-empty no">${L.pickShort(fa(best))}</p>`;
    }
  }
  $("bPane").innerHTML = `<p class="hint">${L.pickHint}</p><div class="pchips">${chips}</div>${res}`;
}

function whatIf(list, sum, credits) {
  const L = t();
  let c = list.find((x) => x.key === state.wiKey) || list[0];
  state.wiKey = c.key;
  const val = state.wiVal != null && state.wiFor === c.key ? state.wiVal : c.gr;
  $("bPane").innerHTML = `<div class="wi">
    <label class="inline full"><span>${L.wiPick}</span><select id="wiSel">${list.map((x) => `<option value="${x.key}"${x.key === c.key ? " selected" : ""}>${esc(x.name)} (${fg(x.gr)})</option>`).join("")}</select></label>
    <label class="wi-range"><span>${L.wiNew}: <b id="wiVal"></b></span><input type="range" id="wiR" min="0" max="${state.scale}" step="${state.scale >= 20 ? 1 : 0.05}" value="${val}"></label>
    <div class="wi-res"><span class="label">${L.wiRes}</span><b id="wiAvg"></b><em id="wiDelta"></em></div></div>`;
  const show = () => {
    const v = parseFloat($("wiR").value);
    state.wiVal = v; state.wiFor = c.key;
    const a = (sum - c.cr * c.gr + c.cr * v) / credits, d = a - sum / credits;
    $("wiVal").textContent = fg(v);
    $("wiAvg").textContent = fa(a);
    const de = $("wiDelta");
    de.textContent = (d >= 0 ? "+" : "") + fa(d);
    de.className = d > 1e-9 ? "up" : d < -1e-9 ? "down" : "";
    $("wiR").style.setProperty("--p", (v / state.scale) * 100 + "%");
  };
  show();
  $("wiR").oninput = () => { show(); save(); };
  $("wiSel").onchange = (e) => { state.wiKey = e.target.value; state.wiVal = null; update(); };
}

function impact(list, credits) {
  const L = t();
  const rows = [...list].sort((a, b) => b.pot - a.pot);
  const top = rows[0].pot || 1;
  $("bPane").innerHTML = `<p class="hint">${L.impHint}</p><div class="imp">${rows.map((c, i) => `
    <div class="imp-row" style="animation-delay:${i * 0.05}s">
      <span class="cn" title="${esc(c.name)}">${i === 0 && c.pot > 0 ? `<span class="tag ok">${L.best}</span> ` : ""}${esc(c.name)}</span>
      <div class="imp-bar"><span style="width:${Math.max(3, (c.pot / top) * 100)}%"></span></div>
      <span class="imp-n"><b>${L.upTo(fa(c.pot / credits))}</b><small>${L.perPt(fa(c.cr / credits))}</small></span>
    </div>`).join("")}</div>`;
}

$("bQuick").onclick = (e) => {
  const b = e.target.closest(".qchip"); if (!b) return;
  state.bX = b.dataset.v; $("bX").value = b.dataset.v; update();
};
$("bX").oninput = (e) => { state.bX = e.target.value; update(); };
$("bCap").oninput = (e) => { state.bCap = e.target.value; update(); };
$("bJump").oninput = (e) => { state.bJump = e.target.value; update(); };
$("bTabs").onclick = (e) => {
  const b = e.target.closest(".tab"); if (!b) return;
  state.bTab = b.dataset.tab; update();
  $("bPane").classList.remove("swap"); void $("bPane").offsetWidth; $("bPane").classList.add("swap");
};
$("bPane").addEventListener("click", (e) => {
  const b = e.target.closest(".pchip"); if (!b) return;
  const s = new Set(state.bPick || []);
  s.has(b.dataset.k) ? s.delete(b.dataset.k) : s.add(b.dataset.k);
  state.bPick = [...s]; update();
});

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
  $("bX").value = state.bX || "";
  $("bCap").value = state.bCap || "";
  $("bJump").value = state.bJump || "";
}

syncInputs();
render();

/* ---------- polish: reveal on scroll, card spotlight, ripples, nav ---------- */
(() => {
  const io = "IntersectionObserver" in window ? new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.08 }) : null;
  document.querySelectorAll(".reveal").forEach((el) => (io ? io.observe(el) : el.classList.add("in")));

  document.addEventListener("pointermove", (e) => {
    const c = e.target.closest && e.target.closest(".card, .plan");
    if (!c) return;
    const r = c.getBoundingClientRect();
    c.style.setProperty("--mx", e.clientX - r.left + "px");
    c.style.setProperty("--my", e.clientY - r.top + "px");
  }, { passive: true });

  document.addEventListener("click", (e) => {
    const b = e.target.closest(".btn, .chip, .qchip, .tab, .pchip");
    if (!b || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = b.getBoundingClientRect(), s = document.createElement("span");
    s.className = "ripple";
    s.style.left = e.clientX - r.left + "px"; s.style.top = e.clientY - r.top + "px";
    b.appendChild(s); setTimeout(() => s.remove(), 650);
  });

  const nav = document.querySelector(".top");
  const onScroll = () => nav.classList.toggle("scrolled", scrollY > 10);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
})();
