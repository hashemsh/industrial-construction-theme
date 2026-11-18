import { initHeader } from './header.js';
import { initHero } from './hero.js';
import { initReveal } from './reveal.js';
import { initCounters } from './counters.js';
import { initSliders } from './slider.js';
import { initVideo } from './video.js';
import { initForms } from './forms.js';
import { initBackToTop } from './backtotop.js';

const init = () => {
  initHeader();
  initHero();
  initReveal();
  initCounters();
  initSliders();
  initVideo();
  initForms();
  initBackToTop();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
