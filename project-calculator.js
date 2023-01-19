// Functions
//1. perform equation
//2. round result
function add(x, y) {
	return roundToTwo(x + y);
}
function subtract(x, y) {
	return roundToTwo(x - y);
}
function multiply(x, y) {
	return roundToTwo(x * y);
}
function divide(x, y) {
	////Display a snarky error message if the user tries to divide by 0
	if (y === 0) {
		return "ERROR";
	}
	return roundToTwo(x / y);
}

//3. assign value to the result variable
function operate(operator, x, y) {
	if (operator === "+") {
		result = add(x, y);
		return result;
	} else if (operator === "-") {
		result = subtract(x, y);
		return result;
	} else if (operator === "x") {
		result = multiply(x, y);
		return result;
	} else {
		result = divide(x, y);
		return result;
	}
}
// JS DOM
const buttons = document.querySelectorAll("button");
const display = document.querySelector(".screen");
const lastOperation = document.querySelector(".line-1");
const currentOperation = document.querySelector(".line-2");
let firstOperand;
let secondOperand;
let operator;
let result;

//button gets clicked
function click() {
	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			//button is checked if it is an operator or operand
			if (button.className === "operand") {
				// check first if operand is a decimal point
				//If operand is a decimal point then the addDecimal function appends it
				if (button.textContent === ".") {
					updateCurrentOperation(addDecimal());
					//Check if first operand has not been entered yet
				} else if (!firstOperand) {
					firstOperand = button.textContent;
					updateCurrentOperation(firstOperand);
					//if the first operand (a number) has already been entered but no operator, an additional number is appended to it
				} else if (firstOperand && !operator) {
					firstOperand = firstOperand + "" + button.textContent;
					updateCurrentOperation(firstOperand);
					//checks if second operator has been entered yet
				} else if (!secondOperand) {
					//Check if number should be appended to secondOperand
					secondOperand = button.textContent;
					updateCurrentOperation(secondOperand);
					//if none of the above statement evaluate to true, then it must be appended to the secondOperator
				} else {
					secondOperand = secondOperand + "" + button.textContent;
					updateCurrentOperation(secondOperand);
				}
			}
			if (button.className === "operator") {
				//check if operator is '='
				if (button.getAttribute("value") === "allClear") {
					clearDisplay();
				} else if (button.textContent === "=" && secondOperand) {
					updateLastOperation(`${firstOperand} ${operator} ${secondOperand} =`);
					firstOperand = operate(operator, +firstOperand, +secondOperand);
					result = firstOperand;
					updateCurrentOperation(result);
					secondOperand = '';
					// if the person enters a 2nd operator that != equals, the first and second operand and operator need to be evaluated i.e. 1 + 2 (3) + 3 (so 3+3) => string together several operations and get the right answer
				} else if (operator && secondOperand) {
					firstOperand = operate(operator, +firstOperand, +secondOperand);
					operator = button.textContent;
					updateLastOperation(`${firstOperand} ${operator}`);
					updateCurrentOperation(""); 
					secondOperand = '';
				} else if (firstOperand) {
					operator = button.textContent;
					updateLastOperation(`${firstOperand} ${operator}`);
					updateCurrentOperation("");
					//If firstOperand is empty, the function will return
				} else {
					return;
				}
			}
		});
	});
}
function addDecimal() {
	//check if it should be added to firstOperand or secondOperand and checks if decimal already exists to ensure no more than 1 is appended decimal per operand
	if (secondOperand && Number.isInteger(secondOperand)) {
		secondOperand += ".";
		return secondOperand;
	} else if (firstOperand && Number.isInteger(firstOperand)) {
		firstOperand += ".";
		return firstOperand;
	} else {
		return;
	}
}

//Rounds result to 2 decimal places so they do not overflow the screen
function roundToTwo(num) {
	if (Number.isInteger(num)) {
		return num;
	} else {
		return Math.round(num * 100) / 100;
	}
}

//if the user presses the allClear button, the display is cleared
function clearDisplay() {
	currentOperation.textContent = "";
	lastOperation.textContent = "";
	firstOperand = '';
	secondOperand = '';
	operator = '';
	result = '';
}

function updateLastOperation(content) {
	lastOperation.textContent = content;
}

function updateCurrentOperation(content) {
	currentOperation.textContent = content;
}

//Extra Credit
//Add keyboard support
document.addEventListener("keydown", (e) => {
	const keyPressed = document.querySelector('button[data-key="${e.keyCode}"]');
	keyPressed.click();
});
//Functions calls
click();
