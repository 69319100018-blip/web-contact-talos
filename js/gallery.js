/* =========================================================
   Fusion · gallery — albums, lightbox, chars, profile card
   ========================================================= */
// ========== Albums (core from pro + extra from profile assets) ==========
const ALBUMS = {
  videos: {
    title: 'Clips & Videos',
    items: [
      { type: 'video', src: 'assets/videos/1.1.mp4', thumb: 'assets/thumbs/vid-1.1.jpg' },
      { type: 'video', src: 'assets/videos/1.2.mp4', thumb: 'assets/thumbs/vid-1.2.jpg' },
      { type: 'video', src: 'assets/videos/1.3.mp4', thumb: 'assets/thumbs/vid-1.3.jpg' },
      { type: 'video', src: 'assets/videos/1.4.mp4', thumb: 'assets/thumbs/vid-1.4.jpg' }
    ]
  },
  games: {
    title: 'FiveM / Game',
    items: [
      { type: 'image', src: 'assets/games/game-1.png' },
      { type: 'image', src: 'assets/games/game-2.png' },
      { type: 'image', src: 'assets/games/game-3.png' },
      { type: 'image', src: 'assets/games/game-4.png' },
      { type: 'image', src: 'assets/games/game-5.png' },
      { type: 'image', src: 'assets/games/game-6.png' },
      { type: 'image', src: 'assets/games/game-7.png' },
      { type: 'image', src: 'assets/games/game-8.png' },
      { type: 'image', src: 'assets/games/game-9.png' },
      { type: 'image', src: 'assets/games/game-10.jpg' },
      { type: 'image', src: 'assets/games/game-11.jpg' },
      { type: 'image', src: 'assets/games/game-12.jpg' },
      { type: 'image', src: 'assets/games/game-13.jpg' },
      { type: 'image', src: 'assets/games/game-14.jpg' },
      { type: 'image', src: 'assets/games/game-15.png' }
    ]
  },
  chars: {
    title: 'Novel Characters',
    items: [
      { type: 'image', src: 'assets/images/chars/char-clan.png' },
      { type: 'image', src: 'assets/images/chars/char-testaros.png' },
      { type: 'image', src: 'assets/images/chars/char-kline.png' },
      { type: 'image', src: 'assets/images/chars/char-raven.png' },
      { type: 'image', src: 'assets/images/chars/char-mikasa.png' },
      { type: 'image', src: 'assets/images/chars/char-lumine.jfif' },
      { type: 'image', src: 'assets/images/chars/char-encrid.png' },
      { type: 'image', src: 'assets/images/chars/char-serios1.jfif' },
      { type: 'image', src: 'assets/images/chars/char-serios2.jfif' },
      { type: 'image', src: 'assets/images/chars/char-seraphina.jfif' },
      { type: 'image', src: 'assets/images/chars/char-varencia.png' },
      { type: 'image', src: 'assets/images/chars/char-lucifer.png' },
      { type: 'image', src: 'assets/images/chars/char-เอลิเซีย.jfif' },
      { type: 'image', src: 'assets/images/chars/char-เรย์เวน1.jfif' },
      { type: 'image', src: 'assets/images/chars/char-เรย์เวน2.jfif' },
      { type: 'image', src: 'assets/images/chars/char-raymond.png' }
    ]
  },
  extra: {
    title: 'City & Scenes',
    items: [
      { type: 'image', src: 'assets/work/work-lightcity.png' },
      { type: 'image', src: 'assets/work/image1.png' },
      { type: 'image', src: 'assets/games/game-7.png' },
      { type: 'image', src: 'assets/games/game-8.png' },
      { type: 'image', src: 'assets/games/game-9.png' }
    ]
  }
};

const albumModal = document.getElementById('albumModal');
const albumTitle = document.getElementById('albumTitle');
const albumBody = document.getElementById('albumBody');
const albumClose = document.getElementById('albumClose');
const albumBackdrop = document.getElementById('albumBackdrop');

let currentItems = [];
let currentIndex = 0;

document.querySelectorAll('[data-album]').forEach((el) => {
  el.addEventListener('click', () => openAlbum(el.dataset.album));
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openAlbum(el.dataset.album);
    }
  });
});

