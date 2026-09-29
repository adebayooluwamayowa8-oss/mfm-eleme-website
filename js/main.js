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
const playlistElement = document.querySelector('[data-hero-playlist]');
const heroVideos = [...document.querySelectorAll('.hero-video')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (playlistElement && heroVideos.length === 2) {
  const sources = [...playlistElement.querySelectorAll('[data-video-src]')]
    .map(item => item.dataset.videoSrc).filter(Boolean);
  if (sources.length) {
    let currentIndex = 0;
    let activeIndex = 0;
    const play = video => video.play().catch(() => {});
    function cue(video, index) {
      if (video.dataset.index === String(index)) return;
      video.dataset.index = String(index);
      video.src = sources[index];
      video.load();
    }
    function advance() {
      if (reduceMotion.matches || sources.length < 2) {
        heroVideos[activeIndex].currentTime = 0;
        if (!reduceMotion.matches) play(heroVideos[activeIndex]);
        return;
      }
      const nextIndex = (currentIndex + 1) % sources.length;
      const nextVideo = heroVideos[1 - activeIndex];
      cue(nextVideo, nextIndex);
      nextVideo.currentTime = 0;
      const started = play(nextVideo);
      nextVideo.classList.add('is-active');
      heroVideos[activeIndex].classList.remove('is-active');
      heroVideos[activeIndex].pause();
      activeIndex = 1 - activeIndex;
      currentIndex = nextIndex;
      cue(heroVideos[1 - activeIndex], (currentIndex + 1) % sources.length);
    }
    heroVideos.forEach(video => {
      video.addEventListener('ended', () => { if (video === heroVideos[activeIndex]) advance(); });
      video.addEventListener('error', () => { if (video === heroVideos[activeIndex] && sources.length > 1) advance(); });
    });
    cue(heroVideos[0], 0);
    if (sources.length > 1) cue(heroVideos[1], 1);
    if (!reduceMotion.matches) play(heroVideos[0]);
    reduceMotion.addEventListener('change', () => {
      if (reduceMotion.matches) heroVideos.forEach(video => video.pause());
      else play(heroVideos[activeIndex]);
    });
  }
} else {
  const video = document.querySelector('.hero video');
  if (video && reduceMotion.matches) video.pause();
}

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
