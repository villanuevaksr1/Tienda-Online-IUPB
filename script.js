// Lista de productos (puedes modificarla o consumir una API)
const products = [
    { id: 1, name: "Producto 1", price: 10, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Producto 2", price: 20, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Producto 3", price: 30, image: "https://via.placeholder.com/150" }
];

// Carrito
let cart = [];

// Función para renderizar los productos
function renderProducts() {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = "";
    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
        `;
        productsContainer.appendChild(productElement);
    });
}

// Función para agregar un producto al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    renderCart();
}

// Función para renderizar el carrito
function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("cart-item");
        cartItemElement.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span>$${item.price * item.quantity}</span>
            <button onclick="removeFromCart(${item.id})">Eliminar</button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });

    document.getElementById("total-price").textContent = total.toFixed(2);
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
}

// Evento para finalizar compra
document.getElementById("checkout-btn").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("El carrito está vacío");
    } else {
        alert("Compra finalizada. Total: $" + document.getElementById("total-price").textContent);
        cart = [];
        renderCart();
    }
});

// Inicializar la página
renderProducts();