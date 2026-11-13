<p align="center">
  <a href="https://noyaadivi.github.io/gradely/"><img src="docs/readme/banner-en.svg" width="100%" alt="Gradely: a degree GPA calculator that sparks joy"></a>
</p>

<p align="center"><a href="README.he.md"><img src="docs/readme/lang-he.svg" height="44" alt="לגרסה בעברית"></a></p>

<p align="center">
  <a href="https://noyaadivi.github.io/gradely/"><img src="https://img.shields.io/badge/Open_live_site-FFD5C9?style=for-the-badge&logo=googlechrome&logoColor=A8483A" alt="Open live site"></a>
  <a href="#how-it-works"><img src="https://img.shields.io/badge/How_it_works-D9F3E7?style=for-the-badge&logo=wolframmathematica&logoColor=1F7350" alt="How it works"></a>
  <a href="#run-locally"><img src="https://img.shields.io/badge/Run_locally-DAD5FF?style=for-the-badge&logo=gnubash&logoColor=5548C8" alt="Run locally"></a>
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/github/license/NoyaAdivi/gradely?color=DAD5FF&labelColor=5548C8" alt="License"></a>
  <a href="https://github.com/NoyaAdivi/gradely/commits/main"><img src="https://img.shields.io/github/last-commit/NoyaAdivi/gradely?color=FFD5C9&labelColor=A8483A" alt="Last commit"></a>
  <a href="https://github.com/NoyaAdivi/gradely"><img src="https://img.shields.io/github/languages/top/NoyaAdivi/gradely?color=D9F3E7&labelColor=1F7350" alt="Top language"></a>
</p>

<h3 align="center">Know where your degree stands, in one glance.</h3>

<p align="center">
  Gradely is a bilingual, credit-weighted GPA calculator for any degree at any school.<br>
  Add your semesters, see your average come alive, and find out exactly what you need to hit your goal.
</p>

<table align="center">
  <tr>
    <td align="center" width="25%"><a href="#how-it-works"><b>⚖️ Weighted</b></a><br><sub>by credits, the real way</sub></td>
    <td align="center" width="25%"><a href="https://noyaadivi.github.io/gradely/"><b>🎯 Goals</b></a><br><sub>what you need to get there</sub></td>
    <td align="center" width="25%"><a href="README.he.md"><b>🌍 HE · EN</b></a><br><sub>fully bilingual, RTL ready</sub></td>
    <td align="center" width="25%"><a href="#tech-stack"><b>📦 0 deps</b></a><br><sub>plain HTML, CSS, JS</sub></td>
  </tr>
</table>

<a name="highlights"></a>
<p align="center"><a href="#see-it-in-action"><img src="docs/readme/features-en.svg" width="100%" alt="Highlights"></a></p>

<table>
  <tr valign="top">
    <td valign="top" width="33%">
      <p><b>📚 Track your degree</b></p>
      <ul>
        <li><b>Semesters</b> you can name, fold and delete</li>
        <li><b>Credit-weighted average</b> overall and per semester</li>
        <li><b>Toggle</b> any course in or out of the average</li>
        <li><b>Degree progress bar</b> toward your total credits</li>
      </ul>
    </td>
    <td valign="top" width="33%">
      <p><b>🎯 Plan ahead</b></p>
      <ul>
        <li><b>Goal calculator:</b> the average you need in the credits you have left</li>
        <li><b>Chart</b> of your average by semester</li>
        <li><b>Any grade scale:</b> 100, 4.0, 5.0, 10 or 20</li>
        <li><b>Confetti</b> when you already reached your goal 🎉</li>
      </ul>
    </td>
    <td valign="top" width="33%">
      <p><b>💛 Made with care</b></p>
      <ul>
        <li><b>Hebrew and English</b> with one click, RTL and LTR</li>
        <li><b>Saved in your browser</b>, no sign-up, no server</li>
        <li><b>Export and import</b> your grades as a JSON file</li>
        <li><b>Responsive</b>, animated, and respects reduced motion</li>
      </ul>
    </td>
  </tr>
</table>

<a name="see-it-in-action"></a>
<p align="center"><a href="#how-it-works"><img src="docs/readme/screens-en.svg" width="100%" alt="See it in action"></a></p>

<p align="center">
  <a href="https://noyaadivi.github.io/gradely/"><img src="docs/images/screen-en.png" width="100%" alt="Gradely in English: weighted average ring, semesters, goal calculator and chart"></a>
</p>

<a name="how-it-works"></a>
<p align="center"><a href="#tech-stack"><img src="docs/readme/how-en.svg" width="100%" alt="How the average works"></a></p>

