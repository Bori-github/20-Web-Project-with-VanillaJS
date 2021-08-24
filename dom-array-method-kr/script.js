const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleMoneyBtn = document.getElementById("double-money");
const showMillionairesBtn = document.getElementById("show-millionares");
const sortRichestBtn = document.getElementById("sort-richest");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// Double everyone money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

// Filter only Millionaires
function showMillionaires() {
  data = data.filter((user) => user.money > 1000000);

  updateDOM();
}

// Sort user by richest
function sortRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

//
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement("div");
  wealthEl.classList.add("total");
  wealthEl.innerHTML = `<span>Total</span> ${formatMoney(wealth)}`;
  main.appendChild(wealthEl);
}

// Add new obj to data arr
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Updata DOM
function updateDOM(proviedData = data) {
  // Clear main div
  main.innerHTML = "<h2 class='main-header'>Person <span>Wealth</span></h2>";

  proviedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<span>${item.name}</span> ${formatMoney(item.money)}`;
    main.appendChild(element);
  });
}

// Format number as money
function formatMoney(number) {
  return "$ " + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleMoneyBtn.addEventListener("click", doubleMoney);
showMillionairesBtn.addEventListener("click", showMillionaires);
sortRichestBtn.addEventListener("click", sortRichest);
calculateWealthBtn.addEventListener("click", calculateWealth);
