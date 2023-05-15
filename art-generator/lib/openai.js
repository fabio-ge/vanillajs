export const AI = {
    URL: 'https://api.openai.com/v1/completions',
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
    createCompletion: async function(prompt){
        let response = await fetch(this.URL,{
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(this.createPrompt(prompt))
        });

        let data = await response.json();
        return data;
    },
    createImage: function(){}
}