/* =========================================================
   Fusion · effects — stars + particles
   ========================================================= */
// ========== Stars (from pro) ==========
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const isMobileUI = window.matchMedia('(max-width: 720px)').matches;
const isSecretTheme = () => document.body.classList.contains('theme-secret');
const starCount = isMobileUI ? 36 : (isSecretTheme() ? 48 : 90);
const stars = [];
for (let i = 0; i < starCount; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.2 + 0.25,
    opacity: Math.random() * 0.55 + 0.15,
    speed: Math.random() * 0.12 + 0.04,
    twinkle: Math.random() * Math.PI * 2
  });
}

let starsRaf = 0;
let starsRunning = true;
function drawStars() {
  if (!starsRunning) { starsRaf = 0; return; }
  // secret theme: stars very soft so photo stays sharp
  const dim = isSecretTheme() ? 0.35 : 1;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const s of stars) {
    s.twinkle += 0.015;
    const alpha = s.opacity * (0.55 + 0.45 * Math.sin(s.twinkle)) * dim;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200, 180, 255, ${alpha})`;
    ctx.fill();
    s.y -= s.speed;
    if (s.y < -5) {
      s.y = canvas.height + 5;
      s.x = Math.random() * canvas.width;
    }
  }
  starsRaf = requestAnimationFrame(drawStars);
}
drawStars();
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    starsRunning = false;
    if (starsRaf) cancelAnimationFrame(starsRaf);
    starsRaf = 0;
  } else {
    starsRunning = true;
    if (!starsRaf) drawStars();
  }
});

// ========== Particles (lighter · staggered) ==========
const particlesEl = document.getElementById('particles');
const particleInterval = isMobileUI ? 1400 : (isSecretTheme() ? 1100 : 700);
function spawnParticle() {
  if (document.hidden || !particlesEl) return;
  if (particlesEl.childElementCount > (isMobileUI ? 6 : 12)) return;
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.left = Math.random() * 100 + '%';
  p.style.bottom = '-10px';
  p.style.animationDuration = (9 + Math.random() * 10) + 's';
  p.style.opacity = (isSecretTheme() ? 0.15 : 0.3) + Math.random() * 0.35;
  particlesEl.appendChild(p);
  setTimeout(() => p.remove(), 20000);
}
setInterval(spawnParticle, particleInterval);
for (let i = 0; i < (isMobileUI ? 3 : 5); i++) setTimeout(spawnParticle, i * 500);

