const musinInfo = document.getElementById("music-info");
const title = document.getElementById("title");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");

const timeCurrent = document.getElementById("time-current");
const timeDuration = document.getElementById("time-duration");

const musicContainer = document.getElementById("music-container");
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");

const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// Song titles
const songs = ["hey", "summer", "ukulele"];

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `image/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("span.material-icons-round").innerText = "pause";

  musinInfo.style.opacity = 1;
  musinInfo.style.transform = "translateY(0%)";

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("span.material-icons-round").innerText = "play_arrow";

  musinInfo.style.opacity = 0;
  musinInfo.style.transform = "translateY(100%)";

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Nest song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { currentTime, duration } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;

  progress.style.width = `${progressPercent}%`;

  // Get minutes
  let minutes = Math.floor(currentTime / 60);

  if (minutes < 10) {
    minutes = "0" + String(minutes);
  }

  // Get seconds
  let seconds = Math.floor(currentTime % 60);
  if (seconds < 10) {
    seconds = "0" + String(seconds);
  }

  // Get duration minutes
  let durationMinutes = Math.floor(duration / 60);

  if (durationMinutes < 10) {
    durationMinutes = "0" + String(durationMinutes);
  }

  // Get duration seconds
  let durationSeconds = Math.floor(duration % 60);
  if (durationSeconds < 10) {
    durationSeconds = "0" + String(durationSeconds);
  }

  timeCurrent.innerText = `${minutes}:${seconds}`;
  timeDuration.innerText = `${durationMinutes}:${durationSeconds}`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const audioDuration = audio.duration;

  audio.currentTime = (clickX / width) * audioDuration;
}

// Event listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Time/song update
audio.addEventListener("timeupdate", updateProgress);

// Click on progress bar
progressContainer.addEventListener("click", setProgress);

// Song ends
audio.addEventListener("ended", nextSong);

// Time of song
