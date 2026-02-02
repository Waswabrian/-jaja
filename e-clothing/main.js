// Main JavaScript for StyleHub E-commerce

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navContainer = document.querySelector('.nav-container');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navContainer.classList.toggle('mobile-open');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navContainer.contains(event.target) && navContainer.classList.contains('mobile-open')) {
            navContainer.classList.remove('mobile-open');
        }
    });
    
    // Cart Count Management
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        
        document.querySelectorAll('.cart-count').forEach(count => {
            count.textContent = cartCount;
        });
    }
    
    // Initialize cart count
    updateCartCount();
    
    // Product Data (12 clothing items)
    const products = [
        {
            id: 1,
            name: "Classic White Tee",
            price: 29.99,
            category: "t-shirts",
            color: "white",
            description: "Premium cotton t-shirt with a perfect fit. Made from 100% organic cotton for ultimate comfort.",
            sizes: ["S", "M", "L", "XL"],
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            featured: true
        },
        {
            id: 2,
            name: "Denim Jacket",
            price: 89.99,
            category: "jackets",
            color: "blue",
            description: "Vintage-style denim jacket with modern fit. Perfect for layering in any season.",
            sizes: ["S", "M", "L", "XL"],
            image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            featured: true
        },
        {
            id: 3,
            name: "Black Denim Jeans",
            price: 79.99,
            category: "pants",
            color: "black",
            description: "Slim-fit black denim jeans with stretch for comfort. Versatile for any occasion.",
            sizes: ["28", "30", "32", "34", "36"],
            image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            featured: true
        },
        {
            id: 4,
            name: "Summer Dress",
            price: 64.99,
            category: "dresses",
            color: "red",
            description: "Lightweight summer dress with floral pattern. Perfect for warm days and special occasions.",
            sizes: ["XS", "S", "M", "L"],
            image: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            featured: true
        },
        {
            id: 5,
            name: "Oxford Shirt",
            price: 54.99,
            category: "shirts",
            color: "white",
            description: "Classic Oxford button-down shirt. Professional yet comfortable for everyday wear.",
            sizes: ["S", "M", "L", "XL"],
            image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 6,
            name: "Cargo Pants",
            price: 69.99,
            category: "pants",
            color: "green",
            description: "Utility cargo pants with multiple pockets. Combining style and functionality.",
            sizes: ["28", "30", "32", "34", "36"],
            image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 7,
            name: "Hooded Sweatshirt",
            price: 59.99,
            category: "t-shirts",
            color: "gray",
            description: "Cozy hooded sweatshirt with kangaroo pocket. Perfect for casual days.",
            sizes: ["S", "M", "L", "XL"],
            image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 8,
            name: "Leather Jacket",
            price: 199.99,
            category: "jackets",
            color: "black",
            description: "Premium genuine leather jacket. Timeless style that improves with age.",
            sizes: ["S", "M", "L", "XL"],
            image: "https://images.unsplash.com/photo-1551028711-6df8e6180ac1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 9,
            name: "Polo Shirt",
            price: 44.99,
            category: "shirts",
            color: "blue",
            description: "Classic polo shirt with breathable fabric. Smart casual for any occasion.",
            sizes: ["S", "M", "L", "XL"],
            image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 10,
            name: "Casual Blazer",
            price: 129.99,
            category: "jackets",
            color: "gray",
            description: "Modern fit casual blazer. Elevates any outfit while maintaining comfort.",
            sizes: ["S", "M", "L", "XL"],
            image: "https://images.unsplash.com/photo-1594938374188-1e9d5a6d8c1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 11,
            name: "Striped T-Shirt",
            price: 34.99,
            category: "t-shirts",
            color: "blue",
            description: "Breathable striped t-shirt. Casual style with a subtle pattern.",
            sizes: ["S", "M", "L", "XL"],
            image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 12,
            name: "Maxi Dress",
            price: 89.99,
            category: "dresses",
            color: "black",
            description: "Elegant maxi dress with flowing silhouette. Perfect for evening events.",
            sizes: ["XS", "S", "M", "L"],
            image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
    ];
    
    // Product Card Template
    function createProductCard(product) {
        return `
            <div class="product-card" data-id="${product.id}" data-category="${product.category}" data-color="${product.color}" data-price="${product.price}">
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
    
    // Load Featured Products on Homepage
    const featuredContainer = document.getElementById('featured-products');
    if (featuredContainer) {
        const featuredProducts = products.filter(p => p.featured).slice(0, 4);
        featuredContainer.innerHTML = featuredProducts.map(createProductCard).join('');
    }
    
    // Load All Products on Products Page
    const allProductsContainer = document.getElementById('all-products');
    if (allProductsContainer) {
        allProductsContainer.innerHTML = products.map(createProductCard).join('');
        updateProductCount();
    }
    
    // Add to Cart Functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-add-to-cart') || 
            e.target.closest('.btn-add-to-cart')) {
            
            const button = e.target.classList.contains('btn-add-to-cart') ? 
                          e.target : e.target.closest('.btn-add-to-cart');
            const productId = parseInt(button.getAttribute('data-id'));
            
            addToCart(productId);
        }
        
        // Quick View
        if (e.target.closest('.product-card') && !e.target.closest('.product-actions')) {
            const productCard = e.target.closest('.product-card');
            const productId = parseInt(productCard.getAttribute('data-id'));
            showProductModal(productId);
        }
    });
    
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;
        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
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
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        // Show notification
        showNotification(`${product.name} added to cart!`);
    }
    
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        // Add styles
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
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
        
        // Add animation styles
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Product Modal
    function showProductModal(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;
        
        const modal = document.getElementById('productModal');
        const modalBody = document.getElementById('modalBody');
        
        modalBody.innerHTML = `
            <div class="modal-product">
                <div class="modal-product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="modal-product-info">
                    <h2>${product.name}</h2>
                    <p class="modal-price">$${product.price.toFixed(2)}</p>
                    <p class="modal-description">${product.description}</p>
                    
                    <div class="modal-sizes">
                        <h3>Size</h3>
                        <div class="size-options">
                            ${product.sizes.map(size => `
                                <button class="size-option" data-size="${size}">${size}</button>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="modal-actions">
                        <button class="btn btn-primary add-to-cart-modal" data-id="${product.id}">
                            Add to Cart
                        </button>
                        <button class="btn btn-secondary wishlist-modal" data-id="${product.id}">
                            <i class="far fa-heart"></i> Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Set first size as selected
        const sizeOptions = modalBody.querySelectorAll('.size-option');
        if (sizeOptions.length > 0) {
            sizeOptions[0].classList.add('selected');
        }
        
        modal.style.display = 'flex';
        
        // Close modal when clicking X
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        // Size selection
        modalBody.querySelectorAll('.size-option').forEach(option => {
            option.addEventListener('click', function() {
                modalBody.querySelectorAll('.size-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                this.classList.add('selected');
            });
        });
        
        // Add to cart from modal
        const addToCartBtn = modalBody.querySelector('.add-to-cart-modal');
        addToCartBtn.addEventListener('click', () => {
            const selectedSize = modalBody.querySelector('.size-option.selected').getAttribute('data-size');
            addToCartWithSize(productId, selectedSize);
            modal.style.display = 'none';
        });
    }
    
    function addToCartWithSize(productId, size) {
        const product = products.find(p => p.id === productId);
        if (!product) return;
        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.id === productId && item.selectedSize === size);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1,
                selectedSize: size
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showNotification(`${product.name} (Size: ${size}) added to cart!`);
    }
    
    // Update product count on products page
    function updateProductCount() {
        const productCount = document.getElementById('product-count');
        if (productCount) {
            productCount.textContent = `${products.length} Products`;
        }
    }
    
    // Product Filtering
    const applyFiltersBtn = document.querySelector('.apply-filters');
    const clearFiltersBtn = document.querySelector('.clear-filters');
    const sortSelect = document.querySelector('.sort-select');
    
    if (applyFiltersBtn && allProductsContainer) {
        applyFiltersBtn.addEventListener('click', applyFilters);
    }
    
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearFilters);
    }
    
    if (sortSelect) {
        sortSelect.addEventListener('change', applyFilters);
    }
    
    function applyFilters() {
        let filteredProducts = [...products];
        
        // Category filter
        const selectedCategories = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
            .map(cb => cb.value);
        
        if (selectedCategories.length > 0) {
            filteredProducts = filteredProducts.filter(product => 
                selectedCategories.includes(product.category)
            );
        }
        
        // Price filter
        const maxPrice = parseInt(document.getElementById('price-slider').value);
        filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
        
        // Color filter
        const selectedColors = Array.from(document.querySelectorAll('.color-option.active'))
            .map(btn => btn.getAttribute('data-color'));
        
        if (selectedColors.length > 0) {
            filteredProducts = filteredProducts.filter(product => 
                selectedColors.includes(product.color)
            );
        }
        
        // Sorting
        const sortBy = sortSelect ? sortSelect.value : 'default';
        switch (sortBy) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }
        
        // Update display
        allProductsContainer.innerHTML = filteredProducts.map(createProductCard).join('');
        
        // Update count
        const productCount = document.getElementById('product-count');
        if (productCount) {
            productCount.textContent = `${filteredProducts.length} Products`;
        }
    }
    
    function clearFilters() {
        // Uncheck all checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.checked = false;
        });
        
        // Reset price slider
        document.getElementById('price-slider').value = 200;
        
        // Remove active color classes
        document.querySelectorAll('.color-option').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Reset sort
        if (sortSelect) {
            sortSelect.value = 'default';
        }
        
        // Reapply filters
        applyFilters();
    }
    
    // Color filter buttons
    document.querySelectorAll('.color-option').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
    
    // Price slider update
    const priceSlider = document.getElementById('price-slider');
    if (priceSlider) {
        priceSlider.addEventListener('input', function() {
            document.querySelector('.price-values span:last-child').textContent = `$${this.value}`;
        });
    }
    
    // Initialize the application
    updateCartCount();
});