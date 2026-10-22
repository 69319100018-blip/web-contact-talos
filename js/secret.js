/* =========================================================
   Fusion · secret — lyric theme + Impulsive
   ========================================================= */
const SECRET_TRACK = 'assets/images/audio/impulsive-thekidszn.mp3';
const SECRET_TITLE = 'IMPULSIVE';
const SECRET_SUB = 'THEKIDSZN';

/** Timed lyrics — final half calibrated from clips (1:39 + 1:52)
 */
const SECRET_LYRICS = [
  /* ---- Intro ---- */
  { t: 2.8,  en: "You're so high", th: "เธอสูงส่งเหลือเกิน" },
  { t: 5.8,  en: "And I'm so low", th: "ส่วนฉันต่ำต้อยเหลือเกิน" },
  { t: 8.6,  en: "You and I", th: "เธอกับฉัน" },
  { t: 11.0, en: "We'll go home", th: "เราจะกลับบ้านด้วยกัน" },

  /* ---- Verse 1 ---- */
  { t: 16.5, en: "Too soon? I'm ready, babe", th: "เร็วไปไหม? ฉันพร้อมแล้วนะ" },
  { t: 19.0, en: "Who knew I'd settle, babe", th: "ใครจะไปรู้ว่าฉันยอมลงหลักปักฐาน" },
  { t: 21.2, en: "For you, I'm ready, babe, ready, baby", th: "เพื่อเธอ ฉันพร้อมแล้วนะ พร้อมจริง ๆ" },
  { t: 24.5, en: "Back then, we never talked", th: "ตอนนั้นเราไม่เคยคุยกัน" },
  { t: 27.0, en: "Crazy, I'd never fall", th: "บ้าไปแล้ว ฉันไม่เคยคิดจะตกหลุมรัก" },
  { t: 29.5, en: "Can't say I've been here before, baby, baby", th: "พูดไม่ได้เลยว่าเคยรู้สึกแบบนี้มาก่อน" },

  /* ---- Chorus 1 ---- */
  { t: 32.5, en: "I don't think, I don't blink", th: "ฉันไม่คิด ฉันไม่กระพริบตา" },
  { t: 35.2, en: "I just get it on, babe", th: "แค่พุ่งเข้าไปเลย" },
  { t: 37.5, en: "Impulsive, I'm sorry", th: "หุนหันพลันแล่น ฉันขอโทษ" },
  { t: 40.0, en: "I can't blame myself for me, ain't no sorry", th: "ฉันโทษตัวเองไม่ได้เลย ไม่มีคำว่าขอโทษ" },
  { t: 44.2, en: "Once I see I want that", th: "พอเห็นก็อยากได้ทันที" },
  { t: 46.5, en: "Take off, hit that runway", th: "ทะยานขึ้น วิ่งไปบนรันเวย์เลย" },
  { t: 49.0, en: "I'm on somethin'", th: "ฉันติดอะไรบางอย่างแล้ว" },

  /* ---- Verse 2 ---- */
  { t: 50.5, en: "Staying up for like thirty nights", th: "นอนไม่หลับมาเกือบสามสิบคืน" },
  { t: 53.0, en: "Halfway crazy, I'm blaming life", th: "บ้าไปครึ่งทางแล้ว โทษชีวิตไปหมด" },
  { t: 55.0, en: "That's on me, I can't take advice", th: "นั่นเป็นเรื่องของฉัน รับคำแนะนำไม่ได้" },
  { t: 56.8, en: "Made myself, I did something right", th: "สร้างตัวเองขึ้นมา ฉันทำอะไรถูกแล้ว" },
  { t: 59.0, en: "You and your body perfect, I like", th: "เธอและร่างกายของเธอสมบูรณ์แบบ ฉันชอบ" },
  { t: 61.2, en: "Say I won't stay tonight, but I might", th: "บอกว่าคืนนี้จะไม่ค้าง แต่ฉันอาจจะ" },
  { t: 63.5, en: "I ain't never felt this way in my—", th: "ฉันไม่เคยรู้สึกแบบนี้มาก่อนใน—" },
  { t: 65.5, en: "I ain't never felt this way in my life", th: "ฉันไม่เคยรู้สึกแบบนี้มาก่อนในชีวิต" },
  { t: 68.5, en: "'Cause I", th: "เพราะฉัน" },

  /* ---- Chorus 2 ---- */
  { t: 70.0, en: "I don't think, I don't blink", th: "ฉันไม่คิด ฉันไม่กระพริบตา" },
  { t: 72.2, en: "I just get it on, babe", th: "แค่พุ่งเข้าไปเลย" },
  { t: 74.0, en: "Impulsive, I'm sorry", th: "หุนหันพลันแล่น ฉันขอโทษ" },
  { t: 76.0, en: "I can't blame myself for me, ain't no sorry", th: "ฉันโทษตัวเองไม่ได้เลย ไม่มีคำว่าขอโทษ" },
  { t: 79.5, en: "Once I see I want that", th: "พอเห็นก็อยากได้ทันที" },
  { t: 81.5, en: "Take off, hit that runway", th: "ทะยานขึ้น วิ่งไปบนรันเวย์เลย" },
  { t: 83.5, en: "I'm on somethin'", th: "ฉันติดอะไรบางอย่างแล้ว" },

  /* ---- Bridge (clip 1:39) ---- */
  { t: 90.0,  en: "Thirty nights and I", th: "สามสิบคืนแล้วฉัน" },
  { t: 93.0,  en: "Stayin' nice wit' ya", th: "อยู่ด้วยกันอย่างดี" },
  { t: 95.5,  en: "Playin' life wit' ya", th: "เล่นกับชีวิตร่วมกับเธอ" },
  { t: 98.0,  en: "Stayin' up for life, stayin' up for life", th: "ตื่นอยู่เพื่อชีวิต ตื่นอยู่เพื่อชีวิต" },

  /* ---- Verse 3 ---- */
  { t: 103.5, en: "You down for anything, babe, that's all I ever wanted", th: "เธอพร้อมทุกอย่างไหม นั่นคือสิ่งที่ฉันอยากได้เสมอ" },
  { t: 107.5, en: "You got me in that moment", th: "เธอทำให้ฉันติดในจังหวะนั้น" },
  { t: 110.0, en: "No stoppin' me now", th: "ตอนนี้ไม่มีอะไรหยุดฉันได้" },
  /* clip 1:52 vocal = Moved on · 1:55 = Grateful · 2:00 = chorus */
  { t: 111.5, en: "Moved on to better things, I can't go back to the bottom", th: "ก้าวไปสู่สิ่งที่ดีกว่าแล้ว กลับไปข้างล่างไม่ได้" },
  { t: 114.8, en: "I'm grateful now, I got it", th: "ตอนนี้ฉันรู้สึกขอบคุณ ฉันมีแล้ว" },
  { t: 117.5, en: "You share with me now", th: "เธอแบ่งปันกับฉันตอนนี้" },

  /* ---- Chorus 3 / outro (clip ~2:00) ---- */
  { t: 119.5, en: "I don't think, I don't blink", th: "ฉันไม่คิด ฉันไม่กระพริบตา" },
  { t: 122.0, en: "I just get it on, babe", th: "แค่พุ่งเข้าไปเลย" },
  { t: 124.0, en: "Impulsive, I'm sorry", th: "หุนหันพลันแล่น ฉันขอโทษ" },
  { t: 126.2, en: "I can't blame myself for me, ain't no sorry", th: "ฉันโทษตัวเองไม่ได้เลย ไม่มีคำว่าขอโทษ" },
  { t: 130.0, en: "Once I see I want that", th: "พอเห็นก็อยากได้ทันที" },
  { t: 132.5, en: "Take off, hit that runway", th: "ทะยานขึ้น วิ่งไปบนรันเวย์เลย" },
  { t: 135.0, en: "I'm on somethin'", th: "ฉันติดอะไรบางอย่างแล้ว" }
];

