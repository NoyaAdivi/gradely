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
    scNew: "✨ חדש", scT: "יש לך גיליון ציונים? הציונים ימולאו לבד", scD: "בוחרים איך להכניס את הציונים: מעלים קובץ, מצלמים את הגיליון או מקלידים. לפני השמירה תוכלו לבדוק ולתקן הכל",
    scBtn: "העלאת מסמך", scBtnS: "PDF, Word, Excel או תמונה", scCam: "צילום הגיליון", scCamS: "מצלמים במצלמה של הטלפון", scPaste: "הקלדה ידנית", scPasteS: "או הדבקת טקסט מהפורטל", scGo1: "בחירת קובץ", scGo2: "פתיחת מצלמה", scGo3: "התחלה", scDrop: "💡 אפשר גם לגרור קובץ לכאן או להדביק צילום מסך עם Ctrl+V",
    scLoading: "טוענת כלי קריאה…", scReading: "קוראת את הגיליון…", scPage: (a, b) => `קוראת עמוד ${a} מתוך ${b}…`,
    scFound: (n) => `נמצאו ${n} קורסים. בדקו ותקנו לפני ששומרים`, scNone: "לא מצאתי קורסים בקובץ. אפשר להדביק את הטקסט ידנית",
    scBad: "אי אפשר לקרוא את סוג הקובץ הזה", scOffline: "צריך חיבור לאינטרנט כדי לקרוא קבצים",
    scInto: "לאן להוסיף?", scAsFile: (n) => `לפי הסמסטרים שבקובץ (${n})`, scNewSem: "סמסטר חדש", scSemName: "גיליון ציונים",
    scAdd: (n) => `הוספת ${n} קורסים`, scCancel: "ביטול", scAll: "סימון הכל", scAdded: (n) => `נוספו ${n} קורסים ✓`,
    scPasteT: "הדביקו כאן את הטקסט מהגיליון", scPastePh: "מבוא למדעי המחשב  5  92\nמבני נתונים  4  88", scParse: "✨ זיהוי קורסים",
    scBack: "חזרה", scScale: "הגיליון בסולם 0 עד 100, אז הסולם יעבור ל 0 עד 100", scPass: "עובר/פטור, לא נכלל בממוצע",
    demoQ: "רוצים לראות איך זה עובד? אפשר לטעון נתוני דוגמה ולשחק איתם", demoBtn: "✨ טעינת דוגמה",
    backupHint: "גיבוי או מעבר למחשב אחר:", undo: "ביטול", delCourse: "הקורס נמחק", delSemT: "הסמסטר נמחק", demoLoaded: "נתוני הדוגמה נטענו ✨",
    sample: [["סמסטר א׳", [["מבוא למדעי המחשב", 5, 88], ["אינפי 1", 5, 72], ["אלגברה לינארית", 4, 81], ["אנגלית", 2, 95]]], ["סמסטר ב׳", [["מבני נתונים", 5, 79], ["אינפי 2", 5, 68], ["לוגיקה", 3, 90]]]],
    pill1: "⚖️ ממוצע משוקלל", pill2: "🎯 מחשבון יעדים", pill3: "🚀 מתכנן שיפור", pill4: "🔒 בלי הרשמה",
    bT: "🚀 מתכנן שיפור ממוצע", bSub: "בחרו בכמה נקודות להעלות את הממוצע, ו-Gradely יבנה לכם תוכניות הגיוניות",
    bNow: "עכשיו", bGoalL: "היעד", bBy: "להעלות את הממוצע ב-", bReal: "⚖️ מה נחשב הגיוני?",
    bCap: "ציון מקסימלי הגיוני", bJump: "שיפור מקסימלי בקורס",
    tabPlans: "תוכניות מוכנות", tabPick: "בחירה ידנית", tabWhat: "מה אם?", tabImpact: "איפה הכי משתלם",
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
    share: "שיתוף", shareT: "קישור עם כל הנתונים, לפתיחה במכשיר אחר", print: "הדפסה", printT: "הדפסה או שמירה כ-PDF",
    copied: "הקישור הועתק ✓", sharedQ: "נפתח קישור עם ציונים. לטעון אותם?", load: "טעינה", sharedLoaded: "הנתונים מהקישור נטענו ✓",
    pasteT: "הדבקת רשימת קורסים", pasteH: "📋 הדבקת רשימת קורסים", cancel: "ביטול", pasteAdd: "הוספה",
    pasteHint: "שורה לכל קורס: שם, נ\"ז, ציון. אפשר להעתיק ישר מאקסל או מהפורטל של המוסד",
    pastePrev: (n, b) => (n ? `יתווספו ${n} קורסים` : "עדיין אין שורות תקינות") + (b ? ` · ${b} שורות לא זוהו` : ""),
    pasted: (n) => `נוספו ${n} קורסים ✓`, crU: 'נ"ז', undone: "בוטל ✓",
  },
  en: {
    title: "Degree GPA Calculator", subtitle: "Credit-weighted average for any degree, at any school",
    avg: "Weighted average", credits: "Credits", courses: "Courses", progress: "Degree progress",
    ofTotal: "Total degree credits", addSem: "Add semester", semester: "Semester", course: "Course",
    cr: "Credits", grade: "Grade", inAvg: "Count", addCourse: "Add course", coursePh: "e.g. Data Structures",
    delSem: "Delete semester", targetT: "🎯 What do I need for my goal?", targetAvg: "Target average", left: "Credits left",
    tEmpty: "Fill both fields to see", tNeed: (n) => `You need a ${n} average in the remaining credits ✨`,
    tOver: (n) => `You'd need ${n}, above the max grade 😕`, tDone: "You've already reached it! 🎉",
    chartT: "📊 Average by semester", chartEmpty: "Add grades to see the chart",
    settings: "⚙️ Settings", scale: "Grade scale", reset: "Reset everything", resetQ: "Delete all data?",
    saved: "Everything is saved in your browser, no sign-up", portfolio: "Portfolio",
    export: "Export", import: "Import", exportT: "Save your data as a file", importT: "Load data from a file",
    pText: (d, t) => `${d} of ${t} credits`, pEmpty: "Enter total credits to see progress",
    exported: "File downloaded ✓", imported: "Data loaded ✓", badFile: "Invalid file",
    scNew: "✨ New", scT: "Got a grade sheet? Your grades fill in by themselves", scD: "Pick how to add your grades: upload a file, take a photo of the sheet or type them in. You can check and fix everything before saving",
    scBtn: "Upload a document", scBtnS: "PDF, Word, Excel or image", scCam: "Take a photo", scCamS: "Use your phone camera", scPaste: "Type by hand", scPasteS: "or paste text from the portal", scGo1: "Choose file", scGo2: "Open camera", scGo3: "Start", scDrop: "💡 You can also drop a file here or paste a screenshot with Ctrl+V",
    scLoading: "Loading the reader…", scReading: "Reading the sheet…", scPage: (a, b) => `Reading page ${a} of ${b}…`,
    scFound: (n) => `Found ${n} courses. Check and fix before saving`, scNone: "No courses found in this file. You can paste the text by hand",
    scBad: "This file type can't be read", scOffline: "Reading files needs an internet connection",
    scInto: "Add to", scAsFile: (n) => `Semesters as in the file (${n})`, scNewSem: "New semester", scSemName: "Grade sheet",
    scAdd: (n) => `Add ${n} courses`, scCancel: "Cancel", scAll: "Select all", scAdded: (n) => `Added ${n} courses ✓`,
    scPasteT: "Paste the text of your grade sheet here", scPastePh: "Intro to Computer Science  5  92\nData Structures  4  88", scParse: "✨ Find courses",
    scBack: "Back", scScale: "This sheet uses a 0 to 100 scale, so the grade scale will switch to 0 to 100", scPass: "Pass/exempt, not in the average",
    demoQ: "Want to see how it works? Load sample data and play with it", demoBtn: "✨ Load sample",
    backupHint: "Back up or move to another computer:", undo: "Undo", delCourse: "Course deleted", delSemT: "Semester deleted", demoLoaded: "Sample data loaded ✨",
    sample: [["Semester A", [["Intro to CS", 5, 88], ["Calculus 1", 5, 72], ["Linear Algebra", 4, 81], ["English", 2, 95]]], ["Semester B", [["Data Structures", 5, 79], ["Calculus 2", 5, 68], ["Logic", 3, 90]]]],
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
    share: "Share", shareT: "A link with all your data, to open on another device", print: "Print", printT: "Print or save as PDF",
    copied: "Link copied ✓", sharedQ: "You opened a link with grades. Load them?", load: "Load", sharedLoaded: "Data from the link loaded ✓",
    pasteT: "Paste a list of courses", pasteH: "📋 Paste a list of courses", cancel: "Cancel", pasteAdd: "Add",
    pasteHint: "One course per line: name, credits, grade. You can copy straight from Excel or your school portal",
    pastePrev: (n, b) => (n ? `${n} courses will be added` : "No valid lines yet") + (b ? ` · ${b} lines not recognized` : ""),
    pasted: (n) => `${n} courses added ✓`, crU: "cr", undone: "Undone ✓",
  },
};

