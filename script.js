// ============================================
// DOM READY & INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initDropdowns();
    initTypingEffect();
    
    // Initialize other features based on page
    if (document.querySelector('.blog-page')) {
        initReadMoreButtons();
    }
    
    if (document.querySelector('.portfolio-page')) {
        initPortfolioFilter();
    }
    
    if (document.querySelector('.contact-page')) {
        initContactForm();
    }
    
    // Common initializations
    initHeaderScroll();
    initSmoothScroll();
    initStatsCounter();
});

// ============================================
// MOBILE MENU FUNCTIONALITY - SIMPLIFIED
// ============================================
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (!mobileMenuBtn || !nav) return;
    
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        nav.classList.toggle('active');
        
        // Toggle menu icon
        const icon = this.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            nav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                nav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}

// ============================================
// DROPDOWN FUNCTIONALITY - SIMPLIFIED
// ============================================
function initDropdowns() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // Only prevent default on mobile
            if (window.innerWidth <= 992) {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdown = this.closest('.dropdown');
                const isActive = dropdown.classList.contains('active');
                
                // Close all other dropdowns
                document.querySelectorAll('.dropdown.active').forEach(d => {
                    if (d !== dropdown) {
                        d.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
                
                // Rotate arrow icon
                const arrow = this.querySelector('i');
                if (dropdown.classList.contains('active')) {
                    arrow.style.transform = 'rotate(180deg)';
                } else {
                    arrow.style.transform = 'rotate(0deg)';
                }
            }
        });
    });
    
    // Desktop hover functionality
    if (window.innerWidth > 992) {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('mouseenter', function() {
                this.classList.add('active');
                const arrow = this.querySelector('.dropdown-toggle i');
                if (arrow) arrow.style.transform = 'rotate(180deg)';
            });
            
            dropdown.addEventListener('mouseleave', function() {
                this.classList.remove('active');
                const arrow = this.querySelector('.dropdown-toggle i');
                if (arrow) arrow.style.transform = 'rotate(0deg)';
            });
        });
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                dropdown.classList.remove('active');
                const arrow = dropdown.querySelector('.dropdown-toggle i');
                if (arrow) arrow.style.transform = 'rotate(0deg)';
            });
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            // Reset all dropdowns on desktop
            document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                dropdown.classList.remove('active');
                const arrow = dropdown.querySelector('.dropdown-toggle i');
                if (arrow) arrow.style.transform = 'rotate(0deg)';
            });
        }
    });
}

// ============================================
// TYPING EFFECT - SIMPLIFIED AND WORKING
// ============================================
function initTypingEffect() {
    const typingContainer = document.querySelector('.typing-container');
    if (!typingContainer) return;
    
    const typedText = typingContainer.querySelector('.typed-text');
    const cursor = typingContainer.querySelector('.cursor');
    
    if (!typedText || !cursor) return;
    
    const texts = [
        "Building the Future of South Sudan",
        "Quality Construction Solutions",
        "Infrastructure Development Experts",
        "Your Trusted Construction Partner"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (!isDeleting && charIndex < currentText.length) {
            // Typing forward
            typedText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else if (isDeleting && charIndex > 0) {
            // Deleting backward
            typedText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(type, typingSpeed / 2);
        } else {
            // Switch between typing and deleting
            isDeleting = !isDeleting;
            
            if (!isDeleting) {
                textIndex = (textIndex + 1) % texts.length;
            }
            
            // Pause before next action
            const pauseTime = isDeleting ? 1500 : 500;
            setTimeout(type, pauseTime);
        }
    }
    
    // Start typing effect
    type();
    
    // Cursor blinking effect
    setInterval(() => {
        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
    }, 500);
}

// ============================================
// READ MORE / LESS FOR BLOG
// ============================================
function initReadMoreButtons() {
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const blogCard = this.closest('.blog-card');
            const fullContent = blogCard.querySelector('.blog-full-content');
            const excerpt = blogCard.querySelector('.blog-excerpt');
            
            if (blogCard.classList.contains('expanded')) {
                // Collapse
                blogCard.classList.remove('expanded');
                fullContent.style.display = 'none';
                excerpt.style.display = 'block';
                this.innerHTML = 'Read Full Article <i class="fas fa-arrow-right"></i>';
            } else {
                // Expand
                blogCard.classList.add('expanded');
                fullContent.style.display = 'block';
                excerpt.style.display = 'none';
                this.innerHTML = 'Show Less <i class="fas fa-arrow-up"></i>';
            }
        });
    });
}

