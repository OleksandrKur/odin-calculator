const MINUSDECIMALPLACES = 1000;
const currentNumberDisplay = document.querySelector("#current-number");

const numberButtons =  document.querySelectorAll(".number");
const sign = document.querySelector("#sign");

const operationButtons = document.querySelectorAll(".operation")
const resultButton = document.querySelector("#result");

const deleteButton = document.querySelector("#del");
const clearButton = document.querySelector("#clear");
const clearAllButton = document.querySelector("#clear-all");

let currentNumber = "0";
let mathOperation = "";
let result = "0";
currentNumberDisplay.textContent = currentNumber;


numberButtons.forEach(number => {
    number.addEventListener("click", updateNumber)
});
deleteButton.addEventListener("click", deleteDigit);
clearButton.addEventListener("click", deleteNumber);
clearAllButton.addEventListener("click", deleteAll);
sign.addEventListener("click", changeSign);

operationButtons.forEach(operationButton => {
    operationButton.addEventListener("click", updateOperation);
});

resultButton.addEventListener("click", resultButtonAction);



function add(a, b){
    return Math.round((a + b) * MINUSDECIMALPLACES) / MINUSDECIMALPLACES;
}
function subtract(a, b){
    return Math.round((a - b) * MINUSDECIMALPLACES) / MINUSDECIMALPLACES;
}
function multiply(a, b){
    return Math.round((a * b) * MINUSDECIMALPLACES) / MINUSDECIMALPLACES;
}
function divide(a, b){
    if (b !== 0){
        return Math.round((a / b) * MINUSDECIMALPLACES) / MINUSDECIMALPLACES;
    }
    else{
        return "It's impossible to divide by 0";
    }
}

function operate(a, b, operator){
    let result;
    if (operator === "+"){
        return add(a, b);
    }
    else if (operator === "-"){
        return subtract(a, b);
    }
    else if (operator === "*"){
        return multiply(a, b);
    }
    else if (operator === "/"){
        return divide(a, b);
    }

    return undefined;
}

function getOperandsAndOperator(str){
    let arrayFromString = str.split(" ");
    let a;
    let b;
    let operator;
    if (arrayFromString.length < 3){
        a = Number(arrayFromString[0]);
        b = 0;
        operator = "+";
    }
    else{
        a = Number(arrayFromString[0]);
        b = Number(arrayFromString[2]);
        operator = arrayFromString[1];
        
    }
    let outputArray = [a, b, operator]
    return outputArray;
}

function calculatePair(string){
    return operate(...getOperandsAndOperator(string));
}

function updateNumber(event){
    let buttonValue = event.target.textContent;
    if (currentNumber === result){
        currentNumber = "0";
    }
    if (buttonValue === "0" && currentNumber === "0"){
        return
    }
    if (buttonValue === "." && currentNumber.includes(".")){
        return
    }
    if (buttonValue !== "." && currentNumber === "0" ){
        currentNumber = buttonValue;
        updateDisplay(currentNumber);
        return
    }
    
    currentNumber = currentNumber + buttonValue;
    updateDisplay(currentNumber);
}

function updateOperation(event){
    if (currentNumber == "It's impossible to divide by 0"){
        return;
    }
    let operator = " " + event.target.textContent + " ";
    if (mathOperation === ""){
        mathOperation = currentNumber + operator;
        updateDisplay(currentNumber);
        currentNumber = "0"
        
    }
    else{
        mathOperation = mathOperation + currentNumber;
        result = calculatePair(mathOperation);
        mathOperation = "";
        currentNumber = result;
        if (currentNumber == "It's impossible to divide by 0"){
            updateDisplay(result);
            return;
        }
        mathOperation = currentNumber + operator;
        currentNumber = "0";
        updateDisplay(result);
    }
}

function resultButtonAction(){
    mathOperation = mathOperation + currentNumber;
    result = calculatePair(mathOperation);
    mathOperation = "";
    currentNumber = result;
    updateDisplay(result);
}


function deleteNumber(){
    currentNumber = "0";
    updateDisplay(currentNumber);
}

function deleteAll(){
    currentNumber = "0";
    updateDisplay(currentNumber);
    mathOperation = "";
}
function deleteDigit(){
    if(currentNumber.length > 1){
        currentNumber = currentNumber.substring(0, currentNumber.length - 1);
        updateDisplay(currentNumber);
    }
    else{
        currentNumber = "0"
        updateDisplay(currentNumber);
    }
    
    
}
function changeSign(){
    currentNumber = (Number(currentNumber) * -1) + "";
    currentNumberDisplay.textContent = currentNumber;
}

function updateDisplay(text){
    currentNumberDisplay.textContent = text;
}