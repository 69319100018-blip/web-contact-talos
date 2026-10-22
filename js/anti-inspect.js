/* =========================================================
   Fusion · anti-inspect — light client deterrents
   ========================================================= */
(function antiInspect() {
  'use strict';
  const blockEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  // คลิกขวา
  document.addEventListener('contextmenu', blockEvent, true);

  // คีย์ลัดเปิด DevTools / View Source / Save
  document.addEventListener('keydown', (e) => {
    const key = e.key || '';
    const lower = key.toLowerCase();
    const ctrl = e.ctrlKey || e.metaKey;
    const shift = e.shiftKey;
    const alt = e.altKey;

    // F12
    if (key === 'F12' || e.keyCode === 123) {
      blockEvent(e);
      return;
    }
    // Ctrl+Shift+I / J / C  (Inspect / Console / Element picker)
    if (ctrl && shift && (lower === 'i' || lower === 'j' || lower === 'c' || lower === 'k')) {
      blockEvent(e);
      return;
    }
    // Ctrl+U  (View Source)
    if (ctrl && !shift && !alt && lower === 'u') {
      blockEvent(e);
      return;
    }
    // Ctrl+S  (Save page)
    if (ctrl && !shift && !alt && lower === 's') {
      blockEvent(e);
      return;
    }
    // Ctrl+P sometimes used with print CSS tricks — optional light block
    // Ctrl+Shift+P (command menu) — skip, too aggressive
  }, true);

  // กันลากรูป/ข้อความบางส่วน
  document.addEventListener('dragstart', (e) => {
    if (e.target && (e.target.tagName === 'IMG' || e.target.closest('img'))) {
      blockEvent(e);
    }
  }, true);

  // กันเลือกข้อความทั่วหน้า (ยังเลือกใน input/textarea ได้)
  document.addEventListener('selectstart', (e) => {
    const t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    blockEvent(e);
  }, true);

  // ตรวจขนาดหน้าต่าง vs outer (สัญญาณเปิด DevTools แบบหยาบ) — แค่เตือนเบา ๆ ไม่ลูป debugger
  let warnCooldown = 0;
  function checkDevtools() {
    const threshold = 160;
    const open =
      (window.outerWidth - window.innerWidth > threshold) ||
      (window.outerHeight - window.innerHeight > threshold);
    if (open && Date.now() > warnCooldown) {
      warnCooldown = Date.now() + 8000;
      // ไม่แช่แข็งหน้า · ไม่ clear หน้าจอ — แค่ลดความสะดวกเล็กน้อย
      try {
        console.clear();
        console.log('%cInspect ถูกจำกัดบนหน้านี้', 'color:#ff6b9d;font-size:14px;font-weight:bold;');
      } catch (_) {}
    }
  }
  setInterval(checkDevtools, 1200);
  window.addEventListener('resize', checkDevtools, { passive: true });
})();
