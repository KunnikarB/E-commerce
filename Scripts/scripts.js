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
    description: 'High-performance laptop for gaming',
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
    description: 'Modern desktop for your workspace',
    img: 'images/iMac.jpg',
  },
  {
    id: 6,
    name: 'Shoes',
    category: 'clothing',
    price: 195,
    description: 'Comfortable and stylish for all occasions',
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


// Display all products on the landing page
function displayProducts() {
  const productResults = document.getElementById('product-results');
  productResults.innerHTML = ''; // Clear current results
  products.forEach((product) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</a></h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <div class ="added-to-cart js-added-to-cart-${product.id}" >
              <img src="images/checkmark.png" alt="checked">
              <p>Added</p>
            </div>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
    productResults.appendChild(productDiv);
  });

  // Add event listeners to "Add to Cart" buttons
  attachAddToCartListeners();
}

document.addEventListener('DOMContentLoaded', displayProducts);


// Show message when product is added to cart
function showMessage(productId) {
  // Show the added to cart message
  const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);

  addedMessage.classList.add('added-to-cart-visible');

  // Hide the added to cart message after 2 seconds
  setTimeout(() => {
    addedMessage.classList.remove('added-to-cart-visible');
  }, 2000);
}

// Function to update cart count
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = `${cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  )} items `;
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

// Attach event listeners to "Add to Cart" buttons
function attachAddToCartListeners() {
  document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', (event) => {
      const productId = parseInt(event.target.dataset.id);
      addToCart(productId);
      showMessage(productId);
    });
  });
}


// Function to get delivery cost based on user selection
function getDeliveryCost() {
  const deliverySelect = document.getElementById('delivery-select');
  const selectedCost = parseFloat(deliverySelect.value);
  return selectedCost;
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


// Function to confirm purchase
function confirmPurchase() {
  document.getElementById('confirmed').textContent =
    'Thank you for your purchase!';

  cart = []; // Clear the cart after purchase
  localStorage.removeItem('cart'); // Remove from local storage
  updateCartCount();
  document.getElementById('delivery-select').value = 0; // Reset delivery cost
  loadCartItems('delivery-select'); // Update checkout page
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
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
    productResults.appendChild(productDiv);
  });

  // Add event listeners to new "Add to Cart" buttons
  attachAddToCartListeners();
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
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
    productResults.appendChild(productDiv);
  });

  // Add event listeners to new "Add to Cart" buttons
  attachAddToCartListeners();
}
