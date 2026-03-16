/* ========================================
   Trekking Kilimanjaro Adventure - JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavbar();
    initSmoothScroll();
    initScrollAnimations();
    initMobileMenu();
    initPackageBooking();
    initGallery();
    initReviewForm();
    initBookingForm();
    initPaymentModal();
    initLightbox();
});

/* ========================================
   Navbar Functions
   ======================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    // Add scroll event listener
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Set active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Remove active class from all nav links
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current nav link
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    });
}

/* ========================================
   Smooth Scroll
   ======================================== */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link, .btn[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Account for fixed navbar
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const sampleNoticeHeight = document.querySelector('.sample-notice-banner').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight - sampleNoticeHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navMenu = document.getElementById('nav-menu');
                    const hamburger = document.getElementById('hamburger');
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
}

/* ========================================
   Mobile Menu
   ======================================== */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

/* ========================================
   Scroll Animations
   ======================================== */
function initScrollAnimations() {
    // Create observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.package-card, .why-choose-item, .gallery-item, .review-card');
                children.forEach((child, index) => {
                    child.style.transitionDelay = `${index * 0.1}s`;
                    child.classList.add('visible');
                });
            }
        });
    }, observerOptions);
    
    // Observe all sections that need animation
    const sectionsToAnimate = document.querySelectorAll('.about-content, .packages-grid, .why-choose-grid, .gallery-grid, .reviews-grid, .contact-content, .about-features, .why-choose-item');
    
    sectionsToAnimate.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
    
    // Also observe individual cards/items
    document.querySelectorAll('.package-card, .gallery-item, .review-card, .why-choose-item').forEach(item => {
        item.classList.add('fade-in-section');
        observer.observe(item);
    });
}

/* ========================================
   Package Booking
   ======================================== */
function initPackageBooking() {
    const bookButtons = document.querySelectorAll('.package-book-btn');
    const paymentModal = document.getElementById('payment-modal');
    const modalClose = document.getElementById('modal-close');
    const modalPackageName = document.getElementById('modal-package-name');
    const modalPackagePrice = document.getElementById('modal-package-price');
    const paymentForm = document.getElementById('payment-form');
    
    // Open payment modal
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageName = this.getAttribute('data-package');
            const packagePrice = this.getAttribute('data-price');
            
            modalPackageName.textContent = packageName;
            modalPackagePrice.textContent = formatPrice(packagePrice) + ' TZS';
            
            paymentModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', closePaymentModal);
    }
    
    if (paymentModal) {
        paymentModal.addEventListener('click', function(e) {
            if (e.target === paymentModal) {
                closePaymentModal();
            }
        });
    }
    
    // Handle payment form submission
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate payment processing
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            // Simulate processing delay
            setTimeout(function() {
                closePaymentModal();
                showSuccessModal();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                paymentForm.reset();
            }, 2000);
        });
    }
    
    function closePaymentModal() {
        paymentModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

/* ========================================
   Success Modal
   ======================================== */
function showSuccessModal() {
    const successModal = document.getElementById('success-modal');
    const successClose = document.getElementById('success-close');
    
    successModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    if (successClose) {
        successClose.addEventListener('click', function() {
            successModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close on click outside
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

/* ========================================
   Gallery Functions
   ======================================== */
function initGallery() {
    const filterButtons = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, 50);
                } else {
                    item.classList.remove('visible');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* ========================================
   Lightbox
   ======================================== */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Open lightbox
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const captionTitle = this.querySelector('.gallery-caption h4').textContent;
            const captionText = this.querySelector('.gallery-caption p').textContent;
            
            lightboxImg.src = img.src;
            lightboxCaption.innerHTML = `<h4>${captionTitle}</h4><p>${captionText}</p>`;
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

/* ========================================
   Review Form
   ======================================== */
function initReviewForm() {
    const reviewForm = document.getElementById('review-form');
    const starRating = document.getElementById('star-rating');
    const ratingValue = document.getElementById('rating-value');
    const stars = document.querySelectorAll('.star-rating i');
    
    // Star rating functionality
    if (starRating) {
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                ratingValue.value = rating;
                
                // Update star appearance
                stars.forEach((s, index) => {
                    if (index < rating) {
                        s.classList.remove('far');
                        s.classList.add('fas');
                        s.classList.add('active');
                    } else {
                        s.classList.remove('fas');
                        s.classList.add('far');
                        s.classList.remove('active');
                    }
                });
            });
            
            // Hover effect
            star.addEventListener('mouseenter', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                
                stars.forEach((s, index) => {
                    if (index < rating) {
                        s.classList.add('hover');
                    }
                });
            });
            
            star.addEventListener('mouseleave', function() {
                stars.forEach(s => {
                    s.classList.remove('hover');
                });
            });
        });
    }
    
    // Handle form submission
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('review-name').value;
            const rating = document.getElementById('rating-value').value;
            const message = document.getElementById('review-message').value;
            
            if (rating === '0') {
                alert('Please select a rating');
                return;
            }
            
            // Create new review card
            const reviewsGrid = document.querySelector('.reviews-grid');
            const newReview = document.createElement('div');
            newReview.className = 'review-card fade-in-section';
            
            const starsHTML = generateStarsHTML(rating);
            
            newReview.innerHTML = `
                <div class="review-header">
                    <img src="https://randomuser.me/api/portraits/lego/1.jpg" alt="${name}" class="review-avatar">
                    <div class="review-info">
                        <h4>${name}</h4>
                        <div class="review-stars">
                            ${starsHTML}
                        </div>
                    </div>
                </div>
                <p class="review-text">"${message}"</p>
            `;
            
            // Add new review at the beginning
            reviewsGrid.insertBefore(newReview, reviewsGrid.firstChild);
            
            // Animate the new review
            setTimeout(() => {
                newReview.classList.add('visible');
            }, 100);
            
            // Reset form
            reviewForm.reset();
            ratingValue.value = '0';
            stars.forEach(s => {
                s.classList.remove('fas', 'active');
                s.classList.add('far');
            });
            
            // Show success message
            alert('Thank you for your review! It has been added to the list.');
        });
    }
}

