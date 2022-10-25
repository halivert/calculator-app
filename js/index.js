const buttons = {};
const currentOperation = {
  firstNumber: 0,
  secondNumber: null,
  operator: null,
  displayValue: "0",
};
const operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  x: (a, b) => a * b,
  "/": (a, b) => a / b,
  eq: (a, b) => b,
  reset: () => {
    currentOperation.firstNumber = 0;
    currentOperation.secondNumber = null;
    currentOperation.operator = null;
    currentOperation.displayValue = "0";
    updateScreen();
  },
  del: (a) => a.slice(0, -1),
};
const screen = document.querySelector(".screen > span");

const addButtonsListeners = () => {
  document.querySelectorAll(".keypad > button").forEach((btn) => {
    buttons[btn.id] = btn;

    btn.addEventListener("click", handleButtonClick);
  });
};

const handleButtonClick = (e) => {
  const { id } = e.target;
  !isNaN(id) || id === "." ? handleNumberClick(id) : handleOperatorClick(id);
};

const handleNumberClick = (number) => {
  const screenValue = screen.textContent;

  if (number === "." && currentOperation.displayValue.includes(".")) return;

  currentOperation.displayValue =
    currentOperation.displayValue === "0" ||
    (currentOperation.operator !== null && currentOperation.secondNumber === 0)
      ? number
      : screenValue + number;

  if (currentOperation.operator === null) {
    currentOperation.firstNumber = Number(
      currentOperation.displayValue.replace(/\,/g, "")
    );
  }

  if (currentOperation.operator !== null) {
    currentOperation.secondNumber = Number(
      currentOperation.displayValue.replace(/\,/g, "")
    );
  }

  updateScreen();
};

const handleOperatorClick = (operator) => {
  if (operator === "reset") {
    operations[operator]();
    return;
  }

  if (operator === "del") {
    currentOperation.displayValue = operations.del(
      currentOperation.displayValue
    );
    currentOperation.operator === null
      ? (currentOperation.firstNumber = Number(currentOperation.displayValue))
      : (currentOperation.secondNumber = Number(currentOperation.displayValue));
    updateScreen();
    return;
  }

  if (currentOperation.operator === null) {
    currentOperation.operator = operator;
    currentOperation.secondNumber = 0;
    if (
      currentOperation.displayValue !== currentOperation.firstNumber.toString()
    ) {
      currentOperation.firstNumber = Number(
        currentOperation.displayValue.replace(/\,/g, "")
      );
    }
    updateScreen();
    return;
  }

  if (operator === "eq") {
    currentOperation.displayValue = operations[currentOperation.operator](
      currentOperation.firstNumber,
      currentOperation.secondNumber
    ).toLocaleString();
    currentOperation.operator = null;
    currentOperation.firstNumber = 0;
    currentOperation.secondNumber = null;
    updateScreen();
    return;
  }

  currentOperation.firstNumber = operations[currentOperation.operator](
    currentOperation.firstNumber,
    currentOperation.secondNumber
  );
  currentOperation.operator = operator;
  currentOperation.secondNumber = 0;
  currentOperation.displayValue = currentOperation.firstNumber.toString();
  updateScreen();
};

const updateScreen = () => {
  const num = currentOperation.displayValue.split(".");
  let whole = num[0];
  whole = whole.replace(/\,/g, "");
  let fractional = "";
  if (num.length > 1) {
    fractional = "." + num[1];
  }
  screen.textContent = (+whole).toLocaleString() + fractional;
};

const init = () => {
  addButtonsListeners();
  updateScreen();
};

init();
