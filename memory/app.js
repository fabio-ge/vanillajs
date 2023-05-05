//Constants
const URL_API_POKEMON = 'https://pokeapi.co/api/v2/pokemon/';
const POKEMON_NUMBER = 12;

//DOM
const newGameBtn = document.querySelector('#new-game');
const board = document.querySelector('#board');
const scoreOne = document.querySelector('#score-one');
const scoreTwo = document.querySelector('#score-two');

//variables
let firstPick = null;
let isGamePaused = false;
let playerOne = null; 
let playerTwo = null;

//EVENTS
newGameBtn.addEventListener('click',() => {
    resetGame();
});


//util functions

function getFrontBack(card){
    return [card.querySelector('.front'),card.querySelector('.back')];
}

function isAlreadyRotated(card){
    return card.querySelector('.back').classList.contains('rotated');
}

function rotateElements(els){
    for(let el of els){
        el.classList.toggle('rotated');
    }
}

function resetState(){
    firstPick = null;
    isGamePaused = false;        
}

function scorePoint(){
    if(playerOne.isTurn){
        playerOne.points +=1;
        scoreOne.textContent = playerOne.points;
    } 
    else{
        playerTwo.points += 1;
        scoreTwo.textContent = playerTwo.points;
    } 
}

function changeTurn(){
    if(playerOne.isTurn){
        playerOne.isTurn = false;
        playerTwo.isTurn = true;
    }
    else{
        playerOne.isTurn = true;
        playerTwo.isTurn = false;
    }
}

function flipCard(e){
    let currentCard = e.currentTarget;
    let id = currentCard.dataset.id;
    let [front, back] = getFrontBack(currentCard);
    if(isAlreadyRotated(currentCard) || isGamePaused) return
    else rotateElements([front,back]);
    isGamePaused = true;
    
    if(!firstPick){
        firstPick = {id,front,back};
        isGamePaused = false;    
    }else{
        if(id == firstPick.id){
            resetState();
            scorePoint();
            return; //if id are the same don't rotate the card, is a match
        }else {
            setTimeout(() => {
                rotateElements([front,back,firstPick.front,firstPick.back]);
                resetState();
                changeTurn();
            },1000); 
        }
         
    }
}

function generateRandomArray(n){
    /***
        Generate a random array of unique n numbers 
    ***/
   let nums = new Set();
   while(nums.size < n){
    nums.add(Math.ceil(Math.random()*300)); //i think there are, at least, 300 pokemon
   }

   return [...nums];
}

async function loadPokemon(){
    /***
        Fetch random pokemon from api 
    ***/
   let ids = generateRandomArray(POKEMON_NUMBER);
   let pokemonPromises = ids.map( id => fetch(URL_API_POKEMON+id));
   let responses = await Promise.all(pokemonPromises);
   return await Promise.all(responses.map(res => res.json()));
}

function displayPokemon(pokeArr){
    pokeArr.sort(_ => Math.random() - 0.5); // To shuffle in random way
    let pokeHtml = pokeArr.map(pok => `<div class="card" onClick="flipCard(event)" data-id="${pok.id}">
                                        <div class="back"></div>
                                        <div class="front rotated"><img src="${pok.sprites.front_default}" alt="${pok.name}"><p>${pok.name}</p></div>
                                        </div>
                                        `).join('');  
    board.innerHTML = pokeHtml;
}

async function resetGame(){
    playerOne = {points: 0, isTurn: true};
    playerTwo = {points: 0, isTurn: false};
    scoreOne.textContent = 0;
    scoreTwo.textContent = 0;
    let pokemons = await loadPokemon();
    displayPokemon([...pokemons,...pokemons]);
}