/* =========================================================
   ASAD NADEEM — portfolio interactions
   1. Starfield canvas with occasional supernova flares
   2. Flip cards (click / tap / keyboard)
   3. Scroll-reveal for sections
   ========================================================= */

(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     1. Starfield
     --------------------------------------------------------- */
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let stars = [];
  let flares = [];
  let width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    const count = Math.floor((width * height) / 9000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.3 + 0.2,
      baseAlpha: Math.random() * 0.6 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      phase: Math.random() * Math.PI * 2,
    }));
  }

  function spawnFlare() {
    flares.push({
      x: Math.random() * width,
      y: Math.random() * height * 0.7,
      r: 0,
      maxR: Math.random() * 40 + 30,
      alpha: 1,
    });
  }

  let frame = 0;
  function draw() {
    frame++;
    ctx.clearRect(0, 0, width, height);

    stars.forEach((s) => {
      const a = s.baseAlpha + Math.sin(frame * s.twinkleSpeed + s.phase) * 0.25;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(238, 241, 251, ${Math.max(0, a)})`;
      ctx.fill();
    });

    if (!prefersReducedMotion && Math.random() < 0.006) spawnFlare();

    flares = flares.filter((f) => f.alpha > 0.01);
    flares.forEach((f) => {
      f.r += (f.maxR - f.r) * 0.06;
      f.alpha *= 0.965;
      const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r);
      grad.addColorStop(0, `rgba(255, 248, 236, ${f.alpha})`);
      grad.addColorStop(0.3, `rgba(255, 184, 77, ${f.alpha * 0.6})`);
      grad.addColorStop(1, 'rgba(255, 122, 61, 0)');
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();

  /* ---------------------------------------------------------
     2. Flip cards
     --------------------------------------------------------- */
  document.querySelectorAll('.flip-card').forEach((card) => {
    card.addEventListener('click', () => {
      const flipped = card.classList.toggle('is-flipped');
      card.setAttribute('aria-pressed', String(flipped));

      card.classList.remove('is-flipping');
      // restart the flare animation
      void card.offsetWidth;
      card.classList.add('is-flipping');
      setTimeout(() => card.classList.remove('is-flipping'), 750);
    });
  });

  /* ---------------------------------------------------------
     3. Scroll reveal
     --------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }
})();
