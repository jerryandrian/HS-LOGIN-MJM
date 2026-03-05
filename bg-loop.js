// Random video background
const videos = [
  "style/img/video/video-promosi.mp4",
  "style/img/video/Video2-final.mp4",
  "style/img/video/Video3-final.mp4",
];

const randomIndex = Math.floor(Math.random() * videos.length);
const bgVideo = document.getElementById("bgvideo");
bgVideo.src = videos[randomIndex];
bgVideo.load();
bgVideo.play();

document.addEventListener("DOMContentLoaded", function () {

  const video = document.getElementById("bgvideo");
  if (!video) return;

  let fading = false;

  video.addEventListener("timeupdate", function () {
    if (video.duration - video.currentTime < 0.8 && !fading) {
      fading = true;
      video.style.opacity = "0";
      setTimeout(function () {
        video.currentTime = 0;
        video.play();
        video.style.opacity = "1";
        fading = false;
      }, 700);
    }
  });

});