class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    // function of AC allCrear Button
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    // deletes last elements on the screen
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    // Add a number to the screen
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    // Choosing a operation to perform
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    // compute and return a single deseired value
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '÷':
                computation = prev / current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            default: return
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    // Returns a given number as a nicely diluminshable number
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;

        if (isNaN(integerDigits))
            integerDisplay = '';
        else
            integerDisplay = integerDigits.toLocalString('en', { maximumFractionDigits: 0 });

        if (decimalDigits != null)
            return `${integerDisplay}.${decimalDigits}`
        else
            return integerDisplay;

    }

    // update the diplay as user clicksz    
    updateDisplay() {
        this.currentOperandTextElement.innerText = (this.currentOperand);
        if (this.operation !== undefined)
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        else
            this.previousOperandTextElement.innerText = this.previousOperand;

    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButtons = document.querySelector('[data-equals]');
const deleteButtons = document.querySelector('[data-delete]');
const allClearButtons = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// Object gets created here
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButtons.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

deleteButtons.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});

allClearButtons.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

