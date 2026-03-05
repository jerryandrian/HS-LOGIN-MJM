document.addEventListener("DOMContentLoaded", function () {

  const overlay = document.getElementById("videoAdOverlay");
  const videoAd = document.getElementById("videoAd");

  if (!overlay || !videoAd) return;

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  if (!isMobile) return;

  // Random video mobile
  const mobileVideos = [
    "style/img/video/video-promosi.mp4",
    "style/img/video/Video2-final.mp4",
    "style/img/video/Video3-final.mp4",
  ];
  const randomMobile = Math.floor(Math.random() * mobileVideos.length);
  videoAd.src = mobileVideos[randomMobile];
  videoAd.load();

  // Tampilkan overlay
  overlay.classList.add("active");
  overlay.style.pointerEvents = "none";
  document.body.style.overflow = "hidden";

  videoAd.muted = true;
  const playPromise = videoAd.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => console.log("Autoplay diblokir browser."));
  }

  // Auto close setelah 20 detik
  setTimeout(function () {
    overlay.style.transition = "opacity 0.6s ease";
    overlay.style.opacity = "0";
    setTimeout(function () {
      overlay.classList.remove("active");
      overlay.style.opacity = "1";
      document.body.style.overflow = "";
    }, 600);
  }, 20000);

});