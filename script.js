const buttons = [ // acá va la estructura de la calculadora
    '7', '8', '9', '/', 
    '4', '5', '6', '*', 
    '1', '2', '3', '-', 
    '0', '.', '=', '+', 
    'C'
];

const operators = new Set(['/', '*', '-', '+', '=']); // los operadores que admite en este momento.

let input = '';
let currentOperator = null;
let previousValue = null;
let display = d3.select("#display");

function updateDisplay(value) {
    display.text(value);
}

// al precionar calcular con el botón igual valida que hay en el currentoperador, al seleccionar el signo 
//opera el valor que esta antes del operador y el que esta despues del operador

function calculate() {
    if (previousValue !== null && currentOperator !== null && input !== '') {
        let result;
        let currentValue = parseFloat(input);

        switch (currentOperator) {
            case '/':
                result = previousValue / currentValue;
                break;
            case '*':
                result = previousValue * currentValue;
                break;
            case '-':
                result = previousValue - currentValue;
                break;
            case '+':
                result = previousValue + currentValue;
                break;
        }

        updateDisplay(result);  // acá se actualiza el display para que muestre el resultado.
        previousValue = result;  
        input = '';
        currentOperator = null;
    }
}

function buttonClick(button) {
    const value = button.text(); // Funcionalidad del botón donde por medio de validaciones
    // se determina si es  c para borrar o manda a llamar el método calculate desde el signo igual.
    
    if (value === 'C') {
        input = '';
        previousValue = null;
        currentOperator = null;
        updateDisplay(0);
    } else if (value === '=') {
        calculate();
    } else if (operators.has(value)) {
        if (previousValue === null) {
            previousValue = parseFloat(input);
        } else {
            calculate();
        }
        currentOperator = value;
        input = '';
    } else {
        input += value;
        updateDisplay(input);
    }
}

const buttonContainer = d3.select("#buttons");
// acá se asocia la funcióon al evento de clic en cada botón
buttonContainer.selectAll(".button")
    .data(buttons)
    .enter()
    .append("div")
    .attr("class", d => operators.has(d) ? "button operator" : "button")
    .text(d => d)
    .on("click", function() {
        buttonClick(d3.select(this));
    });

updateDisplay(0);
