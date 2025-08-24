//edit
document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('popup-message');
  if (popup) {
    setTimeout(() => {
      popup.style.display = 'none';
    }, 10000);
  }
});