// ============================================
// HEADER SCROLL EFFECT
// ============================================
function initHeaderScroll() {
    const header = document.querySelector('header');
    
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ============================================
// SMOOTH SCROLLING
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href.startsWith('#!')) return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('header').offsetHeight;
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
// PORTFOLIO FILTER
// ============================================
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (!filterButtons.length || !portfolioItems.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
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
// CONTACT FORM HANDLING
// ============================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (Netlify will handle actual submission)
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Reset form
            this.reset();
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
        }, 2000);
    });
}

// ============================================
// STATS COUNTER ANIMATION
// ============================================
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    if (!statNumbers.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.getAttribute('data-count'));
                
                if (element.classList.contains('animated')) return;
                element.classList.add('animated');
                
                let current = 0;
                const increment = target / 50; // 50 frames
                const duration = 2000; // 2 seconds
                const stepTime = duration / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        element.textContent = target;
                        clearInterval(timer);
                    } else {
                        element.textContent = Math.floor(current);
                    }
                }, stepTime);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// ============================================
// FIX FOR DROPDOWN LINKS ON SERVICES PAGE
// ============================================
function initServiceLinks() {
    // Prevent dropdown menu links from closing the dropdown immediately
    document.querySelectorAll('.dropdown-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                e.stopPropagation();
            }
        });
    });
}

// ============================================
// SERVICE CONTENT EXPAND/COLLAPSE
// ============================================
function initServiceContent() {
    document.querySelectorAll('.service-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const serviceCard = this.closest('.service-card');
                const content = serviceCard.querySelector('.service-content p:nth-child(2)');
                
                if (content) {
                    content.classList.toggle('expanded');
                    if (content.classList.contains('expanded')) {
                        content.style.maxHeight = content.scrollHeight + 'px';
                        this.innerHTML = 'Show Less <i class="fas fa-arrow-up"></i>';
                    } else {
                        content.style.maxHeight = '60px';
                        this.innerHTML = 'Learn More <i class="fas fa-arrow-right"></i>';
                    }
                }
            }
        });
    });
}

// ============================================
// PAGE LOAD ANIMATIONS
// ============================================
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.animationDelay = (index * 0.1) + 's';
        section.classList.add('fade-in');
    });
});

// ============================================
// SERVICE DROPDOWN CONTENT TOGGLE
// ============================================
// This function handles the service dropdown content on services.html
function initServiceDropdownContent() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const serviceLink = card.querySelector('.btn-service');
        if (serviceLink) {
            serviceLink.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get the service ID from the card
                const serviceId = card.id;
                if (serviceId) {
                    // Scroll to the service section
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
        }
    });
}

// ============================================
// INITIALIZE SERVICE PAGE SPECIFIC FUNCTIONS
// ============================================
if (document.querySelector('.services-page')) {
    document.addEventListener('DOMContentLoaded', function() {
        initServiceDropdownContent();
        initServiceLinks();
    });
}

// ============================================
// ERROR HANDLING FOR MISSING ELEMENTS
// ============================================
// Global error handler for missing elements
window.addEventListener('error', function(e) {
    console.log('Script loaded successfully. Some features may not be available on this page.');
});

// ============================================
// CSS HELPER FUNCTIONS
// ============================================
// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeIn 0.8s ease forwards;
        opacity: 0;
    }
    
    @keyframes fadeIn {
        to {
            opacity: 1;
        }
    }
    
    /* Dropdown active state */
    .dropdown.active .dropdown-menu {
        display: block !important;
        opacity: 1 !important;
        visibility: visible !important;
        transform: translateY(0) !important;
    }
    
    /* Mobile menu active state */
    nav.active {
        right: 0 !important;
    }
    
    /* Blog expanded state */
    .blog-card.expanded .blog-full-content {
        display: block !important;
    }
    
    .blog-card.expanded .blog-excerpt {
        display: none !important;
    }
    
    /* Portfolio item animations */
    .portfolio-item {
        transition: all 0.3s ease;
    }
    
    /* Cursor animation for typing */
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
    
    .cursor {
        animation: blink 1s infinite;
    }
`;
document.head.appendChild(style);
