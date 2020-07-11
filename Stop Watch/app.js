var min = 0;
var sec = 0;
var msec = 0;
var count = 1;
var minHeading = document.getElementById("min");
var secHeading = document.getElementById("sec");
var msecHeading = document.getElementById("msec");
var interval;

function timer(){
    msec++
    msecHeading.innerHTML = msec;
    if(msec >= 100){
        sec++
        secHeading.innerHTML = sec;
        msec = 0;
    }
    else if(sec >= 60){
        min++
        sec = 0;
        minHeading.innerHTML = min;
    }
}

function start(){
    interval = setInterval(timer,10)
    document.getElementById("startBtn").disabled = true;
    document.getElementById("pauseBtn").disabled = false;
    document.getElementById("resetBtn").disabled = false;
}

function pause(){
    clearInterval(interval)
    document.getElementById("startBtn").disabled = false;
    document.getElementById("pauseBtn").disabled = true;
    document.getElementById("resetBtn").disabled = false;
}

function reset(){
    // printData();
    msec = 0;
    sec = 0;
    min = 0;
    count = 1;
    msecHeading.innerHTML = msec;
    secHeading.innerHTML = sec;
    minHeading.innerHTML = min;
    document.getElementById("startBtn").disabled = false;
    document.getElementById("pauseBtn").disabled = false;
    clearInterval(interval)
    var data = document.getElementById("data");
    data.innerHTML ="";
}

function lap(){
    var data = document.getElementById("data");
    data.innerHTML +="Lap " + count + "= " + min + ":" + sec + ":" + msec + "<br>";
    msec = 0;
    sec = 0;
    min = 0;
    msecHeading.innerHTML = msec;
    secHeading.innerHTML = sec;
    minHeading.innerHTML = min;
    clearInterval(interval)
    count++;
    document.getElementById("startBtn").disabled = false;
    document.getElementById("pauseBtn").disabled = false;
}
