// Função para carregar os produtos contidos no db.json
async function loadProducts() {
    const response = await fetch('http://localhost:3000/produtos');
    const data = await response.json();
    const productsContainer = document.querySelector('.cards-produtos')
    
    data.forEach(product => {
        const card = `
                <div class="card" data-id="${product.id}">
                    <img class="card__img" src="${product.imagem}" alt="${product.nome}">
                    <div class="card-container__info">
                        <div class="card-container__nome">
                            <p>${product.nome}</p>
                        </div>
                        <div class="card-container__valor">
                            <p>R$ ${product.preco}</p>
                            <img class="icone-trash" src="./images/trash.png" alt="icone lixeira" onclick="deleteProduct(${product.id})">
                        </div>
                    </div>
                </div>
            `;
                productsContainer.insertAdjacentHTML('beforeend', card);
    });
}

// Função para adicionar um novo produto
async function addProduct(event) {
    event.preventDefault();
    const form = document.querySelector('.formulario');
    const productNome = form.elements['nome'].value;
    const productPreco = form.elements['preco'].value;
    const productImagem = form.elements['link'].value;

    const response = await fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: productNome,
            preco: productPreco,
            imagem: productImagem
        })
    });

    if (response.ok) {
        form.reset();
        loadProducts();
    }
}

async function deleteProduct(productId) {
    const response = await fetch('http://localhost:3000/produtos/${productId}', {
        method: 'DELETE'
    });

    if (response.ok) {
        const productCard = document.querySelector(`.card[data-id="${productId}"]`);
        productCard.remove();
    }

}

// COMECEI POR AQUI

// Carregar produtos quando a página for carregada
window.addEventListener('load', loadProducts);

// Adiciona um ouvinte de eventos "submit" ao enviar o formulário. Chamando assim, a função assincrona criada addProduct()
const form = document.querySelector('.formulario');
form.addEventListener('submit', addProduct);




