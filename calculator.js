const numberButtons =  document.querySelectorAll(".number")
const currentNumberDisplay = document.querySelector("#current-number");
const deleteButton = document.querySelector("#del");
const clearButton = document.querySelector("#clear");
const sign = document.querySelector("#sign");
const clearAllButton = document.querySelector("#clear-all");
let currentNumber = "";


numberButtons.forEach(number => {
    number.addEventListener("click", updateNumber)
});

deleteButton.addEventListener("click", deleteDigit);
clearButton.addEventListener("click", deleteNumber);
sign.addEventListener("click", changeSign);

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
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
    [a, operator, b] = str.split(" ")
    a = Number(a);
    b = Number(b);
    return [a, operator, b]
}

function calculatePair(string){
    [a, operator, b] = getOperandsAndOperator(example);
    return operate(a, b, operator);
}

function updateNumber(event){
    if(event.target.textContent === "." && currentNumber.includes(".")){
        return
    }
    currentNumber = currentNumber + event.target.textContent;
    return currentNumberDisplay.textContent = currentNumber;
}

function deleteNumber(){
    currentNumber = "";
    currentNumberDisplay.textContent = currentNumber;
}
function deleteDigit(){
    currentNumber = currentNumber.substring(0, currentNumber.length - 1);
    currentNumberDisplay.textContent = currentNumber;
}

function changeSign(){
    currentNumber = (Number(currentNumber) * -1) + "";
    currentNumberDisplay.textContent = currentNumber;
}