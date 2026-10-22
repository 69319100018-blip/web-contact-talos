/* =========================================================
   Fusion · enter — loader gate + progressive reveal
   ========================================================= */
function enterSite() {
  if (entered) return;
  entered = true;

  // ซ่อน intro แล้วเปิดหน้าโหลด
  intro.classList.add('hide');
  const loader = document.getElementById('loader');
  const loaderFill = document.getElementById('loaderFill');
  const loaderPct = document.getElementById('loaderPct');
  const loaderStatus = document.getElementById('loaderStatus');

  // หน้าแรกเสมอ = secret (photo + Impulsive) ไม่สุ่ม
  applySecretAsDefault();
  // preload critical assets while loader runs
  try {
    const img = new Image();
    img.src = 'assets/images/profile/photo-2k.png';
    if (music && music.preload !== 'auto') music.preload = 'auto';
  } catch (_) {}

  const isMobile = window.matchMedia('(max-width: 720px)').matches;
  const sideL = document.getElementById('loaderSideL');
  const sideR = document.getElementById('loaderSideR');
  const themeTag = document.getElementById('loaderThemeTag');
  const stepEls = document.querySelectorAll('.loader-step');

  if (loader) {
    loader.hidden = false;
    loader.classList.remove('is-glitch', 'is-flash', 'is-done');

    // particles
    const particlesEl = document.getElementById('loaderParticles');
    if (particlesEl) {
      particlesEl.innerHTML = '';
      const count = isMobile ? 10 : 20;
      for (let i = 0; i < count; i++) {
        const p = document.createElement('span');
        p.className = 'loader-particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.bottom = (-5 - Math.random() * 20) + '%';
        p.style.animationDuration = (5 + Math.random() * 7) + 's';
        p.style.animationDelay = (Math.random() * 2.5) + 's';
        p.style.opacity = 0.25 + Math.random() * 0.55;
        const size = (isMobile ? 1.5 : 2) + Math.random() * (isMobile ? 2 : 3);
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        particlesEl.appendChild(p);
      }
    }

    // floating hex codes
    const hexEl = document.getElementById('loaderHex');
    if (hexEl) {
      hexEl.innerHTML = '';
      const hexCount = isMobile ? 6 : 14;
      const words = ['0xFUSION', 'BOOT', 'SYNC', 'LOAD', 'TALOS', '0xA7', '0xFF', 'INIT', 'CORE', 'MEM'];
      for (let i = 0; i < hexCount; i++) {
        const s = document.createElement('span');
        s.textContent = words[i % words.length] + ' ' + Math.floor(Math.random() * 0xff).toString(16).toUpperCase().padStart(2, '0');
        s.style.left = (5 + Math.random() * 90) + '%';
        s.style.bottom = (-10 - Math.random() * 30) + '%';
        s.style.animationDuration = (7 + Math.random() * 8) + 's';
        s.style.animationDelay = (Math.random() * 3) + 's';
        hexEl.appendChild(s);
      }
    }

    // show theme name mid-load
    if (themeTag) {
      themeTag.textContent = '';
      themeTag.classList.remove('is-show');
    }

    requestAnimationFrame(() => loader.classList.add('is-active'));
  }

  const statuses = [
    'กำลังเข้าสู่ระบบ...',
    'ซิงค์ธีม...',
    'โหลดเนื้อหา...',
    'เกือบเสร็จแล้ว...',
    'พร้อมแล้ว'
  ];
  const sideMsgs = ['INIT', 'SYNC', 'LOAD', 'LINK', 'DONE'];
  let pct = 0;
  let statusIdx = 0;
  let glitchOn = false;
  let themeShown = false;
  const duration = 3200; // ms · longer for extra flair
  const start = performance.now();
  const lineFill = document.querySelector('.loader-line-fill');

  function tickLoader(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    pct = Math.round(eased * 100);

    if (loaderFill) loaderFill.style.width = pct + '%';
    if (loaderPct) loaderPct.textContent = pct + '%';
    if (lineFill) lineFill.style.width = pct + '%';

    // side hex counter
    if (sideL) sideL.textContent = '0x' + pct.toString(16).toUpperCase().padStart(2, '0');

    // step dots
    const stepIdx = Math.min(stepEls.length - 1, Math.floor(t * stepEls.length));
    stepEls.forEach((el, i) => {
      el.classList.toggle('is-on', i === stepIdx && t < 1);
      el.classList.toggle('is-done', i < stepIdx || t >= 1);
    });

    const nextStatus = Math.min(statuses.length - 1, Math.floor(t * statuses.length));
    if (nextStatus !== statusIdx && loaderStatus) {
      statusIdx = nextStatus;
      loaderStatus.style.opacity = '0';
      if (sideR) sideR.textContent = sideMsgs[statusIdx] || 'SYNC';
      setTimeout(() => {
        loaderStatus.textContent = statuses[statusIdx];
        loaderStatus.style.opacity = '1';
      }, 120);
    }

    // reveal theme tag around 55%
    if (!themeShown && t > 0.55 && themeTag) {
      themeShown = true;
      themeTag.textContent = getThemeLabel(window.__bgClip || 'assets/video/bg/222.mp4');
      themeTag.classList.add('is-show');
    }

    // glitch letters near the end
    if (loader && t > 0.82 && t < 0.95) {
      if (!glitchOn) {
        glitchOn = true;
        loader.classList.add('is-glitch');
      }
    } else if (glitchOn && loader) {
      glitchOn = false;
      loader.classList.remove('is-glitch');
    }

    if (t < 1) {
      requestAnimationFrame(tickLoader);
    } else {
      if (loader) loader.classList.remove('is-glitch');
      finishEnter();
    }
  }
  requestAnimationFrame(tickLoader);

  function finishEnter() {
    // เริ่มเพลงหลัง loader ทำงานครบ 100%
    if (window.__audioStartAt && isFinite(music.duration)) {
      music.currentTime = Math.min(window.__audioStartAt, Math.max(0, music.duration - 1));
    }
    if (!isPlaying) playMusic();

    // brief flash then fade out
    if (loader) {
      loader.classList.add('is-flash');
      setTimeout(() => {
        loader.classList.remove('is-flash');
        loader.classList.add('is-done');
        loader.classList.remove('is-active');
      }, 180);
    }

    setTimeout(() => {
      site.classList.add('show');
      document.body.classList.remove('locked');
      player.hidden = false;

      const nav = document.getElementById('navbar');
      const glow = document.getElementById('navGlow');
      if (nav) {
        nav.hidden = false;
        requestAnimationFrame(() => nav.classList.add('is-visible'));
      }
      if (glow) {
        glow.hidden = false;
        requestAnimationFrame(() => glow.classList.add('is-visible'));
      }

      // โหลดทีละส่วน — สมูท ไม่ขึ้นพร้อมกันหมด
      progressiveReveal();
    }, 220);

    setTimeout(() => {
      intro.style.display = 'none';
      if (loader) {
        loader.hidden = true;
        loader.classList.remove('is-done', 'is-flash');
      }
      const active = document.querySelector('.nav-link.active');
      if (active && typeof moveNavIndicator === 'function') moveNavIndicator(active);
    }, 750);
  }
}