function openAlbum(key) {
  const album = ALBUMS[key];
  if (!album) return;
  currentItems = album.items;
  albumTitle.textContent = album.title;
  albumBody.innerHTML = '';

  album.items.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'album-item';
    el.style.animationDelay = (0.04 * i) + 's';
    if (item.type === 'video') {
      el.innerHTML = `
        <img src="${item.thumb || item.src}" alt="Video ${i + 1}" loading="lazy" />
        <div class="play-badge"><i class="fas fa-play"></i></div>
      `;
    } else {
      el.innerHTML = `<img src="${item.src}" alt="Image ${i + 1}" loading="lazy" />`;
    }
    el.addEventListener('click', () => openLightbox(i));
    albumBody.appendChild(el);
  });

  albumModal.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeAlbum() {
  albumModal.hidden = true;
  document.body.style.overflow = entered ? '' : 'hidden';
}

albumClose.addEventListener('click', closeAlbum);
albumBackdrop.addEventListener('click', closeAlbum);

// ========== Lightbox ==========
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightboxContent');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxCount = document.getElementById('lightboxCount');

function openLightbox(index) {
  currentIndex = index;
  renderLightbox();
  lightbox.hidden = false;
}

function renderLightbox() {
  const item = currentItems[currentIndex];
  if (!item) return;
  lightboxContent.innerHTML = '';
  if (item.type === 'video') {
    const v = document.createElement('video');
    v.src = item.src;
    v.controls = true;
    v.autoplay = true;
    v.playsInline = true;
    lightboxContent.appendChild(v);
  } else {
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = '';
    lightboxContent.appendChild(img);
  }
  lightboxCount.textContent = `${currentIndex + 1} / ${currentItems.length}`;
}

function closeLightbox() {
  lightbox.hidden = true;
  const v = lightboxContent.querySelector('video');
  if (v) {
    v.pause();
    v.src = '';
  }
  lightboxContent.innerHTML = '';
}

function navLightbox(dir) {
  currentIndex = (currentIndex + dir + currentItems.length) % currentItems.length;
  renderLightbox();
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => navLightbox(-1));
lightboxNext.addEventListener('click', () => navLightbox(1));

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (lightbox.hidden) {
    if (e.key === 'Escape' && !albumModal.hidden) closeAlbum();
    return;
  }
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navLightbox(-1);
  if (e.key === 'ArrowRight') navLightbox(1);
});

// ========== Character preview grid ==========
const charsPreview = document.getElementById('charsPreview');
const previewChars = ALBUMS.chars.items.slice(0, 8);
previewChars.forEach((item, i) => {
  const div = document.createElement('div');
  div.className = 'char-preview';
  div.innerHTML = `<img src="${item.src}" alt="Character" loading="lazy" />`;
  div.addEventListener('click', () => {
    currentItems = ALBUMS.chars.items;
    openLightbox(i);
  });
  charsPreview.appendChild(div);
});

// ========== Profile card flip (QR back) ==========
const profileCard = document.getElementById('profileCard');
if (profileCard) {
  let flipBusy = false;
  const isTouchDevice = () =>
    window.matchMedia('(hover: none), (pointer: coarse)').matches ||
    window.matchMedia('(max-width: 720px)').matches;

  function toggleProfileFlip(onComplete) {
    if (flipBusy) return;
    flipBusy = true;
    const willShowBack = !profileCard.classList.contains('is-flipped');
    profileCard.classList.add('is-flipping');
    // สลับหน้า/หลังตรงกลาง animation (ตอน scaleX ≈ 0)
    setTimeout(() => {
      profileCard.classList.toggle('is-flipped');
    }, 320);
    setTimeout(() => {
      profileCard.classList.remove('is-flipping');
      flipBusy = false;
      if (typeof onComplete === 'function') onComplete(willShowBack);
    }, 720);
  }

  profileCard.addEventListener('click', (e) => {
    // อย่าพลิกเมื่อกดลิงก์โซเชียล
    if (e.target.closest('a.social-btn')) return;

    // มือถือ: ครั้งที่ 1 → ด้านหลัง · ครั้งที่ 2 → กลับหน้า + เปลี่ยนพื้นหลัง
    if (isTouchDevice()) {
      const showingBack = profileCard.classList.contains('is-flipped');
      if (showingBack) {
        toggleProfileFlip(() => {
          if (entered) cycleTheme(1);
        });
      } else {
        toggleProfileFlip();
      }
      return;
    }

    toggleProfileFlip();
  });

  profileCard.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleProfileFlip();
    }
  });
}


// ========== Cursor spotlight ==========
