const board = document.querySelector('#board');
const info = document.querySelector('#info');
const nuovaPartita = document.querySelector('#nuova-partita');

let valori = ["","","","","","","","",""]
let player = 'cerchio';
info.textContent = 'Inizia il cerchio';

nuovaPartita.addEventListener('click',() => window.location.reload());

valori.forEach((_el,idx)=>{
    let div = document.createElement('div')
    div.id = idx
    div.classList.add('square')
    div.addEventListener('click',markSquare);
    board.append(div)
})

//util
function changeTurn(){
    player = player == 'cerchio'? 'croce' : 'cerchio';
    if(!['croce','cerchio'].includes(isWinner())) info.textContent = 'Adesso il turno è di '+player;
    else{
        info.textContent = 'Ha vinto '+isWinner();
        disableAll();
    } 
}

function markSquare(e){
    let cell = e.target;
    let newDiv = document.createElement('div');
    newDiv.classList.add(player);
    cell.append(newDiv);
    e.target.removeEventListener('click',markSquare);
    changeTurn();
}

function isWinner(){
    const winCombinations = [
        [0,1,2],[3,4,5],[6,7,8], //linee
        [0,3,6],[1,4,7],[2,5,8], //colonne
        [0,4,8],[2,4,6] //diagonali
    ];
    let cerchi = Object.values(document.querySelectorAll('.cerchio')).map(el => Number(el.parentNode.id));
    let croci = Object.values(document.querySelectorAll('.croce')).map(el => Number(el.parentNode.id));
 
    for(let comb of winCombinations){
        if(comb.every(idx => cerchi.includes(idx))) return 'cerchio';
        if(comb.every(idx => croci.includes(idx))) return 'croce';
    };
    return null;
}

function disableAll(){
    document.querySelectorAll('.square').forEach(node => node.removeEventListener('click',markSquare));
}