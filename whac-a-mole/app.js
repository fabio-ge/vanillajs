//DOM elements
const moles = document.querySelectorAll('.hole .mole');
const gameBtns = document.querySelectorAll('.container p button');
const punti = document.getElementById('punti');

//CONSTANTS
const DURATION = 20000;
const BASIC_END_OF_MOLE = 1500;
const ADV_END_OF_MOLE = 1000;

//State
let score = 0;
let isFinish = false;
let lastMole = null;
let maxTime = BASIC_END_OF_MOLE;

//EVENTS
gameBtns.forEach(el => {
    el.addEventListener('click',(e)=>{
        let level = e.target.value;
        if(level === 'basic') maxTime = BASIC_END_OF_MOLE;
        else maxTime = ADV_END_OF_MOLE;
        play();
    })
});

moles.forEach(e => e.addEventListener('click',(ev)=>{
    score++;
    setPoints();
    ev.target.style.height = '0px';
}));


//FUNCTIONS
function pickRandomMole(){
    return moles[Math.floor(Math.random()*moles.length)];
}

function randTime(){
    let start = 200;
    return Math.floor(Math.random()*(maxTime-start))+start;
}

function setPoints(){
    punti.textContent = score;
}

function popUp(){
    if(isFinish)
        return;

    let singleMole = pickRandomMole();
    let randomTime = randTime();

    if(singleMole==lastMole){
        popUp();
        return;
    }
    lastMole = singleMole;
    singleMole.style.height = '140px';
    setTimeout(() =>{
        singleMole.style.height = '0px';
        popUp();
    },randomTime);
}

function reset(){
    score = 0;
    setPoints();
    isFinish = false;
    lastMole = null;
}

function play(){
    reset();
    setTimeout(() => isFinish = true,DURATION);
    popUp();
}