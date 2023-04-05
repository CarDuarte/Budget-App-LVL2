const currencies = {
  EUR: "Euro",
  USD: "United States Dollar",
  HNL: "Honduran Lempira"
};

const primaryCurrency = document.getElementById("primary");
const secondaryCurrency = document.getElementById("secondary");

primaryCurrency.innerHTML = getOptions(currencies);
secondaryCurrency.innerHTML = getOptions(currencies);

function getOptions(data) {
  return Object.entries(data)
    .map(
      ([country, currency]) =>
        `<option selected value="${country}">${country} | ${currency}</option>`
    )
    .join("");
}

document
  .getElementById("btn-convert")
  .addEventListener("click", fetchCurrencies);

function fetchCurrencies() {
  const primary = primaryCurrency.value;
  const secondary = secondaryCurrency.value;
  const amountCurrency =
    document.getElementById("amount-currency").value;
  fetch(
    "https://v6.exchangerate-api.com/v6/9b0c8d794dd359363f8c5069/latest/" +
      primary
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then((data) => {
      console.log(data);
      displayCurrency(data, primary, secondary, amountCurrency);
    })
    .catch((error) => console.error("FETCH ERROR:", error));
}

function displayCurrency(data, primary, secondary, amountCurrency) {
  const calculated = amountCurrency * data.conversion_rates[secondary];
  console.log(amountCurrency);
  document.getElementById("result").setAttribute("style", "display:block");
  document.getElementById("txt-primary").innerText =
    amountCurrency + " " + primary + " = ";
  document.getElementById("txt-secondary").innerText =
    calculated + " " + secondary;
}
