//DOM
const hexInput = document.querySelector('#hex-color');
const displayBox = document.querySelector('#input-color');
const displayModified = document.querySelector('#modified-color');
const percLabel = document.querySelector('#perc-label');
const percValue = document.querySelector('#perc');
const toggleBtn = document.querySelector('#toggleBtn');
const darkenText = document.querySelector('#dark');
const lightenText = document.querySelector('#light');
const innerCircle = document.querySelector('.inner-circle');

//Events
hexInput.addEventListener('keyup',()=>{
    const val = hexInput.value.replace('#','');
    if(isValidHex(val)){
        displayBox.style.backgroundColor = '#'+val;
        displayModified.style.backgroundColor = alterColor(val,percValue.value);
    }
    reset(); 
        
})

percValue.addEventListener('change',(e)=>{
    let val = e.target.value;
    percLabel.textContent = val+'%';
    if(isValidHex(hexInput.value))
        displayModified.style.backgroundColor = alterColor(hexInput.value,val);
})

toggleBtn.addEventListener('click',()=>{
    innerCircle.classList.toggle('right');
    toogleDarkenLighten();
    reset();
})


//util functions
function toogleDarkenLighten(){
    darkenText.classList.toggle('em');
    lightenText.classList.toggle('em');
}

function reset(){
    percValue.value = 0;
    percLabel.textContent = '0%';
    displayModified.style.backgroundColor = '#'+hexInput.value.replace('#','');
}

function isValidHex(input){
    let regex = /^([0-9a-f]{3}|[0-9a-f]{6})$/g;
    return regex.test(input.replace('#',''));
}

function convertHexToRgb(hex){
    let strippedHex = hex.replace('#','');
    let [r,g,b] = ['','',''];
    if(!isValidHex(strippedHex)) return;
    if(strippedHex.length == 3) 
        [r,g,b] = strippedHex.split('').map(el => parseInt(el+''+el,16))
    else
        [r,g,b] = [parseInt(strippedHex.substr(0,2),16),parseInt(strippedHex.substr(2,2),16),parseInt(strippedHex.substr(4,2),16)]
    
    return {r,g,b};
}

function prefixSingleChar(c){
    return c.length === 1 ? '0'+c : c;
}

function convertRgbToHex(r,g,b){
    return '#'
            +prefixSingleChar(r.toString(16))
            +prefixSingleChar(g.toString(16))
            +prefixSingleChar(b.toString(16));
}

function alterColor(hex,percentage){
    let {r,g,b} = convertHexToRgb(hex);
    let amount = parseInt(255 *(percentage/100),10);
    if(innerCircle.classList.contains('right')) amount = -amount;
    r = transformNToRgb(r+amount);
    g = transformNToRgb(g+amount);
    b = transformNToRgb(b+amount);
    
    return convertRgbToHex(r,g,b);
}

function transformNToRgb(n){
    return Math.min(255,Math.max(0,n));
}