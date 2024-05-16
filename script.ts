const billInput = document.getElementById("bill") as HTMLInputElement;
const peopleInput = document.getElementById("people") as HTMLInputElement;
const tipButtons = document.querySelectorAll(".tip-btn");
const customTipInput = document.getElementById(
  "custom-tip"
) as HTMLInputElement;
const tipAmountDisplay = document.querySelector(
  ".tip-amount .amount"
) as HTMLParagraphElement;
const totalAmountDisplay = document.querySelector(
  ".total-amount .amount"
) as HTMLParagraphElement;
const resetButton = document.querySelector(".reset-btn") as HTMLButtonElement;

let billAmount = 0;
let tipPercentage = 0; // default to 15%
let peopleCount = 0;

const calculateTip = () => {
  const tipAmount = (billAmount * tipPercentage) / peopleCount;
  const totalAmount = billAmount / peopleCount + tipAmount;
  tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
  totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
};

billInput.addEventListener("input", () => {
  billAmount = parseFloat(billInput.value) || 0;
  calculateTip();
});

peopleInput.addEventListener("input", () => {
  peopleCount = parseInt(peopleInput.value) || 1;
  calculateTip();
});

tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tipPercentage = parseFloat(button.textContent!.slice(0, -1)) / 100;
    tipButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    customTipInput.value = "";
    calculateTip();
  });
});

customTipInput.addEventListener("input", () => {
  tipPercentage = parseFloat(customTipInput.value) / 100 || 0;
  tipButtons.forEach((btn) => btn.classList.remove("active"));
  calculateTip();
});

resetButton.addEventListener("click", () => {
  billInput.value = "";
  peopleInput.value = "";
  customTipInput.value = "";
  tipButtons.forEach((btn) => btn.classList.remove("active")); // set default tip button to active
  tipPercentage = 0; // reset to default tip percentage
  calculateTip();
});
