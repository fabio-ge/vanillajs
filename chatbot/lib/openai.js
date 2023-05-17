import { API_KEY } from "../../api.js";

export const AI = {
    URL: 'https://api.openai.com/v1/chat/completions',
    headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer "+API_KEY
    },
    chat: async function(conversationArray){
        let response = await fetch(this.URL,{
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": conversationArray,
                "presence_penalty": 0,
                "frequency_penalty": 0.3     
              })
        });
        let data = await response.json();
        return data.choices[0].message;
    }
}
 
