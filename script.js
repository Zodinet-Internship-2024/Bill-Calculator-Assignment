document.addEventListener("DOMContentLoaded", function () {
    const billInput = document.getElementById("bill");
    const peopleInput = document.getElementById("people");
    const peopleError = document.getElementById("people-error");
    const tipButtons = document.querySelectorAll(".input-section__tip-btn");
    const customTipInput = document.getElementById("custom-tip");
    const tipAmountDisplay = document.querySelector(".result-section__tip-amount .result-section__amount");
    const totalAmountDisplay = document.querySelector(".result-section__total-amount .result-section__amount");
    const resetButton = document.querySelector(".result-section__reset-btn");

    // resetButton.classList.add("result-section__reset-btn--disabled");
  
    let billAmount = 0;
    let tipPercentage = 0;
    let peopleCount = 0;
  
    const preventInvalidNumberInput = () => {
      document.querySelectorAll('input[type="number"]').forEach((input) => {
        input.addEventListener("keydown", (e) => {
          if (e.key === "e" || e.key === "-" || e.key === "+" || e.key === "E") {
            e.preventDefault();
          }
        });
  
        input.addEventListener("paste", (e) => {
          e.preventDefault();
        });
      });
    };
  
    const calculateTip = () => {
      if (peopleCount === 0) {
        peopleError.textContent = "Can't be zero";
        return;
      }
      peopleError.textContent = "";
      const tipAmount = (billAmount * tipPercentage) / peopleCount;
      const totalAmount = billAmount / peopleCount + tipAmount;
      console.log(typeof(totalAmount.toFixed(2)));
      if (totalAmount.toFixed(2) === "0.00") {
        peopleError.textContent = "So many people"
      }
      tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
      totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
    };
  
    preventInvalidNumberInput();
  
    billInput.addEventListener("input", function () {
      billAmount = parseFloat(billInput.value) || 0;
      billInput.classList.toggle("input-error", billAmount < 1);
      calculateTip();
    });
  
    peopleInput.addEventListener("input", function () {
      peopleCount = parseInt(peopleInput.value) || 0;
      peopleInput.classList.toggle("input-error", peopleCount < 1);
      calculateTip();
    });
  
    tipButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        tipPercentage = parseFloat(button.textContent) / 100;
        tipButtons.forEach((btn) => btn.classList.remove("input-section__tip-btn--active"));
        button.classList.add("input-section__tip-btn--active");
        customTipInput.value = "";
        calculateTip();
      });
    });
  
    customTipInput.addEventListener("input", function () {
      tipPercentage = parseFloat(customTipInput.value) / 100 || 0;
      tipButtons.forEach((btn) => btn.classList.remove("input-section__tip-btn--active"));
      calculateTip();
    });
  
    resetButton.addEventListener("click", function () {
      billAmount = 0;
      tipPercentage = 0;
      peopleCount = 0;
      billInput.value = "";
      peopleInput.value = "";
      customTipInput.value = "";
      calculateTip();
      tipButtons.forEach((btn) => btn.classList.remove("input-section__tip-btn--active"));
      tipAmountDisplay.textContent = "$0.00";
      totalAmountDisplay.textContent = "$0.00";
      peopleError.textContent = "";
    });
  });
  