
let screen = 0;
let memory = [];

function initialize(){
    screen = document.getElementById("screen");
}
function calculate(){
    let calc = {
        x,
        y,
        operator,
        result,
    }

    "https://www.w3schools.com/jsref/jsref_obj_array.asp"

    /*
    *Utilizar funções de array
    */

    for(i = 0; i < memory.length; i++){


    }

    
    return calc.result;
}

function verifyDigitType(n){
    if (typeof(n) == "number"){
        return "number";
    } else if (typeof(n) == "NaN"){
        return "operator";
    }
}

function typeNumber(n){
    let digit = parseFloat(n);
    screen.innerHTML += n;
    memory.push(digit);
}

function typeOperator(n){
    screen.innerHTML +=n;
    memory.push(n);
}

function emptyScreen(){
    screen.innerHTML = "";
}

function sum(x,y){ /*edição*/
    let equation = {
        a: parseFloat(x),
        b: parseFloat(y),
        result: 0,
    }
    equation.result =  equation.a + equation.b;
    return equation.result;
}

function subtract (x,y){
    let equation = {
        a: parseFloat(x),
        b: parseFloat(y),
    }
    return equation.a - equation.b;
}
function multiply (x,y){
    let equation = {
        a: parseFloat(x),
        b: parseFloat(y),
    }
    return equation.a * equation.b;
}
function divide (x,y){
    let equation = {
        a: parseFloat(x),
        b: parseFloat(y),
    }
    return equation.a / equation.b;
}