/** เปิด UI ทีละชั้น หลังเข้าเว็บ — ลดอาการกระตุกตอนโหลดพร้อมกัน */
function progressiveReveal() {
  const stages = [
    { sel: '#player', delay: 80 },
    { sel: '#about .card-flip, #about .profile, #profileCard', delay: 180 },
    { sel: '#about .bio, #about .socials, #about .orbit-filters', delay: 320 },
    { sel: '#projects', delay: 480 },
    { sel: '#projects .project-card, #projects .work-card', delay: 600 },
    { sel: '#chars', delay: 760 },
    { sel: '#chars .char-card, #charsPreview > *', delay: 900 }
  ];

  // mark elements for staged reveal
  stages.forEach(({ sel }) => {
    document.querySelectorAll(sel).forEach((el) => {
      el.classList.add('reveal-pending');
    });
  });

  stages.forEach(({ sel, delay }) => {
    setTimeout(() => {
      document.querySelectorAll(sel).forEach((el, i) => {
        setTimeout(() => {
          el.classList.remove('reveal-pending');
          el.classList.add('reveal-in');
        }, Math.min(i * 55, 400));
      });
    }, delay);
  });

  // safety: anything still pending after 2s → show
  setTimeout(() => {
    document.querySelectorAll('.reveal-pending').forEach((el) => {
      el.classList.remove('reveal-pending');
      el.classList.add('reveal-in');
    });
  }, 2200);
}

intro.addEventListener('click', enterSite);
intro.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    enterSite();
  }
});

musicBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (isPlaying) {
    music.pause();
    setPlaying(false);
  } else {
    playMusic();
  }
});

/* กดแถบที่พับอยู่เพื่อเล่นเพลง */
player.addEventListener('click', (e) => {
  if (isPlaying) return;
  if (e.target.closest('.player-btn')) return;
  playMusic();
});

playerBar.addEventListener('click', (e) => {
  if (!music.duration) return;
  const rect = playerBar.getBoundingClientRect();
  const ratio = (e.clientX - rect.left) / rect.width;
  music.currentTime = Math.max(0, Math.min(1, ratio)) * music.duration;
});

// ========== Theme + BG + Music hotkeys ==========