const blankCourse = () => ({ name: "", cr: "", gr: "", inc: true });
const blankSem = () => ({ name: "", open: true, courses: [blankCourse()] });

let shownAvg = 0;
let wasDone = false;

const defaults = () => ({ lang: "he", scale: 100, degreeCredits: "", tAvg: "", tLeft: "", semesters: [blankSem()] });
const SCALES = [100, 4, 5, 10, 20];
const str = (v) => (v == null ? "" : String(v));

// turn anything (localStorage, an imported file, a shared link) into a safe state
function clean(s) {
  if (!s || !Array.isArray(s.semesters)) return null;
  const out = { ...defaults(), ...s };
  out.lang = s.lang === "en" ? "en" : "he";
  out.scale = SCALES.includes(+s.scale) ? +s.scale : 100;
  out.semesters = s.semesters.filter((x) => x && typeof x === "object").map((x) => ({
    name: str(x.name), open: x.open !== false,
    courses: (Array.isArray(x.courses) ? x.courses : []).filter((c) => c && typeof c === "object")
      .map((c) => ({ name: str(c.name), cr: str(c.cr), gr: str(c.gr), inc: c.inc !== false })),
  }));
  out.semesters.forEach((x) => { if (!x.courses.length) x.courses.push(blankCourse()); });
  if (!out.semesters.length) out.semesters.push(blankSem());
  return out;
}

