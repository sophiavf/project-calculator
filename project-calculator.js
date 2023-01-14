// Functions
function add(array) {
	return array.reduce(
		(accumulator, currentValue) => accumulator + currentValue
	);
}
function subtract(x, y) {
	return x - y;
}
function multiply(array) {
	return array.reduce(
		(accumulator, currentValue) => accumulator * currentValue
	);
}
function divide(x, y) {
	return x / y;
}

function operate(operator, int1, int2) {
	if (operator === "+") {
		return add([int1, int2]);
	} else if (operator === "-") {
		return subtract(int1, int2);
	} else if (operator === "*") {
		return multiply([int1, int2]);
	} else {
		return divide(int1, int2);
	}
}
// JS DOM

let displayValue = null;

function inputOperand() {}
function updateDisplay() {
    document.querySelector(); 
}
function clearDisplay() {}
