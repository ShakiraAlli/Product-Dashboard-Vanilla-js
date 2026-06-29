const API_URL = 'https://www.course-api.com/javascript-store-products';

function fetchProductsThen() {
    return fetch(API_URL)
    .then((response) => response.json())
    .then(products => {
            products.forEach(product => {
                console.log(product.fields.name);
            });
        })
        .catch(error => {
            console.error("Fetch failed:", error);
        });
    }

   async function fetchProductsAsync() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const products = await response.json();

        displayProducts(products);

    } catch (error) {
        handleError(error);
    }
}

function displayProducts(products) {
    const container = document.getElementById("product-container");

    container.setAttribute("aria-busy", "false");
    container.innerHTML = "";

    products.slice(0, 5).forEach(product => {

       const name = product.fields.name.toUpperCase();
        const price = (product.fields.price / 100).toFixed(2);
        const image = product.fields.image[0].url;

        const card = document.createElement("article");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${image}" alt="${name}">
            <div class="card-body">
                <h3>${name}</h3>
                <p>$${price}</p>
            </div>
        `;

        container.appendChild(card);
    });
}

function handleError(error) {
    console.error(`An error occurred: ${error.message}`);
    const container = document.getElementById("product-container"); 
    container.innerHTML = `
<div class="status error">
    Error loading products.
</div>
`;
}

const container = document.getElementById("product-container");

container.setAttribute("aria-busy", "true");
container.innerHTML = `
<div class="status">Loading Products...</div>
`;

fetchProductsThen();
fetchProductsAsync();