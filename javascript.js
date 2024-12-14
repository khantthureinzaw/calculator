function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    if (y === 0) {
        return 'You can\'t divide by zero!';
    }
    else {
        return Math.round((x / y) * 100) / 100;
    }
}

const container = document.querySelector('.container');
const display = document.querySelector('.display');
const firstNumDisplay = document.querySelector('#firstNum');
const secondNumDisplay = document.querySelector('#secNum');
const operatorDisplay = document.querySelector('#operatorDisplay');
firstNumDisplay.innerText = '0';

function handleNumberInput(value) {
    if (operatorDisplay.innerText === '') {
        if (firstNumDisplay.innerText === '0') firstNumDisplay.innerText = '';
        firstNumDisplay.innerText += value;
    } else {
        secondNumDisplay.innerText += value;
    }
}

function handleOperatorInput(value) {
    if (secondNumDisplay.innerText) {
        firstNumDisplay.innerText = operate(Number(firstNumDisplay.innerText), operatorDisplay.innerText.trim(), Number(secondNumDisplay.innerText));
        operatorDisplay.innerText = '';
        secondNumDisplay.innerText = '';
    }
    let operator = value;
    operatorDisplay.innerText = ` ${operator} `;
}

function addDecimal() {
    if (secondNumDisplay.innerText && !secondNumDisplay.innerText.includes('.')) {
        secondNumDisplay.innerText = secondNumDisplay.innerText + '.';
    } else if (!operatorDisplay.innerText && !firstNumDisplay.innerText.includes('.')) {
        firstNumDisplay.innerText = firstNumDisplay.innerText + '.';
    }
}

function addPercent() {
    if (secondNumDisplay.innerText) {
        secondNumDisplay.innerText = Number(secondNumDisplay.innerText) / 100;
    } else if (!operatorDisplay.innerText) {
        firstNumDisplay.innerText = Number(firstNumDisplay.innerText) / 100;
    }
}

function equation() {
    let result;
    firstOperand = Number(firstNumDisplay.innerText);
    secondOperand = Number(secondNumDisplay.innerText);
    operator = operatorDisplay.innerText.trim();
    if (!secondNumDisplay.innerText) {
        result = firstOperand;
    } else {
        result = operate(firstOperand, operator, secondOperand);
    }

    firstNumDisplay.innerText = result;
    secondNumDisplay.innerText = '';
    operatorDisplay.innerText = '';
}

function clearDisplay() {
    firstNumDisplay.innerText = '0';
    secondNumDisplay.innerText = '';
    operatorDisplay.innerText = '';
}

function backspace() {
    if (secondNumDisplay.innerText) {
        secondNumDisplay.innerText = secondNumDisplay.innerText.slice(0, -1);
    } else if (operatorDisplay.innerText) {
        operatorDisplay.innerText = '';
    } else if (firstNumDisplay.innerText) {
        firstNumDisplay.innerText = firstNumDisplay.innerText.slice(0, -1);
        if (!firstNumDisplay.innerText) {
            firstNumDisplay.innerText = '0';
        }
    }
}

//Button events
const numbers = document.querySelectorAll('.numbers');
numbers.forEach(number => {
    number.addEventListener('click', () => {
        handleNumberInput(number.querySelector('button').value);
    })
});

const operators = document.querySelectorAll('.operators');
operators.forEach(op => {
    op.addEventListener('click', () => {
        handleOperatorInput(op.querySelector('button').value);
    })
});

const decimal = document.querySelector('#decimal');
decimal.addEventListener('click', addDecimal);

const percent = document.querySelector('#percentage');
percent.addEventListener('click', addPercent);

let firstOperand = 0;
let secondOperand;
let operator = '';

const equal = document.querySelector('#equal');
equal.addEventListener('click', equation)

const clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', clearDisplay);

const deleteBtn = document.querySelector('.delete');
deleteBtn.addEventListener('click', backspace);


//Keyboard events
document.addEventListener('keydown', (e) => {
    const key = e.key;

    if (key >= 0 && key <= 9) {
        handleNumberInput(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleOperatorInput(key);
    } else if (key === '.') {
        addDecimal();
    } else if (key === '%') {
        addPercent();
    } else if (key === 'Enter') {
        equation();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Escape') {
        clearDisplay();
    }
})

function operate(x, operator, y) {
    switch (operator) {
        case '+': return add(x, y);
        case '-': return subtract(x, y);
        case '*': return multiply(x, y);
        case '/': return divide(x, y);
        default: return 'Invalid Operation';
    }
}