    // script.js - Gujarat Tours & Travels - Mobile-First Responsive Website

    // WhatsApp redirection function with specific number
    function openWhatsAppWithData(message) {
        console.log('Opening WhatsApp with message:', message);
        const phone = '919909666051'; // Specific WhatsApp number
        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${phone}?text=${encodedMessage}`;
        console.log('WhatsApp URL:', url);
        
        try {
            const newWindow = window.open(url, '_blank');
            if (newWindow) {
                console.log('WhatsApp window opened successfully');
            } else {
                console.error('Failed to open WhatsApp window - popup blocked?');
                // Fallback: try to redirect in same window
                window.location.href = url;
            }
        } catch (error) {
            console.error('Error opening WhatsApp:', error);
            // Fallback: try to redirect in same window
            window.location.href = url;
        }
    }

    // Helper function to format date from input
    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    // Helper function to get form data and create message
    function getFormData(form) {
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            if (value.trim() !== '') {
                data[key] = value.trim();
            }
        }
        
        console.log('Form data captured:', data);
        return data;
    }

    // Helper function to format form data for WhatsApp message
    function formatMessage(service, formData) {
        let message = `${service} Booking Request:\n\n`;
        
        for (let [key, value] of Object.entries(formData)) {
            if (value.trim() !== '') {
                // Convert field names to readable format
                const fieldName = key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                
                // Format date fields
                if (key === 'date' || key === 'start-date') {
                    message += `${fieldName}: ${formatDate(value)}\n`;
                } else {
                    message += `${fieldName}: ${value}\n`;
                }
            }
        }
        
        message += '\nThank you for choosing Gujarat Tours & Travels!';
        console.log('Formatted message:', message);
        return message;
    }

    // Form validation and enhancement
    function enhanceFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, select, textarea');
            
            inputs.forEach(input => {
                // Add visual feedback on focus
                input.addEventListener('focus', function() {
                    this.parentElement.style.transform = 'scale(1.02)';
                    this.parentElement.style.transition = 'transform 0.2s ease';
                });
                
                input.addEventListener('blur', function() {
                    this.parentElement.style.transform = 'scale(1)';
                });
                
                // Phone number validation and formatting
                if (input.type === 'tel') {
                    input.addEventListener('input', function() {
                        this.value = this.value.replace(/[^0-9+\-\s()]/g, '');
                        
                        // Auto-format phone number
                        let value = this.value.replace(/\D/g, '');
                        if (value.length > 0) {
                            if (value.length <= 3) {
                                value = `(${value}`;
                            } else if (value.length <= 6) {
                                value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                            } else {
                                value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                            }
                        }
                        this.value = value;
                    });
                }
                
                // Date validation (no past dates)
                if (input.type === 'date') {
                    input.addEventListener('change', function() {
                        const selectedDate = new Date(this.value);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        
                        if (selectedDate < today) {
                            showErrorMessage('Please select a future date.');
                            this.value = '';
                            this.focus();
                        }
                    });
                }
                
                // Number input validation
                if (input.type === 'number') {
                    input.addEventListener('input', function() {
                        const min = parseInt(this.getAttribute('min'));
                        const max = parseInt(this.getAttribute('max'));
                        const value = parseInt(this.value);
                        
                        if (min && value < min) {
                            this.value = min;
                        }
                        if (max && value > max) {
                            this.value = max;
                        }
                    });
                }
            });
        });
    }

    // Form validation function
    function validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#ef4444';
                field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
                
                // Reset styling after 3 seconds
                setTimeout(() => {
                    field.style.borderColor = '';
                    field.style.boxShadow = '';
                }, 3000);
            } else {
                field.style.borderColor = '';
                field.style.boxShadow = '';
            }
        });
        
        if (!isValid) {
            showErrorMessage('Please fill in all required fields.');
        }
        
        return isValid;
    }

    // Success message function
    function showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;
        successDiv.innerHTML = `✅ ${message}`;
        
        // Add animation styles
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(successDiv);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            successDiv.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                successDiv.remove();
            }, 300);
        }, 5000);
    }

    // Error message function
    function showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ef4444;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;
        errorDiv.innerHTML = `❌ ${message}`;
        
        document.body.appendChild(errorDiv);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            errorDiv.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                errorDiv.remove();
            }, 300);
        }, 5000);
    }

    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Intersection Observer for animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe service cards and features
        document.querySelectorAll('.service-card, .feature').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Initialize all functions when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM loaded, initializing forms...');
        
        // Mobile Navigation Toggle - Moved inside DOMContentLoaded
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event bubbling
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                // Animate hamburger bars
                const bars = hamburger.querySelectorAll('.bar');
                if (hamburger.classList.contains('active')) {
                    bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    bars[1].style.opacity = '0';
                    bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    bars[0].style.transform = 'none';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'none';
                }
            });

            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Reset hamburger bars
                const bars = hamburger.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }));

            // Close mobile menu when clicking outside - with improved logic
            document.addEventListener('click', (e) => {
                // Only close if menu is active and click is outside both hamburger and nav menu
                if (navMenu.classList.contains('active') && 
                    !hamburger.contains(e.target) && 
                    !navMenu.contains(e.target)) {
                    
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    
                    // Reset hamburger bars
                    const bars = hamburger.querySelectorAll('.bar');
                    bars[0].style.transform = 'none';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'none';
                }
            });

            // Prevent clicks inside nav menu from closing it
            navMenu.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }

        // Make site title clickable to redirect to homepage
        const siteTitle = document.querySelector('.nav-logo h2');
        if (siteTitle) {
            siteTitle.style.cursor = 'pointer';
            siteTitle.addEventListener('click', function() {
                window.location.href = 'index.html';
            });
        }
        
        enhanceFormValidation();
        initSmoothScrolling();
        initScrollAnimations();
        
        // CAB BOOKING FORM
        const cabForm = document.getElementById('cab-booking-form');
        console.log('Cab form found:', cabForm);
        if (cabForm) {
            cabForm.addEventListener('submit', function(e) {
                console.log('Cab form submitted');
                e.preventDefault();
                
                if (validateForm(this)) {
                    const formData = getFormData(this);
                    const message = formatMessage('🚗 Cab', formData);
                    
                    // Here you could send data to backend (e.g., save to Excel)
                    // Example: saveToExcel('cab_bookings', formData);
                    
                    openWhatsAppWithData(message);
                    showSuccessMessage('Cab booking request sent! Check WhatsApp for confirmation.');
                    this.reset();
                }
            });
        }

        // BUS BOOKING FORM
        const busForm = document.getElementById('bus-booking-form');
        console.log('Bus form found:', busForm);
        if (busForm) {
            busForm.addEventListener('submit', function(e) {
                console.log('Bus form submitted');
                e.preventDefault();
                
                if (validateForm(this)) {
                    const formData = getFormData(this);
                    const message = formatMessage('🚌 Bus Ticket', formData);
                    
                    // Here you could send data to backend (e.g., save to Excel)
                    // Example: saveToExcel('bus_bookings', formData);
                    
                    openWhatsAppWithData(message);
                    showSuccessMessage('Bus ticket booking request sent! Check WhatsApp for confirmation.');
                    this.reset();
                }
            });
        }

        // TRAIN BOOKING FORM
        const trainForm = document.getElementById('train-booking-form');
        console.log('Train form found:', trainForm);
        if (trainForm) {
            trainForm.addEventListener('submit', function(e) {
                console.log('Train form submitted');
                e.preventDefault();
                
                if (validateForm(this)) {
                    const formData = getFormData(this);
                    const message = formatMessage('🚄 Train Ticket', formData);
                    
                    // Here you could send data to backend (e.g., save to Excel)
                    // Example: saveToExcel('train_bookings', formData);
                    
                    openWhatsAppWithData(message);
                    showSuccessMessage('Train ticket booking request sent! Check WhatsApp for confirmation.');
                    this.reset();
                }
            });
        }

        // FLIGHT BOOKING FORM
        const flightForm = document.getElementById('flight-booking-form');
        console.log('Flight form found:', flightForm);
        if (flightForm) {
            flightForm.addEventListener('submit', function(e) {
                console.log('Flight form submitted');
                e.preventDefault();
                
                if (validateForm(this)) {
                    const formData = getFormData(this);
                    const message = formatMessage('✈️ Flight Ticket', formData);
                    
                    // Here you could send data to backend (e.g., save to Excel)
                    // Example: saveToExcel('flight_bookings', formData);
                    
                    openWhatsAppWithData(message);
                    showSuccessMessage('Flight ticket booking request sent! Check WhatsApp for confirmation.');
                    this.reset();
                }
            });
        }

        // HOLIDAY PACKAGES FORM
        const holidayForm = document.getElementById('holiday-booking-form');
        console.log('Holiday form found:', holidayForm);
        if (holidayForm) {
            holidayForm.addEventListener('submit', function(e) {
                console.log('Holiday form submitted');
                e.preventDefault();
                
                if (validateForm(this)) {
                    const formData = getFormData(this);
                    const message = formatMessage('🏖️ Holiday Package', formData);
                    
                    // Here you could send data to backend (e.g., save to Excel)
                    // Example: saveToExcel('holiday_enquiries', formData);
                    
                    openWhatsAppWithData(message);
                    showSuccessMessage('Holiday package enquiry sent! Check WhatsApp for confirmation.');
                    this.reset();
                }
            });
        }
        
        // Add touch feedback for mobile
        if ('ontouchstart' in window) {
            document.querySelectorAll('.btn, .nav-link, .service-card').forEach(el => {
                el.addEventListener('touchstart', function() {
                    this.style.transform = 'scale(0.98)';
                });
                
                el.addEventListener('touchend', function() {
                    this.style.transform = '';
                });
            });
        }
        
        console.log('All forms initialized');
    });

    // Backend integration placeholder functions
    /*
    function saveToExcel(sheetName, formData) {
        // This is where you would integrate with your backend
        // Example implementation:
        
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Add timestamp and metadata
        data.timestamp = new Date().toISOString();
        data.source = 'website';
        data.userAgent = navigator.userAgent;
        data.pageUrl = window.location.href;
        
        // Send to backend API
        fetch('/api/save-booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sheet: sheetName,
                data: data
            })
        })
        .then(response => response.json())
        .then(data => console.log('Saved to Excel:', data))
        .catch(error => {
            console.error('Error saving to Excel:', error);
            // Fallback: store in localStorage
            const bookings = JSON.parse(localStorage.getItem('pendingBookings') || '[]');
            bookings.push({ sheet: sheetName, data: data, timestamp: Date.now() });
            localStorage.setItem('pendingBookings', JSON.stringify(bookings));
        });
    }

    // Sync pending bookings when connection is restored
    window.addEventListener('online', function() {
        const pendingBookings = JSON.parse(localStorage.getItem('pendingBookings') || '[]');
        if (pendingBookings.length > 0) {
            pendingBookings.forEach(booking => {
                saveToExcel(booking.sheet, new FormData(Object.entries(booking.data)));
            });
            localStorage.removeItem('pendingBookings');
        }
    });
    */ 