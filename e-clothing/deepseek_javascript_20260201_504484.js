// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCartElement = document.querySelector('.empty-cart');
    const cartHeader = document.querySelector('.cart-header');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const recommendedProductsContainer = document.getElementById('recommendedProducts');
    
    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Display cart items
    function displayCartItems() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Your cart is empty</h3>
                    <p>Add some items to get started!</p>
                    <a href="products.html" class="btn btn-primary">Browse Products</a>
                </div>
            `;
            checkoutBtn.disabled = true;
            updateItemCount(0);
            updateOrderSummary();
            return;
        }
        
        cartItemsContainer.innerHTML = cart.map((item, index) => `
            <div class="cart-item" data-id="${item.id}" data-index="${index}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <p class="cart-item-color">Color: ${item.color.charAt(0).toUpperCase() + item.color.slice(1)}</p>
                    <p class="cart-item-size">Size: ${item.selectedSize}</p>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" data-index="${index}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-index="${index}">+</button>
                    </div>
                    <button class="remove-item" data-index="${index}">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
                <div class="cart-item-total">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>
            </div>
        `).join('');
        
        checkoutBtn.disabled = false;
        updateItemCount();
        updateOrderSummary();
    }
    
    // Update item count display
    function updateItemCount() {
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        document.getElementById('item-count').textContent = `${itemCount} ${itemCount === 1 ? 'item' : 'items'}`;
        
        // Update cart count in navigation
        document.querySelectorAll('.cart-count').forEach(count => {
            count.textContent = itemCount;
        });
    }
    
    // Update order summary
    function updateOrderSummary() {
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const shipping = subtotal >= 50 ? 0 : 5;
        const tax = subtotal * 0.08; // 8% tax
        
        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
        document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
        
        const total = subtotal + shipping + tax;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }
    
    // Quantity controls
    cartItemsContainer.addEventListener('click', function(e) {
        const target = e.target;
        
        // Plus button
        if (target.classList.contains('plus') || target.closest('.plus')) {
            const index = parseInt(target.getAttribute('data-index') || target.closest('.plus').getAttribute('data-index'));
            cart[index].quantity += 1;
            saveCart();
        }
        
        // Minus button
        if (target.classList.contains('minus') || target.closest('.minus')) {
            const index = parseInt(target.getAttribute('data-index') || target.closest('.minus').getAttribute('data-index'));
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1);
            }
            saveCart();
        }
        
        // Remove button
        if (target.classList.contains('remove-item') || target.closest('.remove-item')) {
            const index = parseInt(target.getAttribute('data-index') || target.closest('.remove-item').getAttribute('data-index'));
            cart.splice(index, 1);
            saveCart();
        }
    });
    
    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        
        // Dispatch event for other pages to update
        window.dispatchEvent(new Event('cartUpdated'));
    }
    
    // Load recommended products
    function loadRecommendedProducts() {
        if (!recommendedProductsContainer) return;
        
        // Get random 4 products not in cart
        const cartProductIds = cart.map(item => item.id);
        const availableProducts = products.filter(p => !cartProductIds.includes(p.id));
        const recommended = availableProducts.sort(() => 0.5 - Math.random()).slice(0, 4);
        
        recommendedProductsContainer.innerHTML = recommended.map(createProductCard).join('');
    }
    
    // Checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) return;
            
            // In a real application, this would redirect to a checkout page
            alert('Checkout functionality would be implemented here with payment processing.');
        });
    }
    
    // Promo code functionality
    const applyPromoBtn = document.getElementById('applyPromo');
    const promoCodeInput = document.getElementById('promoCode');
    const promoMessage = document.getElementById('promoMessage');
    
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', function() {
            const code = promoCodeInput.value.trim().toUpperCase();
            const validCodes = {
                'STYLE10': 0.1,  // 10% off
                'WELCOME20': 0.2, // 20% off for new customers
                'FREESHIP': 'free-shipping' // Free shipping
            };
            
            if (validCodes[code]) {
                promoMessage.textContent = 'Promo code applied successfully!';
                promoMessage.style.color = 'var(--accent)';
                // In a real app, you would apply the discount to the order summary
            } else {
                promoMessage.textContent = 'Invalid promo code';
                promoMessage.style.color = 'var(--secondary)';
            }
        });
    }
    
    // Product data (duplicated from main.js for cart.js standalone functionality)
    const products = [
        // ... same products array as in main.js
        // For brevity, I'm including a shortened version here
        {
            id: 1,
            name: "Classic White Tee",
            price: 29.99,
            category: "t-shirts",
            color: "white",
            description: "Premium cotton t-shirt with a perfect fit.",
            sizes: ["S", "M", "L", "XL"],
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        // ... other products
    ];
    
    // Product Card Template (same as in main.js)
    function createProductCard(product) {
        return `
            <div class="product-card" data-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <div class="product-actions">
                        <button class="btn-add-to-cart" data-id="${product.id}">Add to Cart</button>
                        <button class="btn-wishlist" data-id="${product.id}">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Add to cart from recommended products
    recommendedProductsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-add-to-cart') || 
            e.target.closest('.btn-add-to-cart')) {
            
            const button = e.target.classList.contains('btn-add-to-cart') ? 
                          e.target : e.target.closest('.btn-add-to-cart');
            const productId = parseInt(button.getAttribute('data-id'));
            
            addToCart(productId);
        }
    });
    
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;
        
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1,
                selectedSize: product.sizes[0]
            });
        }
        
        saveCart();
        
        // Show notification
        showNotification(`${product.name} added to cart!`);
    }
    
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--secondary);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--radius);
            box-shadow: var(--shadow);
            display: flex;
            align-items: center;
            gap: 0.5rem;
            z-index: 2000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Initialize
    displayCartItems();
    loadRecommendedProducts();
});