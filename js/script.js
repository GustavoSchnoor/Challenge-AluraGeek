// Função para carregar os produtos contidos no db.json
async function loadProducts() {
    try {
        const response = await fetch('http://localhost:3000/produtos');
        const data = await response.json();
        const productsContainer = document.querySelector('.cards-produtos')
        const mensagemSemProduto = document.querySelector('.semProdutos');
        
        if (data.length === 0) {
            mensagemSemProduto.style.display = 'block';
        } else {
            mensagemSemProduto.style.display = 'none';
        }
        
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
                    // poderia ser appendChild, mas achei o insertAdjacentHTML mais bonito :D
                    productsContainer.insertAdjacentHTML('beforeend', card);
        });
    } 
    catch (error) {
        console.log(`Erro ao carregar produto: ${error.message}`);
    }
}

// Função para adicionar um novo produto
async function addProduct(event) {
    event.preventDefault();
    const form = document.querySelector('.formulario');
    const productNome = form.elements['nome'].value;
    const productPreco = form.elements['preco'].value.replace('.', ',');
    const productImagem = form.elements['link'].value;

    try {
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
    catch (error) {
        console.log(`Erro ao adicionar produto: ${error.message}`);
    }    
}

async function deleteProduct(productId) {
    try {
        // Fazendo uma busca direta no endpoint produtos, pelo numero ID. Como ele é unico por produto, assim que achar esse ID, será deletado com o metodo DELETE.
        const response = await fetch(`http://localhost:3000/produtos/${productId}`, {
            method: 'DELETE'
        });

        // Se a resposta foi bem sucedida, significa que o item foi deletado corretamente, sendo assim, agora vamos selecionar no HTML o campo div card que corresponde a esse ID e remover essa div com id respectivo
        if (response.ok) {
            const productCard = document.querySelector(`[data-id="${productId}"]`);
            productCard.remove();
        }
    } 
    catch (error) {
        console.log(`Erro ao deletar produto: ${error.message}`);
    }

}

// COMECEI POR AQUI

// Carregar produtos quando a página for carregada
window.addEventListener('load', loadProducts);

// Adiciona um ouvinte de eventos "submit" ao enviar o formulário. Chamando assim, a função assincrona criada addProduct()
const form = document.querySelector('.formulario');
form.addEventListener('submit', addProduct);




