// ============================================
// DOM READY & INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initTypingEffect();
    initReadMoreButtons();
    initDropdowns();
    initMobileMenu();
    initSmoothScroll();
    initHeaderScroll();
    initContactForm();
    initPortfolioFilter();
    initFormValidation();
    initStatsCounter();
});

// ============================================
// TYPING EFFECT FOR HERO SECTION
// ============================================
function initTypingEffect() {
    const typedTextElement = document.querySelector('.typed-text');
    const cursorElement = document.querySelector('.cursor');
    
    if (!typedTextElement || !cursorElement) return;
    
    const texts = [
        "Building the Future of South Sudan",
        "Quality Construction Solutions",
        "Infrastructure Development Experts",
        "Your Trusted Construction Partner"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isTypingPaused = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (!isDeleting && charIndex < currentText.length) {
            // Typing forward
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(type, 100);
        } else if (isDeleting && charIndex > 0) {
            // Deleting backward
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(type, 50);
        } else {
            // Switch between typing and deleting
            isDeleting = !isDeleting;
            
            if (!isDeleting) {
                textIndex = (textIndex + 1) % texts.length;
            }
            
            // Pause at the end of typing and before deleting
            const pauseTime = isDeleting ? 1500 : 500;
            isTypingPaused = true;
            
            setTimeout(() => {
                isTypingPaused = false;
                type();
            }, pauseTime);
        }
    }
    
    // Cursor blinking effect
    function blinkCursor() {
        cursorElement.style.opacity = cursorElement.style.opacity === '0' ? '1' : '0';
        setTimeout(blinkCursor, isTypingPaused ? 700 : 500);
    }
    
    // Start effects
    type();
    blinkCursor();
}

// ============================================
// READ MORE / LESS FUNCTIONALITY FOR BLOG
// ============================================
function initReadMoreButtons() {
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        const readMoreBtn = card.querySelector('.read-more');
        const fullContent = card.querySelector('.blog-full-content');
        const excerpt = card.querySelector('.blog-excerpt');
        
        if (!readMoreBtn || !fullContent || !excerpt) return;
        
        readMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (card.classList.contains('expanded')) {
                // Collapse content
                card.classList.remove('expanded');
                fullContent.style.display = 'none';
                excerpt.style.display = 'block';
                this.innerHTML = 'Read Full Article <i class="fas fa-arrow-right"></i>';
                
                // Scroll to top of card smoothly
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                // Expand content
                card.classList.add('expanded');
                fullContent.style.display = 'block';
                excerpt.style.display = 'none';
                this.innerHTML = 'Show Less <i class="fas fa-arrow-up"></i>';
                
                // Smooth scroll to expanded content
                const offset = 100;
                const cardTop = card.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: cardTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// DROPDOWN FUNCTIONALITY
// ============================================
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (!toggle || !menu) return;
        
        // Click handler for dropdown toggle
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) { // Mobile only
                e.preventDefault();
                e.stopPropagation();
                
                const isActive = dropdown.classList.contains('active');
                
                // Close all other dropdowns
                document.querySelectorAll('.dropdown.active').forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
                
                // Close dropdown when clicking outside
                if (!isActive) {
                    setTimeout(() => {
                        document.addEventListener('click', closeDropdownOnClickOutside);
                    }, 10);
                }
            }
        });
        
        // Hover functionality for desktop
        if (window.innerWidth > 992) {
            dropdown.addEventListener('mouseenter', function() {
                this.classList.add('active');
                menu.style.opacity = '1';
                menu.style.visibility = 'visible';
                menu.style.transform = 'translateY(0)';
            });
            
            dropdown.addEventListener('mouseleave', function() {
                this.classList.remove('active');
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(20px)';
            });
        }
    });
    
    // Close dropdowns on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}

function closeDropdownOnClickOutside(e) {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown.active').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
        document.removeEventListener('click', closeDropdownOnClickOutside);
    }
}

