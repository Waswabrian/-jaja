// Contact page functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    // FAQ Accordion
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = Object.fromEntries(formData);
            
            // Validate form
            if (!validateContactForm(formObject)) {
                return;
            }
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Show success message
                showContactSuccess();
                
                // Reset form
                this.reset();
            }, 2000);
        });
    }
    
    function validateContactForm(data) {
        // Clear previous errors
        clearContactErrors();
        
        let isValid = true;
        const errors = [];
        
        // Name validation
        if (!data.name || data.name.trim().length < 2) {
            errors.push({ field: 'name', message: 'Please enter your full name' });
            isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            errors.push({ field: 'email', message: 'Please enter a valid email address' });
            isValid = false;
        }
        
        // Subject validation
        if (!data.subject || data.subject.trim().length < 5) {
            errors.push({ field: 'subject', message: 'Subject must be at least 5 characters' });
            isValid = false;
        }
        
        // Message validation
        if (!data.message || data.message.trim().length < 10) {
            errors.push({ field: 'message', message: 'Message must be at least 10 characters' });
            isValid = false;
        }
        
        // Show errors if any
        if (errors.length > 0) {
            showContactErrors(errors);
        }
        
        return isValid;
    }
    
    function showContactErrors(errors) {
        errors.forEach(error => {
            const input = document.getElementById(error.field);
            const formGroup = input.closest('.form-group');
            
            // Add error class to input
            input.classList.add('error');
            
            // Create error message
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = error.message;
            errorElement.style.cssText = `
                color: var(--secondary);
                font-size: 0.875rem;
                margin-top: 0.25rem;
            `;
            
            formGroup.appendChild(errorElement);
        });
        
        // Scroll to first error
        const firstError = document.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    function clearContactErrors() {
        // Remove error classes
        document.querySelectorAll('.error').forEach(el => {
            el.classList.remove('error');
        });
        
        // Remove error messages
        document.querySelectorAll('.error-message').forEach(el => {
            el.remove();
        });
    }
    
    function showContactSuccess() {
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'contact-success';
        successDiv.innerHTML = `
            <div style="
                background: #e8f5e9;
                color: #2e7d32;
                padding: 1.5rem;
                border-radius: var(--radius);
                text-align: center;
                margin-top: 1.5rem;
                border: 1px solid #c8e6c9;
            ">
                <i class="fas fa-check-circle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <h3 style="margin-bottom: 0.5rem; color: #2e7d32;">Message Sent Successfully!</h3>
                <p style="margin-bottom: 0;">Thank you for contacting us. We'll get back to you within 24 hours.</p>
            </div>
        `;
        
        // Insert after form
        contactForm.parentNode.insertBefore(successDiv, contactForm.nextSibling);
        
        // Scroll to success message
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
    
    // Add input event listeners to clear errors on focus
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.classList.remove('error');
            const errorMessage = this.closest('.form-group').querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        });
    });
});