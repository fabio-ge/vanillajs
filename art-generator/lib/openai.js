import { API_KEY } from "../../api.js";

export const AI = {
    URL: 'https://api.openai.com/v1/completions',
    URL_IMG: "https://api.openai.com/v1/images/generations",
    headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer "+API_KEY
    },
    createPrompt: function(promptText){
        return {
            "model": "text-davinci-003",
            "prompt": promptText,
            "max_tokens": 800,
            "temperature": 0.7
          }
    },
    createImgPrompt: function(prompt){
        return {
            "prompt": "Genera un' illustrazione che serva per una carta di un gioco da tavola, come \"exploding kittens\" oppure \"sì oscuro signore\" Ecco la descrizione dell' immagine: "+prompt,
            "n": 1,
            "size": "256x256"
        }
    },
    createCompletion: async function(prompt){
        let response = await fetch(this.URL,{
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(this.createPrompt(prompt))
        });

        let data = await response.json();
        return data.choices[0].text;
    },
    createImage: async function(prompt){
        let response = await fetch(this.URL_IMG,{
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(this.createImgPrompt(prompt))
        });

        let data = await response.json();
        return data.data[0].url;
    }
}