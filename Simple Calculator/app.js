function getNumber(num){
    var result = document.getElementById("result");
    result.value += num;
}

function clearResult(){
    var result = document.getElementById("result");
    result.value = "";
}

function getResult(){
    var result = document.getElementById("result");
    result.value = eval(result.value)
}

function backSpace() {   
    var result = document.getElementById("result");
    output = result.value;
    result.value = output.substring(0, output.length - 1);
}