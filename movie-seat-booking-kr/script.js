const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.reserved, notavail)");
const movieTitle = document.getElementById("movie-title");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const movieRated = document.getElementById("rated");

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice, movieTitle, movieRated) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
  localStorage.setItem("selectedMovieTitle", movieTitle);
  localStorage.setItem("selectedMovieRated", movieRated);
}

// Update to and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = `${selectedSeatsCount} 명`;
  total.innerText = `${selectedSeatsCount * ticketPrice} 원`;

  movieTitle.innerText = movieSelect.options[movieSelect.selectedIndex].text;

  if (ticketPrice === 18000) {
    movieRated.innerText = `청소년 관람 불가`;
  } else if (ticketPrice === 15000) {
    movieRated.innerText = `15세 이상 관람가`;
  } else if (ticketPrice === 12000) {
    movieRated.innerText = `12세 이상 관람가`;
  } else if (ticketPrice === 10000) {
    movieRated.innerText = `전체 관람가`;
  } else {
    movieRated.innerText = `-`;
  }
}

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;

  setMovieData(
    e.target.selectedIndex,
    e.target.value,
    movieTitle.innerText,
    movieRated.innerText
  );

  updateSelectedCount();
});

// Seat click evetn
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("reserved") &&
    !e.target.classList.contains("notavail")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();
