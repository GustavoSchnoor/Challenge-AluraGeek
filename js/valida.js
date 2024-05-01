const campoPreco = document.querySelector('#preco');

campoPreco.addEventListener('focusout', function(e) {
    let campoValor = e.target.value;
    
    
    if (campoValor === '') {
        alert('O campo não pode estar vazio!');
        return;
    }

    if (!campoValor.trim().replace('.', ',').match(/^[1-9]{1}\d*\,\d{2}$/)) {
        alert('O campo de preço, só aceita valores numéricos!');
        e.target.value = ''; // Limpa o campo se NÃO FOR UM NUMERO
    }
});
