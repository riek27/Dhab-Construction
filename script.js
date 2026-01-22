// ============================================
// DEBUG: Log when script loads
// ============================================
console.log('script.js loaded successfully');

// ============================================
// WAIT FOR FULL PAGE LOAD
// ============================================
window.addEventListener('load', function() {
    console.log('Page fully loaded, initializing...');
    
    // Initialize everything after page loads
    initAll();
    
    // Add loaded class to body
    document.body.classList.add('loaded');
});

// ============================================
// MAIN INITIALIZATION FUNCTION
// ============================================
function initAll() {
    console.log('Initializing all features...');
    
    // Check what elements exist
    console.log('Mobile menu button exists:', !!document.querySelector('.mobile-menu-btn'));
    console.log('Typing container exists:', !!document.querySelector('.typing-container'));
    console.log('Dropdowns exist:', document.querySelectorAll('.dropdown').length);
    
    // Initialize features
    initMobileMenu();
    initTypingEffect();
    initDropdowns();
    initHeaderScroll();
    initSmoothScroll();
    
    // Page-specific features
    if (document.querySelector('.blog-page')) {
        console.log('Blog page detected');
        initReadMoreButtons();
    }
    
    if (document.querySelector('.portfolio-page')) {
        console.log('Portfolio page detected');
        initPortfolioFilter();
    }
    
    if (document.getElementById('contactForm')) {
        console.log('Contact form detected');
        initContactForm();
    }
    
    if (document.querySelector('.stat-number[data-count]')) {
        console.log('Stats counter detected');
        initStatsCounter();
    }
    
    console.log('Initialization complete');
}

// ============================================
// 1. MOBILE MENU - SIMPLE AND WORKING
// ============================================
function initMobileMenu() {
    console.log('Initializing mobile menu...');
    
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (!menuBtn || !nav) {
        console.log('Mobile menu elements not found');
        return;
    }
    
    console.log('Mobile menu button found, adding click event...');
    
    // Toggle menu when button is clicked
    menuBtn.addEventListener('click', function(e) {
        console.log('Menu button clicked');
        e.stopPropagation(); // Prevent event from bubbling up
        
        // Toggle active class on nav
        nav.classList.toggle('active');
        
        // Toggle icon
        const icon = this.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            console.log('Menu opened');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            console.log('Menu closed');
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
            nav.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when clicking on a link (for mobile)
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                nav.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    console.log('Mobile menu initialized');
}

// ============================================
// 2. TYPING EFFECT - SIMPLE AND WORKING
// ============================================
function initTypingEffect() {
    console.log('Initializing typing effect...');
    
    const typingContainer = document.querySelector('.typing-container');
    if (!typingContainer) {
        console.log('Typing container not found');
        return;
    }
    
    const typedText = typingContainer.querySelector('.typed-text');
    const cursor = typingContainer.querySelector('.cursor');
    
    if (!typedText || !cursor) {
        console.log('Typing text or cursor not found');
        return;
    }
    
    console.log('Typing effect elements found, starting...');
    
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
        
        if (!isDeleting && charIndex <= currentText.length) {
            // Typing forward
            typedText.textContent = currentText.substring(0, charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else if (isDeleting && charIndex >= 0) {
            // Deleting backward
            typedText.textContent = currentText.substring(0, charIndex);
            charIndex--;
            setTimeout(type, typingSpeed / 2);
        } else {
            // Switch between typing and deleting
            isDeleting = !isDeleting;
            
            if (!isDeleting) {
                textIndex = (textIndex + 1) % texts.length;
            }
            
            // Pause before next action
            setTimeout(type, isDeleting ? 1500 : 500);
        }
    }
    
    // Start typing
    type();
    
    // Blinking cursor
    setInterval(() => {
        cursor.style.visibility = cursor.style.visibility === 'hidden' ? 'visible' : 'hidden';
    }, 500);
    
    console.log('Typing effect initialized');
}

// ============================================
// 3. DROPDOWNS - SIMPLE AND WORKING
// ============================================
function initDropdowns() {
    console.log('Initializing dropdowns...');
    
    const dropdowns = document.querySelectorAll('.dropdown');
    console.log('Found dropdowns:', dropdowns.length);
    
    if (dropdowns.length === 0) return;
    
    // For mobile: click to toggle
    if (window.innerWidth <= 992) {
        console.log('Mobile mode: dropdowns will toggle on click');
        
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const arrow = toggle ? toggle.querySelector('i') : null;
            
            if (toggle) {
                toggle.addEventListener('click', function(e) {
                    console.log('Dropdown clicked');
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close other dropdowns
                    dropdowns.forEach(other => {
                        if (other !== dropdown) {
                            other.classList.remove('active');
                            const otherArrow = other.querySelector('.dropdown-toggle i');
                            if (otherArrow) otherArrow.style.transform = 'rotate(0deg)';
                        }
                    });
                    
                    // Toggle current dropdown
                    const isActive = dropdown.classList.contains('active');
                    dropdown.classList.toggle('active');
                    
                    // Rotate arrow
                    if (arrow) {
                        arrow.style.transform = dropdown.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
                    }
                    
                    console.log('Dropdown active:', dropdown.classList.contains('active'));
                });
            }
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dropdown')) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                    const arrow = dropdown.querySelector('.dropdown-toggle i');
                    if (arrow) arrow.style.transform = 'rotate(0deg)';
                });
            }
        });
    } else {
        // For desktop: hover to open
        console.log('Desktop mode: dropdowns will open on hover');
        
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
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Remove all active states on resize (simplest solution)
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
            const arrow = dropdown.querySelector('.dropdown-toggle i');
            if (arrow) arrow.style.transform = 'rotate(0deg)';
        });
        
        // Re-initialize with new mode
        setTimeout(initDropdowns, 100);
    });
    
    console.log('Dropdowns initialized');
}

