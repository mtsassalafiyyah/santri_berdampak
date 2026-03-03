function nextSlide() {
  document.getElementById('slide1').classList.remove('active');
  document.getElementById('slide2').classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function prevSlide() {
  document.getElementById('slide2').classList.remove('active');
  document.getElementById('slide1').classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}