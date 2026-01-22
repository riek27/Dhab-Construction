// ============================================
// DOM CONTENT LOADED
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    // Initialize all functions
    initMobileMenu();
    initHeaderScroll();
    initTypingText();
    initPortfolioFilter();
    initBlogReadMore();
    initStatsCounter();
    initFormValidation();
    initAnimations();
    initSmoothScroll();
    initDropdownMobile();
    updateCurrentYear();
    initLoadMore();
    
    console.log('All JavaScript functions initialized');
});

// ============================================
// GLOBAL VARIABLES
// ============================================
let lastScroll = 0;
let typingInterval = null;
let currentTypingTimeout = null;

// ============================================
// MOBILE MENU TOGGLE WITH FIXED HEADER COMPENSATION
// ============================================
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a:not(.dropdown-toggle)');
    const body = document.body;
    const header = document.querySelector('header');
    
    if (!mobileMenuBtn || !nav) {
        console.log('Mobile menu elements not found');
        return;
    }
    
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Toggle mobile menu
        const isActive = nav.classList.toggle('active');
        this.classList.toggle('active');
        
        // Update icon
        const icon = this.querySelector('i');
        if (isActive) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            body.classList.add('menu-open');
            
            // Ensure header stays in place
            if (!header.classList.contains('scrolled')) {
                body.classList.add('header-scrolled');
            }
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            body.classList.remove('menu-open');
            
            if (!header.classList.contains('scrolled')) {
                body.classList.remove('header-scrolled');
            }
            
            // Close all dropdowns when closing mobile menu
            document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
                toggle.classList.remove('active');
            });
        }
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                closeMobileMenu();
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
            if (!e.target.closest('nav') && !e.target.closest('.mobile-menu-btn')) {
                closeMobileMenu();
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth > 992) {
            closeMobileMenu();
        }
    }, 250));
    
    function closeMobileMenu() {
        nav.classList.remove('active');
        if (mobileMenuBtn) {
            mobileMenuBtn.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
        body.classList.remove('menu-open');
        
        if (!header.classList.contains('scrolled')) {
            body.classList.remove('header-scrolled');
        }
        
        // Close all dropdowns
        document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            toggle.classList.remove('active');
        });
    }
}

// ============================================
// DROPDOWN MOBILE FUNCTIONALITY
// ============================================
function initDropdownMobile() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    if (dropdownToggles.length === 0) return;
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdownMenu = this.nextElementSibling;
                if (!dropdownMenu) return;
                
                const isActive = dropdownMenu.classList.contains('active');
                
                // Close all other dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    if (menu !== dropdownMenu) {
                        menu.classList.remove('active');
                    }
                });
                
                document.querySelectorAll('.dropdown-toggle').forEach(toggleBtn => {
                    if (toggleBtn !== this) {
                        toggleBtn.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdownMenu.classList.toggle('active');
                this.classList.toggle('active');
                
                // Rotate icon
                const icon = this.querySelector('i');
                if (icon) {
                    if (!isActive) {
                        icon.style.transform = 'rotate(180deg)';
                    } else {
                        icon.style.transform = 'rotate(0deg)';
                    }
                }
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.classList.remove('active');
                });
                document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
                    toggle.classList.remove('active');
                    const icon = toggle.querySelector('i');
                    if (icon) {
                        icon.style.transform = 'rotate(0deg)';
                    }
                });
            }
        }
    });
    
    // Handle dropdown on desktop (hover)
    if (window.innerWidth > 992) {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('mouseenter', () => {
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.style.opacity = '1';
                    dropdownMenu.style.visibility = 'visible';
                    dropdownMenu.style.transform = 'translateY(0)';
                    dropdownMenu.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                }
            });
            
            dropdown.addEventListener('mouseleave', () => {
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.style.opacity = '0';
                    dropdownMenu.style.visibility = 'hidden';
                    dropdownMenu.style.transform = 'translateY(20px)';
                }
            });
        });
    }
}

// ============================================
// HEADER SCROLL EFFECT
// ============================================
function initHeaderScroll() {
    const header = document.querySelector('header');
    const body = document.body;
    
    if (!header) return;
    
    let ticking = false;
    
    function updateHeader() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
            body.classList.add('header-scrolled');
            
            if (currentScroll > lastScroll && currentScroll > 200) {
                header.style.transform = 'translateY(-100%)';
                header.style.transition = 'transform 0.3s ease-in-out';
            } else {
                header.style.transform = 'translateY(0)';
                header.style.transition = 'transform 0.3s ease-in-out';
            }
        } else {
            header.classList.remove('scrolled');
            if (!document.querySelector('nav')?.classList.contains('active')) {
                body.classList.remove('header-scrolled');
            }
        }
        
        lastScroll = currentScroll;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

