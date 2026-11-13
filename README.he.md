<div dir="rtl">

<p align="center">
  <a href="https://noyaadivi.github.io/gradely/"><img src="docs/readme/banner-he.svg" width="100%" alt="Gradely: מחשבון ממוצע תואר, יפה וחכם"></a>
</p>

<p align="center"><a href="README.md"><img src="docs/readme/lang-en.svg" height="44" alt="English version"></a></p>

<p align="center">
  <a href="https://noyaadivi.github.io/gradely/"><img src="https://img.shields.io/badge/לאתר_החי-FFD5C9?style=for-the-badge&logo=googlechrome&logoColor=A8483A" alt="לאתר החי"></a>
  <a href="#how-it-works"><img src="https://img.shields.io/badge/איך_זה_עובד-D9F3E7?style=for-the-badge&logo=wolframmathematica&logoColor=1F7350" alt="איך זה עובד"></a>
  <a href="#run-locally"><img src="https://img.shields.io/badge/הרצה_מקומית-DAD5FF?style=for-the-badge&logo=gnubash&logoColor=5548C8" alt="הרצה מקומית"></a>
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/github/license/NoyaAdivi/gradely?color=DAD5FF&labelColor=5548C8" alt="רישיון"></a>
  <a href="https://github.com/NoyaAdivi/gradely/commits/main"><img src="https://img.shields.io/github/last-commit/NoyaAdivi/gradely?color=FFD5C9&labelColor=A8483A" alt="עדכון אחרון"></a>
  <a href="https://github.com/NoyaAdivi/gradely"><img src="https://img.shields.io/github/languages/top/NoyaAdivi/gradely?color=D9F3E7&labelColor=1F7350" alt="שפה עיקרית"></a>
</p>

<h3 align="center">לדעת איפה התואר שלך עומד, במבט אחד.</h3>

<p align="center">
  Gradely הוא מחשבון ממוצע משוקלל לפי נקודות זכות, בעברית ובאנגלית, לכל תואר ולכל מוסד.<br>
  מוסיפים סמסטרים, רואים את הממוצע מתעורר לחיים, ומגלים בדיוק מה צריך כדי להגיע ליעד.
</p>

<table align="center">
  <tr>
    <td align="center" width="25%"><a href="#how-it-works"><b>⚖️ משוקלל</b></a><br><sub>לפי נ"ז, כמו שצריך</sub></td>
    <td align="center" width="25%"><a href="https://noyaadivi.github.io/gradely/"><b>🎯 יעדים</b></a><br><sub>מה צריך כדי להגיע</sub></td>
    <td align="center" width="25%"><a href="README.md"><b>🌍 HE · EN</b></a><br><sub>דו לשוני מלא, תומך RTL</sub></td>
    <td align="center" width="25%"><a href="#tech-stack"><b>📦 0 ספריות</b></a><br><sub>HTML, CSS, JS בלבד</sub></td>
  </tr>
</table>

<a name="highlights"></a>
<p align="center"><a href="#see-it-in-action"><img src="docs/readme/features-he.svg" width="100%" alt="מה יש בו"></a></p>

<table>
  <tr valign="top">
    <td valign="top" width="33%" dir="rtl">
      <p><b>📚 מעקב אחרי התואר</b></p>
      <ul>
        <li><b>סמסטרים</b> שאפשר לתת להם שם, לקפל ולמחוק</li>
        <li><b>ממוצע משוקלל</b> כללי ולכל סמסטר</li>
        <li><b>מתג</b> שמוציא קורס מהממוצע</li>
        <li><b>פס התקדמות</b> לפי סה"כ נ"ז בתואר</li>
      </ul>
    </td>
    <td valign="top" width="33%" dir="rtl">
      <p><b>🎯 תכנון קדימה</b></p>
      <ul>
        <li><b>מחשבון יעד:</b> איזה ממוצע צריך בנ"ז שנשארו</li>
        <li><b>גרף</b> של הממוצע לפי סמסטר</li>
        <li><b>כל סולם ציונים:</b> 100, 4.0, 5.0, 10 או 20</li>
        <li><b>קונפטי</b> כשכבר הגעת ליעד 🎉</li>
      </ul>
    </td>
    <td valign="top" width="33%" dir="rtl">
      <p><b>💛 נבנה באהבה</b></p>
      <ul>
        <li><b>עברית ואנגלית</b> בלחיצה, RTL ו-LTR</li>
        <li><b>נשמר בדפדפן</b>, בלי הרשמה ובלי שרת</li>
        <li><b>ייצוא וייבוא</b> של הציונים כקובץ JSON</li>
        <li><b>מותאם לנייד</b>, מונפש, ומכבד הגדרת תנועה מופחתת</li>
      </ul>
    </td>
  </tr>
</table>

<a name="see-it-in-action"></a>
<p align="center"><a href="#how-it-works"><img src="docs/readme/screens-he.svg" width="100%" alt="ככה זה נראה"></a></p>

<p align="center">
  <a href="https://noyaadivi.github.io/gradely/"><img src="docs/images/screen-he.png" width="100%" alt="Gradely בעברית: טבעת ממוצע, סמסטרים, מחשבון יעד וגרף"></a>
</p>

<a name="how-it-works"></a>
<p align="center"><a href="#tech-stack"><img src="docs/readme/how-he.svg" width="100%" alt="איך מחושב הממוצע"></a></p>

