// ============================================
// IMMEDIATE EXECUTION - Fix for all issues
// ============================================

// 1. FIX MOBILE MENU IMMEDIATELY
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav');

if (mobileMenuBtn && nav) {
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
        if (nav.classList.contains('active') && 
            !e.target.closest('nav') && 
            !e.target.closest('.mobile-menu-btn')) {
            nav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// 2. FIX DROPDOWNS IMMEDIATELY
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    
    if (toggle) {
        toggle.addEventListener('click', function(e) {
            // On mobile only, prevent link navigation
            if (window.innerWidth <= 992) {
                e.preventDefault();
                
                // Close all other dropdowns
                dropdowns.forEach(other => {
                    if (other !== dropdown && other.classList.contains('active')) {
                        other.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
            }
        });
    }
});

// Close dropdowns when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// 3. FIX TYPING EFFECT IMMEDIATELY
function initTypingEffect() {
    const typedText = document.querySelector('.typed-text');
    const cursor = document.querySelector('.cursor');
    
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
            
            // Pause at the end of typing and before deleting
            setTimeout(type, isDeleting ? 1500 : 500);
        }
    }
    
    // Start typing
    type();
}

// Start typing effect when page loads
window.addEventListener('load', initTypingEffect);

// 4. HEADER SCROLL EFFECT
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 5. SMOOTH SCROLL FOR ANCHOR LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href === '#' || href === '') return;
        
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

// 6. BLOG READ MORE FUNCTIONALITY (for blog page)
function initBlogReadMore() {
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const blogCard = this.closest('.blog-card');
            
            if (blogCard.classList.contains('expanded')) {
                // Collapse
                blogCard.classList.remove('expanded');
                this.innerHTML = 'Read Full Article <i class="fas fa-arrow-right"></i>';
            } else {
                // Expand
                blogCard.classList.add('expanded');
                this.innerHTML = 'Show Less <i class="fas fa-arrow-up"></i>';
            }
        });
    });
}

// Initialize blog functionality if on blog page
if (document.querySelector('.blog-page')) {
    document.addEventListener('DOMContentLoaded', initBlogReadMore);
}

// 7. STATS COUNTER ANIMATION
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.getAttribute('data-count'));
                
                let count = 0;
                const increment = target / 50;
                const duration = 2000;
                const stepTime = duration / 50;
                
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        element.textContent = target;
                        clearInterval(timer);
                    } else {
                        element.textContent = Math.floor(count);
                    }
                }, stepTime);
                
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

// Initialize stats counter if present
if (document.querySelector('.stat-number[data-count]')) {
    document.addEventListener('DOMContentLoaded', initStatsCounter);
}

// 8. ADD MISSING CSS FOR JAVASCRIPT FUNCTIONALITY
document.addEventListener('DOMContentLoaded', function() {
    // Add critical CSS styles
    const style = document.createElement('style');
    style.textContent = `
        /* MOBILE MENU ACTIVE STATE - CRITICAL */
        @media (max-width: 992px) {
            nav.active {
                right: 0 !important;
                display: block !important;
            }
            
            nav:not(.active) {
                right: -100% !important;
            }
            
            .mobile-menu-btn {
                display: block !important;
            }
            
            .dropdown.active .dropdown-menu {
                display: block !important;
                opacity: 1 !important;
                visibility: visible !important;
                transform: translateY(0) !important;
                position: static !important;
                box-shadow: none !important;
                background: transparent !important;
                padding-left: 20px !important;
            }
            
            .dropdown .dropdown-menu {
                display: none !important;
            }
        }
        
        /* TYPING CURSOR ANIMATION */
        .cursor {
            animation: blink 1s infinite !important;
        }
        
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
        
        /* BLOG EXPANDED STATE */
        .blog-card.expanded .blog-full-content {
            display: block !important;
        }
        
        .blog-card .blog-full-content {
            display: none !important;
        }
        
        /* HEADER SCROLLED STATE */
        header.scrolled {
            padding: 10px 0 !important;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1) !important;
        }
        
        /* DROPDOWN ACTIVE STATE FOR MOBILE */
        .dropdown.active .dropdown-toggle i {
            transform: rotate(180deg) !important;
        }
    `;
    document.head.appendChild(style);
});

console.log('Dhab Construction - All JavaScript functionality loaded successfully!');

document.addEventListener("DOMContentLoaded", function () {

    // Function to handle AJAX submission and toast
    function setupNetlifyForm(formId, successMessageId) {
        const form = document.getElementById(formId);
        const successMessage = document.getElementById(successMessageId);

        if (!form || !successMessage) return;

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            if (form.classList.contains("submitting")) return;
            form.classList.add("submitting");

            const formData = new FormData(form);

            fetch("/", {
                method: "POST",
                body: formData
            })
            .then(() => {
                // Show green toast
                successMessage.classList.add("show");

                // Reset the form
                form.reset();

                // Hide toast after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove("show");
                    form.classList.remove("submitting");
                }, 5000);
            })
            .catch(() => {
                form.classList.remove("submitting");
                alert("Something went wrong. Please try again.");
            });
        });
    }

    // Initialize both forms
    setupNetlifyForm("contactForm", "formSuccess");
    setupNetlifyForm("servicesContactForm", "servicesFormSuccess");
});