```mermaid
flowchart LR
  A([Course<br/>grade × credits]) --> B{Counted?}
  B -->|toggle on and valid| C([Σ grade × credits])
  B -->|toggle off| X([Skipped])
  C --> D([÷ Σ credits])
  D --> E([⭐ Weighted average])
  style A fill:#E8E4FF,stroke:#6F60F0,color:#2C2668
  style B fill:#FFE6DE,stroke:#E36E57,color:#2C2668
  style C fill:#D9F3E7,stroke:#1F7350,color:#1F4D38
  style X fill:#FBD5E0,stroke:#A03A5C,color:#5C1F33
  style D fill:#FFF1C9,stroke:#B98A1E,color:#5C4410
  style E fill:#DAD5FF,stroke:#5548C8,color:#2C2668
```

| What | Formula |
|---|---|
| Weighted average | `Σ (grade × credits) / Σ credits` |
| Semester average | same formula, only that semester's courses |
| Needed for your goal | `(goal × (credits + left) − Σ grade × credits) / left` |

<p align="center"><sub>A course counts only when its grade is inside the scale, its credits are positive and its toggle is on.</sub></p>

<a name="tech-stack"></a>
<p align="center"><a href="#run-locally"><img src="docs/readme/stack-en.svg" width="100%" alt="Tech Stack"></a></p>

<p align="center">
<a href="https://developer.mozilla.org/docs/Web/HTML"><img src="https://img.shields.io/badge/HTML5-FBD5E0?style=for-the-badge&logo=html5&logoColor=A03A5C" alt="HTML5"></a>
<a href="https://developer.mozilla.org/docs/Web/CSS"><img src="https://img.shields.io/badge/CSS3-DAD5FF?style=for-the-badge&logo=css&logoColor=5548C8" alt="CSS3"></a>
<a href="https://developer.mozilla.org/docs/Web/JavaScript"><img src="https://img.shields.io/badge/JavaScript-FFF1C9?style=for-the-badge&logo=javascript&logoColor=B98A1E" alt="JavaScript"></a>
<a href="https://pages.github.com"><img src="https://img.shields.io/badge/GitHub_Pages-D9F3E7?style=for-the-badge&logo=githubpages&logoColor=1F7350" alt="GitHub Pages"></a>
</p>

<a name="run-locally"></a>
<p align="center"><a href="#contact"><img src="docs/readme/run-en.svg" width="100%" alt="Run it locally"></a></p>

1. Clone the repo:
   ```bash
   git clone https://github.com/NoyaAdivi/gradely.git
   ```
2. Open `index.html` in your browser. That's it ✨

<details>
<summary><b>📂 Project structure</b></summary>

```
├── index.html        page layout and templates
├── style.css         pastel theme and animations
├── app.js            calculations, language switch, saving
├── logo.svg          the Gradely logo
└── docs/
    ├── readme/       animated README banners
    └── images/       screenshots
```
</details>

<a name="contact"></a>
<p align="center"><a href="https://www.linkedin.com/in/noya-adivi/"><img src="docs/readme/footer-en.svg" width="100%" alt="Built by Noya Adivi"></a></p>

<p align="center">
  <a href="https://noyaadivi.github.io/gradely/"><img src="https://img.shields.io/badge/Open_Gradely-FFD5C9?style=for-the-badge&logo=googlechrome&logoColor=A8483A" alt="Open Gradely"></a>
  <a href="https://www.linkedin.com/in/noya-adivi/"><img src="https://img.shields.io/badge/LinkedIn-DAD5FF?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzU1NDhDOCIgZD0iTTIwLjQ1IDIwLjQ1aC0zLjU2di01LjU3YzAtMS4zMy0uMDMtMy4wNC0xLjg1LTMuMDQtMS44NiAwLTIuMTQgMS40NS0yLjE0IDIuOTR2NS42N0g5LjM1VjloMy40MXYxLjU2aC4wNWMuNDgtLjkgMS42NC0xLjg1IDMuMzctMS44NSAzLjYgMCA0LjI3IDIuMzcgNC4yNyA1LjQ2djYuMjh6TTUuMzQgNy40M2EyLjA2IDIuMDYgMCAxIDEgMC00LjEzIDIuMDYgMi4wNiAwIDAgMSAwIDQuMTN6TTcuMTIgMjAuNDVIMy41NlY5aDMuNTZ2MTEuNDV6TTIyLjIyIDBIMS43N0MuNzkgMCAwIC43NyAwIDEuNzN2MjAuNTRDMCAyMy4yMy43OSAyNCAxLjc3IDI0aDIwLjQ1Yy45OCAwIDEuNzgtLjc3IDEuNzgtMS43M1YxLjczQzI0IC43NyAyMy4yIDAgMjIuMjIgMHoiLz48L3N2Zz4=" alt="LinkedIn"></a>
  <a href="https://noyaadivi.github.io/noya-website"><img src="https://img.shields.io/badge/Portfolio-D9F3E7?style=for-the-badge&logo=githubpages&logoColor=1F7350" alt="Portfolio"></a>
  <a href="https://github.com/NoyaAdivi"><img src="https://img.shields.io/badge/More_projects-FBD5E0?style=for-the-badge&logo=github&logoColor=A03A5C" alt="More projects"></a>
</p>
