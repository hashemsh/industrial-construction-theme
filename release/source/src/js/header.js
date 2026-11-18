export const initHeader = () => {
  const header = document.querySelector('[data-site-header]');
  const sentinel = document.querySelector('[data-header-sentinel]');

  if (header && sentinel) {
    const observer = new IntersectionObserver(
      ([entry]) => header.classList.toggle('is-stuck', !entry.isIntersecting),
      { rootMargin: '-1px 0px 0px 0px' },
    );
    observer.observe(sentinel);
  }

  const dialog = document.querySelector('[data-mobile-menu]');
  const openers = document.querySelectorAll('[data-mobile-open]');
  const closers = document.querySelectorAll('[data-mobile-close]');

  if (!dialog) return;

  openers.forEach((opener) => {
    opener.addEventListener('click', () => dialog.showModal());
  });

  closers.forEach((closer) => {
    closer.addEventListener('click', () => dialog.close());
  });

  dialog.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => dialog.close());
  });

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
};
