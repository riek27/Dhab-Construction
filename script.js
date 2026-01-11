// Dhab Construction - Complete JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dhab Construction Website - Initializing...');

    // ===== MOBILE MENU FUNCTIONALITY =====
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navMenu) {
        // Create mobile overlay
        const mobileOverlay = document.createElement('div');
        mobileOverlay.className = 'mobile-overlay';
        document.body.appendChild(mobileOverlay);

        // Add mobile overlay styles
        if (!document.querySelector('#mobile-overlay-styles')) {
            const overlayStyles = document.createElement('style');
            overlayStyles.id = 'mobile-overlay-styles';
            overlayStyles.textContent = `
                .mobile-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.5);
                    z-index: 999;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                }
                .mobile-overlay.active {
                    opacity: 1;
                    visibility: visible;
                }
            `;
            document.head.appendChild(overlayStyles);
        }

        // Toggle mobile menu function
        function toggleMobileMenu() {
            const isOpening = !navMenu.classList.contains('active');
            
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = isOpening ? 'hidden' : '';
            
            // Update hamburger icon
            const icon = mobileMenuBtn.querySelector('i');
            if (isOpening) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }

        // Mobile menu button click
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });

        // Close menu when clicking overlay
        mobileOverlay.addEventListener('click', function() {
            toggleMobileMenu();
        });

        // Close menu when clicking menu links
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    toggleMobileMenu();
                }
            });
        });

        // Close menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });

        // Close menu when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    }

    // ===== HEADER SCROLL EFFECT =====
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // ===== HERO SLIDER ===== (UPDATED - 4 seconds interval)
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;
        let slideInterval;

        function showSlide(n) {
            // Reset all slides
            slides.forEach(slide => {
                slide.classList.remove('active');
                slide.style.opacity = '0';
                slide.style.transition = 'opacity 1s ease';
            });
            
            // Show new slide
            currentSlide = (n + totalSlides) % totalSlides;
            const activeSlide = slides[currentSlide];
            
            // Add active class and fade in
            setTimeout(() => {
                activeSlide.classList.add('active');
                activeSlide.style.opacity = '1';
            }, 50);
            
            // Reset and restart zoom animation
            const img = activeSlide.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
                img.style.transition = 'transform 8s ease';
                
                setTimeout(() => {
                    img.style.transform = 'scale(1.1)';
                }, 100);
            }
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function startSlider() {
            if (slideInterval) clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 4000); // Changed to 4 seconds
        }

        function stopSlider() {
            clearInterval(slideInterval);
        }

        // Initialize first slide
        showSlide(0);
        
        // Start auto slide
        startSlider();

        // Pause on hover
        const slider = document.querySelector('.slider');
        if (slider) {
            slider.addEventListener('mouseenter', stopSlider);
            slider.addEventListener('mouseleave', startSlider);
            
            // Pause when tab is hidden
            document.addEventListener('visibilitychange', function() {
                if (document.hidden) {
                    stopSlider();
                } else {
                    startSlider();
                }
            });
        }
    }

    // ===== PORTFOLIO FILTERING =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterBtns.length > 0 && portfolioItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
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

    // ===== BLOG READ MORE TOGGLE =====
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isExpanding = !content.classList.contains('active');
            
            content.classList.toggle('active');
            this.classList.toggle('active');
            
            if (isExpanding) {
                this.innerHTML = 'Read Less <i class="fas fa-chevron-up"></i>';
            } else {
                this.innerHTML = 'Read More <i class="fas fa-chevron-down"></i>';
            }
        });
    });

    // ===== CONTACT FORM HANDLING =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            let firstInvalidField = null;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#e74c3c';
                    isValid = false;
                    if (!firstInvalidField) {
                        firstInvalidField = field;
                    }
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            // Email validation
            const emailField = this.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value)) {
                    emailField.style.borderColor = '#e74c3c';
                    isValid = false;
                    if (!firstInvalidField) {
                        firstInvalidField = emailField;
                    }
                }
            }
            
            if (isValid) {
                // Show success message with animation
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    // Show success message
                    showNotification('Thank you for your message! We will get back to you soon.', 'success');
                    this.reset();
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                showNotification('Please fill in all required fields correctly.', 'error');
                if (firstInvalidField) {
                    firstInvalidField.focus();
                }
            }
        });

        // Real-time validation
        contactForm.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.style.borderColor = '#ddd';
                }
            });
        });
    }

    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (href === '#' || href === '') {
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
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

    // Observe elements for animation
    document.querySelectorAll('.service-card, .portfolio-item, .blog-card, .value-card, .benefit-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        document.body.appendChild(notification);
        
        // Add styles if not already added
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: var(--white);
                    color: var(--charcoal);
                    padding: 1rem 1.5rem;
                    border-radius: 8px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    max-width: 400px;
                    transform: translateX(400px);
                    transition: transform 0.3s ease;
                    border-left: 4px solid var(--gold);
                }
                .notification-success { border-left-color: #27ae60; }
                .notification-error { border-left-color: #e74c3c; }
                .notification-info { border-left-color: #3498db; }
                .notification.show { transform: translateX(0); }
                .notification-close {
                    background: none;
                    border: none;
                    color: inherit;
                    cursor: pointer;
                    padding: 0;
                    font-size: 0.9rem;
                }
            `;
            document.head.appendChild(styles);
        }
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            hideNotification(notification);
        }, 5000);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            hideNotification(notification);
        });
    }
    
    function hideNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // ===== BACK TO TOP BUTTON =====
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopButton.className = 'back-to-top';
    document.body.appendChild(backToTopButton);
    
    // Add styles for back to top button
    const backToTopStyles = document.createElement('style');
    backToTopStyles.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: var(--gold);
            color: var(--white);
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
        .back-to-top.show {
            opacity: 1;
            visibility: visible;
        }
        .back-to-top:hover {
            background: #a88655;
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
    `;
    document.head.appendChild(backToTopStyles);
    
    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== ACTIVE NAV LINK HIGHLIGHTING =====
    function highlightActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    highlightActiveNavLink();

    // ===== ENHANCE SERVICE CARDS =====
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ===== PAGE LOAD COMPLETION =====
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        console.log('Dhab Construction Website - Fully loaded');
    });

    console.log('Dhab Construction Website - Initialization complete');
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});