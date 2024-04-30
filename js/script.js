fetch('http://localhost:3000/produtos')
.then( response => {
    console.log('teste', response);
    const data = response.json();
    console.log(typeof data);
    data.map(i => {console.log(i.nome)})
})
