let books = [];
let cart = {};

// Fetch books from backend and render
function fetchBooksFromBackend(selectedCategory = 'All') {
  fetch('http://localhost:8080/books')
    .then(response => response.json())
    .then(data => {
      books = data;
      renderBooks(selectedCategory);
    })
    .catch(error => {
      console.error('Failed to fetch books:', error);
      books = [];
      renderBooks(selectedCategory); // Show empty state/fallback if needed
    });
}

function renderBooks(selectedCategory = 'All') {
  const booksSection = document.getElementById('books-section');
  booksSection.innerHTML = '';
  let filteredBooks = selectedCategory === 'All'
    ? books
    : books.filter(book => book.category && book.category === selectedCategory);
  filteredBooks.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';

    const img = document.createElement('img');
    img.src = book.image || 'https://via.placeholder.com/120x170?text=No+Image';
    img.alt = book.title;
    img.className = 'book-image';
    card.appendChild(img);

    const title = document.createElement('div');
    title.className = 'book-title';
    title.textContent = book.title || 'No Title';
    card.appendChild(title);

    const price = document.createElement('div');
    price.className = 'book-price';
    price.textContent = book.price ? `₹${book.price}` : 'Price N/A';
    card.appendChild(price);

    const btn = document.createElement('button');
    btn.className = 'add-cart-btn';
    btn.textContent = "Add to Cart";
    btn.onclick = () => addToCart(book);
    card.appendChild(btn);

    booksSection.appendChild(card);
  });
  setActiveButton(selectedCategory);
}

function addToCart(book) {
  if (!cart[book.id]) {
    cart[book.id] = { ...book, qty: 1 };
  } else {
    cart[book.id].qty += 1;
  }
  renderCart();
}

function removeFromCart(bookId) {
  delete cart[bookId];
  renderCart();
}

function changeQty(bookId, delta) {
  if (cart[bookId]) {
    cart[bookId].qty += delta;
    if (cart[bookId].qty <= 0) {
      removeFromCart(bookId);
    } else {
      renderCart();
    }
  }
}

function renderCart() {
  const cartItemsDiv = document.getElementById('cart-items');
  cartItemsDiv.innerHTML = '';

  let total = 0;
  Object.values(cart).forEach(item => {
    total += (item.price || 0) * item.qty;

    const cartItemDiv = document.createElement('div');
    cartItemDiv.className = 'cart-item';

    const title = document.createElement('div');
    title.className = 'cart-title';
    title.textContent = item.title || "No Title";
    cartItemDiv.appendChild(title);

    const controls = document.createElement('div');
    controls.className = 'cart-controls';

    const minusBtn = document.createElement('button');
    minusBtn.className = 'cart-btn';
    minusBtn.textContent = '-';
    minusBtn.onclick = () => changeQty(item.id, -1);
    controls.appendChild(minusBtn);

    const qtySpan = document.createElement('span');
    qtySpan.textContent = item.qty;
    controls.appendChild(qtySpan);

    const plusBtn = document.createElement('button');
    plusBtn.className = 'cart-btn';
    plusBtn.textContent = '+';
    plusBtn.onclick = () => changeQty(item.id, +1);
    controls.appendChild(plusBtn);

    const rmBtn = document.createElement('button');
    rmBtn.className = 'cart-btn';
    rmBtn.textContent = '×';
    rmBtn.onclick = () => removeFromCart(item.id);
    controls.appendChild(rmBtn);

    cartItemDiv.appendChild(controls);
    cartItemsDiv.appendChild(cartItemDiv);
  });

  document.getElementById('cart-total').textContent = `Total: ₹${total}`;
}

// Theme toggle
document.getElementById('theme-toggle').onclick = function() {
  document.body.classList.toggle('light');
  this.textContent = document.body.classList.contains('light') ? "🌞" : "🌙";
};

// Category nav + initialization
function setActiveButton(category) {
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === category);
  });
}

window.onload = function() {
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.onclick = () => fetchBooksFromBackend(btn.dataset.category);
  });
  fetchBooksFromBackend(); // Initial load
  renderCart();
};

function showPurchaseSuccess() {
  alert("Your purchase is successfully done!");
}

// Example: call this after a “Purchase” button click
document.getElementById("purchaseButton").onclick = showPurchaseSuccess;
