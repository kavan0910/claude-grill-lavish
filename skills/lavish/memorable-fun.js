/* Optional playful behaviour for memorable-theme.css. Inline in a <script> at the end of <body>.
   Everything degrades gracefully: with no JS the page is fully visible and usable. */
(() => {
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.classList.add("js");

  // scroll progress bar
  const bar = document.createElement("div");
  bar.className = "progress";
  document.body.prepend(bar);
  const onScroll = () => {
    const max = root.scrollHeight - innerHeight;
    bar.style.setProperty("--p", max > 0 ? Math.min(1, scrollY / max) : 0);
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // cursor spotlight on cards
  document.addEventListener("pointermove", (e) => {
    const card = e.target.closest?.(".card");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", e.clientX - r.left + "px");
    card.style.setProperty("--my", e.clientY - r.top + "px");
  }, { passive: true });

  // scroll reveal for anything marked .reveal (cards below the fold get it automatically)
  const targets = document.querySelectorAll(".reveal, main > .card:nth-child(n+4), .grid > .card");
  targets.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  targets.forEach((el) => io.observe(el));

  // confetti burst on .btn click (and on radio/checkbox picks, smaller)
  const colors = ["#f59e0b", "#10b981", "#60a5fa", "#18181b"];
  const burst = (x, y, n) => {
    if (reduce) return;
    for (let i = 0; i < n; i++) {
      const d = document.createElement("i");
      d.className = "pop";
      const a = Math.random() * Math.PI * 2, v = 30 + Math.random() * 70;
      d.style.cssText = `left:${x}px;top:${y}px;background:${colors[i % colors.length]};--dx:${Math.cos(a) * v}px;--dy:${Math.sin(a) * v}px`;
      document.body.appendChild(d);
      setTimeout(() => d.remove(), 850);
    }
  };
  document.addEventListener("click", (e) => {
    if (e.target.closest(".btn")) burst(e.clientX, e.clientY, 14);
    else if (e.target.matches("input[type=radio], input[type=checkbox]")) burst(e.clientX, e.clientY, 6);
  });

  // copy button on code blocks
  document.querySelectorAll("pre").forEach((pre) => {
    const b = document.createElement("button");
    b.className = "btn ghost copy";
    b.type = "button";
    b.textContent = "Copy";
    b.onclick = () => navigator.clipboard?.writeText(pre.innerText.replace(/\s*Copy$/, "")).then(() => {
      b.textContent = "Copied ✓";
      setTimeout(() => (b.textContent = "Copy"), 1400);
    });
    pre.appendChild(b);
  });
})();