let secretActive = false;
let secretPrevTrack = null;
let secretPrevTitle = null;
let secretPrevSub = null;
let secretPrevStartAt = 0;
let secretLyricEls = [];
let secretLyricRaf = null;

function buildSecretLyrics() {
  const root = document.getElementById('secretLyrics');
  if (!root) return;
  root.innerHTML = '';
  secretLyricEls = SECRET_LYRICS.map((line, i) => {
    const el = document.createElement('div');
    el.className = 'lyric-line is-upcoming';
    el.dataset.index = String(i);
    el.innerHTML =
      '<span class="lyric-en">' + line.en + '</span>' +
      '<span class="lyric-th">' + line.th + '</span>';
    root.appendChild(el);
    return el;
  });
}

function updateSecretLyrics() {
  if (!secretActive || !music) return;
  const root = document.getElementById('secretLyrics');
  // หยุดเพลง → ซ่อนเนื้อ (ไม่บังจอ)
  if (music.paused) {
    if (root) root.classList.add('is-paused-hidden');
    return;
  }
  if (root) root.classList.remove('is-paused-hidden');

  const t = music.currentTime + 0.4;
  let activeIdx = -1;
  for (let i = 0; i < SECRET_LYRICS.length; i++) {
    if (t >= SECRET_LYRICS[i].t) activeIdx = i;
    else break;
  }
  secretLyricEls.forEach((el, i) => {
    el.classList.remove('is-active', 'is-past', 'is-upcoming');
    if (i === activeIdx) el.classList.add('is-active');
    else if (i < activeIdx) el.classList.add('is-past');
    else el.classList.add('is-upcoming');
  });
}

