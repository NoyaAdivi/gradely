/* fx.js: a light layer of motion and delight. Scroll reveals, card tilt with a soft glow,
   press ripples, a sparkle burst on main buttons and a scroll progress bar.
   Everything turns off when the visitor asks the system for reduced motion. */
(() => {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const me = document.currentScript;
  const BURST = (me && me.dataset.burst) || '.btn.primary, .primary';
  const COLORS = ['#F9A8D4', '#C4B5FD', '#A7F3D0', '#FDE68A', '#93C5FD', '#FDBA74'];

  const css = `
.fx-r{opacity:0;transform:translateY(18px) scale(.985);transition:opacity .6s ease,transform .7s cubic-bezier(.2,.8,.2,1);transition-delay:var(--fx-d,0ms)}
.fx-r.fx-in{opacity:1;transform:none}
.fx-tilt{transform-style:preserve-3d;transition:transform .25s ease;will-change:transform}
.fx-tilt::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .3s;
  background:radial-gradient(260px circle at var(--fx-x,50%) var(--fx-y,50%),rgba(255,255,255,.22),rgba(196,181,253,.10) 40%,transparent 70%)}
.fx-tilt:hover::after{opacity:1}
button,.btn{transition:transform .15s ease}
button:active:not(:disabled),.btn:active{transform:scale(.96)}
.fx-ripple{position:absolute;border-radius:50%;pointer-events:none;background:currentColor;opacity:.18;transform:scale(0);animation:fx-rip .6s ease-out forwards}
@keyframes fx-rip{to{transform:scale(1);opacity:0}}
.fx-dot{position:fixed;z-index:9999;width:8px;height:8px;border-radius:50%;pointer-events:none;animation:fx-fly .8s cubic-bezier(.2,.7,.3,1) forwards}
@keyframes fx-fly{to{transform:translate(var(--dx),var(--dy)) scale(.2);opacity:0}}
#fx-bar{position:fixed;top:0;inset-inline-start:0;height:3px;width:100%;z-index:9998;transform-origin:var(--fx-o,left);transform:scaleX(0);
  background:linear-gradient(90deg,#F9A8D4,#C4B5FD,#A7F3D0);pointer-events:none}
@media (prefers-reduced-motion:reduce){.fx-r{opacity:1;transform:none;transition:none}.fx-tilt{transform:none!important}}`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* scroll progress bar, only when the page has none of its own */
  if (!document.getElementById('progress')) {
    const bar = document.createElement('div'); bar.id = 'fx-bar'; document.body.appendChild(bar);
    const upd = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.setProperty('--fx-o', document.dir === 'rtl' || document.documentElement.dir === 'rtl' ? 'right' : 'left');
      bar.style.transform = `scaleX(${h > 0 ? Math.min(1, scrollY / h) : 0})`;
    };
    addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); upd();
  }

  /* press ripple on every button, wherever it was created */
  document.addEventListener('pointerdown', (e) => {
    const b = e.target.closest('button, .btn');
    if (!b || RM || b.disabled) return;
    const r = b.getBoundingClientRect(), s = Math.max(r.width, r.height) * 2;
    if (getComputedStyle(b).position === 'static') b.style.position = 'relative';
    b.style.overflow = 'hidden';
    const d = document.createElement('span'); d.className = 'fx-ripple';
    d.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`;
    b.appendChild(d); setTimeout(() => d.remove(), 650);
  });

  /* sparkle burst on the main buttons */
  document.addEventListener('click', (e) => {
    const b = e.target.closest(BURST);
    if (!b || RM) return;
    for (let i = 0; i < 14; i++) {
      const d = document.createElement('i'); d.className = 'fx-dot';
      const a = Math.random() * Math.PI * 2, dist = 40 + Math.random() * 50;
      d.style.cssText = `left:${e.clientX - 4}px;top:${e.clientY - 4}px;background:${COLORS[i % COLORS.length]};--dx:${Math.cos(a) * dist}px;--dy:${Math.sin(a) * dist}px`;
      document.body.appendChild(d); setTimeout(() => d.remove(), 850);
    }
  });

  if (RM) return;

  /* scroll reveal: section headers and the items of every card grid, staggered */
  const io = new IntersectionObserver((es) => es.forEach((x) => {
    if (x.isIntersecting) { x.target.classList.add('fx-in'); io.unobserve(x.target); }
  }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  const isGrid = (el) => { const d = getComputedStyle(el).display; return (d === 'grid' || d === 'flex') && el.children.length >= 3; };
  const tiltable = new Set();

  const scan = (root) => {
    root.querySelectorAll('section').forEach((sec) => {
      const items = [];
      sec.querySelectorAll(':scope > *, :scope > * > h2, :scope > * > p').forEach((el) => items.push(el));
      sec.querySelectorAll('*').forEach((g) => {
        if (g.children.length > 12 || !isGrid(g)) return;
        const kids = [...g.children].filter((k) => k.offsetWidth > 120 && k.offsetHeight > 70);
        if (kids.length >= 3 && kids.length === g.children.length) kids.forEach((k, i) => { k.style.setProperty('--fx-d', `${(i % 6) * 70}ms`); items.push(k); tiltable.add(k); });
      });
      items.sort((a, b) => tiltable.has(b) - tiltable.has(a)).forEach((el) => {
        if (el.closest('.fx-r, .rv, [class*="reveal"]') || el.querySelector('.fx-r, .rv')) return;
        if (!el.offsetParent) return;
        const r = el.getBoundingClientRect();
        if (r.top < innerHeight && r.bottom > 0) return; // already on screen: no flash
        el.classList.add('fx-r'); io.observe(el);
      });
    });
    if (FINE) tiltable.forEach((c) => {
      if (c.dataset.fxTilt) return; c.dataset.fxTilt = 1; c.classList.add('fx-tilt');
      if (getComputedStyle(c).position === 'static') c.style.position = 'relative';
      c.addEventListener('pointermove', (e) => {
        const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        c.style.setProperty('--fx-x', `${x * 100}%`); c.style.setProperty('--fx-y', `${y * 100}%`);
        c.style.transform = `perspective(700px) rotateX(${(0.5 - y) * 5}deg) rotateY(${(x - 0.5) * 6}deg) translateY(-3px)`;
      });
      c.addEventListener('pointerleave', () => { c.style.transform = ''; });
    });
  };
  const start = () => setTimeout(() => scan(document), 300);
  document.readyState === 'complete' ? start() : addEventListener('load', start);
})();
