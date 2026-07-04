/* ==========================================================================
   BLACK ROSE LOVE STORY — SCRIPT
   Vanilla JS only. Organized into clearly commented, reusable functions.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------ *
   * 0. CONFIG — edit the content here, everything below just renders it *
   * ------------------------------------------------------------------ */
  const CONFIG = {
    memories: [
      { img: 'photo2.jpg', title: 'First Pic jb hmne Dekha aapko', desc: 'Ek dam pyari si shareef bachi' },
      // { img: 'images/photo3.jpg', title: 'Rainy Afternoon', desc: 'We stayed in and it was still the best day.' },
      { img: 'photo4.jpg', title: 'Hm dono ka sath mai AI wala pic', desc: 'Apke jhumke kaafi mst lg rhe..henaa..!' },
      { img: 'photo5.jpg', title: 'Yai jb Hath mai chot lga tha apko', desc: 'Budhhu khi ki..!' },
      { img: 'photo6.jpg', title: 'Just Us', desc: 'Or yai Gdha jb aapko milaa..!!' },
    ],
    polaroids: [
      'photo1.jpg','photo2.jpg','photo3.jpg',
      'photo4.jpg','photo5.jpg','photo6.jpg'
    ],
    roseNotes: [
      "I fall for you a little more every single day.",
      "You are my favorite chapter in every book I read.",
      "Even in the dark, you're the brightest thing I know.",
      "Home isn't a place. It's wherever you are.",
      "I'd choose this exact love story, over and over.",
      "Your laugh is my favorite sound in the world.",
      "You make ordinary days feel like poetry.",
      "I love you more than black roses love the moonlight.",
      "With you, even silence feels like a conversation."
    ],
    bookshelf: [
      { title: 'The Way You Smile', text: 'It disarms me every time — a small, quiet miracle I never get tired of witnessing.' },
      { title: 'Late Night Talks', text: 'Some of my favorite memories are just us, whispering under blankets about nothing and everything.' },
      { title: 'Your Hands in Mine', text: 'A small gesture that has somehow become my favorite place in the entire world.' },
      { title: 'The Songs You Hum', text: 'You don\'t know you\'re doing it, and it\'s one of the most honest things about you.' },
      { title: 'Coffee, Two Cups', text: 'Mornings became something to look forward to the day you started sharing them with me.' },
    ],
    dreams: [
      { icon: '🏡', label: 'A Home' },
      { icon: '✈️', label: 'Travel' },
      { icon: '📚', label: 'Books' },
      { icon: '☕', label: 'Coffee' },
      { icon: '🐾', label: 'Pets' },
      { icon: '💍', label: 'Marriage' },
      
    ],
    reasonsCount: 100,
  };

  /* ------------------------------------------------------------------ *
   * 1. LOADER — hide once page assets are ready                        *
   * ------------------------------------------------------------------ */
  function initLoader() {
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 600);
    });
    // Fallback in case 'load' is delayed
    setTimeout(() => loader.classList.add('hidden'), 3000);
  }

  /* ------------------------------------------------------------------ *
   * 2. STARFIELD — canvas based, cheap and GPU friendly                *
   * ------------------------------------------------------------------ */
  function initStars() {
    const canvas = document.getElementById('stars-canvas');
    const ctx = canvas.getContext('2d');
    let stars = [];
    let w, h;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const count = Math.floor((w * h) / 9000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.2,
        speed: Math.random() * 0.4 + 0.05,
        twinkle: Math.random() * Math.PI * 2,
      }));
    }

    let frame;
    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#D4AF37';
      stars.forEach(s => {
        s.twinkle += 0.02;
        const alpha = 0.4 + Math.sin(s.twinkle) * 0.4;
        ctx.globalAlpha = Math.max(0.05, alpha);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        s.y += s.speed;
        if (s.y > h) { s.y = 0; s.x = Math.random() * w; }
      });
      ctx.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);
  }

  /* ------------------------------------------------------------------ *
   * 3. FALLING ROSE PETALS                                             *
   * ------------------------------------------------------------------ */
  function initPetals() {
    const layer = document.getElementById('petal-layer');
    const symbols = ['🌹', '🥀'];
    function spawnPetal() {
      const petal = document.createElement('span');
      petal.className = 'petal';
      petal.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      const startX = Math.random() * 100;
      const duration = 8 + Math.random() * 8;
      const drift = (Math.random() - 0.5) * 200;
      const rotate = Math.random() * 360;
      petal.style.left = startX + 'vw';
      petal.style.fontSize = (0.8 + Math.random() * 0.8) + 'rem';
      petal.animate(
        [
          { transform: `translate(0, -5vh) rotate(0deg)`, opacity: 0 },
          { transform: `translate(${drift * 0.3}px, 40vh) rotate(${rotate}deg)`, opacity: 0.9, offset: 0.2 },
          { transform: `translate(${drift}px, 110vh) rotate(${rotate * 2}deg)`, opacity: 0 },
        ],
        { duration: duration * 1000, easing: 'ease-in' }
      );
      layer.appendChild(petal);
      setTimeout(() => petal.remove(), duration * 1000);
    }
    setInterval(spawnPetal, 900);
  }

  /* ------------------------------------------------------------------ *
   * 4. FIREFLIES — ambient glowing dots that drift                     *
   * ------------------------------------------------------------------ */
  function initFireflies() {
    const layer = document.getElementById('firefly-layer');
    for (let i = 0; i < 18; i++) {
      const fly = document.createElement('span');
      fly.className = 'firefly';
      const x = Math.random() * 100, y = Math.random() * 100;
      fly.style.left = x + 'vw';
      fly.style.top = y + 'vh';
      const duration = 6 + Math.random() * 6;
      fly.animate(
        [
          { transform: 'translate(0,0)', opacity: 0.2 },
          { transform: `translate(${(Math.random() - 0.5) * 120}px, ${(Math.random() - 0.5) * 120}px)`, opacity: 1 },
          { transform: 'translate(0,0)', opacity: 0.2 },
        ],
        { duration: duration * 1000, iterations: Infinity, easing: 'ease-in-out' }
      );
      layer.appendChild(fly);
    }
  }

  /* ------------------------------------------------------------------ *
   * 5. CURSOR SPARKLE                                                  *
   * ------------------------------------------------------------------ */
  function initCursorSparkle() {
    const sparkle = document.getElementById('cursor-sparkle');
    if (window.matchMedia('(pointer: coarse)').matches) return; // skip on touch
    window.addEventListener('mousemove', (e) => {
      sparkle.style.left = e.clientX + 'px';
      sparkle.style.top = e.clientY + 'px';
      sparkle.style.opacity = '1';
      clearTimeout(sparkle._fadeTimer);
      sparkle._fadeTimer = setTimeout(() => (sparkle.style.opacity = '0'), 400);
    });
  }

  /* ------------------------------------------------------------------ *
   * 6. FLOATING HEARTS — gentle ambient hearts rising                  *
   * ------------------------------------------------------------------ */
  function initFloatingHearts() {
    const layer = document.getElementById('floating-hearts');
    function spawnHeart() {
      const heart = document.createElement('span');
      heart.className = 'heart-particle';
      heart.textContent = '❤';
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.bottom = '-5vh';
      const duration = 6 + Math.random() * 4;
      heart.animate(
        [
          { transform: 'translateY(0) scale(0.8)', opacity: 0 },
          { transform: 'translateY(-40vh) scale(1)', opacity: 0.7, offset: 0.5 },
          { transform: 'translateY(-100vh) scale(0.6)', opacity: 0 },
        ],
        { duration: duration * 1000, easing: 'ease-out' }
      );
      layer.appendChild(heart);
      setTimeout(() => heart.remove(), duration * 1000);
    }
    setInterval(spawnHeart, 2200);
  }

  /* ------------------------------------------------------------------ *
   * 7. MUSIC TOGGLE                                                    *
   * ------------------------------------------------------------------ */
  function initMusic() {
    const btn = document.getElementById('music-toggle');
    const audio = document.getElementById('bg-music');
    btn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().catch(() => {});
        btn.setAttribute('aria-pressed', 'true');
      } else {
        audio.pause();
        btn.setAttribute('aria-pressed', 'false');
      }
    });
  }

  /* ------------------------------------------------------------------ *
   * 8. SCROLL PROGRESS BAR                                             *
   * ------------------------------------------------------------------ */
  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
      const scrolled = document.documentElement.scrollTop;
      const max = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      bar.style.width = (max > 0 ? (scrolled / max) * 100 : 0) + '%';
    }, { passive: true });
  }

  /* ------------------------------------------------------------------ *
   * 9. TYPEWRITER EFFECT — hero subtitle                                *
   * ------------------------------------------------------------------ */
  function initTypewriter() {
    const el = document.getElementById('typewriter');
    const phrases = [
      'A story written in black roses and quiet moments.',
      'Every page turned brought me closer to you.',
    ];
    let phraseIndex = 0, charIndex = 0, deleting = false;

    function tick() {
      const current = phrases[phraseIndex];
      if (!deleting) {
        el.textContent = current.slice(0, ++charIndex);
        if (charIndex === current.length) { deleting = true; setTimeout(tick, 1800); return; }
      } else {
        el.textContent = current.slice(0, --charIndex);
        if (charIndex === 0) { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; }
      }
      setTimeout(tick, deleting ? 35 : 55);
    }
    setTimeout(tick, 1200);
  }

  /* ------------------------------------------------------------------ *
   * 10. HERO BUTTON — smooth scroll to story                            *
   * ------------------------------------------------------------------ */
  function initHeroButton() {
    document.getElementById('open-heart-btn').addEventListener('click', () => {
      document.getElementById('story-book').scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------------------ *
   * 11. 3D OPENING BOOK                                                 *
   * ------------------------------------------------------------------ */
  function initBook() {
    const book = document.getElementById('opening-book');
    function toggle() { book.classList.toggle('open'); }
    book.addEventListener('click', toggle);
    book.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  }

  /* ------------------------------------------------------------------ *
   * 12. MEMORY CARDS — data driven, supports unlimited entries          *
   * ------------------------------------------------------------------ */
  function renderMemoryCards() {
    const grid = document.getElementById('memory-grid');
    const frag = document.createDocumentFragment();
    CONFIG.memories.forEach((m) => {
      const card = document.createElement('article');
      card.className = 'memory-card glass-card reveal';
      card.innerHTML = `
        <div class="memory-img-wrap">
          <img src="${m.img}" alt="${m.title}" loading="lazy" />
        </div>
        <div class="memory-card-body">
          <h4>${m.title}</h4>
          <p>${m.desc}</p>
        </div>
      `;
      frag.appendChild(card);
    });
    grid.appendChild(frag);
  }

  /* ------------------------------------------------------------------ *
   * 13. POLAROID GALLERY + LIGHTBOX                                     *
   * ------------------------------------------------------------------ */
  function renderPolaroids() {
    const grid = document.getElementById('polaroid-grid');
    const frag = document.createDocumentFragment();
    CONFIG.polaroids.forEach((src, i) => {
      const fig = document.createElement('figure');
      fig.className = 'polaroid reveal';
      fig.style.setProperty('--rot', `${(Math.random() * 10 - 5).toFixed(1)}deg`);
      fig.dataset.index = i;
      fig.innerHTML = `<img src="${src}" alt="Photo memory ${i + 1}" loading="lazy" /><figcaption>#${i + 1}</figcaption>`;
      frag.appendChild(fig);
    });
    grid.appendChild(frag);
  }

  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    let index = 0;

    function open(i) {
      index = i;
      img.src = CONFIG.polaroids[index];
      img.alt = `Photo memory ${index + 1}`;
      lightbox.hidden = false;
      closeBtn.focus();
    }
    function close() { lightbox.hidden = true; }
    function next() { index = (index + 1) % CONFIG.polaroids.length; open(index); }
    function prev() { index = (index - 1 + CONFIG.polaroids.length) % CONFIG.polaroids.length; open(index); }

    document.getElementById('polaroid-grid').addEventListener('click', (e) => {
      const fig = e.target.closest('.polaroid');
      if (fig) open(Number(fig.dataset.index));
    });
    closeBtn.addEventListener('click', close);
    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', (e) => {
      if (lightbox.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    });
  }

  /* ------------------------------------------------------------------ *
   * 14. 100 REASONS GRID                                                *
   * ------------------------------------------------------------------ */
  function renderReasons() {
    const grid = document.getElementById('reasons-grid');
    const sample = [
      'Your smile', 'The way you read', 'Your kindness', 'Your laugh', 'Your patience',
      'The way you listen', 'Your curiosity', 'Your hugs', 'Your handwriting', 'Your honesty',
    ];
    const frag = document.createDocumentFragment();
    for (let i = 1; i <= CONFIG.reasonsCount; i++) {
      const text = sample[(i - 1) % sample.length];
      const card = document.createElement('div');
      card.className = 'reason-card glass-card reveal';
      card.innerHTML = `<span>Reason #${i}</span>${text}`;
      frag.appendChild(card);
    }
    grid.appendChild(frag);
  }

  /* ------------------------------------------------------------------ *
   * 15. BLACK ROSE GARDEN — click to reveal hidden notes                *
   * ------------------------------------------------------------------ */
  function renderRoseGarden() {
    const grid = document.getElementById('rose-garden-grid');
    const noteBox = document.getElementById('rose-note');
    const noteText = document.getElementById('rose-note-text');
    const closeBtn = document.getElementById('rose-note-close');
    const total = 12;
    const frag = document.createDocumentFragment();

    for (let i = 0; i < total; i++) {
      const btn = document.createElement('button');
      btn.className = 'rose-btn reveal';
      btn.textContent = '🥀';
      btn.setAttribute('aria-label', 'Reveal a hidden love note');
      btn.addEventListener('click', () => {
        const note = CONFIG.roseNotes[i % CONFIG.roseNotes.length];
        noteText.textContent = note;
        noteBox.hidden = false;
        btn.classList.add('picked');
        noteBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      frag.appendChild(btn);
    }
    grid.appendChild(frag);
    closeBtn.addEventListener('click', () => (noteBox.hidden = true));
  }

  /* ------------------------------------------------------------------ *
   * 16. BOOKSHELF — click a spine to open a chapter modal               *
   * ------------------------------------------------------------------ */
  function renderBookshelf() {
    const shelf = document.getElementById('bookshelf-grid');
    const modal = document.getElementById('book-modal');
    const modalTitle = document.getElementById('book-modal-title');
    const modalText = document.getElementById('book-modal-text');
    const closeBtn = document.getElementById('book-modal-close');
    const spineColors = ['#4A0015', '#111111', '#3a2a10', '#1c1c1c', '#5a1020'];

    const frag = document.createDocumentFragment();
    CONFIG.bookshelf.forEach((b, i) => {
      const spine = document.createElement('div');
      spine.className = 'spine-book reveal';
      spine.style.background = spineColors[i % spineColors.length];
      spine.textContent = b.title;
      spine.tabIndex = 0;
      spine.setAttribute('role', 'button');
      spine.setAttribute('aria-label', `Open chapter: ${b.title}`);
      function openModal() {
        modalTitle.textContent = b.title;
        modalText.textContent = b.text;
        modal.hidden = false;
        closeBtn.focus();
      }
      spine.addEventListener('click', openModal);
      spine.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(); } });
      frag.appendChild(spine);
    });
    shelf.appendChild(frag);

    function closeModal() { modal.hidden = true; }
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });
  }

  /* ------------------------------------------------------------------ *
   * 17. FUTURE DREAMS GRID                                              *
   * ------------------------------------------------------------------ */
  function renderDreams() {
    const grid = document.getElementById('dreams-grid');
    const frag = document.createDocumentFragment();
    CONFIG.dreams.forEach((d) => {
      const card = document.createElement('div');
      card.className = 'dream-card glass-card reveal';
      card.innerHTML = `<span class="dream-icon">${d.icon}</span><p>${d.label}</p>`;
      frag.appendChild(card);
    });
    grid.appendChild(frag);
  }

  /* ------------------------------------------------------------------ *
   * 18. WILL YOU FORGIVE ME — playful NO button + celebratory YES        *
   * ------------------------------------------------------------------ */
  function initForgive() {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const container = document.querySelector('.forgive-buttons');
    const message = document.getElementById('forgive-message');

    noBtn.addEventListener('mouseenter', dodge);
    noBtn.addEventListener('click', dodge);
    noBtn.addEventListener('touchstart', dodge, { passive: true });

    function dodge() {
      const rect = container.getBoundingClientRect();
      const btnRect = noBtn.getBoundingClientRect();
      const maxX = rect.width - btnRect.width;
      const maxY = 60;
      const x = Math.random() * maxX - maxX / 2;
      const y = Math.random() * maxY - maxY / 2;
      noBtn.style.transform = `translate(${x}px, ${y}px)`;
    }

    yesBtn.addEventListener('click', () => {
      message.hidden = false;
      message.scrollIntoView({ behavior: 'smooth', block: 'center' });
      launchConfetti();
      launchCelebrationPetalsAndHearts();
    });
  }

  /* ------------------------------------------------------------------ *
   * 19. CONFETTI — lightweight canvas confetti burst                    *
   * ------------------------------------------------------------------ */
  function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const colors = ['#D4AF37', '#4A0015', '#FFFFFF', '#CCCCCC'];
    const pieces = Array.from({ length: 140 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.3,
      w: 6 + Math.random() * 6,
      h: 10 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: 2 + Math.random() * 3,
      speedX: (Math.random() - 0.5) * 2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
    }));

    let elapsed = 0;
    const duration = 3200;
    let lastTime = performance.now();

    function frame(now) {
      const dt = now - lastTime; lastTime = now; elapsed += dt;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.y += p.speedY; p.x += p.speedX; p.rotation += p.rotationSpeed;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      if (elapsed < duration) {
        requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    requestAnimationFrame(frame);
  }

  function launchCelebrationPetalsAndHearts() {
    const layer = document.getElementById('petal-layer');
    for (let i = 0; i < 24; i++) {
      setTimeout(() => {
        const petal = document.createElement('span');
        petal.className = 'petal';
        petal.textContent = Math.random() > 0.5 ? '🌹' : '❤';
        petal.style.left = Math.random() * 100 + 'vw';
        petal.animate(
          [
            { transform: 'translateY(-5vh) rotate(0deg)', opacity: 0 },
            { transform: 'translateY(60vh) rotate(180deg)', opacity: 1, offset: 0.4 },
            { transform: 'translateY(110vh) rotate(360deg)', opacity: 0 },
          ],
          { duration: 4000, easing: 'ease-in' }
        );
        layer.appendChild(petal);
        setTimeout(() => petal.remove(), 4000);
      }, i * 60);
    }
  }

  /* ------------------------------------------------------------------ *
   * 20. RIPPLE EFFECT ON GOLD BUTTONS                                   *
   * ------------------------------------------------------------------ */
  function initRipple() {
    document.querySelectorAll('.btn-gold').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
        ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 650);
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * 21. SCROLL REVEAL — IntersectionObserver, single shared instance    *
   * ------------------------------------------------------------------ */
  function initScrollReveal() {
    const targets = document.querySelectorAll('.reveal, .section-title');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target); // avoid memory / perf leaks
        }
      });
    }, { threshold: 0.15 });
    targets.forEach((t) => observer.observe(t));
  }

  /* ------------------------------------------------------------------ *
   * INIT — run everything                                              *
   * ------------------------------------------------------------------ */
  initLoader();
  initStars();
  initPetals();
  initFireflies();
  initCursorSparkle();
  initFloatingHearts();
  initMusic();
  initScrollProgress();
  initTypewriter();
  initHeroButton();
  initBook();

  renderMemoryCards();
  renderPolaroids();
  initLightbox();
  renderReasons();
  renderRoseGarden();
  renderBookshelf();
  renderDreams();
  initForgive();
  initRipple();

  // Run reveal init after dynamic content has been rendered
  initScrollReveal();

  window.addEventListener('resize', () => {
    const canvas = document.getElementById('confetti-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});
