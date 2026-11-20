import { prefersReducedMotion } from './utils.js';

const AUTOPLAY_DELAY = 7000;

export const initHero = () => {
  const root = document.querySelector('[data-hero]');

  if (!root) return;

  const slides = Array.from(root.querySelectorAll('[data-hero-slide]'));
  const dots = Array.from(root.querySelectorAll('[data-hero-dot]'));

  if (slides.length < 2) return;

  const pauseBtn = root.querySelector('[data-hero-pause]');
  let index = 0;
  let timer = 0;
  let paused = false;

  const show = (next) => {
    index = (next + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
    });

    dots.forEach((dot, dotIndex) => {
      dot.setAttribute('aria-current', dotIndex === index ? 'true' : 'false');
    });
  };

  const stop = () => {
    window.clearInterval(timer);
    timer = 0;
  };

  const start = () => {
    stop();
    if (paused || prefersReducedMotion()) return;
    timer = window.setInterval(() => show(index + 1), AUTOPLAY_DELAY);
  };

  const setPaused = (value) => {
    paused = value;
    if (pauseBtn) {
      pauseBtn.setAttribute('aria-pressed', String(paused));
      pauseBtn.setAttribute('aria-label', paused ? 'ادامه پخش خودکار' : 'توقف پخش خودکار');
    }
    if (paused) stop();
    else start();
  };

  root.querySelector('[data-hero-next]')?.addEventListener('click', () => {
    show(index + 1);
    start();
  });

  root.querySelector('[data-hero-prev]')?.addEventListener('click', () => {
    show(index - 1);
    start();
  });

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener('click', () => {
      show(dotIndex);
      start();
    });
  });

  if (pauseBtn && prefersReducedMotion()) pauseBtn.hidden = true;
  pauseBtn?.addEventListener('click', () => setPaused(!paused));

  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);
  root.addEventListener('focusin', stop);
  root.addEventListener('focusout', start);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  });

  show(0);
  start();
};
