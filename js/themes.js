/* =========================================================
   Fusion · themes — background / track switching
   ========================================================= */
const THEME_LIST = [
  'assets/video/bg/noir.mp4', // noir
  'assets/video/bg/222.mp4',                                 // alt
  'assets/video/bg/capitano.mp4',
  'assets/video/bg/qingxioa.mp4',                            // aegir
  'assets/video/bg/alucard.mp4'
];
const THEME_CLIPS = {
  Numpad1: THEME_LIST[0], Digit1: THEME_LIST[0],
  Numpad2: THEME_LIST[1], Digit2: THEME_LIST[1],
  Numpad3: THEME_LIST[2], Digit3: THEME_LIST[2],
  Numpad4: THEME_LIST[3], Digit4: THEME_LIST[3],
  Numpad5: THEME_LIST[4], Digit5: THEME_LIST[4]
};
const THEME_CLASSES = ['theme-noir', 'theme-alt', 'theme-capitano', 'theme-aegir', 'theme-alucard', 'theme-secret'];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let bgSwitching = false;
window.__bgClip = 'assets/video/bg/222.mp4';
window.__audioStartAt = 0;

function getTrackForClip(clip) {
  if (clip === 'assets/bg/222.mp4') return 'assets/images/audio/bye-into-you-remix.mp3';
  if (clip === 'assets/bg/qingxioa.mp4') return 'assets/images/audio/funk-mandala-slowed.mp3';
  if (clip === 'assets/bg/alucard.mp4') return 'assets/images/audio/The Neighbourhood - Sweater Weather.mp3';
  if (clip === 'assets/bg/capitano.mp4') return 'assets/images/audio/Halsey-Gasoline(instrumental).mp3';
  return 'assets/images/audio/Insomnia slowed reverb.mp3';
}

function getAudioStartForClip(clip) {
  if (clip === 'assets/bg/222.mp4') return 33;
  if (clip === 'assets/bg/alucard.mp4') return 19;
  if (clip === 'assets/bg/qingxioa.mp4') return 4.1;
  return 0;
}

function getThemeLabel(clip) {
  if (clip === 'secret') return 'theme · secret · impulsive';
  if (clip === 'assets/bg/222.mp4') return 'theme · 222';
  if (clip === 'assets/bg/capitano.mp4') return 'theme · capitano';
  if (clip === 'assets/bg/qingxioa.mp4') return 'theme · aegir';
  if (clip === 'assets/bg/alucard.mp4') return 'theme · alucard';
  return 'theme · noir';
}

/** ใช้ตอนเข้าเว็บ · ตั้งพื้นหลังทันทีโดยไม่ fade */
function applyThemeSilent(clip) {
  window.__bgClip = clip;
  window.__audioStartAt = getAudioStartForClip(clip);

  const active = getActiveBg();
  if (active) {
    const src = active.querySelector('source');
    if (src) src.src = clip;
    active.load();
    try { active.play(); } catch (_) {}
  }

  applyThemeClasses(clip);
  applyMeta(clip);

  const source = music.querySelector('source');
  if (source) {
    source.src = getTrackForClip(clip);
    music.load();
  }
}

function cycleTheme(dir) {
  if (!entered || bgSwitching) return;
  const idx = THEME_LIST.indexOf(window.__bgClip);
  const cur = idx < 0 ? 0 : idx;
  const next = (cur + dir + THEME_LIST.length) % THEME_LIST.length;
  switchBackground(THEME_LIST[next]);
}

function getActiveBg() {
  return document.querySelector('.video-bg .bg-layer.is-active') || document.getElementById('bgVideo');
}
function getInactiveBg() {
  return document.querySelector('.video-bg .bg-layer:not(.is-active)') || document.getElementById('bgVideoB');
}

function fadeVolume(audio, to, ms) {
  return new Promise((resolve) => {
    if (!audio || reduceMotion || ms <= 0) {
      if (audio) audio.volume = to;
      resolve();
      return;
    }
    const from = audio.volume;
    const start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / ms);
      const eased = t * (2 - t);
      audio.volume = from + (to - from) * eased;
      if (t < 1) requestAnimationFrame(tick);
      else resolve();
    }
    requestAnimationFrame(tick);
  });
}

