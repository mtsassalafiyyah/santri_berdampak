// Script tetap sama seperti versi sebelumnya
const slides = document.getElementById('slides');
const statusDiv = document.getElementById('status');
const submitBtn = document.getElementById('submitBtn');
let currentSlide = 0;
function updateHeight() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}
window.addEventListener('resize', updateHeight);
updateHeight();
function nextSlide() {
  const nama = document.getElementById('nama').value.trim();
  const kelas = document.getElementById('kelas').value.trim();
  if (!nama || !kelas) { alert("Nama lengkap dan kelas wajib diisi!"); return; }
  document.getElementById('hiddenNama').value = nama;
  document.getElementById('hiddenKelas').value = kelas;
  currentSlide = 1;
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}
async function submitAndRedirect(event) {
  event.preventDefault();
  statusDiv.innerHTML = "Sedang mengirim data... Tunggu ya";
  submitBtn.disabled = true;
  submitBtn.textContent = "Mengirim...";
  const form = document.getElementById('dataForm');
  const formData = new FormData(form);
  const peranArray = formData.getAll('peran[]');
  formData.delete('peran[]');
  formData.append('peran', peranArray.join(', '));
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbybuziFDfig8-cYD7RaFkQGUGPmpbeRFteeNZj3_enQVZXsKVtWZC7BRsVx1cFJ8IkT/exec', {
      method: 'POST',
      body: formData
    });
    if (response.ok) {
      statusDiv.innerHTML = "<span style='color:#8bc34a'>Sukses! Mengarahkan ke upload foto...</span>";
      setTimeout(() => { window.location.href = "https://forms.gle/SfAW2pZ87Fkzorb59"; }, 1800);
    } else {
      throw new Error('Gagal kirim');
    }
  } catch (error) {
    statusDiv.innerHTML = "<span style='color:#f44336'>Error: " + error.message + "<br>Coba lagi ya.</span>";
    submitBtn.disabled = false;
    submitBtn.textContent = "Kirim Data & Lanjut Upload Foto";
  }
  return false;
}