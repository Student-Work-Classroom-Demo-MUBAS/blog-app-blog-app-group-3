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

//edit
document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('popup-message');
  if (popup) {
    setTimeout(() => {
      popup.style.display = 'none';
    }, 4000);
  }
});

 function triggerFileInput() {
    document.getElementById('imageInput').click();
  }

  //image upload
  document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('imagePreview').src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  function openDeleteModal(postId) {
  const modal = document.getElementById('delete-modal');
  const form = document.getElementById('delete-form');
  form.action = `/posts/${postId}/delete`;
  modal.classList.remove('hidden');
  }

function closeDeleteModal() {
  document.getElementById('delete-modal').classList.add('hidden');
  }
