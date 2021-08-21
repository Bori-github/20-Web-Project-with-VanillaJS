const video = document.getElementById("video");
const play = document.getElementById("btn__play");
const stop = document.getElementById("btn__stop");
const progress = document.getElementById("progress-bar");
const timecurrent = document.getElementById("time-current");
const timeduration = document.getElementById("time-duration");

// Play & pause video
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update play & pause icon
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<span class="material-icons"> play_arrow </span>';
  } else {
    play.innerHTML = '<span class="material-icons"> pause </span>';
  }
}

// Update progress & timestamp
function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;

  // Get minute
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }

  // Get seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  timecurrent.innerHTML = `${mins}:${secs}`;
  timeduration.innerHTML =
    Math.floor(video.duration / 60) + ":" + Math.floor(video.duration % 60);
}

// Set video time progress
function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

// Stop video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

// Event listners
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggleVideoStatus);
stop.addEventListener("click", stopVideo);

progress.addEventListener("change", setVideoProgress);
