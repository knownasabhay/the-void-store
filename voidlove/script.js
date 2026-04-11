/* 
  THE VOID - Premium Script
  Alive, Interactive, and Immersive Luxury Streetwear Brand
*/

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  // Page Transition: Fade In
  document.body.classList.add('loaded');

  initNavbar();
  initCart();
  initProductPage();
  initCollapsibles();
  renderShop();
  renderRecommendedProducts();
  initContactForm();
  initLoginForm();
  initScrollAnimations();
  renderFeaturedProducts();
});

// --- SCROLL ANIMATIONS ---
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Targets for animation
  const animateTargets = document.querySelectorAll('.section, .product-card, .editorial-container, .about-content, .contact-container, .cart-container, .fade-in, .product-detail-container, .login-form-wrapper');
  animateTargets.forEach((el) => {
    // Only add fade-in if it doesn't have it
    if (!el.classList.contains('fade-in')) {
      el.classList.add('fade-in');
    }
    // Observe if not already visible
    if (!el.classList.contains('visible')) {
      observer.observe(el);
    }
  });
}

// --- HERO PARALLAX & MOTION ---
function initHeroParallax() {
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');
  
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      // Content subtle lift
      if (heroContent) {
        heroContent.style.transform = `translateY(${-scrollY * 0.1}px)`;
        heroContent.style.opacity = `${1 - scrollY * 0.002}`;
      }
    }
  });
}

// --- PAGE TRANSITIONS ---
function initPageTransitions() {
  const links = document.querySelectorAll('a:not([href^="#"]):not([target="_blank"])');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#' || href.includes('javascript:void(0)')) return;

      e.preventDefault();
      document.body.classList.remove('loaded');
      
      setTimeout(() => {
        window.location.href = href;
      }, 600); // Matches CSS transition duration
    });
  });
}

// --- NAVBAR LOGIC ---
function initNavbar() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      if (!document.body.classList.contains('force-nav-scrolled')) {
        nav.classList.remove('scrolled');
      }
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();
}

// --- PRODUCT DATA ---
const products = [
  {
    id: 1,
    name: "Fog Grey Wide Fit",
    price: 1499,
    images: ["assests/products/foggrey-wide.webp", "assests/products/foggrey2-wide.webp"],
    description: "Premium wide-fit denim in a sophisticated fog grey wash. Crafted for maximum comfort and an effortless editorial silhouette. Features reinforced stitching and custom hardware.",
    sizes: [28, 30, 32, 34, 36],
    category: "Denim"
  },
  {
    id: 2,
    name: "Milky White Baggy",
    price: 1299,
    images: ["assests/products/milkywhite-baggy.webp", "assests/products/milkywhite2-baggy.webp"],
    description: "Clean milky white baggy jeans for a bold minimal look. Heavyweight cotton twill ensures durability while maintaining a soft, premium feel. Perfect for high-fashion streetwear styling.",
    sizes: [28, 30, 32, 34, 36],
    category: "Denim"
  },
  {
    id: 3,
    name: "Raw Dark Wide Leg",
    price: 1699,
    images: ["assests/products/rawdark-wide.webp", "assests/products/rawdark2-wide.webp"],
    description: "Industrial raw dark denim with a structured wide-leg cut. These jeans age beautifully, developing unique character over time. Designed for the modern minimalist.",
    sizes: [28, 30, 32, 34, 36],
    category: "Denim"
  },
  {
    id: 4,
    name: "Stay Black Baggy",
    price: 1499,
    images: ["assests/products/stayblack-baggy.webp", "assests/products/stayblack2-baggy.webp"],
    description: "Ultra-black baggy fit denim designed to resist fading. A versatile staple for any wardrobe, offering a relaxed yet refined silhouette that transitions seamlessly from day to night.",
    sizes: [28, 30, 32, 34, 36],
    category: "Denim"
  },
  {
    id: 5,
    name: "Oxbo Gold Baggy",
    price: 1599,
    images: ["assests/products/oxbogold-baggy.webp", "assests/products/oxbogold2-baggy.webp"],
    description: "Unique golden-hue tinted denim in our signature baggy silhouette. Experimental wash technique creates a one-of-a-kind editorial piece.",
    sizes: [28, 30, 32, 34, 36],
    category: "Denim"
  },
  {
    id: 6,
    name: "Dockey Light Blue",
    price: 1399,
    images: ["assests/products/dockeylightblue-wide.webp", "assests/products/dockeylightblue2-wide.webp"],
    description: "Vintage-inspired light blue wash with a modern wide-leg fit. Soft-touch denim for all-day comfort without compromising on structure.",
    sizes: [28, 30, 32, 34, 36],
    category: "Denim"
  },
  {
    id: 7,
    name: "Tekno Ripped Ash",
    price: 1799,
    images: ["assests/products/teknorippedash.webp", "assests/products/teknorippedash2.webp"],
    description: "Highly distressed ash grey denim featuring technical laser-cut details and reinforced knee panels. An aggressive streetwear statement.",
    sizes: [28, 30, 32, 34, 36],
    category: "Denim"
  },
  {
    id: 8,
    name: "Tox Green Wide",
    price: 1599,
    images: ["assests/products/toxgreen-wide.jfif", "assests/products/toxgreen2-wide.webp"],
    description: "Experimental toxic green overdyed denim. Wide-leg silhouette with unique pigment variations across the garment.",
    sizes: [28, 30, 32, 34, 36],
    category: "Denim"
  }
];

