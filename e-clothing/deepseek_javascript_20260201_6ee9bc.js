// Authentication functionality
document.addEventListener('DOMContentLoaded', function() {
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    const switchFormLinks = document.querySelectorAll('.switch-form');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    // Tab switching
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Update active tab
            authTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding form
            authForms.forEach(form => {
                if (form.getAttribute('data-form') === tabName) {
                    form.classList.add('active');
                } else {
                    form.classList.remove('active');
                }
            });
        });
    });
    
    // Switch between login and register forms
    switchFormLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetForm = this.getAttribute('data-target');
            
            authTabs.forEach(tab => {
                if (tab.getAttribute('data-tab') === targetForm) {
                    tab.click();
                }
            });
        });
    });
    
    // Toggle password visibility
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('#loginEmail').value;
            const password = this.querySelector('#loginPassword').value;
            const remember = this.querySelector('input[name="remember"]').checked;
            
            // Basic validation
            if (!validateEmail(email)) {
                showFormError(this, 'Please enter a valid email address');
                return;
            }
            
            if (password.length < 6) {
                showFormError(this, 'Password must be at least 6 characters');
                return;
            }
            
            // Simulate API call
            simulateLogin(email, password, remember)
                .then(user => {
                    showFormSuccess(this, 'Login successful! Redirecting...');
                    
                    // Save user to localStorage
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('isLoggedIn', 'true');
                    
                    // Redirect after delay
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1500);
                })
                .catch(error => {
                    showFormError(this, error.message);
                });
        });
    }
    
    // Register form submission
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = this.querySelector('#firstName').value.trim();
            const lastName = this.querySelector('#lastName').value.trim();
            const email = this.querySelector('#registerEmail').value;
            const password = this.querySelector('#registerPassword').value;
            const confirmPassword = this.querySelector('#confirmPassword').value;
            const terms = this.querySelector('input[name="terms"]').checked;
            
            // Validation
            if (!firstName || !lastName) {
                showFormError(this, 'Please enter your full name');
                return;
            }
            
            if (!validateEmail(email)) {
                showFormError(this, 'Please enter a valid email address');
                return;
            }
            
            if (!validatePassword(password)) {
                showFormError(this, 'Password must be at least 8 characters with a number and letter');
                return;
            }
            
            if (password !== confirmPassword) {
                showFormError(this, 'Passwords do not match');
                return;
            }
            
            if (!terms) {
                showFormError(this, 'You must agree to the terms and conditions');
                return;
            }
            
            // Simulate API call
            simulateRegister({ firstName, lastName, email, password })
                .then(user => {
                    showFormSuccess(this, 'Account created successfully! Redirecting to login...');
                    
                    // Switch to login form after delay
                    setTimeout(() => {
                        document.querySelector('[data-tab="login"]').click();
                        loginForm.querySelector('#loginEmail').value = email;
                        loginForm.querySelector('#loginPassword').value = '';
                        showFormSuccess(loginForm, 'Please login with your new account');
                    }, 2000);
                })
                .catch(error => {
                    showFormError(this, error.message);
                });
        });
    }
    
    // Social login buttons
    document.querySelectorAll('.btn-social').forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
            alert(`In a real application, this would connect with ${provider} OAuth`);
        });
    });
    
    // Helper functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validatePassword(password) {
        // At least 8 characters with a number and letter
        const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
        return re.test(password);
    }
    
    function showFormError(form, message) {
        // Remove any existing error messages
        const existingError = form.querySelector('.form-error');
        if (existingError) existingError.remove();
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        
        // Add some basic styles
        errorDiv.style.cssText = `
            background: #ffebee;
            color: #c62828;
            padding: 0.75rem 1rem;
            border-radius: var(--radius);
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.95rem;
        `;
        
        // Insert after the first paragraph or at the beginning
        const firstP = form.querySelector('p');
        if (firstP) {
            firstP.parentNode.insertBefore(errorDiv, firstP.nextSibling);
        } else {
            form.insertBefore(errorDiv, form.firstChild);
        }
        
        // Scroll to error
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    function showFormSuccess(form, message) {
        // Remove any existing messages
        const existingMessage = form.querySelector('.form-success');
        if (existingMessage) existingMessage.remove();
        
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        
        successDiv.style.cssText = `
            background: #e8f5e9;
            color: #2e7d32;
            padding: 0.75rem 1rem;
            border-radius: var(--radius);
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.95rem;
        `;
        
        const firstP = form.querySelector('p');
        if (firstP) {
            firstP.parentNode.insertBefore(successDiv, firstP.nextSibling);
        } else {
            form.insertBefore(successDiv, form.firstChild);
        }
    }
    
    // Mock API functions
    function simulateLogin(email, password, remember) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Check for demo credentials
                if (email === 'demo@stylehub.com' && password === 'demo123') {
                    resolve({
                        id: 1,
                        firstName: 'Demo',
                        lastName: 'User',
                        email: email,
                        avatar: null
                    });
                } else if (email === 'test@test.com' && password === 'password123') {
                    resolve({
                        id: 2,
                        firstName: 'Test',
                        lastName: 'User',
                        email: email,
                        avatar: null
                    });
                } else {
                    reject(new Error('Invalid email or password'));
                }
            }, 1000);
        });
    }
    
    function simulateRegister(userData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Check if email already exists
                const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
                const exists = existingUsers.some(u => u.email === userData.email);
                
                if (exists) {
                    reject(new Error('An account with this email already exists'));
                } else {
                    const newUser = {
                        id: Date.now(),
                        ...userData,
                        createdAt: new Date().toISOString()
                    };
                    
                    existingUsers.push(newUser);
                    localStorage.setItem('users', JSON.stringify(existingUsers));
                    
                    resolve({
                        id: newUser.id,
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        email: newUser.email
                    });
                }
            }, 1000);
        });
    }
    
    // Check if user is already logged in
    function checkAuthStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        
        if (isLoggedIn && currentUser) {
            // Update UI for logged in user
            const authLinks = document.querySelectorAll('.auth-link');
            authLinks.forEach(link => {
                link.innerHTML = `
                    <i class="fas fa-user"></i>
                    <span>${currentUser.firstName}</span>
                `;
                link.href = '#';
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    // In a real app, this would show a dropdown menu
                    if (confirm('Do you want to logout?')) {
                        localStorage.removeItem('currentUser');
                        localStorage.removeItem('isLoggedIn');
                        window.location.reload();
                    }
                });
            });
        }
    }
    
    // Initialize auth status check
    checkAuthStatus();
});