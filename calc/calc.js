const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator_keys");
const display = document.querySelector(".calculator_display");

// Checks if  a '.' has been clicked.
let decimal_clicked = false;
let previous_key_type = "";
let prev = "";
let equal_clicked = false;

const KeyTypes = {
  Operator: "operator",
  Number: "number",
  Calculate: "calculate",
  Clear: "clear",
  Previous: "previous",
  Decimal: "decimal",
}

const Ops = {
  multiply: "*",
  divide: "/",
  add: "+",
  subtract: "-"
}

keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    const key = e.target;
    const key_action = key.dataset.action;
    const key_content = key.textContent;
    const displayed_number = display.textContent;

    key.classList.add("is-depressed");

    // Erase the previous value if a new number is clicked
    if (equal_clicked) {
      if (!key_action) {
        display.textContent = "";
      }
      equal_clicked = false;
    }

    switch (key_action) {
      case KeyTypes.Clear:
        display.textContent = "";
        // If clear is pressed twice erase history
        if (previous_key_type == KeyTypes.Clear) {
          prev = "";
        }
        previous_key_type = KeyTypes.Clear;
        break;

      case "add":
      case "subtract":
      case "multiply":
      case "divide":
        // If two operators are clicked removed the previous one from the display.
        if (previous_key_type === KeyTypes.Operator) {
          // Update the display
          display.textContent = display.textContent.slice(0, -1);
        }
        // Update the display
        display.textContent += Ops[key_action];

        previous_key_type = KeyTypes.Operator;
        // Set 'decimal_clicked' to false so that users can type '.' for other numbers 
        // after the operator.
        decimal_clicked = false;
        break;

      case KeyTypes.Previous:
        // If prev is emptly alert the user that
        // there's no previous calculation.
        if (prev == "") {
          alert("No previous calculation.")
        } else {
          // Update the display
          display.textContent += prev;
        }
        break;

      case KeyTypes.Calculate:
        if (previous_key_type === KeyTypes.Operator) {
          alert(`Invalid expression: '${current_calculation}'`)
        }

        // Calculate the current expression in the display
        let result = eval(display.textContent);
        // Update the display
        display.textContent = result;
        // Store the result in prev
        prev = result;

        current_calculation = "";
        equal_clicked = true;

        previous_key_type = KeyTypes.Calculate;
        break;

      case KeyTypes.Decimal:
        if (!decimal_clicked) {
          display.textContent += ".";
          decimal_clicked = true
        }
        break

      // If the action type is none it's a number
      default:
        if (
          // If zero is the only thing on the display
          displayed_number === "0"
          // ||
          // If calculate was just called overwrite
          // previous_key_type === KeyTypes.Calculate
        ) {
          display.textContent = key_content;
        } else {
          display.textContent += key_content;
        }
        previous_key_type = KeyTypes.Number;
        break;
    }

    setTimeout(
      () => key.classList.remove("is-depressed"),
      200
    )
  }
})