function applyThemeClasses(clip) {
  // leaving secret mode when switching normal themes
  if (secretActive) {
    secretActive = false;
    stopSecretLyricLoop();
    const root = document.getElementById('secretLyrics');
    if (root) root.innerHTML = '';
  }
  document.body.classList.remove(...THEME_CLASSES);
  if (clip === 'assets/bg/noir.mp4') document.body.classList.add('theme-noir');
  else if (clip === 'assets/bg/222.mp4') document.body.classList.add('theme-alt');
  else if (clip === 'assets/bg/capitano.mp4') document.body.classList.add('theme-capitano');
  else if (clip === 'assets/bg/qingxioa.mp4') document.body.classList.add('theme-aegir');
  else if (clip === 'assets/bg/alucard.mp4') document.body.classList.add('theme-alucard');
  // retrigger bio card entrance animation
  const bioCard = document.querySelector('.section-about .card');
  if (bioCard) {
    bioCard.style.animation = 'none';
    // force reflow
    void bioCard.offsetWidth;
    bioCard.style.animation = '';
  }
}

function applyMeta(clip) {
  const title = document.getElementById('playerTitle');
  const sub = document.getElementById('playerSub');
  if (clip === 'assets/bg/222.mp4') {
    if (title) title.textContent = 'bye × Into You';
    if (sub) sub.textContent = 'Ariana Grande · Altare Remix';
  } else if (clip === 'assets/bg/capitano.mp4') {
    if (title) title.textContent = 'Gasoline';
    if (sub) sub.textContent = 'Halsey · instrumental';
  } else if (clip === 'assets/bg/qingxioa.mp4') {
    if (title) title.textContent = 'funk-mandala-slowed';
    if (sub) sub.textContent = 'Dj Samir';
  } else if (clip === 'assets/bg/alucard.mp4') {
    if (title) title.textContent = 'Sweater Weather';
    if (sub) sub.textContent = 'The Neighbourhood';
  } else {
    if (title) title.textContent = 'Insomnia';
    if (sub) sub.textContent = 'slowed + reverb';
  }
}

function showToast(msg) {
  let el = document.querySelector('.theme-toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'theme-toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 1800);
}

async function switchBackground(clip) {
  if (bgSwitching) return;
  if (window.__bgClip === clip) return;
  bgSwitching = true;
  document.body.classList.add('is-theme-fading');

  const incoming = getInactiveBg();
  const outgoing = getActiveBg();
  const audio = music; // fusion uses #bgMusic
  const wasPlaying = audio && !audio.paused;
  const isAlt = clip === 'assets/bg/222.mp4';
  const isCapitano = clip === 'assets/bg/capitano.mp4';
  const isAegir = clip === 'assets/bg/qingxioa.mp4';
  const isAlucard = clip === 'assets/bg/alucard.mp4';
  const targetVol = typeof audio.dataset.userVol !== 'undefined'
    ? parseFloat(audio.dataset.userVol)
    : (audio.volume || 0.42);

  window.__bgClip = clip;
  window.__audioStartAt = getAudioStartForClip(clip);

  if (incoming) {
    const src = incoming.querySelector('source');
    if (src) src.src = clip;
    incoming.load();
    // อย่ารอ play() เพราะถ้าไฟล์วิดีโอขาดหาย บางเบราว์เซอร์ค้าง promise ไว้
    // และจะไม่เปลี่ยนคลาสธีมหรือปลด bgSwitching เลย
    try {
      const playPromise = incoming.play();
      if (playPromise && typeof playPromise.catch === 'function') playPromise.catch(() => {});
    } catch (_) {}
  }

  const fadeMs = reduceMotion ? 0 : 700;
  if (audio && wasPlaying) {
    fadeVolume(audio, 0, fadeMs * 0.65);
  }

  await new Promise((r) => setTimeout(r, reduceMotion ? 0 : 120));

  if (incoming) incoming.classList.add('is-active');
  if (outgoing) outgoing.classList.remove('is-active');

  applyThemeClasses(clip);
  applyMeta(clip);

  await new Promise((r) => setTimeout(r, fadeMs));

  if (outgoing) {
    try { outgoing.pause(); } catch (_) {}
  }

  if (audio) {
    const source = audio.querySelector('source');
    if (source) source.src = getTrackForClip(clip);
    audio.load();
    const startPlay = () => {
      if (window.__audioStartAt) audio.currentTime = window.__audioStartAt;
      audio.volume = 0;
      if (wasPlaying || entered) {
        unlockAudio();
        audio.play().then(() => {
          setPlaying(true);
          fadeVolume(audio, targetVol, reduceMotion ? 0 : 550);
        }).catch(() => setPlaying(false));
      } else {
        audio.volume = targetVol;
      }
    };
    if (audio.readyState >= 2) startPlay();
    else audio.addEventListener('canplay', startPlay, { once: true });
  }

  document.body.classList.remove('is-theme-fading');
  bgSwitching = false;
  showToast(getThemeLabel(clip));
}

// ========== Secret theme · Impulsive + TikTok lyrics (EN + TH) ==========
