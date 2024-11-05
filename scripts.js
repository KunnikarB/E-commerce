// Sample products array
const products = [
  {
    id: 1,
    name: 'Smartphone',
    category: 'electronics',
    price: 990,
    description: 'Latest smartphone with amazing features',
    img: 'images/iPhone.jpg',
  },
  {
    id: 2,
    name: 'Laptop',
    category: 'electronics',
    price: 1599,
    description: 'High-performance laptop for work and gaming',
    img: 'images/laptop.jpg',
  },
  {
    id: 3,
    name: 'Vintage outfit',
    category: 'clothing',
    price: 200,
    description: 'Stylish and comfortable vintage outfit',
    img: 'images/vintage.jpeg',
  },
  {
    id: 4,
    name: 'Sun Glasses',
    category: 'clothing',
    price: 450,
    description: 'Comfortable and stylish Sunglasses',
    img: 'images/sunglasses.jpg',
  },
  {
    id: 5,
    name: 'iMac',
    category: 'electronics',
    price: 1299,
    description: 'Modern desktop computer for your workspace',
    img: 'images/iMac.jpg',
  },
  {
    id: 6,
    name: 'Shoes',
    category: 'clothing',
    price: 195,
    description: 'Comfortable and stylish shoes for all occasions',
    img: 'images/shoes.jpg',
  },
];

// Load cart from local storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  if (document.getElementById('cart-items')) {
    loadCartItems();
  }
});

// Function to load cart items on the checkout page
function loadCartItems() {
  const cartItemsDiv = document.getElementById('cart-items');
  cartItemsDiv.innerHTML = '';

  let total = 0;
  cart.forEach((product, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    itemDiv.innerHTML = `
            <p>${product.name} - $${product.price} x ${product.quantity}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
            <input type="number" value="${product.quantity}" min="1" onchange="updateCart(${index}, this.value)">
        `;
    cartItemsDiv.appendChild(itemDiv);
    total += product.price * product.quantity;
  });

  const taxRate = 0.1; // 10% tax
  const deliveryCost = getDeliveryCost(); // Get selected delivery cost

  // Calculate totals
  const taxAmount = total * taxRate;
  const totalWithTax = total + taxAmount + deliveryCost;

  // Displaying all costs clearly
  const totalPrice = document.getElementById('total-price');
  totalPrice.innerHTML = `
        <p>Subtotal: $${total.toFixed(2)}</p>
        <p>Tax (10%): $${taxAmount.toFixed(2)}</p>
        <p>Delivery Cost: $${deliveryCost.toFixed(2)}</p>
        <p>Total Price: $${totalWithTax.toFixed(2)}</p>
    `;
}

// Function to get delivery cost based on user selection
function getDeliveryCost() {
  const deliverySelect = document.getElementById('delivery-select');
  const selectedCost = parseFloat(deliverySelect.value) || 0; // Default to 0 if nothing is selected
  return selectedCost;
}

// Function to confirm purchase
function confirmPurchase() {
  alert('Thank you for your purchase!');
  cart = []; // Clear the cart after purchase
  localStorage.removeItem('cart'); // Remove from local storage
  updateCartCount();
  loadCartItems(); // Update checkout page
}

// Display all products on the landing page
function displayProducts() {
  const productResults = document.getElementById('product-results');
  productResults.innerHTML = ''; // Clear current results
  products.forEach((product) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
            <p>Price: $${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
    productResults.appendChild(productDiv);
  });

  // Add event listeners to "Add to Cart" buttons
  attachAddToCartListeners();
}

// Function to add product to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const existingProduct = cart.find((p) => p.id === productId);

  if (existingProduct) {
    existingProduct.quantity += 1; // Update quantity if already in cart
  } else {
    product.quantity = 1; // Set quantity for new item
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart)); // Store cart in local storage
  updateCartCount();
}

// Function to update cart count
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = `${cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  )} item(s) in cart`;
}

// Function to load product details
function loadProductDetails() {
  const productId = new URLSearchParams(window.location.search).get('id');
  const product = products.find((p) => p.id == productId);

  if (product) {
    const productDetails = document.getElementById('product-details');
    productDetails.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
        `;
    document.getElementById('add-to-cart-btn').onclick = () =>
      addToCart(product.id);
  }
}

// Function to load cart items on the checkout page
function loadCartItems() {
  const cartItemsDiv = document.getElementById('cart-items');
  cartItemsDiv.innerHTML = '';

  let total = 0;
  cart.forEach((product, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    itemDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <p>${product.name} - $${product.price} x ${product.quantity}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
            <input type="number" value="${product.quantity}" min="1" onchange="updateCart(${index}, this.value)">
        `;
    cartItemsDiv.appendChild(itemDiv);
    total += product.price * product.quantity;
  });

  const taxRate = 0.1; // 10% tax
  const deliveryCost = getDeliveryCost(); // Get selected delivery cost
  const totalWithTax = total + total * taxRate + deliveryCost;

  const totalPrice = document.getElementById('total-price');
  totalPrice.textContent = `Total Price (including tax and delivery): $${totalWithTax.toFixed(
    2
  )}`;
}

