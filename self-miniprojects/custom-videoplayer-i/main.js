const videoContainer = document.querySelector(".video-container");
const video = document.querySelector("video");
const iconPlayPause = document.querySelector(".play-pause");
const iconVolume = document.querySelector(".volume i");
const sliderVolume = document.getElementById("mediaVolume");
const timeElapsed = document.querySelector(".time__elapsed");
const timeTotal = document.querySelector(".time__total");

function videoOnLoaded() {
  const total = timeConverter(video.duration);

  if (Math.floor(video.duration / 60 / 60) >= 60) {
    timeTotal.innerText = `${total.hour}:${total.minutes}:${total.seconds}`;
  }
  timeTotal.innerText = `${total.minutes}:${total.seconds}`;
}

video.addEventListener("loadedmetadata", videoOnLoaded);

let currentVolume;

function updateSlider(e) {
  currentVolume = e.target.value;
  if (currentVolume <= 0.03) {
    iconVolume.classList.replace("fa-volume-high", "fa-volume-xmark");
    video.muted = true;
  } else {
    iconVolume.classList.replace("fa-volume-xmark", "fa-volume-high");
    video.muted = false;
    video.volume = currentVolume;
  }
}

sliderVolume.addEventListener("change", updateSlider);

function togglePlayPause() {
  const icon = iconPlayPause.querySelector("i");
  if (!video.paused) {
    icon.classList.replace("fa-pause", "fa-play");
    video.pause();
  } else {
    icon.classList.replace("fa-play", "fa-pause");
    video.play();
  }
}

video.addEventListener("click", togglePlayPause);
iconPlayPause.addEventListener("click", togglePlayPause);

function toggleMute() {
  if (!video.muted) {
    iconVolume.classList.replace("fa-volume-high", "fa-volume-xmark");
    video.muted = true;
    sliderVolume.value = 0;
  } else {
    iconVolume.classList.replace("fa-volume-xmark", "fa-volume-high");
    video.muted = false;
    sliderVolume.value = currentVolume;
  }
}

iconVolume.addEventListener("click", toggleMute);

function timeConverter(secondsInput) {
  const elapsed = Math.floor(secondsInput);
  const seconds = String(elapsed % 60).padStart(2, "0");
  const minutes = String(Math.floor((elapsed / 60) % 60)).padStart(2, "0");
  const hour = String(Math.floor(elapsed / 60 / 60)).padStart(2, "0");

  return { seconds: seconds, minutes: minutes, hour: hour };
}

function updateTime() {
  const elapsed = timeConverter(video.currentTime);

  if (Math.floor(video.duration / 60 / 60) >= 60) {
    timeElapsed.innerText = `${elapsed.hour}:${elapsed.minutes}:${elapsed.seconds}`;
  }
  timeElapsed.innerText = `${elapsed.minutes}:${elapsed.seconds}`;
}

video.addEventListener("timeupdate", updateTime);

const iconFullscreen = document.querySelector(".fullscreen i");

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    iconFullscreen.classList.replace("fa-expand", "fa-compress");
    videoContainer.requestFullscreen();
  } else {
    iconFullscreen.classList.replace("fa-compress", "fa-expand");
    document.exitFullscreen();
  }
}

iconFullscreen.addEventListener("click", toggleFullscreen);

const iconPlaybackSpeed = document.querySelector(".playback-speed i");
const playbackMenu = document.querySelector(".playback-speed__menu");

function togglePlaybackMenu() {
  playbackMenu.classList.toggle("shown");
}

iconPlaybackSpeed.addEventListener("click", togglePlaybackMenu);

function setPlaybackRate() {
  playbackMenu
    .querySelectorAll(".speed")
    .forEach((element) => element.classList.remove("selected-playback"));
  const speed = Number(this.getAttribute("data-playback-rate"));
  video.playbackRate = speed;
  this.classList.toggle("selected-playback");
}

playbackMenu.querySelectorAll(".speed").forEach((element) => {
  element.addEventListener("click", setPlaybackRate);
});

const elapsedBar = document.querySelector(".duration__elapsed-bar");

function updateElapsedBar() {
  const progress = String((video.currentTime / video.duration) * 100) + "%";
  elapsedBar.style.width = progress;
}

video.addEventListener("timeupdate", updateElapsedBar);

const durationBar = document.querySelector(".duration");

function jumpToTime(e) {
  const offsetPercentage = e.offsetX / durationBar.clientWidth;
  const timeTarget = offsetPercentage * video.duration;
  video.currentTime = timeTarget;
}

durationBar.addEventListener("click", jumpToTime);

const controllerContainer = document.querySelector(".controller__container");
let hideTimeout, cursorTimeout;

function hideController() {
  hideTimeout = setTimeout(() => {
    controllerContainer.classList.add("hide-controller");
  }, 3000);
}

function showController() {
  controllerContainer.classList.remove("hide-controller");
  clearTimeout(hideTimeout);
}

video.addEventListener("pause", showController)
videoContainer.addEventListener("mousemove", () => {
  clearTimeout(cursorTimeout);
  cursorTimeout = setTimeout(() => {
    showController()
    hideTimeout = setTimeout(() => {
      controllerContainer.classList.add("hide-controller");
      videoContainer.style.cursor = "none"
    }, 3000);
    videoContainer.style.cursor = "default"
  }, 1)
})
video.addEventListener("playing", hideController)
videoContainer.addEventListener("mouseleave", hideController)