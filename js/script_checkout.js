document.addEventListener("DOMContentLoaded", () => {
  const orderItemsContainer = document.querySelector(".order-items");
  const subtotalEl = document.querySelectorAll(".order-total-row span")[1];
  const taxEl = document.querySelectorAll(".order-total-row span")[5];
  const totalEl = document.querySelector(".order-total-amount");

  const cart = JSON.parse(localStorage.getItem("coffee_cart")) || [];

  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "checkout-item";

    div.innerHTML = `
      <div class="checkout-item-row">
        <img src="${item.image}" width="50">
        <div>
          <h4>${item.name}</h4>
          <p>${item.quantity} × $${item.price.toFixed(2)}</p>
        </div>
        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
      </div>
    `;

    orderItemsContainer.appendChild(div);
  });

  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  taxEl.textContent = `$${tax.toFixed(2)}`;
  totalEl.textContent = `$${total.toFixed(2)}`;
});