function generateStarsHTML(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

/* ========================================
   Booking Form
   ======================================== */
function initBookingForm() {
    const bookingForm = document.getElementById('booking-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const country = document.getElementById('country').value;
            const package = document.getElementById('package-select').value;
            const message = document.getElementById('message').value;
            
            // Show success message
            alert(`Thank you, ${name}! Your inquiry has been submitted. We will contact you at ${email} shortly regarding your ${getPackageName(package)} trip.`);
            
            // Reset form
            bookingForm.reset();
        });
    }
}

function getPackageName(value) {
    const packages = {
        'machame': 'Machame Route Trek',
        'marangu': 'Marangu Route Trek',
        'lemosho': 'Lemosho Route Trek',
        'dayhike': 'Kilimanjaro Day Hike',
        'materuni': 'Materuni Waterfalls & Coffee Tour'
    };
    return packages[value] || 'trekking';
}

/* ========================================
   Payment Modal
   ======================================== */
function initPaymentModal() {
    const paymentModal = document.getElementById('payment-modal');
    const paymentOptions = document.querySelectorAll('.payment-option input');
    const cardInputs = document.querySelectorAll('#card-name, #card-number, #expiry, #cvv');
    
    // Show/hide card inputs based on payment method
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            const paymentMethod = this.value;
            
            if (paymentMethod === 'card') {
                cardInputs.forEach(input => {
                    input.closest('.form-group').style.display = 'block';
                });
            } else {
                // Hide card inputs for other payment methods
                cardInputs.forEach(input => {
                    input.closest('.form-group').style.display = 'none';
                });
            }
        });
    });
    
    // Format card number
    const cardNumber = document.getElementById('card-number');
    if (cardNumber) {
        cardNumber.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = '';
            
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            
            e.target.value = formattedValue;
        });
    }
    
    // Format expiry date
    const expiry = document.getElementById('expiry');
    if (expiry) {
        expiry.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2);
            }
            
            e.target.value = value;
        });
    }
}

/* ========================================
   Utility Functions
   ======================================== */
function formatPrice(price) {
    return parseInt(price).toLocaleString('en-US');
}

// Add scroll-triggered animations to elements
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.fade-in-section');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('visible');
        }
    });
});

// Initialize animations on page load
window.addEventListener('load', function() {
    // Add initial animation delay for hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
    }
    
    // Trigger initial scroll check
    window.dispatchEvent(new Event('scroll'));
});

/* ========================================
   Additional Interactive Features
   ======================================== */

// Add hover effects to package cards
document.querySelectorAll('.package-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Form validation feedback
document.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('invalid', function() {
        this.style.borderColor = '#e74c3c';
    });
    
    input.addEventListener('valid', function() {
        this.style.borderColor = '#1f4d3b';
    });
    
    input.addEventListener('input', function() {
        if (this.validity.valid) {
            this.style.borderColor = '#ddd';
        }
    });
});

// Smooth scroll for footer links
document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href.startsWith('#')) {
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const sampleNoticeHeight = document.querySelector('.sample-notice-banner').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - sampleNoticeHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Contact form handling
const contactForm = document.querySelector('.booking-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        console.log('Booking inquiry submitted:', data);
        
        // Show confirmation
        alert('Thank you for your inquiry! We will get back to you within 24 hours.');
        
        this.reset();
    });
}

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add parallax effect to hero (optional)
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.scrollY;
        hero.style.backgroundPositionY = (scrolled * 0.5) + 'px';
    }
});

// Console message for demo
console.log('%c🚀 Trekking Kilimanjaro Adventure', 'color: #1f4d3b; font-size: 24px; font-weight: bold;');
console.log('%cSample Website Preview - Content and design for demonstration purposes only.', 'color: #e67e22; font-size: 14px;');
