const toggle = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('open', open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }));
}
const video = document.querySelector('.hero video');
if (video && window.matchMedia('(prefers-reduced-motion: reduce)').matches) video.pause();

const photoButtons = [...document.querySelectorAll('[data-gallery-photo]')];
const viewer = document.getElementById('photoViewer');
if (viewer && photoButtons.length && typeof viewer.showModal === 'function') {
  const image = document.getElementById('viewerImage');
  const caption = document.getElementById('viewerCaption');
  const count = viewer.querySelector('.viewer-count');
  let current = 0;
  let opener = null;

  function showPhoto(index) {
    current = (index + photoButtons.length) % photoButtons.length;
    const thumbnail = photoButtons[current].querySelector('img');
    image.src = thumbnail.currentSrc || thumbnail.src;
    image.alt = thumbnail.alt;
    caption.textContent = thumbnail.alt;
    count.textContent = `${current + 1} / ${photoButtons.length}`;
  }

  photoButtons.forEach((button, index) => button.addEventListener('click', () => {
    opener = button;
    showPhoto(index);
    viewer.showModal();
    viewer.querySelector('.viewer-close').focus();
  }));
  viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
  viewer.querySelector('.viewer-prev').addEventListener('click', () => showPhoto(current - 1));
  viewer.querySelector('.viewer-next').addEventListener('click', () => showPhoto(current + 1));
  viewer.addEventListener('click', event => {
    if (event.target === viewer) viewer.close();
  });
  viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(current - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(current + 1); }
  });
  viewer.addEventListener('close', () => {
    image.removeAttribute('src');
    if (opener) opener.focus();
  });
}
