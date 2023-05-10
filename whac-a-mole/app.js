const moles = document.querySelectorAll('.hole .mole');
let score = 0;
let isFinish = false;
let lastMole = null;
const DURATION = 20000;

//event listener sulla talpa per controllare se è stata beccata


function pickRandomMole(){
    return moles[Math.floor(Math.random()*moles.length)];
}

function randTime(){
    let start = 200;
    let end = 2000;
    return Math.floor(Math.random()*(end-start))+start;
}


function popUp(){
    if(isFinish)
        return;

    let singleMole = pickRandomMole();
    let randomTime = randTime();
    if(singleMole==lastMole){
        popUp();
    }
    singleMole.style.height = '140px';
    setTimeout(() =>{
        singleMole.style.height = '0px';
        popUp();
    },randomTime);
}

function play(){
    setTimeout(() => isFinish = true,DURATION);
    popUp();
}

play();