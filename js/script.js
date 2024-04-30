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

loadProducts(); 


