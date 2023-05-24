import { AI } from './lib/openai.js'

//DOM
const form = document.querySelector('form');
const testo = document.getElementById('testo');
const conversazione = document.getElementById('conversazione');
const textArea = document.querySelector('textArea');
const newConversation = document.getElementById('nuova-conversazione');

let conversationArray = [{
    role: 'system',
    content: 'sei un assistente con un grande sense of humour che risponde sempre con scherzi e battute divertenti'
}];

//EVENTS
form.addEventListener('submit',async (e)=>{
    e.preventDefault();
    let conversationObj = {
        role: 'user',
        content: testo.value
    };
    conversationArray.push(conversationObj);
    let chatResponse = await AI.chat(conversationArray);
    conversationArray.push(chatResponse);
    
    renderDomanda(testo.value);
    appendDivRisposta();
    scrollToLastResponse();
    renderTestoRisposta(chatResponse.content);
    testo.value = '';
        
});


newConversation.addEventListener('click',() => {
    window.location.reload();
});

//Util functions

function renderDomanda(testo){
    let div = document.createElement('div');
    div.classList.add('domanda');
    div.textContent = testo;
    conversazione.append(div);
}

function appendDivRisposta(){
    let div = document.createElement('div');
    div.classList.add('risposta');
    conversazione.append(div);
}

function scrollToLastResponse(){
    const lastResponse = document.querySelector('div.risposta:last-of-type');
    lastResponse.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"}); 
}

function renderTestoRisposta(testo){
    const lastResponse = document.querySelector('div.risposta:last-of-type');
    let index = 0;
    
    function typeWriting(){
        if(index < testo.length){
            lastResponse.textContent += testo.charAt(index);
            index++;
            scrollToLastResponse();
            setTimeout(typeWriting,50);
        }
        else{
            textArea.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        };
    }

    typeWriting();
}