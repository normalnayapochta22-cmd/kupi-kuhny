/* =============================================
   KUPI KUHNY - Main JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initSmoothScroll();
    initTabs();
    initFAQ();
    initScrollAnimations();
    initScrollTop();
    initModals();
    initForms();
    initPortfolioFilter();
    initHeaderScroll();
    initPhoneMask();
});

/* =============================================
   Mobile Menu
   ============================================= */
function initMobileMenu() {
    const burger = document.querySelector('.burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-list a');

    if (!burger || !mobileMenu) return;

    burger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            burger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* =============================================
   Smooth Scroll
   ============================================= */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#privacy') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* =============================================
   Tabs
   ============================================= */
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;

            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            // Add active class to current
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

/* =============================================
   FAQ Accordion
   ============================================= */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/* =============================================
   Scroll Animations (AOS-like)
   ============================================= */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineLine = document.querySelector('.timeline-line');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // Timeline specific animations
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => timelineObserver.observe(item));

    // Timeline line animation
    if (timelineLine) {
        const lineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    timelineLine.classList.add('animated');
                }
            });
        }, { threshold: 0.1 });

        lineObserver.observe(timelineLine);
    }

    // Price cards counter animation
    const priceCards = document.querySelectorAll('.price-card');
    const priceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                animateCounter(entry.target.querySelector('.price-amount'));
            }
        });
    }, { threshold: 0.5 });

    priceCards.forEach(card => priceObserver.observe(card));
}

/* =============================================
   Counter Animation
   ============================================= */
function animateCounter(element) {
    if (!element || element.dataset.animated) return;

    element.dataset.animated = 'true';
    const target = parseInt(element.dataset.count);
    const duration = 1000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString('ru-RU');
    }, 16);
}

/* =============================================
   Scroll to Top Button
   ============================================= */
function initScrollTop() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (!scrollTopBtn) return;

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* =============================================
   Header Scroll Effect
   ============================================= */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        }

        lastScroll = currentScroll;
    });
}

/* =============================================
   Modals
   ============================================= */
function initModals() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    const overlays = document.querySelectorAll('.modal-overlay');

    // Privacy link
    const privacyLinks = document.querySelectorAll('a[href="#privacy"]');
    privacyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openModal('privacyModal');
        });
    });

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.dataset.modal + 'Modal';
            openModal(modalId);
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal.id);
        });
    });

    overlays.forEach(overlay => {
        overlay.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal.id);
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    closeModal(modal.id);
                }
            });
        }
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Global function for success modal button
window.closeModal = closeModal;

/* =============================================
   Forms
   ============================================= */
function initForms() {
    const leadForm = document.getElementById('leadForm');
    const callbackForm = document.getElementById('callbackForm');

    if (leadForm) {
        leadForm.addEventListener('submit', handleFormSubmit);
    }

    if (callbackForm) {
        callbackForm.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // Check honeypot
    if (formData.get('website')) {
        console.log('Bot detected');
        return;
    }

    // Basic validation
    const phone = form.querySelector('input[type="tel"]').value;
    if (!isValidPhone(phone)) {
        alert('Пожалуйста, введите корректный номер телефона');
        return;
    }

    // Simulate form submission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;

    // Here you would normally send data to server
    // For now, simulate success after 1 second
    setTimeout(() => {
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // Close callback modal if open
        closeModal('callbackModal');

        // Show success modal
        openModal('successModal');
    }, 1000);
}

function isValidPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 12;
}

/* =============================================
   Phone Mask
   ============================================= */
function initPhoneMask() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');

    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length > 0) {
                if (value[0] === '8') {
                    value = '7' + value.slice(1);
                }
                if (value[0] !== '7') {
                    value = '7' + value;
                }
            }

            let formatted = '';
            if (value.length > 0) {
                formatted = '+7';
                if (value.length > 1) {
                    formatted += ' (' + value.slice(1, 4);
                }
                if (value.length > 4) {
                    formatted += ') ' + value.slice(4, 7);
                }
                if (value.length > 7) {
                    formatted += '-' + value.slice(7, 9);
                }
                if (value.length > 9) {
                    formatted += '-' + value.slice(9, 11);
                }
            }

            e.target.value = formatted;
        });

        input.addEventListener('focus', function() {
            if (!this.value) {
                this.value = '+7 ';
            }
        });

        input.addEventListener('blur', function() {
            if (this.value === '+7 ' || this.value === '+7') {
                this.value = '';
            }
        });
    });
}

/* =============================================
   Portfolio Filter
   ============================================= */
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter items
            portfolioItems.forEach(item => {
                const category = item.dataset.category;

                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
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

/* =============================================
   Parallax Effect (Optional)
   ============================================= */
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-slow, .parallax-fast');

    if (!parallaxElements.length) return;

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(el => {
            const speed = el.classList.contains('parallax-fast') ? 0.5 : 0.3;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

/* =============================================
   Utility Functions
   ============================================= */

// Debounce function for scroll events
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
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/* =============================================
   Lazy Loading Images (when real images added)
   ============================================= */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}
