
let screen = 0;
let calc = [];

function initialize(){
    screen = document.getElementById("screen");
}

function digit(n){
    screen.innerHTML += n;
    calc.push(n);
}

function displayResult(result){
    screen.innerHTML = result;
}

/*
    *revisar com o indexFider()
*/
function operatorFinder(n){
    switch(n){
        case '/':
            return calc.indexOf(n);
        case '*':
            return calc.indexOf(n);
        case '-':
            return calc.indexOf(n);
        case '+':
            return calc.indexOf(n);
    }
}

function typeFinder(n){
    switch(n){
        case '/':
            return "operation";
        case '*':
            return "operation";
        case '-':
            return "operation";
        case '+':
            return "operation";
        default:
            return "number";
    }
}

function equals(){

    let operatorIndex = null;

    for(i=0; i < calc.length; i++){
        if(typeFinder(calc[i]) == "operation"){

            operatorIndex = operatorFinder(calc[i])
        } 
    }

    let equation = {
        operator : calc[operatorIndex],
        x : callX(operatorIndex),
        y : callY(operatorIndex),
        result : null,
    }

    equation.result = calculate(equation.operator,equation.x,equation.y);

    displayResult(equation.result);
}
/*
    * revisar objeto index
    * deve ser individual ou pertencer à alguma função?
*/
let index = {
    ix: null,
    operator: null,
    fy: null,
}

function indexFinder(){
    
    for(i=0; i < calc.length; i++){

        switch(typeFinder(calc[i])){
            case "operation":
                if (index.operator == null){
                    index.operator = i;
                } else if (index.operator != null && index.fy == null){
                    index.fy = i-1;
                }
                break;
            case "number":
                if (index.ix == null){
                    index.ix = i;
                }
                if (i == (calc.length-1) && index.fy == null){
                    index.fy = i;
                }
                break;
        }
    }
    console.log(index);
}

/*
    * update calc remove os valores calculados
    * insere o resultado do calculo no array
*/

function updateCalc(){
    calc.splice(index.ix,((index.fy-index.ix)+1))
} 

function callX(operatorIndex){
    let x = "";
    for(i=0; i <operatorIndex; i++){
        x += calc[i];
    }
    x = parseFloat(x);
    return x;
}

function callY(operatorIndex){
    let y = "";
    for(i = operatorIndex+1; i <= calc.length; i++){
        y += calc[i];
    }
    y = parseFloat(y);
    return y;
}

function calculate(operator,x,y){
    let result;
    switch(operator){
        case '+':
           result = sum(x,y);
           return result;
        case '-':
            result = subtract(x,y);
            return result;
        case '*':
            result = multiply(x,y);
            return result;
        case '/':
            result = divide(x,y);
            return result;
        /*case '%':
            result = percent(x,y);
            return result;*/
    }
}

function clearAll(){
    screen.innerHTML = "";
    calc = [];
}

function sum(x,y){
    return x + y;
}

function subtract(x,y){
    return x - y;
}

function multiply(x,y){
    return x * y;
}

function divide(x,y){
    return x / y;
}

/*
function percent(x,y){
}
*/