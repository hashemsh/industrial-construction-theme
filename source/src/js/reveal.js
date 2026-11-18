import { prefersReducedMotion } from './utils.js';

export const initReveal = () => {
  const targets = document.querySelectorAll('[data-reveal]');

  if (!targets.length || prefersReducedMotion() || !('IntersectionObserver' in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.1 },
  );

  targets.forEach((target) => {
    target.classList.add('reveal');
    observer.observe(target);
  });
};
