const formBtn = document.querySelector('#joke-button');
const testo = document.querySelector('#joke-text');
const URL = 'https://api.chucknorris.io/jokes/random';

formBtn.addEventListener('click',async (e) => {
    e.preventDefault();
    let res = await fetch(URL);
    let data = await res.json();
    testo.innerHTML = data.value;
});