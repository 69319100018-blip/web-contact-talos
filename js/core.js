/* =========================================================
   Fusion · core — DOM refs, audio play / progress
   ========================================================= */
	// ========== Intro + Music ==========
const intro = document.getElementById('intro');
const site = document.getElementById('site');
const music = document.getElementById('bgMusic');
const player = document.getElementById('player');
const musicBtn = document.getElementById('musicBtn');
const playerFill = document.getElementById('playerFill');
const playerTime = document.getElementById('playerTime');
const playerDur = document.getElementById('playerDur');
const playerBar = document.getElementById('playerBar');

music.volume = 0.42;
let isPlaying = false;
let entered = false;

// Default theme = secret (Impulsive) · always first page
(function initDefaultTrack() {
  const source = music.querySelector('source');
  if (source) {
    source.src = 'assets/images/audio/impulsive-thekidszn.mp3';
    music.load();
  }
  window.__audioStartAt = 0;
  const seekToStart = () => {
    if (isFinite(music.duration)) music.currentTime = 0;
  };
  if (music.readyState >= 1) seekToStart();
  else music.addEventListener('loadedmetadata', seekToStart, { once: true });
})();

function fmt(sec) {
  if (!isFinite(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return m + ':' + String(s).padStart(2, '0');
}

function updateProgress() {
  if (!music.duration) return;
  const pct = (music.currentTime / music.duration) * 100;
  playerFill.style.width = pct + '%';
  playerTime.textContent = fmt(music.currentTime);
  playerDur.textContent = fmt(music.duration);
}

music.addEventListener('timeupdate', updateProgress);
music.addEventListener('loadedmetadata', updateProgress);

function setPlaying(on) {
  isPlaying = on;
  musicBtn.innerHTML = on
    ? '<i class="fas fa-pause"></i>'
    : '<i class="fas fa-play"></i>';
  if (player) player.classList.toggle('is-playing', on);
  if (on) {
    ensureAudioGraph();
    startViz();
  } else {
    stopViz();
  }
  // ซ่อน/โชว์เนื้อเพลงทันทีเมื่อ pause/play
  if (typeof updateSecretLyrics === 'function') updateSecretLyrics();
}

/** Unlock / resume AudioContext during a real user gesture so sound can come out */
function unlockAudio() {
  ensureAudioGraph();
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
}

function playMusic() {
  unlockAudio();
  return music.play()
    .then(() => setPlaying(true))
    .catch(() => setPlaying(false));
}

