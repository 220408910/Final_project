// Dark Mode Toggle Function
function toggleDarkMode() {
  document.documentElement.classList.toggle("dark");
}

// Initialize dark mode toggle button
document.addEventListener("DOMContentLoaded", function () {
  const darkModeButton = document.querySelector(".dark-mode-button");
  if (darkModeButton) {
    darkModeButton.addEventListener("click", toggleDarkMode);
  }
});

// Add to Cart Functionality
const addToCartButtons = document.querySelectorAll(".add-to-cart-button");
const orderItemsContainer = document.querySelector(".order-items");
const subtotalEl = document.querySelector(".summary-value");
const taxEl = document.querySelectorAll(".summary-value")[1];
const totalEl = document.querySelector(".summary-total-value");

let cart = [];

// Add event listeners to all "Add to Cart" buttons
addToCartButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const productCard = button.closest(".product-card");

    const name = productCard.querySelector(".product-name").textContent;
    const price = parseFloat(
      productCard.querySelector(".product-price").textContent.replace("$", "")
    );
    const image = productCard.querySelector(".product-image").src;

    addToCart(name, price, image);
  });
});

function addToCart(name, price, image) {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      id: Date.now(),
      name,
      price,
      image,
      quantity: 1,
    });
  }

  renderCart();
}

// Render Cart Items
function renderCart() {
  orderItemsContainer.innerHTML = "";

  cart.forEach((item) => {
    const div = document.createElement("div");
    div.className = "order-item";

    div.innerHTML = `
      <img src="${item.image}" class="order-item-image">
      <div class="order-item-details">
        <h4 class="order-item-name">${item.name}</h4>
        <div class="order-item-price-row">
          <span class="order-item-price">$${item.price.toFixed(2)}</span>
          <div class="quantity-control">
            <button class="quantity-button" onclick="changeQty(${item.id}, -1)">-</button>
            <span class="quantity-value">${item.quantity}</span>
            <button class="quantity-button" onclick="changeQty(${item.id}, 1)">+</button>
          </div>
        </div>
      </div>
      <button class="order-item-delete" onclick="removeItem(${item.id})">
        <span class="material-icons delete-icon">delete</span>
      </button>
    `;

    orderItemsContainer.appendChild(div);
  });

  updateSummary();
}

// Change Quantity of Cart Items
function changeQty(id, amount) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter((i) => i.id !== id);
  }

  renderCart();
}

// Remove Item from Cart
function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);
  renderCart();
}

// Update Order Summary حساب المجموع
function updateSummary() {
  let subtotal = 0;

  cart.forEach((item) => {
    subtotal += item.price * item.quantity;
  });

  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  taxEl.textContent = `$${tax.toFixed(2)}`;
  totalEl.textContent = `$${total.toFixed(2)}`;
}

// Save Cart to Local Storage on Checkout
const checkoutBtn = document.getElementById("checkoutBtn");

checkoutBtn.addEventListener("click", () => {
  localStorage.setItem("coffee_cart", JSON.stringify(cart));
});