// ============================================
// TYPING TEXT EFFECT - FIXED AND SMOOTH
// ============================================
function initTypingText() {
    const typingElement = document.querySelector('.typed-text');
    const cursorElement = document.querySelector('.cursor');
    
    if (!typingElement || !cursorElement) {
        console.log('Typing text elements not found on this page');
        return;
    }
    
    console.log('Initializing typing text effect...');
    
    const texts = [
        "Building the Future of South Sudan",
        "Your Partner in Infrastructural Development",
        "Innovative Construction Solutions",
        "Timely Delivery, Every Time",
        "Residential & Commercial Projects",
        "Shaping Tomorrow's Infrastructure",
        "Invest. Build. Grow."
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseDuration = 2000;
    
    // Clear any existing timeout
    if (currentTypingTimeout) {
        clearTimeout(currentTypingTimeout);
    }
    
    function type() {
        if (isPaused) return;
        
        const currentText = texts[textIndex];
        
        if (!isDeleting && charIndex < currentText.length) {
            // Typing forward
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            currentTypingTimeout = setTimeout(type, typingSpeed);
        } else if (isDeleting && charIndex > 0) {
            // Deleting
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            currentTypingTimeout = setTimeout(type, deletingSpeed);
        } else if (!isDeleting && charIndex === currentText.length) {
            // Pause at end of typing
            isPaused = true;
            currentTypingTimeout = setTimeout(() => {
                isPaused = false;
                isDeleting = true;
                type();
            }, pauseDuration);
        } else if (isDeleting && charIndex === 0) {
            // Move to next text
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            currentTypingTimeout = setTimeout(type, 500);
        }
    }
    
    // Clear any existing cursor interval
    if (typingInterval) {
        clearInterval(typingInterval);
    }
    
    // Start typing effect
    currentTypingTimeout = setTimeout(() => {
        // Clear initial text
        typingElement.textContent = '';
        type();
    }, 1000);
    
    // Add cursor blink animation
    typingInterval = setInterval(() => {
        if (cursorElement) {
            cursorElement.style.opacity = cursorElement.style.opacity === '0' ? '1' : '0';
        }
    }, 500);
}

// ============================================
// PORTFOLIO FILTER
// ============================================
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    setTimeout(() => {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ============================================
// BLOG READ MORE
// ============================================
function initBlogReadMore() {
    const readMoreButtons = document.querySelectorAll('.read-more');
    
    if (readMoreButtons.length === 0) return;
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const blogCard = this.closest('.blog-card');
            if (!blogCard) return;
            
            const fullContent = blogCard.querySelector('.blog-full-content');
            const excerpt = blogCard.querySelector('.blog-excerpt');
            
            if (!fullContent || !excerpt) return;
            
            if (fullContent.style.display === 'block') {
                fullContent.style.display = 'none';
                excerpt.style.display = 'block';
                this.innerHTML = 'Read More <i class="fas fa-chevron-down"></i>';
            } else {
                fullContent.style.display = 'block';
                excerpt.style.display = 'none';
                this.innerHTML = 'Read Less <i class="fas fa-chevron-up"></i>';
            }
        });
    });
}

// ============================================
// STATS COUNTER ANIMATION
// ============================================
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    if (statNumbers.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-count'));
                const suffix = statNumber.textContent.includes('%') ? '%' : '';
                const duration = 2000;
                const startTime = Date.now();
                
                function updateCounter() {
                    const currentTime = Date.now();
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function for smooth animation
                    const easeOutQuad = t => t * (2 - t);
                    const current = Math.floor(easeOutQuad(progress) * target);
                    
                    statNumber.textContent = current + (suffix || '');
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        statNumber.textContent = target + (suffix || '');
                    }
                }
                
                updateCounter();
                observer.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5, rootMargin: '50px' });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// ============================================
