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
    
    // Initialize any other components that need it
    console.log('All JavaScript functions initialized');
});

// ============================================
// GLOBAL VARIABLES
// ============================================
let lastScroll = 0;
let typingInterval = null;

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
        console.warn('Mobile menu elements not found');
        return;
    }
    
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Toggle mobile menu
        nav.classList.toggle('active');
        this.classList.toggle('active');
        
        // Update icon
        const icon = this.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            
            // Add class to body to prevent scrolling
            body.classList.add('menu-open');
            
            // Ensure header stays in place
            if (!header.classList.contains('scrolled')) {
                body.classList.add('header-scrolled');
            }
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            
            // Remove class from body
            body.classList.remove('menu-open');
            
            // Remove header-scrolled class if header is not scrolled
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
                closeMobileMenu(nav, mobileMenuBtn, header, body);
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
            if (!e.target.closest('nav') && !e.target.closest('.mobile-menu-btn')) {
                closeMobileMenu(nav, mobileMenuBtn, header, body);
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            closeMobileMenu(nav, mobileMenuBtn, header, body);
        }
    });
}

function closeMobileMenu(nav, mobileMenuBtn, header, body) {
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
                if (dropdownMenu.classList.contains('active')) {
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    icon.style.transform = 'rotate(0deg)';
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
    
    window.addEventListener('scroll', () => {
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
    });
}

// ============================================
// TYPING TEXT EFFECT (Index Page) - FIXED VERSION
// ============================================
function initTypingText() {
    const typingElement = document.querySelector('.typed-text');
    const cursorElement = document.querySelector('.cursor');
    
    console.log('Typing text elements:', { typingElement, cursorElement });
    
    if (!typingElement || !cursorElement) {
        console.warn('Typing text or cursor element not found');
        return;
    }
    
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
    
    function type() {
        if (isPaused) return;
        
        const currentText = texts[textIndex];
        
        if (!isDeleting && charIndex < currentText.length) {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else if (isDeleting && charIndex > 0) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(type, deletingSpeed);
        } else if (!isDeleting && charIndex === currentText.length) {
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                isDeleting = true;
                type();
            }, pauseDuration);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        }
    }
    
    // Clear any existing interval
    if (typingInterval) {
        clearInterval(typingInterval);
    }
    
    // Start typing effect
    setTimeout(type, 1000);
    
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
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
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
                const suffix = statNumber.textContent.includes('%') ? '%' : '+';
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        clearInterval(timer);
                        current = target;
                    }
                    statNumber.textContent = suffix === '%' 
                        ? Math.floor(current) + suffix
                        : Math.floor(current) + suffix;
                }, 16);
                
                observer.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// ============================================
// FORM VALIDATION
// ============================================
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const requiredFields = this.querySelectorAll('[required]');
        
        // Reset previous errors
        this.querySelectorAll('.form-control').forEach(field => {
            field.classList.remove('error');
            const errorMsg = field.nextElementSibling;
            if (errorMsg && errorMsg.classList.contains('error-message')) {
                errorMsg.remove();
            }
        });
        
        // Validate required fields
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                showError(field, 'This field is required');
            } else if (field.type === 'email' && !isValidEmail(field.value)) {
                isValid = false;
                showError(field, 'Please enter a valid email address');
            }
        });
        
        if (isValid) {
            // Simulate form submission
            const submitBtn = this.querySelector('[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // In a real application, you would send the data to a server here
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }
    });
    
    function showError(field, message) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.9rem';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .value-card, .service-card, .portfolio-item, .team-member');
    
    if (animatedElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
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
    
    // Initially hide items beyond 12
    Array.from(portfolioItems).slice(currentItems).forEach(item => {
        item.style.display = 'none';
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
    });
    
    loadMoreBtn.addEventListener('click', function() {
        const hiddenItems = Array.from(portfolioItems).slice(currentItems, currentItems + 6);
        
        hiddenItems.forEach(item => {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 100);
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
// ADDITIONAL UTILITY FUNCTIONS
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
// FIX FOR TYPING TEXT HTML STRUCTURE
// ============================================
// If you don't have the typing text HTML structure yet, here's what you need:
/*
<div class="hero-content">
    <h1>Welcome to Dhab Construction</h1>
    <h2>We are <span class="typed-text"></span><span class="cursor">|</span></h2>
</div>
*/
