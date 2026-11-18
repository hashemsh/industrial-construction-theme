const updateDots = (slider, dots) => {
  const index = Math.round(slider.scrollLeft / slider.clientWidth);
  const active = Math.min(index, dots.length - 1);

  dots.forEach((dot, dotIndex) => {
    dot.setAttribute('aria-current', dotIndex === active ? 'true' : 'false');
  });
};

export const initSliders = () => {
  document.querySelectorAll('[data-slider]').forEach((slider) => {
    const group = slider.closest('[data-slider-group]');
    const dots = group ? Array.from(group.querySelectorAll('[data-slider-dot]')) : [];
    const step = () => Math.max(slider.clientWidth * 0.9, 240);

    group?.querySelectorAll('[data-slider-next]').forEach((button) => {
      button.addEventListener('click', () => {
        slider.scrollBy({ left: -step(), behavior: 'smooth' });
      });
    });

    group?.querySelectorAll('[data-slider-prev]').forEach((button) => {
      button.addEventListener('click', () => {
        slider.scrollBy({ left: step(), behavior: 'smooth' });
      });
    });

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        slider.scrollTo({ left: index * slider.clientWidth, behavior: 'smooth' });
      });
    });

    slider.addEventListener(
      'scroll',
      () => {
        if (!dots.length) return;
        window.requestAnimationFrame(() => updateDots(slider, dots));
      },
      { passive: true },
    );

    if (dots.length) updateDots(slider, dots);
  });
};