function startSecretLyricLoop() {
  stopSecretLyricLoop();
  const tick = () => {
    updateSecretLyrics();
    secretLyricRaf = requestAnimationFrame(tick);
  };
  secretLyricRaf = requestAnimationFrame(tick);
}

function stopSecretLyricLoop() {
  if (secretLyricRaf) {
    cancelAnimationFrame(secretLyricRaf);
    secretLyricRaf = null;
  }
}

/** ตั้ง secret เป็นธีมเริ่มต้นทุกครั้ง (ไม่สุ่ม) */
function applySecretAsDefault() {
  window.__bgClip = 'secret';
  window.__audioStartAt = 0;
  document.body.classList.remove(...THEME_CLASSES);
  document.body.classList.add('theme-secret');
  secretActive = true;

  const titleEl = document.getElementById('playerTitle');
  const subEl = document.getElementById('playerSub');
  if (titleEl) titleEl.textContent = SECRET_TITLE;
  if (subEl) subEl.textContent = SECRET_SUB;

  const source = music.querySelector('source');
  if (source) {
    source.src = SECRET_TRACK;
    music.load();
  }

  // ซ่อนวิดีโอพื้นหลัง — ใช้ photo.png จาก CSS
  const active = getActiveBg();
  if (active) {
    try { active.pause(); } catch (_) {}
  }

  buildSecretLyrics();
  startSecretLyricLoop();
}

function toggleSecretTheme() {
  const on = !document.body.classList.contains('theme-secret');
  if (on) {
    const source = music.querySelector('source');
    secretPrevTrack = source ? source.src : null;
    secretPrevStartAt = window.__audioStartAt || 0;
    const titleEl = document.getElementById('playerTitle');
    const subEl = document.getElementById('playerSub');
    secretPrevTitle = titleEl ? titleEl.textContent : '';
    secretPrevSub = subEl ? subEl.textContent : '';

    document.body.classList.add('theme-secret');
    secretActive = true;

    if (titleEl) titleEl.textContent = SECRET_TITLE;
    if (subEl) subEl.textContent = SECRET_SUB;

    if (source) {
      source.src = SECRET_TRACK;
      music.load();
      window.__audioStartAt = 0;
      const startPlay = () => {
        music.currentTime = 0;
        music.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      };
      if (music.readyState >= 2) startPlay();
      else music.addEventListener('canplay', startPlay, { once: true });
    }

    buildSecretLyrics();
    startSecretLyricLoop();
    showToast('secret · impulsive');
  } else {
    document.body.classList.remove('theme-secret');
    secretActive = false;
    stopSecretLyricLoop();
    const root = document.getElementById('secretLyrics');
    if (root) root.innerHTML = '';

    const source = music.querySelector('source');
    const titleEl = document.getElementById('playerTitle');
    const subEl = document.getElementById('playerSub');
    if (titleEl && secretPrevTitle != null) titleEl.textContent = secretPrevTitle;
    if (subEl && secretPrevSub != null) subEl.textContent = secretPrevSub;

    if (source && secretPrevTrack) {
      source.src = secretPrevTrack;
      music.load();
      window.__audioStartAt = secretPrevStartAt;
      const startPlay = () => {
        if (window.__audioStartAt) music.currentTime = window.__audioStartAt;
        music.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      };
      if (music.readyState >= 2) startPlay();
      else music.addEventListener('canplay', startPlay, { once: true });
    }
    showToast('secret · off');
  }
}

// Hotkeys · 1–5 / Numpad 1–5 เลือกธีม · [ ] หรือ T สลับ · 6 secret
document.addEventListener('keydown', (event) => {
  const tag = event.target && event.target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || event.target.isContentEditable) return;
  if (!entered && event.code !== 'Enter' && event.code !== 'Space') return;

  // cycle theme
  if (event.code === 'BracketRight' || event.code === 'KeyT') {
    event.preventDefault();
    cycleTheme(1);
    return;
  }
  if (event.code === 'BracketLeft') {
    event.preventDefault();
    cycleTheme(-1);
    return;
  }

  if (event.code === 'Numpad6' || event.code === 'Digit6') {
    event.preventDefault();
    toggleSecretTheme();
    return;
  }

  const clip = THEME_CLIPS[event.code];
  if (!clip) return;
  event.preventDefault();
  switchBackground(clip);
});

