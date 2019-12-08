let mainCounter = document.getElementById("mainCounter");
mainCounter.innerText = "00:00:00:000";

let startButton = document.getElementById("start");
let pauseButton = document.getElementById("pause");
let loopButton = document.getElementById("loop");
let resetButton = document.getElementById("reset");
let isPaused = false;
let runningTime = 0;
let newInterval = null;
let cumulativeLoops = null;
let loopArray = [];

startButton.addEventListener("click",function() {
    if (!isPaused) {
        clearInterval(newInterval);
        startCounting();
    } else {
        isPaused = false;
    }

});

pauseButton.addEventListener("click", function() {
    isPaused = true;
});

loopButton.addEventListener("click",makeLoop)

function startCounting(){
    newInterval = setInterval(function(){
        if(!isPaused) {
            runningTime += 100;
            mainCounter.innerText = milisecondsToTime(runningTime);
        }

    },100)
}

resetButton.addEventListener("click", function(){
    isPaused = true;
    mainCounter.innerText = "00:00:00:000";
    resultContainer.innerHTML = "";
    runningTime = 0;
    newInterval = null;
    cumulativeLoops = null;
    loopArray = [];
});

function makeLoop(){
    let cumulative = null
    for(let i = 0; i<loopArray.length;i++){
        cumulative += loopArray[i];
    }
    loopArray.push(runningTime-cumulative);
    arrayToHTML(loopArray);
}

function milisecondsToTime(time) {

    function pad(n, z) {
        z = z || 2;
        return ('00' + n).slice(-z);
    }

    let miliseconds = time % 1000;
    time = (time - miliseconds) / 1000;
    let seconds = time % 60;
    time = (time - seconds) / 60;
    let minutes = time % 60;
    let hours = (time - minutes) / 60;
    return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds) + ':' + pad(miliseconds, 3);
}


// v HTML en div za rezultate


function arrayToHTML(array) {
    let resultContainer = document.getElementById("resultContainer");
    resultContainer.innerHTML = "";
    for(let i=0;i < array.length; i++) {
        let oneLoop = document.createElement("p");
        oneLoop.innerHTML =  milisecondsToTime(array[i]);
        resultContainer.appendChild(oneLoop);
    }
}
