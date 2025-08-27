const apiBase = "http://localhost:5000/api/convert";

// Populate currency dropdowns
const currencies = ["USD", "EUR", "GBP", "INR", "JPY", "AUD", "CAD"];
const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");

currencies.forEach((cur) => {
  let option1 = new Option(cur, cur);
  let option2 = new Option(cur, cur);
  fromSelect.add(option1);
  toSelect.add(option2);
});

// Default values
fromSelect.value = "USD";
toSelect.value = "INR";

// Convert button click
document.getElementById("convertBtn").addEventListener("click", async () => {
  const from = fromSelect.value;
  const to = toSelect.value;
  const amount = document.getElementById("amount").value;

  if (!amount || amount <= 0) {
    document.getElementById("result").innerText = "⚠ Please enter a valid amount.";
    return;
  }

  try {
    const response = await fetch(`${apiBase}?from=${from}&to=${to}&amount=${amount}`);
    const data = await response.json();

    if (data.error) {
      document.getElementById("result").innerText = `❌ ${data.error}`;
    } else {
      document.getElementById("result").innerText =
        `${amount} ${from} = ${data.convertedAmount} ${to}`;
    }
  } catch (error) {
    document.getElementById("result").innerText = "⚠ Error connecting to backend.";
  }
});