function load() {
  let s = null;
  try { s = clean(JSON.parse(localStorage.getItem(KEY))); } catch {}
  return s || defaults();
}
let state = load();
{ const q = new URLSearchParams(location.search).get("lang"); if (q === "en" || q === "he") state.lang = q; }
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
  const semCr = [];
  const perSem = state.semesters.map((sem, si) => {
    let s = 0, c = 0;
    sem.courses.forEach((co) => {
      const v = valid(co);
      if (!v) return;
      s += v.cr * v.gr; c += v.cr; count++;
    });
    sum += s; credits += c; semCr[si] = c;
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
    el.querySelector(".sem-avg").innerHTML = a == null ? "…" : `${a.toFixed(2)} <small>· ${fmt(semCr[si])} ${t().crU}</small>`;
    el.querySelectorAll(".crow:not(.head)").forEach((row, ci) => {
      const c = state.semesters[si].courses[ci];
      const gr = parseFloat(c.gr), cr = parseFloat(c.cr);
      row.querySelector(".gr").classList.toggle("bad", c.gr !== "" && (gr < 0 || gr > state.scale));
      row.querySelector(".cr").classList.toggle("bad", c.cr !== "" && cr < 0);
    });
  });

  $("demoBox").hidden = count > 0;
  progress(credits);
  target(sum, credits);
  chart(perSem, avg);
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

