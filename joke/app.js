const formBtn = document.querySelector('#joke-button');
const testo = document.querySelector('#joke-text');
const URL = 'https://api.chucknorris.io/jokes/random';
const nameInput = document.querySelector('#name');

formBtn.addEventListener('click',async (e) => {
    e.preventDefault();
    try {
        let res = await fetch(URL);
        let data = await res.json();
        let name = nameInput.value || 'Chuck';
        testo.innerHTML = data.value.replace(/chuck/gi,name);    
    } catch (error) {
        console.log(error);
    }
    
});