// FORM VALIDATION
// ============================================
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Real-time validation
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearError(this);
        });
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const requiredFields = this.querySelectorAll('[required]');
        
        // Reset previous errors
        this.querySelectorAll('.form-control').forEach(field => {
            clearError(field);
        });
        
        // Validate required fields
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Simulate form submission
            const submitBtn = this.querySelector('[type="submit"]');
            const originalText = submitBtn.innerHTML;
            const originalBgColor = submitBtn.style.backgroundColor;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            submitBtn.style.backgroundColor = '#2ecc71';
            
            // In a real application, you would send the data to a server here
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = originalBgColor;
            }, 1500);
        }
    });
    
    function validateField(field) {
        let isValid = true;
        clearError(field);
        
        if (field.hasAttribute('required') && !field.value.trim()) {
            showError(field, 'This field is required');
            isValid = false;
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            showError(field, 'Please enter a valid email address');
            isValid = false;
        } else if (field.type === 'tel' && field.value && !isValidPhone(field.value)) {
            showError(field, 'Please enter a valid phone number');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(field, message) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
    
    function clearError(field) {
        field.classList.remove('error');
        const errorMsg = field.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('error-message')) {
            errorMsg.remove();
        }
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function isValidPhone(phone) {
        const re = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        return re.test(phone);
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .value-card, .service-card, .portfolio-item, .team-member, .stat-item');
    
    if (animatedElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, entry.target.dataset.delay || 0);
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (window.innerWidth <= 992) {
                    const nav = document.querySelector('nav');
                    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                    const body = document.body;
                    const header = document.querySelector('header');
                    
                    if (nav.classList.contains('active')) {
                        nav.classList.remove('active');
                        mobileMenuBtn.classList.remove('active');
                        const icon = mobileMenuBtn.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                        body.classList.remove('menu-open');
                        
                        if (!header.classList.contains('scrolled')) {
                            body.classList.remove('header-scrolled');
                        }
                    }
                }
                
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// LOAD MORE PORTFOLIO ITEMS
// ============================================
function initLoadMore() {
    const loadMoreBtn = document.querySelector('.btn-load-more');
    if (!loadMoreBtn) return;
    
    let currentItems = 12;
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const totalItems = portfolioItems.length;
    
    // Initially hide items beyond 12 if they exist
    if (portfolioItems.length > 12) {
        Array.from(portfolioItems).slice(currentItems).forEach(item => {
            item.style.display = 'none';
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
        });
        
        loadMoreBtn.style.display = 'block';
    } else {
        loadMoreBtn.style.display = 'none';
    }
    
    loadMoreBtn.addEventListener('click', function() {
        const hiddenItems = Array.from(portfolioItems).slice(currentItems, currentItems + 6);
        
        hiddenItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            }, index * 100);
        });
        
        currentItems += 6;
        
        if (currentItems >= totalItems) {
            this.style.display = 'none';
        }
    });
}

// ============================================
// CURRENT YEAR IN FOOTER
// ============================================
function updateCurrentYear() {
    const yearElements = document.querySelectorAll('.copyright p');
    if (yearElements.length === 0) return;
    
    const currentYear = new Date().getFullYear();
    yearElements.forEach(element => {
        element.innerHTML = element.innerHTML.replace('2026', currentYear);
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for resize events
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
// PREVENT BODY SCROLL WHEN MOBILE MENU IS OPEN
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const originalOverflow = body.style.overflow;
    
    // Watch for menu-open class changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                if (body.classList.contains('menu-open')) {
                    body.style.overflow = 'hidden';
                } else {
                    body.style.overflow = originalOverflow || '';
                }
            }
        });
    });
    
    observer.observe(body, { attributes: true });
});

// ============================================
// WINDOW RESIZE HANDLER
// ============================================
window.addEventListener('resize', debounce(function() {
    // Re-initialize dropdown for desktop hover effect
    if (window.innerWidth > 992) {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            if (dropdownMenu) {
                dropdownMenu.style.opacity = '';
                dropdownMenu.style.visibility = '';
                dropdownMenu.style.transform = '';
                dropdownMenu.style.transition = '';
            }
        });
    }
}, 250));

// ============================================
// ADDITIONAL CSS FOR TYPING EFFECT (if needed)
// ============================================
// Add this CSS to your style.css for better typing effect
/*
.typing-container {
    display: inline-block;
    position: relative;
}

.typed-text {
    color: var(--gold);
    font-weight: 700;
    min-height: 2.5em;
    display: inline-block;
}

.cursor {
    display: inline-block;
    width: 3px;
    background-color: var(--gold);
    margin-left: 2px;
    animation: blink 1s infinite;
    height: 1.2em;
    vertical-align: middle;
}

@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}
*/

console.log('Script loaded successfully');
