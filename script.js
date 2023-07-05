document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('fileInput');
  const imagePreview = document.getElementById('imagePreview');
  const qualityRange = document.getElementById('qualityRange');
  const compressBtn = document.getElementById('compressBtn');
  const downloadLink = document.getElementById('downloadLink');

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        imagePreview.innerHTML = '';
        imagePreview.appendChild(img);
      };
      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  });

  compressBtn.addEventListener('click', () => {
    const img = imagePreview.querySelector('img');
    if (!img) {
      alert('Please upload an image first.');
      return;
    }

    const quality = parseFloat(qualityRange.value);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    canvas.toBlob((blob) => {
      const compressedDataUrl = URL.createObjectURL(blob);

      // Update the download link
      downloadLink.href = compressedDataUrl;
      downloadLink.download = 'compressed_image.jpg';
    }, 'image/jpeg', quality);
  });
});
