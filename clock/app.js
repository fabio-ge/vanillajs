const second = document.querySelector('.second');
const minute = document.querySelector('.minute');
const hour = document.querySelector('.hour');
const center = document.getElementById('center');
const digital = document.getElementById('digital-clock');
const switcher = document.getElementById('toggle');
const body = document.querySelector('body');

switcher.addEventListener('click',(e) => {
    let circle = e.target.querySelector('div.circle');
    if(body.classList.contains('dark')){
        circle.style.left = '38px';
        body.classList.replace('dark','light');
    }else{
        circle.style.left = '3px';
        body.classList.replace('light','dark');
    }
    
});

function getTime(){
    let now = new Date();
    let seconds = now.getSeconds();
    let minutes = now.getMinutes();
    let hours = now.getHours();

    displayDigital(hours,minutes,seconds);
    second.style.transform = `rotate(${seconds*6}deg)`; //60 seconds must rotate 360deg, so i need to multiply by 6
    minute.style.transform = `rotate(${(minutes*6)+Math.floor(seconds/10)}deg)`; //same for seconds but adding seconds' contribute
    hour.style.transform = `rotate(${((hours%12)*30)+Math.floor(minutes/2)}deg)`; //every hour is 30deg more, and 13 is equal to 1. so hours modulus 12 multiplied by 30deg
}

function displayDigital(h,m,s){
    let calcH = h.toString().length === 1 ? '0'+h : h;
    let calcM = m.toString().length === 1 ? '0'+m : m;
    let calcS = s.toString().length === 1 ? '0'+s : s;
    digital.textContent = `${calcH}:${calcM}:${calcS}`;
}

getTime();
setInterval(getTime,500);