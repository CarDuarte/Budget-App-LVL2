const currencies = {
  AUD: "Australian Dollar",
  CAD: "Canadian Dollar",
  EUR: "Euro",
  GBP: "British Pound",
  INR: "Indian Rupee",
  JPN: "Japanese Yen",
  USD: "United States Dollar",
  ZAR: "South African Rand",
};

const primaryCurrency = document.getElementById("primary");
const secondaryCurrency = document.getElementById("secondary");

primaryCurrency.innerHTML = getOptions(currencies);
secondaryCurrency.innerHTML = getOptions(currencies);

function getOptions(data) {
  return Object.entries(data)
    .map(([country, currency]) => `<option value="${country}">${country} | ${currency}</option>`)
    .join("");
}

document.getElementById("btn-convert").addEventListener("click", fetchCurrencies);

function fetchCurrencies() {
  const primary = primaryCurrency.value;
  const secondary = secondaryCurrency.value;
  const amount = document.getElementById("amount").value;
  // Important: Include your API key below
  fetch("https://v6.exchangerate-api.com/v6/9b0c8d794dd359363f8c5069/latest/" + primary)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then((data) => {
      console.log(data);
      displayCurrency(data, primary, secondary, amount);
    })
    .catch((error) => console.error("FETCH ERROR:", error));
}

function displayCurrency(data, primary, secondary, amount) {
  const calculated = amount * data.conversion_rates[secondary];
  document.getElementById("result").setAttribute("style", "display:block");
  document.getElementById("txt-primary").innerText = amount + " " + primary + " = ";
  document.getElementById("txt-secondary").innerText = calculated + " " + secondary;
}