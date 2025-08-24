// public/js/script.js

document.addEventListener('DOMContentLoaded', () => {
  // look for any element with class "alert"
  const flash = document.querySelector('.alert');
  if (!flash) return;

  // after 4 seconds, fade it and then remove
  setTimeout(() => {
    // start fade‐out
    flash.style.transition = 'opacity 0.5s ease';
    flash.style.opacity    = '0';

    // once transition is done, remove from DOM
    flash.addEventListener('transitionend', () => {
      flash.remove();
    });
  }, 4000);
});