// ============================================
// 4. HEADER SCROLL EFFECT
// ============================================
function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ============================================
// 5. SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (href === '#' || href === '#!') return;
            
            // Skip if it's a dropdown toggle
            if (this.classList.contains('dropdown-toggle')) return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL
                history.pushState(null, null, href);
            }
        });
    });
}

// ============================================
// 6. BLOG READ MORE/LESS
// ============================================
function initReadMoreButtons() {
    console.log('Initializing read more buttons...');
    
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const blogCard = this.closest('.blog-card');
            if (!blogCard) return;
            
            const fullContent = blogCard.querySelector('.blog-full-content');
            const excerpt = blogCard.querySelector('.blog-excerpt');
            
            if (blogCard.classList.contains('expanded')) {
                // Collapse
                blogCard.classList.remove('expanded');
                if (fullContent) fullContent.style.display = 'none';
                if (excerpt) excerpt.style.display = 'block';
                this.innerHTML = 'Read Full Article <i class="fas fa-arrow-right"></i>';
            } else {
                // Expand
                blogCard.classList.add('expanded');
                if (fullContent) fullContent.style.display = 'block';
                if (excerpt) excerpt.style.display = 'none';
                this.innerHTML = 'Show Less <i class="fas fa-arrow-up"></i>';
            }
        });
    });
    
    console.log('Read more buttons initialized');
}

// ============================================
// 7. PORTFOLIO FILTER
// ============================================
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (!filterBtns.length || !portfolioItems.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ============================================
// 8. CONTACT FORM
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate sending (Netlify will handle actual submission)
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Reset form
            this.reset();
            
            // Optional: Show success message
            console.log('Form submitted successfully');
        }, 2000);
    });
}

// ============================================
// 9. STATS COUNTER
// ============================================
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number[data-count]');
    if (!stats.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.getAttribute('data-count'));
                
                if (element.classList.contains('animated')) return;
                element.classList.add('animated');
                
                let count = 0;
                const increment = target / 100;
                const duration = 2000;
                const stepTime = duration / 100;
                
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        element.textContent = target;
                        clearInterval(timer);
                    } else {
                        element.textContent = Math.floor(count);
                    }
                }, stepTime);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

// ============================================
// ADD CRITICAL CSS FOR FUNCTIONALITY
// ============================================
function addCriticalCSS() {
    const css = `
        /* Mobile menu active state */
        nav.active {
            right: 0 !important;
        }
        
        /* Dropdown active state */
        .dropdown.active .dropdown-menu {
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
            transform: translateY(0) !important;
        }
        
        /* Cursor blink animation */
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
        
        .cursor {
            animation: blink 1s infinite;
        }
        
        /* Portfolio filter animation */
        .portfolio-item {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        /* Blog expanded content */
        .blog-full-content {
            display: none;
        }
        
        .blog-card.expanded .blog-full-content {
            display: block !important;
        }
        
        /* Header scroll effect */
        header.scrolled {
            padding: 10px 0;
            box-shadow: 0 2px 20px rgba(0,0,0,0.1);
        }
        
        /* Mobile menu button transition */
        .mobile-menu-btn i {
            transition: transform 0.3s ease;
        }
        
        /* Dropdown arrow rotation */
        .dropdown-toggle i {
            transition: transform 0.3s ease;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
}

// ============================================
// ADD CRITICAL CSS IMMEDIATELY
// ============================================
addCriticalCSS();