// --- UTILS ---
function formatPrice(price) {
  return `₹${price.toLocaleString('en-IN')}`;
}

// --- CART LOGIC ---
function initCart() {
  let cart = JSON.parse(localStorage.getItem('void_cart')) || [];
  updateCartCount(cart);

  const cartContainer = document.getElementById('cart-items');
  if (cartContainer) {
    renderCart(cart, cartContainer);
  }
}

function updateCartCount(cart) {
  const countElements = document.querySelectorAll('.cart-count');
  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);
  countElements.forEach(el => {
    el.textContent = totalItems;
    el.style.display = totalItems > 0 ? 'flex' : 'none';
  });
}

function addToCart(productId, size) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  let cart = JSON.parse(localStorage.getItem('void_cart')) || [];
  const existingItem = cart.find(item => item.id === productId && item.size === size);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: size,
      quantity: 1
    });
  }

  localStorage.setItem('void_cart', JSON.stringify(cart));
  updateCartCount(cart);
  
  // Optional: show feedback
  const btn = document.querySelector('.add-to-cart-btn');
  if (btn) {
    const originalText = btn.textContent;
    btn.textContent = 'ADDED TO BAG';
    setTimeout(() => { btn.textContent = originalText; }, 2000);
  }
}

function renderCart(cart, container) {
  if (cart.length === 0) {
    const cartContainer = document.querySelector('.cart-container');
    if (cartContainer) {
      cartContainer.style.display = 'block';
    }
    container.innerHTML = `
      <div class="empty-cart-message">
        <p>YOUR BAG IS CURRENTLY EMPTY.</p>
        <a href="shop.html" class="btn">CONTINUE SHOPPING</a>
      </div>
    `;
    const summary = document.querySelector('.cart-summary');
    if (summary) summary.style.display = 'none';
    updateTotals(0);
    return;
  }

  const summary = document.querySelector('.cart-summary');
  if (summary) summary.style.display = 'block';

  container.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p class="item-size">SIZE: ${item.size}</p>
        <p class="item-price">${formatPrice(item.price)}</p>
      </div>
      <div class="cart-item-controls">
        <div class="quantity-picker">
          <button onclick="updateQuantity(${index}, -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="updateQuantity(${index}, 1)">+</button>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${index})">REMOVE</button>
      </div>
      <div class="cart-item-total">
        ${formatPrice(item.price * item.quantity)}
      </div>
    </div>
  `).join('');

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  updateTotals(subtotal);
}

function updateQuantity(index, delta) {
  let cart = JSON.parse(localStorage.getItem('void_cart')) || [];
  cart[index].quantity += delta;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem('void_cart', JSON.stringify(cart));
  initCart();
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('void_cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('void_cart', JSON.stringify(cart));
  initCart();
}

function updateTotals(subtotal) {
  const subtotalEl = document.getElementById('cart-subtotal');
  const totalEl = document.getElementById('cart-total');
  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (totalEl) totalEl.textContent = formatPrice(subtotal);
}

// --- PRODUCT PAGE LOGIC ---
function initProductPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  if (!productId) return;

  const product = products.find(p => p.id === productId);
  if (!product) return;

  // Update Page Title
  document.title = `${product.name} | THE VOID`;

  // Update Images
  const mainImg = document.getElementById('product-main-img');
  const thumbsContainer = document.getElementById('product-thumbnails');
  if (mainImg) mainImg.src = product.images[0];
  if (thumbsContainer) {
    thumbsContainer.innerHTML = `
      <div class="thumbnail active" onclick="updateMainImage('${product.images[0]}', this)">
        <img src="${product.images[0]}" alt="Main View">
      </div>
      <div class="thumbnail" onclick="updateMainImage('${product.images[1]}', this)">
        <img src="${product.images[1]}" alt="Hover View">
      </div>
    `;
  }

  // Update Details
  const nameEl = document.getElementById('product-name');
  const breadcrumbNameEl = document.getElementById('breadcrumb-name');
  const priceEl = document.getElementById('product-price');
  const descEl = document.getElementById('product-desc');
  if (nameEl) nameEl.textContent = product.name;
  if (breadcrumbNameEl) breadcrumbNameEl.textContent = product.name;
  if (priceEl) priceEl.textContent = formatPrice(product.price);
  if (descEl) descEl.textContent = product.description;

  // Update Sizes
  const sizesContainer = document.getElementById('product-sizes');
  if (sizesContainer) {
    sizesContainer.innerHTML = product.sizes.map(size => `
      <button class="size-btn" onclick="selectSize(this, ${size})">${size}</button>
    `).join('');
  }

  // Add to Cart Button
  const addToCartBtn = document.querySelector('.add-to-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.onclick = () => {
      const selectedSize = document.querySelector('.size-btn.active');
      if (!selectedSize) {
        alert('PLEASE SELECT A SIZE');
        return;
      }
      addToCart(product.id, parseInt(selectedSize.textContent));
    };
  }
}

function updateMainImage(src, thumb) {
  const mainImg = document.getElementById('product-main-img');
  if (mainImg) mainImg.src = src;
  
  document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
}

function selectSize(btn, size) {
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// --- COLLAPSIBLE SECTIONS ---
function initCollapsibles() {
  document.querySelectorAll('.collapsible-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      item.classList.toggle('active');
    });
  });
}

// --- SHOP RENDERING ---
function renderShop() {
  const shopGrid = document.getElementById('shop-grid');
  if (!shopGrid) return;

  // Use all products for shop page
  const displayProducts = products;

  shopGrid.innerHTML = displayProducts.map(product => `
    <div class="product-card" onclick="window.location.href='product.html?id=${product.id}'">
      <div class="product-image-container">
        <img src="${product.images[0]}" alt="${product.name}" class="main-image">
        <img src="${product.images[1]}" alt="${product.name}" class="hover-image">
        <div class="select-options-overlay">
          <span>SELECT OPTIONS</span>
        </div>
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">${formatPrice(product.price)}</p>
      </div>
    </div>
  `).join('');
}

// --- RECOMMENDED PRODUCTS ---
function renderRecommendedProducts() {
  const recommendedGrid = document.getElementById('recommended-products');
  if (!recommendedGrid) return;

  const urlParams = new URLSearchParams(window.location.search);
  const currentProductId = parseInt(urlParams.get('id'));

  // Logic: Do NOT show current product, limit to 4
  const recommended = products
    .filter(p => p.id !== currentProductId)
    .slice(0, 4);

  recommendedGrid.innerHTML = recommended.map(product => `
    <div class="product-card" onclick="window.location.href='product.html?id=${product.id}'">
      <div class="product-image-container">
        <img src="${product.images[0]}" alt="${product.name}" class="main-image">
        <img src="${product.images[1]}" alt="${product.name}" class="hover-image">
        <div class="select-options-overlay">
          <span>SELECT OPTIONS</span>
        </div>
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">${formatPrice(product.price)}</p>
      </div>
    </div>
  `).join('');
}

// --- FEATURED PRODUCTS ---
function renderFeaturedProducts() {
  const featuredGrid = document.getElementById('featured-products');
  if (!featuredGrid) return;

  // Show first 4 products on home page
  const displayProducts = products.slice(0, 4);

  featuredGrid.innerHTML = displayProducts.map(product => `
    <div class="product-card" onclick="window.location.href='product.html?id=${product.id}'">
      <div class="product-image-container">
        <img src="${product.images[0]}" alt="${product.name}" class="main-image">
        <img src="${product.images[1]}" alt="${product.name}" class="hover-image">
        <div class="select-options-overlay">
          <span>SELECT OPTIONS</span>
        </div>
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">${formatPrice(product.price)}</p>
      </div>
    </div>
  `).join('');
}

// --- LOGIN FORM LOGIC ---
function initLoginForm() {
  const loginForm = document.getElementById('login-form');
  if (!loginForm) return;

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = loginForm.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = 'SIGNING IN...';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = 'SUCCESS';
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    }, 1500);
  });
}

// --- CONTACT FORM LOGIC ---
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button');
    if (!btn) return;
    const originalText = btn.textContent;
    btn.textContent = 'SENDING...';
    btn.disabled = true;
    
    setTimeout(() => {
      btn.textContent = 'MESSAGE SENT';
      form.reset();
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      }, 2000);
    }, 1500);
  });
}
