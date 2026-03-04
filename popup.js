document.addEventListener("DOMContentLoaded", function () {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    document.getElementById("promoOverlay").style.display = "none";
    return;
  }

  const overlay = document.getElementById("promoOverlay");
  overlay.style.pointerEvents = "none";

  // Auto slide
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  setInterval(function () {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }, 5000);

  // Auto close setelah 10 detik
  setTimeout(function () {
    overlay.style.transition = "opacity 0.6s ease";
    overlay.style.opacity = "0";
    setTimeout(function () {
      overlay.style.display = "none";
    }, 600);
  }, 10000);
});