import { AI } from './lib/openai.js';

const fakeBtn = document.querySelector('#descrizione span');
const imgDescription = document.querySelector('#descrizione input');
const loadingImg = '<img src="images/loading.svg" alt="" srcset="">';
const cornice = document.querySelector('div.cornice');

fakeBtn.addEventListener('click',async () => {
    cornice.innerHTML = loadingImg;
    let prompt = promptForImage(imgDescription.value);
    let descriptionForImage = await AI.createCompletion(prompt);
    console.log(descriptionForImage);
    cornice.innerHTML = '';
});


function promptForImage(testo){
    return `Dal testo proposto genera la descrizione di un' immagine aggiungendo molti particolari visivi buffi e divertenti. L' immagine dev' essere un' illustrazione per un gioco di carte, come ad esempio exploding kittens o sì oscuro signore
###
testo: due gatti che cucinano un essere umano
descrizione: due gatti sono ai lati di una grossa pentola, che contiene a malapena un essere umano, perché è molto ciccione. L' umano suda copiosamente perché sotto di lui la pentola è accesa e la sua espressione è molto perplessa.
I due gatti impugnano uno una saliera e l' altro un mestolo e hanno uno sguardo molto buffo.
###
testo: un mago che indossa un mantello
descrizione: un mago molto brutto e basso, che è un goblin verdastro, indossa un mantello chiaramente troppo grande per lui. Il mantello, che ha anche un cappuccio, copre con il cappuccio tutti gli occhi del mago ed essendo molto lungo gli finisce anche sotto i piedi.
###
testo:${testo}
descrizione:
`;
}  