function chart(perSem, avg) {
  const box = $("chart");
  const data = perSem.map((a, i) => ({ a, label: `${state.lang === "he" ? "ס׳" : "S"}${i + 1}`, full: state.semesters[i].name || `${t().semester} ${i + 1}` })).filter((d) => d.a != null);
  if (!data.length) { box.innerHTML = `<p class="empty">${t().chartEmpty}</p>`; return; }
  box.innerHTML = `<i class="avg-line" style="bottom:calc(22px + (100% - 22px) * ${avg / state.scale})"><em>${avg.toFixed(1)}</em></i>` + data.map((d, i) => `
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
function toast(msg, action) {
  const el = $("toast");
  el.textContent = msg;
  if (action) {
    const b = document.createElement("button");
    b.className = "toast-act"; b.textContent = action.label;
    b.onclick = () => { el.classList.remove("show"); action.run(); };
    el.appendChild(b);
  }
  el.classList.toggle("act", !!action);
  el.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("show"), action ? 5000 : 2200);
}
let undoSnap = null;
const snapshot = () => (undoSnap = JSON.stringify(state.semesters));
const undoIt = () => { if (!undoSnap) return; state.semesters = JSON.parse(undoSnap); undoSnap = null; render(); toast(t().undone); };

// works with animations turned off too (Windows "animation effects" off / reduced motion)
function animateOut(el, done) {
  if (el.classList.contains("out")) return;
  el.classList.add("out");
  let fired = false;
  const go = () => { if (fired) return; fired = true; done(); };
  if (getComputedStyle(el).animationName === "none") return go();
  el.addEventListener("animationend", (e) => { if (e.target === el) go(); });
  setTimeout(go, 450);
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
  if (e.target.closest(".paste")) openPaste(si);
  if (e.target.closest(".del")) {
    const row = e.target.closest(".crow");
    snapshot();
    animateOut(row, () => { sem.courses.splice(+row.dataset.c, 1); render(); toast(t().delCourse, { label: t().undo, run: undoIt }); });
  }
  if (e.target.closest(".del-sem")) {
    snapshot();
    animateOut(semEl, () => {
      state.semesters.splice(si, 1);
      if (!state.semesters.length) state.semesters.push(blankSem());
      render();
      toast(t().delSemT, { label: t().undo, run: undoIt });
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
  const steps = [1, 2, 3, 5].map((k) => +(state.scale >= 20 ? k * state.scale / 100 : k / 10).toFixed(2));
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

// Enter in a grade field: jump to the next row, or add a new course
$("semesters").addEventListener("keydown", (e) => {
  if (e.key !== "Enter" || !e.target.matches(".crow input")) return;
  e.preventDefault();
  const row = e.target.closest(".crow"), next = row.nextElementSibling;
  if (next) next.querySelector(".name").focus();
  else row.closest(".sem").querySelector(".add-course").click();
});

function loadDemo() {
  state.semesters = t().sample.map(([name, cs]) => ({ name, open: true, courses: cs.map(([n, cr, gr]) => ({ name: n, cr: String(cr), gr: String(gr), inc: true })) }));
  state.scale = 100; state.degreeCredits = "120"; state.tAvg = "85"; state.tLeft = "40"; state.bX = "2";
  syncInputs(); render(); toast(t().demoLoaded); confetti();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
$("demoBtn").onclick = loadDemo;
$("demoBtn2").onclick = loadDemo;

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
    const raw = JSON.parse(await file.text()), s = clean(raw);
    if (!s) throw 0;
    if (!raw.lang) s.lang = state.lang;
    state = s;
    syncInputs(); render(); toast(t().imported);
  } catch { toast(t().badFile); }
  e.target.value = "";
};

/* ---------- paste a list of courses ---------- */
let pasteSem = 0;
function parsePaste(txt) {
  const ok = [], bad = [];
  txt.split(/\r?\n/).map((l) => l.trim()).filter(Boolean).forEach((l) => {
    // numbers at the end of the line: credits then grade; the rest is the name
    const m = l.match(/^(.*?)[\s,;\t|]+(\d+(?:[.,]\d+)?)[\s,;\t|]+(\d+(?:[.,]\d+)?)\s*$/);
    if (!m) return bad.push(l);
    const cr = m[2].replace(",", "."), gr = m[3].replace(",", ".");
    if (!(+cr > 0) || +gr > state.scale) return bad.push(l);
    ok.push({ name: m[1].replace(/[\s,;\t|-]+$/, "").trim(), cr, gr, inc: true });
  });
  return { ok, bad };
}
function openPaste(si) {
  pasteSem = si;
  const d = $("pasteDlg");
  $("pasteTxt").value = ""; $("pasteTxt").placeholder = state.lang === "he" ? "מבני נתונים, 5, 88\nאינפי 1\t5\t72" : "Data Structures, 5, 88\nCalculus 1\t5\t72";
  pastePreview();
  d.showModal ? d.showModal() : d.setAttribute("open", "");
  $("pasteTxt").focus();
}
function pastePreview() {
  const { ok, bad } = parsePaste($("pasteTxt").value);
  $("pastePrev").textContent = t().pastePrev(ok.length, bad.length);
  $("pasteOk").disabled = !ok.length;
}
$("pasteTxt").oninput = pastePreview;
$("pasteDlg").addEventListener("close", () => {
  if ($("pasteDlg").returnValue !== "ok") return;
  const { ok } = parsePaste($("pasteTxt").value);
  if (!ok.length) return;
  snapshot();
  const sem = state.semesters[pasteSem];
  sem.courses = sem.courses.filter((c) => c.name || c.cr || c.gr).concat(ok);
  sem.open = true;
  render();
  toast(t().pasted(ok.length), { label: t().undo, run: undoIt });
});
$("pasteDlg").addEventListener("click", (e) => { if (e.target === $("pasteDlg")) $("pasteDlg").close("cancel"); });

/* ---------- share link + print ---------- */
const packState = () => ({ lang: state.lang, scale: state.scale, degreeCredits: state.degreeCredits, tAvg: state.tAvg, tLeft: state.tLeft,
  semesters: state.semesters.map((s) => ({ name: s.name, courses: s.courses.filter((c) => c.name || c.cr || c.gr).map((c) => (c.inc ? [c.name, c.cr, c.gr] : [c.name, c.cr, c.gr, 0])) })) });
const unpack = (p) => clean({ ...p, semesters: (p.semesters || []).map((s) => ({ name: s.name, courses: (s.courses || []).map((c) => ({ name: c[0], cr: c[1], gr: c[2], inc: c[3] !== 0 })) })) });

$("shareBtn").onclick = async () => {
  const url = location.origin + location.pathname + "#d=" + encodeURIComponent(JSON.stringify(packState()));
  if (navigator.share && matchMedia("(pointer: coarse)").matches) { try { await navigator.share({ title: "Gradely", url }); return; } catch {} }
  try { await navigator.clipboard.writeText(url); toast(t().copied); }
  catch { prompt(t().shareT, url); }
};
$("printBtn").onclick = () => { document.querySelectorAll(".sem.closed").forEach((s) => s.classList.add("print-open")); print(); };
addEventListener("afterprint", () => document.querySelectorAll(".print-open").forEach((s) => s.classList.remove("print-open")));

function readShared() {
  if (!location.hash.startsWith("#d=")) return;
  let s = null;
  try { s = unpack(JSON.parse(decodeURIComponent(location.hash.slice(3)))); } catch {}
  history.replaceState(null, "", location.pathname + location.search);
  if (!s) return toast(t().badFile);
  const apply = () => { snapshot(); state = { ...state, ...s }; syncInputs(); render(); toast(t().sharedLoaded); };
  const hasData = state.semesters.some((x) => x.courses.some((c) => valid(c)));
  hasData ? toast(t().sharedQ, { label: t().load, run: apply }) : apply();
}

// hero pills: smooth scroll to the feature, then make it glow
document.querySelector(".pills").addEventListener("click", (e) => {
  const a = e.target.closest("a"); if (!a) return;
  const el = document.querySelector(a.getAttribute("href")); if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  el.classList.remove("flash"); void el.offsetWidth; el.classList.add("flash");
  if (a.getAttribute("href") === "#target") setTimeout(() => $("tAvg").focus({ preventScroll: true }), 500);
});

// Ctrl+Z / Cmd+Z after deleting (not while typing in a field)
addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z" && undoSnap && !e.target.matches("input, textarea")) { e.preventDefault(); undoIt(); }
});

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
readShared();

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