// Function to get delivery cost based on user selection
function getDeliveryCost() {
  const deliverySelect = document.getElementById('delivery-select');
  const selectedCost = parseFloat(deliverySelect.value) || 0; // Default to 0 if nothing is selected
  return selectedCost;
}

// Function to remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1); // Remove item from cart
  localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
  loadCartItems(); // Refresh cart display
  updateCartCount(); // Update cart count
}

// Function to update item quantity in cart
function updateCart(index, quantity) {
  cart[index].quantity = parseInt(quantity); // Update quantity
  localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
  loadCartItems(); // Refresh cart display
}

// Redirect to checkout page
function redirectToCheckout() {
  window.location.href = 'checkout.html';
}

// Search products based on user input
function searchProducts() {
  const searchInput = document
    .getElementById('search-input')
    .value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchInput)
  );
  const productResults = document.getElementById('product-results');
  productResults.innerHTML = ''; // Clear current results
  filteredProducts.forEach((product) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
            <p>Price: $${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
    productResults.appendChild(productDiv);
  });

  // Add event listeners to new "Add to Cart" buttons
  attachAddToCartListeners();
}

// Sort products based on selected option
function sortProducts() {
  const sortOption = document.getElementById('sort-select').value;
  let sortedProducts = [...products];

  if (sortOption === 'low-high') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'high-low') {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  const productResults = document.getElementById('product-results');
  productResults.innerHTML = ''; // Clear current results
  sortedProducts.forEach((product) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
            <p>Price: $${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
    productResults.appendChild(productDiv);
  });

  // Add event listeners to new "Add to Cart" buttons
  attachAddToCartListeners();
}

// Attach event listeners to "Add to Cart" buttons
function attachAddToCartListeners() {
  document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', (event) => {
      const productId = parseInt(event.target.dataset.id);
      addToCart(productId);
    });
  });
}

// Confirm purchase function
function confirmPurchase() {
  alert('Thank you for your purchase!');
  cart = []; // Clear the cart after purchase
  localStorage.removeItem('cart'); // Remove from local storage
  updateCartCount();
  loadCartItems(); // Update checkout page
}

// Function to load cart items on the checkout page
function loadCartItems() {
  const cartItemsDiv = document.getElementById('cart-items');
  cartItemsDiv.innerHTML = '';

  let total = 0;
  cart.forEach((product, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    itemDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <p>${product.name} - $${product.price} x ${product.quantity}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
            <input type="number" value="${product.quantity}" min="1" onchange="updateCart(${index}, this.value)">
        `;
    cartItemsDiv.appendChild(itemDiv);
    total += product.price * product.quantity;
  });

  const taxRate = 0.1; // 10% tax
  const deliveryCost = getDeliveryCost(); // Get selected delivery cost

  // Calculate totals
  const taxAmount = total * taxRate;
  const totalWithTax = total + taxAmount + deliveryCost;

  // Update price breakdown in the DOM
  document.getElementById('subtotal').textContent = total.toFixed(2);
  document.getElementById('tax').textContent = taxAmount.toFixed(2);
  document.getElementById('delivery-cost').textContent =
    deliveryCost.toFixed(2);
  document.getElementById('total-price').textContent = totalWithTax.toFixed(2);
}

// Function to confirm purchase
function confirmPurchase() {
  alert('Thank you for your purchase!');
  cart = []; // Clear the cart after purchase
  localStorage.removeItem('cart'); // Remove from local storage
  updateCartCount();
  loadCartItems(); // Update checkout page
}

// Function to get product details from the URL
function getProductDetails() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  const product = products.find((p) => p.id == productId);

  if (product) {
    const productDetailsDiv = document.getElementById('product-details');
    productDetailsDiv.innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.img}" alt="${product.name}">
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
        `;
  }
}

// Add product to cart
document.getElementById('add-to-cart-btn').onclick = function () {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  const product = products.find((p) => p.id == productId);

  if (product) {
    addToCart(product.id);
  }
};

// Go back to the previous page
function goBack() {
  window.history.back();
}

// Load product details on page load
document.addEventListener('DOMContentLoaded', getProductDetails);
