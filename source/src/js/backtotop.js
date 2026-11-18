import { prefersReducedMotion } from './utils.js';

/**
 * Shows a back-to-top button after the first screen and scrolls up on click.
 */
export function initBackToTop() {
  const button = document.querySelector('[data-to-top]');

  if (!button) {
    return;
  }

  const sync = () => {
    button.classList.toggle('is-visible', window.scrollY > 480);
  };

  sync();
  window.addEventListener('scroll', sync, { passive: true });

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  });
}
