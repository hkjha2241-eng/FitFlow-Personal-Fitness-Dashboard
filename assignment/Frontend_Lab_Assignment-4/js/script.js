const productList = document.getElementById("productList");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const itemCount = document.getElementById("itemCount");
const grandTotal = document.getElementById("grandTotal");
const categoryFilter = document.getElementById("categoryFilter");
const cartSection = document.getElementById("cartSection");

let cart = [];

function formatPrice(price) {
    return "₹" + price.toLocaleString("en-IN");
}

function showMessage(message) {
    document.getElementById("toastText").textContent = message;
    const toast = bootstrap.Toast.getOrCreateInstance(document.getElementById("messageToast"));
    toast.show();
}

function loadCategories() {
    const categories = [...new Set(products.map(product => product.category))];

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

function displayProducts(productArray = products) {
    productList.innerHTML = "";

    productArray.forEach(product => {
        const column = document.createElement("div");
        column.className = "col-12 col-sm-6 col-md-4 col-xl-3";

        column.innerHTML = `
            <div class="card product-card ${product.inStock ? "" : "out-of-stock"}">
                <img src="${product.image}" class="product-image" alt="${product.name}">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start gap-2">
                        <h3 class="h6">${product.name}</h3>
                        <span class="text-warning small">★ ${product.rating}</span>
                    </div>
                    <p class="product-description">${product.description}</p>
                    <div class="d-flex align-items-center flex-wrap gap-2 mb-3">
                        <span class="current-price">${formatPrice(product.price)}</span>
                        <span class="old-price">${formatPrice(product.originalPrice)}</span>
                        <span class="discount-tag">${product.discount}% OFF</span>
                    </div>
                    <div class="mt-auto">
                        ${product.inStock
                            ? `<button class="btn btn-success w-100 add-to-cart" data-id="${product.id}">Add to Cart</button>`
                            : `<button class="btn btn-secondary w-100" disabled>Out of Stock</button>`}
                    </div>
                </div>
            </div>
        `;

        productList.appendChild(column);
    });
}

function addToCart(productId) {
    const product = products.find(item => item.id === productId);

    if (!product || !product.inStock) {
        showMessage("This product is out of stock.");
        return;
    }

    const cartProduct = cart.find(item => item.id === productId);

    if (cartProduct) {
        cartProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    showMessage(product.name + " added to cart.");
}

function changeQuantity(productId, change) {
    const cartProduct = cart.find(item => item.id === productId);

    if (!cartProduct) return;

    cartProduct.quantity += change;

    if (cartProduct.quantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
    }

    updateCart();
}

function updateCart() {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-muted text-center py-4">Your cart is empty.</p>';
    }

    let total = 0;
    let totalQuantity = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        totalQuantity += item.quantity;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div>
                <div class="fw-semibold small">${item.name}</div>
                <div class="small">${formatPrice(item.price)}</div>
                <div class="quantity-controls">
                    <button class="btn btn-outline-secondary btn-sm quantity-btn" data-id="${item.id}" data-change="-1" aria-label="Decrease quantity">−</button>
                    <span class="small">${item.quantity}</span>
                    <button class="btn btn-outline-secondary btn-sm quantity-btn" data-id="${item.id}" data-change="1" aria-label="Increase quantity">+</button>
                </div>
                <div class="small text-muted mt-1">Subtotal: ${formatPrice(subtotal)}</div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    cartCount.textContent = totalQuantity;
    itemCount.textContent = totalQuantity;
    grandTotal.textContent = formatPrice(total);
}

productList.addEventListener("click", event => {
    const button = event.target.closest(".add-to-cart");
    if (button) {
        addToCart(Number(button.dataset.id));
    }
});

cartItems.addEventListener("click", event => {
    const button = event.target.closest(".quantity-btn");
    if (button) {
        changeQuantity(Number(button.dataset.id), Number(button.dataset.change));
    }
});

categoryFilter.addEventListener("change", () => {
    const selectedCategory = categoryFilter.value;

    if (selectedCategory === "all") {
        displayProducts();
    } else {
        displayProducts(products.filter(product => product.category === selectedCategory));
    }
});

document.getElementById("cartToggle").addEventListener("click", () => {
    cartSection.scrollIntoView({ behavior: "smooth", block: "start" });
    cartSection.classList.remove("cart-hidden");
});

document.getElementById("cartClose").addEventListener("click", () => {
    if (window.innerWidth < 992) {
        cartSection.classList.add("cart-hidden");
    }
});

document.getElementById("checkoutBtn").addEventListener("click", () => {
    const message = document.getElementById("checkoutMessage");

    if (cart.length === 0) {
        message.textContent = "Add a product before checkout.";
    } else {
        message.textContent = "Demo checkout: your cart is ready.";
    }
});

loadCategories();
displayProducts();
updateCart();
