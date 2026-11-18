import { prefersReducedMotion, toPersianDigits } from './utils.js';

const animate = (element) => {
  const target = Number(element.dataset.counter);
  const suffix = element.dataset.counterSuffix ?? '';
  const duration = 1400;
  const start = performance.now();

  const render = (value) => {
    element.textContent = `${toPersianDigits(value)}${suffix}`;
  };

  if (!Number.isFinite(target) || prefersReducedMotion()) {
    render(target);
    return;
  }

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    render(Math.round(target * eased));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};

export const initCounters = () => {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animate);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animate(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.4 },
  );

  counters.forEach((counter) => observer.observe(counter));
};
