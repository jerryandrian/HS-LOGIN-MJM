document.addEventListener("DOMContentLoaded", function () {
  const isMobile = window.matchMedia("(max-width: 900px)").matches;
  const overlay = document.getElementById("promoOverlay");
  const promoPrev = document.getElementById("promoPrev");
  const promoNext = document.getElementById("promoNext");
  const promoClose = document.getElementById("promoClose");

  const sliderHTML = document.querySelector(".slider").innerHTML;

  // =====================
  // MOBILE: More Promo
  // =====================
  function mobileManualMode() {
    document.querySelector(".slider").innerHTML = sliderHTML;

    const allImgs = document.querySelectorAll(".slide-group .slide");
    const srcs = [];
    allImgs.forEach((img) => srcs.push(img.src));

    const slider = document.querySelector(".slider");
    slider.innerHTML = "";
    srcs.forEach((src, i) => {
      const div = document.createElement("div");
      div.className = "slide-group";
      div.style.cssText =
        "position:absolute;top:0;left:0;width:100%;height:100%;opacity:" +
        (i === 0 ? "1" : "0") +
        ";transition:none;";
      div.innerHTML = `<img src="${src}" style="width:100%;height:100%;object-fit:cover;object-position:center top;" />`;
      slider.appendChild(div);
    });

    const groups = document.querySelectorAll(".slide-group");
    let cur = 0;

    function goTo(index) {
      const prevGroup = groups[cur];
      cur = (index + groups.length) % groups.length;
      const nextGroup = groups[cur];
      prevGroup.style.transition = "opacity 0.2s ease";
      nextGroup.style.transition = "opacity 0.2s ease";
      prevGroup.style.opacity = "0";
      nextGroup.style.opacity = "1";
    }

    // Swipe gesture
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goTo(cur + 1); // swipe kiri → next
        } else {
          goTo(cur - 1); // swipe kanan → prev
        }
      }
    }, { passive: true });

    // Sembunyikan prev/next, tampilkan close
    promoPrev.style.display = "none";
    promoNext.style.display = "none";
    promoClose.style.display = "flex";

    overlay.style.pointerEvents = "auto";
    overlay.style.opacity = "1";
    overlay.style.display = "flex";

    promoClose.onclick = () => {
      overlay.style.transition = "opacity 0.5s ease";
      overlay.style.opacity = "0";
      setTimeout(() => {
        overlay.style.display = "none";
        overlay.style.transition = "";
      }, 500);
    };
  }

  if (isMobile) {
    overlay.style.display = "none";
    document.querySelector(".more-promo-btn").addEventListener("click", (e) => {
      e.preventDefault();
      mobileManualMode();
    });
    return;
  }

  // =====================
  // DESKTOP: Auto Mode
  // =====================
  function autoMode() {
    document.querySelector(".slider").innerHTML = sliderHTML;
    const groups = document.querySelectorAll(".slide-group:not(.slide-group-extra)");

    promoPrev.style.display = "none";
    promoNext.style.display = "none";
    promoClose.style.display = "none";

    groups.forEach((g) => {
      g.classList.remove("active");
      g.style.transition = "none";
      g.style.opacity = "0";
    });

    overlay.style.pointerEvents = "none";
    overlay.style.opacity = "1";
    overlay.style.display = "flex";

    // Batch 1 langsung tampil
    groups[0].style.opacity = "1";
    groups[0].classList.add("active");

    // Ganti ke batch 2 setelah 5 detik
    setTimeout(() => {
      groups[0].style.transition = "opacity 0.2s ease";
      groups[1].style.transition = "opacity 0.2s ease";
      groups[0].style.opacity = "0";
      groups[0].classList.remove("active");
      groups[1].style.opacity = "1";
      groups[1].classList.add("active");

      // Close 5 detik setelah batch 2 muncul
      setTimeout(() => {
        overlay.style.transition = "opacity 0.5s ease";
        overlay.style.opacity = "0";
        setTimeout(() => {
          overlay.style.display = "none";
          overlay.style.transition = "";
        }, 500);
      }, 5200);
    }, 5000);
  }

  // =====================
  // DESKTOP: Manual Mode
  // =====================
  function manualMode() {
    document.querySelector(".slider").innerHTML = sliderHTML;
    const groups = document.querySelectorAll(".slide-group");
    let cur = 0;

    groups.forEach((g) => {
      g.classList.remove("active");
      g.style.transition = "none";
      g.style.opacity = "0";
    });

    // Batch 1 langsung tampil
    groups[0].style.transition = "none";
    groups[0].style.opacity = "1";
    groups[0].classList.add("active");

    function goTo(index) {
      const prevGroup = groups[cur];
      cur = (index + groups.length) % groups.length;
      const nextGroup = groups[cur];
      prevGroup.style.transition = "opacity 0.2s ease";
      nextGroup.style.transition = "opacity 0.2s ease";
      prevGroup.style.opacity = "0";
      prevGroup.classList.remove("active");
      nextGroup.style.opacity = "1";
      nextGroup.classList.add("active");
    }

    promoPrev.style.display = "flex";
    promoNext.style.display = "flex";
    promoClose.style.display = "flex";

    overlay.style.pointerEvents = "auto";
    overlay.style.opacity = "1";
    overlay.style.display = "flex";

    promoPrev.onclick = () => goTo(cur - 1);
    promoNext.onclick = () => goTo(cur + 1);
    promoClose.onclick = () => {
      overlay.style.transition = "opacity 0.5s ease";
      overlay.style.opacity = "0";
      setTimeout(() => {
        overlay.style.display = "none";
        overlay.style.transition = "";
      }, 500);
    };
  }

  autoMode();

  document.querySelector(".more-promo-btn").addEventListener("click", (e) => {
    e.preventDefault();
    manualMode();
  });
});