// ============================================
// MOBILE MENU FUNCTIONALITY
// ============================================
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');
    
    if (!mobileMenuBtn || !nav) return;
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        
        // Toggle menu icon
        const icon = this.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                nav.classList.remove('active');
                document.body.style.overflow = '';
                mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
                
                // Close any open dropdowns
                document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992 && 
            !e.target.closest('nav') && 
            !e.target.closest('.mobile-menu-btn') && 
            nav.classList.contains('active')) {
            nav.classList.remove('active');
            document.body.style.overflow = '';
            mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
        }
    });
}

// ============================================
// SMOOTH SCROLLING
// ============================================
function initSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's a dropdown toggle or empty href
            if (href === '#' || this.classList.contains('dropdown-toggle')) {
                return;
            }
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                history.pushState(null, null, href);
            }
        });
    });
}

// ============================================
// HEADER SCROLL EFFECT
// ============================================
function initHeaderScroll() {
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class based on scroll position
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll direction (optional)
        if (scrollTop > 500) {
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop;
    });
}

// ============================================
// CONTACT FORM HANDLING
// ============================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        if (!validateForm(this)) {
            e.preventDefault();
            return;
        }
        
        // Add loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Netlify will handle the form submission
        // The form will reset automatically after successful submission
        
        // Reset button state after 5 seconds (in case submission fails)
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 5000);
    });
}

// ============================================
// FORM VALIDATION
// ============================================
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Real-time validation
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Clear error on focus
            input.addEventListener('focus', function() {
                clearError(this);
            });
        });
    });
}

function validateField(field) {
    clearError(field);
    
    // Required fields
    if (field.hasAttribute('required') && !field.value.trim()) {
        showError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            showError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    return true;
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function showError(field, message) {
    field.classList.add('error');
    
    let errorElement = field.parentElement.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        field.parentElement.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.color = '#e74c3c';
    errorElement.style.fontSize = '0.85rem';
    errorElement.style.marginTop = '5px';
}

function clearError(field) {
    field.classList.remove('error');
    
    const errorElement = field.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// ============================================
// PORTFOLIO FILTER
// ============================================
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (!filterBtns.length || !portfolioItems.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ============================================
// STATS COUNTER ANIMATION
// ============================================
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    if (!statNumbers.length) return;
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const targetCount = parseInt(statNumber.getAttribute('data-count'));
                
                // Check if already animated
                if (statNumber.classList.contains('counted')) return;
                
                animateCounter(statNumber, targetCount);
                statNumber.classList.add('counted');
                
                // Stop observing after animation
                observer.unobserve(statNumber);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(statNumber => {
        observer.observe(statNumber);
    });
}

function animateCounter(element, target) {
    const duration = 2000; // 2 seconds
    const step = 25; // Update every 25ms
    const totalSteps = duration / step;
    const increment = target / totalSteps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format number with commas if needed
        element.textContent = Math.floor(current).toLocaleString();
    }, step);
}

// ============================================
// IMAGE LAZY LOADING
// ============================================
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ============================================
// SERVICE PAGE DROPDOWN CONTENT
// ============================================
function initServiceContentToggle() {
    const serviceLinks = document.querySelectorAll('.service-link');
    
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const serviceCard = this.closest('.service-card');
            const serviceId = serviceCard ? serviceCard.id : null;
            
            if (serviceId) {
                // If we're on the services page, scroll to the service
                const targetSection = document.getElementById(serviceId);
                if (targetSection) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// WINDOW LOAD EVENT
// ============================================
window.addEventListener('load', function() {
    // Remove preloader if exists
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Initialize service content toggle
    initServiceContentToggle();
    
    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
});

// ============================================
// ERROR HANDLING
// ============================================
window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.error);
});

// ============================================
// BROWSER COMPATIBILITY
// ============================================
// Polyfill for older browsers
if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

if (!Element.prototype.matches) {
    Element.prototype.matches = 
        Element.prototype.matchesSelector || 
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector || 
        Element.prototype.oMatchesSelector || 
        Element.prototype.webkitMatchesSelector ||
        function(s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;
        };
}
