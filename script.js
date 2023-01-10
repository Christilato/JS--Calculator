// Object Values
const calculator = {
    displayValue: "0",
    firstOperator: null,
    waitingForSecondOperator: false,
    operator: null,
};

// Update Display
const updateDisplay = () => {
    const display = document.querySelector(".screen")
    display.value = calculator.displayValue
};
updateDisplay();

// Handle Key Press
const keys = document.querySelector(".keys")
keys.addEventListener("click", (event) => {
    const {target} = event;
    if(!target.matches("button")) {
        return;
    }

    if(target.classList.contains("operator")) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains("decimal")) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if( target.classList.contains("all-clear")) {
        resetCalculator();
        updateDisplay();
        return;
    }

    inputDigit(target.value);
    updateDisplay();
});

//Input Digit 
const inputDigit = (digit) => {
    const{displayValue, waitingForSecondOperator} = calculator;

    if(waitingForSecondOperator === true) {
        calculator.displayValue = digit ;
        calculator.waitingForSecondOperator =false ;
         } else {
            calculator.displayValue = 
            displayValue === "0" ? digit : displayValue + digit;
         }
};

//Input Decimal
const inputDecimal = (dot) => {
    if(calculator.waitingForSecondOperator === true) {
        calculator.displayValue = "0.";
        calculator.waitingForSecondOperator = false;
        return;
    }
    if(!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
};


//Handle Operators
const handleOperator = (nextOperator) => {
    const {firstOperator, displayValue, operator} = calculator;
    const inputValue = parseFloat(displayValue)

    if(operator && calculator.waitingForSecondOperator) {
        calculator.operator = nextOperator;
        return
    }
    if(firstOperator == null && !isNaN(inputValue)) {
        calculator.firstOperator = inputValue
    } else if (operator) {
        const result = calculate(firstOperator, inputValue, operator )

        calculator.displayValue = `${parseFloat(result.toFixed(7))}`
        calculator.firstOperator = result;
    }

    calculator.waitingForSecondOperator = true;
    calculator.operator = nextOperator;

};


// Calculator Logic
const calculate = (firstOperator, secondOperator, operator) => {
    if (operator === "+") {
        return firstOperator + secondOperator;
    } else if (operator === "-") {
        return firstOperator - secondOperator;
    } else if (operator === "*") {
        return firstOperator * secondOperator;
    } else if (operator === "/") {
        return firstOperator / secondOperator;
    }
    return secondOperator;
};

// Reset Calculator
const resetCalculator = () => {
    calculator.displayValue = "0";
    calculator.firstOperator = null;
    calculator.waitingForSecondOperator = false;
    calculator.operator = null;
};









