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

