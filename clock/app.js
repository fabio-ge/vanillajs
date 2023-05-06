const second = document.querySelector('.second');
const minute = document.querySelector('.minute');
const hour = document.querySelector('.hour');
const center = document.getElementById('center');
const header = document.querySelector('header');

function getTime(){
    let now = new Date();
    let seconds = now.getSeconds();
    let minutes = now.getMinutes();
    let hours = now.getHours();

    displayDigital(hours,minutes,seconds);
    second.style.transform = `rotate(${seconds*6}deg)`; //60 seconds must rotate 369deg, so i need to multiply by 6
    minute.style.transform = `rotate(${minutes*6}deg)`;
    hour.style.transform = `rotate(${(hours%12)*30}deg)`; //every hour is 30deg more, and 13 is equal to 1. so hours modulus 12 multiplied by 30deg
}

function displayDigital(h,m,s){
    let calcS = s.toString().length === 1 ? '0'+s : s;
    header.textContent = `${h}:${m}:${calcS}`;
}

setInterval(getTime,500);