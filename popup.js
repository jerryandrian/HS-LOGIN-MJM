document.addEventListener("DOMContentLoaded", function () {

  // SLIDER
  const slides = document.querySelectorAll(".slide");
  let current = 0;

  function showNextSlide() {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }

  setInterval(showNextSlide, 3000);

  // AUTO CLOSE 5 DETIK
  const overlay = document.getElementById("promoOverlay");

  setTimeout(() => {
    overlay.style.display = "none";
  }, 10000);

});