const main = document.getElementById('app');

fetchData();

function fetchData(){
    fetch('https://reqres.in/api/users')
        .then(response => {
            if(!response.ok){
                throw Error("Mio Errore");
            }
            return response.json();
        })
        .then(data => console.log(render(data.data)))
        .catch(error => console.log(error));
}

function render(users){
    let DOMString = users.map(user => `<div class="user">nome: ${user.first_name}<br/>email: ${user.email}</div>`).join('');
    main.innerHTML = DOMString;
}