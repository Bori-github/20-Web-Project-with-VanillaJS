const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// const dummyTransactions = [
//   { id: 1, text: "Flower", amount: -2000 },
//   { id: 2, text: "Salary", amount: 30000 },
//   { id: 3, text: "Book", amount: -1000 },
//   { id: 4, text: "Camera", amount: 15000 },
// ];

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("내용과 금액을 입력하세요.");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = "";
    amount.value = "";
  }
}

// Add transaction to DOM list
function addTransactionDOM(transaction) {
  // Gwt sign
  const sign = transaction.amount < 0 ? "- " : "+ ";

  const item = document.createElement("li");

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
    ${transaction.text} 
    <span>${sign}${Math.abs(transaction.amount).toLocaleString("ko-KR")}</span> 
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">
    <span class="material-icons-outlined"> close </span>
    </button>
  `;

  list.appendChild(item);
}

// Update the balance, income and expense
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((pre, item) => (pre += item), 0);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((pre, item) => (pre += item), 0);

  const expense = amounts
    .filter((item) => item < 0)
    .reduce((pre, item) => (pre -= item), 0);

  balance.innerText = `${total.toLocaleString("ko-KR")}원`;
  money_plus.innerText = `${income.toLocaleString("ko-KR")}원`;
  money_minus.innerText = `${expense.toLocaleString("ko-KR")}원`;
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();

  init();
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Init app
function init() {
  list.innerHTML = "";

  transactions.forEach(addTransactionDOM);

  updateValues();
}

init();

form.addEventListener("submit", addTransaction);
