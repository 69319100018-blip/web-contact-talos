/* =========================================================
   Fusion · boot — default secret theme on load
   ========================================================= */
// default theme on load = secret (always first)
document.body.classList.add('theme-secret');
secretActive = true;
window.__bgClip = 'secret';
const _pt = document.getElementById('playerTitle');
const _ps = document.getElementById('playerSub');
if (_pt) _pt.textContent = SECRET_TITLE;
if (_ps) _ps.textContent = SECRET_SUB;

