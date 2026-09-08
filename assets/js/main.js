document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');

navToggle.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ---------- Lightbox (click any photo or video to view full screen) ---------- */
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightboxContent');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxBack = document.getElementById('lightboxBack');
let lastFocused = null;

function openLightbox(type, src, caption) {
  lastFocused = document.activeElement;
  lightboxContent.innerHTML = '';

  let media;
  if (type === 'video') {
    media = document.createElement('video');
    media.src = src;
    media.controls = true;
    media.autoplay = true;
    media.playsInline = true;
  } else {
    media = document.createElement('img');
    media.src = src;
    media.alt = caption || '';
  }
  lightboxContent.appendChild(media);

  if (caption) {
    const cap = document.createElement('p');
    cap.className = 'lightbox-cap';
    cap.textContent = caption;
    lightboxContent.appendChild(cap);
  }

  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  lightboxClose.focus();
}

function closeLightbox() {
  const video = lightboxContent.querySelector('video');
  if (video) { video.pause(); }
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxContent.innerHTML = '';
  document.body.style.overflow = '';
  if (lastFocused) { lastFocused.focus(); }
}

document.addEventListener('click', (e) => {
  const trigger = e.target.closest('[data-lightbox]');
  if (trigger) {
    e.preventDefault();
    openLightbox(trigger.getAttribute('data-lightbox'), trigger.getAttribute('data-src'), trigger.getAttribute('data-caption'));
  }
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxBack.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) { closeLightbox(); }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('open')) {
    closeLightbox();
  }
});
