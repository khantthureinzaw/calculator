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
    if (y === 0) return 'You can\'t divide by zero!'
    return Math.round((x / y) * 100) / 100;
}

const container = document.querySelector('.container');
const display = document.querySelector('.display');
const firstNumDisplay = document.querySelector('#firstNum');
const secondNumDisplay = document.querySelector('#secNum');
const operatorDisplay = document.querySelector('#operator');


const numbers = document.querySelectorAll('.numbers');
numbers.forEach(number => {
    number.addEventListener('click', () => {
        if (operatorDisplay.innerText === '') {
            if (firstNumDisplay.innerText === '0') firstNumDisplay.innerText = '';
            firstNumDisplay.innerText += number.querySelector('button').value;
        } else {
            secondNumDisplay.innerText += number.querySelector('button').value;
        }

    })
});

const operators = document.querySelectorAll('.symbols');
operators.forEach(op => {
    op.addEventListener('click', () => {
        if (secondNumDisplay.innerText) {
            firstNumDisplay.innerText = operate(Number(firstNumDisplay.innerText), operatorDisplay.innerText.trim(), Number(secondNumDisplay.innerText));
            operatorDisplay.innerText = '';
            secondNumDisplay.innerText = '';
        }
        let operator = op.querySelector('button').value;
        operatorDisplay.innerText = ` ${operator} `;
    })
});

let firstOperand = 0;
let secondOperand = 0;
let operator = '';

const equal = document.querySelector('#equal');
equal.addEventListener('click', () => {
    firstOperand = Number(firstNumDisplay.innerText);
    secondOperand = Number(secondNumDisplay.innerText);
    operator = operatorDisplay.innerText.trim();
    let result = operate(firstOperand, operator, secondOperand);

    firstNumDisplay.innerText = result;
    secondNumDisplay.innerText = '';
    operatorDisplay.innerText = '';
})

const clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', () => {
    firstNumDisplay.innerText = '0';
    secondNumDisplay.innerText = '';
    operatorDisplay.innerText = '';
});

const deleteBtn = document.querySelector('.delete');
deleteBtn.addEventListener('click', () => {
    if (secondNumDisplay.innerText) {
        secondNumDisplay.innerText = secondNumDisplay.innerText.slice(0, -1);
    } else if (operatorDisplay.innerText) {
        operatorDisplay.innerText = '';
    } else {
        firstNumDisplay.innerText = firstNumDisplay.innerText.slice(0, -1);
    }
});

function operate(x, operator, y) {
    switch (operator) {
        case '+': return add(x, y);
        case '-': return subtract(x, y);
        case '*': return multiply(x, y);
        case '/': return divide(x, y);
        default: return 'Invalid Operation';
    }
}