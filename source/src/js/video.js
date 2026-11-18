/**
 * Opens the media dialog and only loads the video file after a click.
 */
export const initVideo = () => {
  const dialog = document.querySelector('[data-video-dialog]');
  if (!dialog) return;

  const openers = document.querySelectorAll('[data-video-open]');
  const closers = dialog.querySelectorAll('[data-video-close]');
  const placeholder = dialog.querySelector('[data-video-placeholder]');
  const source = dialog.dataset.videoSrc;

  openers.forEach((opener) => {
    opener.addEventListener('click', () => {
      if (source && !dialog.querySelector('video')) {
        const video = document.createElement('video');
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        video.src = source;
        video.className = 'w-full';
        if (placeholder) placeholder.replaceWith(video);
        else dialog.querySelector('[data-video-slot]')?.append(video);
      }
      dialog.showModal();
    });
  });

  closers.forEach((closer) => {
    closer.addEventListener('click', () => dialog.close());
  });

  dialog.addEventListener('close', () => {
    const video = dialog.querySelector('video');
    if (video) video.pause();
  });
};