```mermaid
flowchart LR
  A([קורס<br/>ציון × נ״ז]) --> B{נספר?}
  B -->|מתג דלוק וערכים תקינים| C([Σ ציון × נ״ז])
  B -->|מתג כבוי| X([לא נספר])
  C --> D([÷ Σ נ״ז])
  D --> E([⭐ ממוצע משוקלל])
  style A fill:#E8E4FF,stroke:#6F60F0,color:#2C2668
  style B fill:#FFE6DE,stroke:#E36E57,color:#2C2668
  style C fill:#D9F3E7,stroke:#1F7350,color:#1F4D38
  style X fill:#FBD5E0,stroke:#A03A5C,color:#5C1F33
  style D fill:#FFF1C9,stroke:#B98A1E,color:#5C4410
  style E fill:#DAD5FF,stroke:#5548C8,color:#2C2668
```

| מה | נוסחה |
|---|---|
| ממוצע משוקלל | `Σ (grade × credits) / Σ credits` |
| ממוצע סמסטר | אותה נוסחה, רק על הקורסים של הסמסטר |
| מה צריך ליעד | `(goal × (credits + left) − Σ grade × credits) / left` |

<p align="center"><sub>קורס נספר רק כשהציון בתוך הסולם, הנ"ז חיוביות והמתג דלוק.</sub></p>

<a name="tech-stack"></a>
<p align="center"><a href="#run-locally"><img src="docs/readme/stack-he.svg" width="100%" alt="טכנולוגיות"></a></p>

<p align="center">
<a href="https://developer.mozilla.org/docs/Web/HTML"><img src="https://img.shields.io/badge/HTML5-FBD5E0?style=for-the-badge&logo=html5&logoColor=A03A5C" alt="HTML5"></a>
<a href="https://developer.mozilla.org/docs/Web/CSS"><img src="https://img.shields.io/badge/CSS3-DAD5FF?style=for-the-badge&logo=css&logoColor=5548C8" alt="CSS3"></a>
<a href="https://developer.mozilla.org/docs/Web/JavaScript"><img src="https://img.shields.io/badge/JavaScript-FFF1C9?style=for-the-badge&logo=javascript&logoColor=B98A1E" alt="JavaScript"></a>
<a href="https://pages.github.com"><img src="https://img.shields.io/badge/GitHub_Pages-D9F3E7?style=for-the-badge&logo=githubpages&logoColor=1F7350" alt="GitHub Pages"></a>
</p>

<a name="run-locally"></a>
<p align="center"><a href="#contact"><img src="docs/readme/run-he.svg" width="100%" alt="הרצה מקומית"></a></p>

1. משכפלים את הריפו:
   ```bash
   git clone https://github.com/NoyaAdivi/gradely.git
   ```
2. פותחים את `index.html` בדפדפן. זהו ✨

<details>
<summary><b>📂 מבנה הפרויקט</b></summary>

```
├── index.html        מבנה הדף והתבניות
├── style.css         עיצוב פסטלי ואנימציות
├── app.js            חישובים, החלפת שפה ושמירה
├── logo.svg          הלוגו של Gradely
└── docs/
    ├── readme/       באנרים מונפשים ל-README
    └── images/       צילומי מסך
```
</details>

<a name="contact"></a>
<p align="center"><a href="https://www.linkedin.com/in/noya-adivi/"><img src="docs/readme/footer-he.svg" width="100%" alt="נבנה על ידי נויה אדיבי"></a></p>

<p align="center">
  <a href="https://noyaadivi.github.io/gradely/"><img src="https://img.shields.io/badge/לפתיחת_Gradely-FFD5C9?style=for-the-badge&logo=googlechrome&logoColor=A8483A" alt="לפתיחת Gradely"></a>
  <a href="https://www.linkedin.com/in/noya-adivi/"><img src="https://img.shields.io/badge/LinkedIn-DAD5FF?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzU1NDhDOCIgZD0iTTIwLjQ1IDIwLjQ1aC0zLjU2di01LjU3YzAtMS4zMy0uMDMtMy4wNC0xLjg1LTMuMDQtMS44NiAwLTIuMTQgMS40NS0yLjE0IDIuOTR2NS42N0g5LjM1VjloMy40MXYxLjU2aC4wNWMuNDgtLjkgMS42NC0xLjg1IDMuMzctMS44NSAzLjYgMCA0LjI3IDIuMzcgNC4yNyA1LjQ2djYuMjh6TTUuMzQgNy40M2EyLjA2IDIuMDYgMCAxIDEgMC00LjEzIDIuMDYgMi4wNiAwIDAgMSAwIDQuMTN6TTcuMTIgMjAuNDVIMy41NlY5aDMuNTZ2MTEuNDV6TTIyLjIyIDBIMS43N0MuNzkgMCAwIC43NyAwIDEuNzN2MjAuNTRDMCAyMy4yMy43OSAyNCAxLjc3IDI0aDIwLjQ1Yy45OCAwIDEuNzgtLjc3IDEuNzgtMS43M1YxLjczQzI0IC43NyAyMy4yIDAgMjIuMjIgMHoiLz48L3N2Zz4=" alt="LinkedIn"></a>
  <a href="https://noyaadivi.github.io/noya-website"><img src="https://img.shields.io/badge/תיק_עבודות-D9F3E7?style=for-the-badge&logo=githubpages&logoColor=1F7350" alt="תיק עבודות"></a>
  <a href="https://github.com/NoyaAdivi"><img src="https://img.shields.io/badge/עוד_פרויקטים-FBD5E0?style=for-the-badge&logo=github&logoColor=A03A5C" alt="עוד פרויקטים"></a>
</p>

</div>
