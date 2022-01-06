/*Next: check for entry errors*/
let screen = 0;
let calc = [];
let tempCalc = [];

function initialize(){
    screen = document.getElementById("screen");
}

function digit(n){
    screen.innerHTML += n;
    calc.push(n);
}

function updateArr(arr, result, initial, final){
    arr.splice(initial, ( (final-initial)+1 ), result);
} 

function displayResult(result){
    screen.innerHTML = result;
}

function typeFinder(n){
    switch(n){
        case '/':
        case '*':
        case '-':
        case '+':
            return "operation";
        default:
            return "number";
    }
}

function checkEntryErrors(){
    let first = calc[0];
    let last = calc[(calc.length-1)];

    if(typeFinder(first)!="number"){
        return true;
    }
    if((typeFinder(last)!="number")){
        return true;
    }

    for(i=0; i < calc.length; i++){
        if(typeFinder(calc[i])=="operation"){
            if(typeFinder(calc[++i])=="operation"){
                return true;
            }
        }
    }

    return false;
}

function equals(){

    let index = {
        ix: null,
        fx: null,
        operator: null,
        iy: null,
        fy: null,
    }
    let tempIndex = {
        ix: null,
        fx: null,
        operator: null,
        iy: null,
        fy: null,
    }
    let equation = {
        x: null,
        operator: null,
        y: null,
        result: null,
    }

    if(!checkEntryErrors()){
        while (calc.length > 1){

            setIndex(index, calc);
            tempCalc = calc.slice(index.ix,index.fy+1);
            setIndex(tempIndex, tempCalc);
    
            equation.operator = tempCalc[tempIndex.operator];
            equation.x = callX(tempIndex.ix,tempIndex.fx,tempCalc);
            equation.y = callY(tempIndex.iy,tempIndex.fy,tempCalc);
            equation.result = calculate(equation.operator,equation.x,equation.y);
    
            updateArr(calc,equation.result,index.ix,index.fy);
        }
    } else {
        equation.result = "ENTRY ERROR"
    }
    displayResult(equation.result);
}

function setIndex(obj,arr){

    obj.operator = selectOperatorPosition(arr);
    obj.fx = (obj.operator-1);
    obj.iy = (obj.operator+1);

    for (i = obj.fx; i>=0 ;i--){
        if (typeFinder(arr[i])=="number"){
            obj.ix = i;
        } else {
            i = -1;
        }
    }
    for (i = obj.iy; i <arr.length ;i++){
        if (typeFinder(arr[i])=="number"){
            obj.fy = i;
        } else {
            i = arr.length;
        }
    }
}

function selectOperatorPosition(arr){
    let operatorPosition = null;
    for(i=0;i<arr.length;i++){
        if (typeFinder(arr[i]) == "operation"){

            if (operatorPosition != null){
                if ( operatorsPrecedence(arr[i]) < operatorsPrecedence(arr[operatorPosition]) ){
                operatorPosition = i;
                }
            } else {
                operatorPosition = i;
            }
        }
    }
    return operatorPosition;
}

function operatorsPrecedence(operator){
    let precedence;
    switch(operator){
        case '*':
        case '/':
            precedence = 1;
            break;
        case '+':
        case '-':
            precedence = 2;
            break;
    }
    return precedence;
}

function callX(initial,final,arr){
    let x = "";
    for(i = initial; i <= final; i++){
        x += arr[i];
    }
    x = parseFloat(x);
    return x;
}

function callY(initial,final,arr){
    let y = "";
    for(i = initial; i <= final; i++){
        y += arr[i];
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