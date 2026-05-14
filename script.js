/**
 * Premium HDPE Pipes & Fittings Manufacturing Website
 * Main JavaScript functionality for interactive elements
 */

// =====================================================
// FAQ TOGGLE FUNCTIONALITY
// =====================================================

document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.toggle');

        question.addEventListener('click', function () {
            const isActive = answer.classList.contains('active');

            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-answer').classList.remove('active');
                    otherItem.querySelector('.toggle').textContent = '+';
                }
            });

            // Toggle current item
            if (isActive) {
                answer.classList.remove('active');
                toggle.textContent = '+';
            } else {
                answer.classList.add('active');
                toggle.textContent = 'âˆ’';
            }
        });
    });
});

// =====================================================
// PROCESS TABS FUNCTIONALITY
// ===================================================== 

document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const processItems = document.querySelectorAll('.process-item');

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            const tabName = this.getAttribute('data-tab');

            // Remove active class from all tabs and items
            tabButtons.forEach(btn => btn.classList.remove('active'));
            processItems.forEach(item => item.classList.remove('active'));

            // Add active class to clicked tab and corresponding item
            this.classList.add('active');

            const activeItem = document.getElementById(tabName);
            if (activeItem) {
                activeItem.classList.add('active');
            }
        });
    });

    // Set first tab as active
    if (tabButtons.length > 0) {
        tabButtons[0].classList.add('active');
    }
    if (processItems.length > 0) {
        processItems[0].classList.add('active');
    }
});

// =====================================================
// APPLICATIONS CAROUSEL - AUTO ROTATE FIXED
// ===================================================== 

class ApplicationsCarousel {
    constructor() {
        this.carousel = document.querySelector('.applications-carousel');
        this.prevBtn = document.querySelector('.carousel-btn.prev');
        this.nextBtn = document.querySelector('.carousel-btn.next');
        this.autoScrollTimer = null;
        this.autoScrollDelay = 5000; // 5 seconds

        if (this.carousel) {
            this.setupCarousel();
            this.startAutoScroll();
        }
    }

    setupCarousel() {
        this.prevBtn.addEventListener('click', () => {
            this.scroll(-1);
            this.resetAutoScroll();
        });
        this.nextBtn.addEventListener('click', () => {
            this.scroll(1);
            this.resetAutoScroll();
        });

        // Pause auto-scroll on hover
        this.carousel.addEventListener('mouseenter', () => {
            this.stopAutoScroll();
        });

        this.carousel.addEventListener('mouseleave', () => {
            this.startAutoScroll();
        });

        // Touch support
        let touchStartX = 0;
        this.carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            this.stopAutoScroll();
        });

        this.carousel.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.scroll(1);
                } else {
                    this.scroll(-1);
                }
            }
            this.resetAutoScroll();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.scroll(-1);
                this.resetAutoScroll();
            } else if (e.key === 'ArrowRight') {
                this.scroll(1);
                this.resetAutoScroll();
            }
        });
    }

    scroll(direction) {
        const card = this.carousel.querySelector('.app-card');
        const gap = parseFloat(getComputedStyle(this.carousel).gap) || 16;
        const cardWidth = card ? card.offsetWidth + gap : 280;
        const scrollAmount = cardWidth * (direction > 0 ? 1 : -1);
        this.carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }

    startAutoScroll() {
        if (this.autoScrollTimer) {
            clearInterval(this.autoScrollTimer);
        }
        this.autoScrollTimer = setInterval(() => {
            this.scroll(1);
        }, this.autoScrollDelay);
    }

    stopAutoScroll() {
        if (this.autoScrollTimer) {
            clearInterval(this.autoScrollTimer);
            this.autoScrollTimer = null;
        }
    }

    resetAutoScroll() {
        this.stopAutoScroll();
        this.startAutoScroll();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    new ApplicationsCarousel();
});

// =====================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================================== 

document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href === '#' || !href) {
                return;
            }

            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// =====================================================
// CONTACT FORM FUNCTIONALITY
// ===================================================== 

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.cta-form');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const fullName = form.querySelector('input[placeholder="Full Name"]').value;
            const email = form.querySelector('input[placeholder="Email Address"]').value;
            const company = form.querySelector('input[placeholder="Company Name"]').value;
            const phone = form.querySelector('input[placeholder*="+91"]').value;

            // Basic validation
            if (!fullName || !email || !company || !phone) {
                alert('Please fill in all fields');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Show success message
            showMessage('Quote request submitted successfully! Our team will contact you soon.', 'success');

            // Reset form
            form.reset();

            // Log data (in real scenario, send to server)
            console.log('Form submitted:', {
                fullName,
                email,
                company,
                phone
            });
        });
    }
});

// =====================================================
// MESSAGE DISPLAY FUNCTION
// ===================================================== 

function showMessage(messageText, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
        max-width: 400px;
        ${type === 'success' ? 'background: #059669; color: white;' : 'background: #ef4444; color: white;'}
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    messageDiv.textContent = messageText;

    document.body.appendChild(messageDiv);

    // Remove message after 3 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideInLeft 0.3s ease-out reverse';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

// =====================================================
// SCROLL ANIMATIONS
// ===================================================== 

document.addEventListener('DOMContentLoaded', function () {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease-out';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

// =====================================================
// NAVBAR SCROLL EFFECT
// ===================================================== 

document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    let lastScrollPosition = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.scrollY;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        }

        lastScrollPosition = currentScroll;
    });
});

// =====================================================
// HERO CAROUSEL FUNCTIONALITY
// =====================================================

class HeroCarousel {
    constructor() {
        this.slides = Array.from(document.querySelectorAll('.hero-slide'));
        this.dots = Array.from(document.querySelectorAll('.carousel-dots .dot'));
        this.thumbs = Array.from(document.querySelectorAll('.carousel-thumbnails .thumb'));
        this.prevButton = document.querySelector('.hero-carousel-nav.prev');
        this.nextButton = document.querySelector('.hero-carousel-nav.next');
        this.currentIndex = 0;
        this.timer = null;

        if (this.slides.length === 0) {
            return;
        }

        this.updateSlides();
        this.bindEvents();
        this.startAutoRotate();
    }

    bindEvents() {
        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => this.goTo(this.currentIndex - 1));
        }

        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => this.goTo(this.currentIndex + 1));
        }

        this.dots.forEach(dot => {
            dot.addEventListener('click', () => this.goTo(parseInt(dot.dataset.index, 10)));
        });

        this.thumbs.forEach(thumb => {
            thumb.addEventListener('click', () => this.goTo(parseInt(thumb.dataset.index, 10)));
        });

        const carousel = document.querySelector('.hero-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => this.stopAutoRotate());
            carousel.addEventListener('mouseleave', () => this.startAutoRotate());
        }
    }

    goTo(index) {
        const total = this.slides.length;
        if (index < 0) {
            index = total - 1;
        } else if (index >= total) {
            index = 0;
        }

        this.currentIndex = index;
        this.updateSlides();
    }

    updateSlides() {
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentIndex);
        });

        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });

        this.thumbs.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === this.currentIndex);
        });
    }

    startAutoRotate() {
        this.stopAutoRotate();
        this.timer = setInterval(() => this.goTo(this.currentIndex + 1), 5000);
    }

    stopAutoRotate() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    new HeroCarousel();
});

// =====================================================
// DOWNLOAD BUTTON FUNCTIONALITY
// ===================================================== 

document.addEventListener('DOMContentLoaded', function () {
    const downloadBtn = document.querySelector('.download-btn');

    if (downloadBtn) {
        downloadBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // Simulate PDF download
            console.log('Downloading: Full Technical Datasheet');
            showMessage('Download started: Full Technical Datasheet PDF', 'success');

            // In real scenario, this would trigger actual download
        });
    }
});

// =====================================================
// EMAIL NEWSLETTER FORM
// ===================================================== 

document.addEventListener('DOMContentLoaded', function () {
    const emailForm = document.querySelector('.email-form');

    if (emailForm) {
        const emailInput = emailForm.querySelector('input[type="email"]');
        const submitBtn = emailForm.querySelector('.btn');

        if (submitBtn) {
            submitBtn.addEventListener('click', function (e) {
                e.preventDefault();

                if (!emailInput.value) {
                    alert('Please enter your email address');
                    return;
                }

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value)) {
                    alert('Please enter a valid email address');
                    return;
                }

                showMessage(`Catalogue request sent to ${emailInput.value}! Check your inbox.`, 'success');
                emailInput.value = '';
            });
        }
    }
});

// =====================================================
// ACTION BUTTONS
// ===================================================== 

document.addEventListener('DOMContentLoaded', function () {
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');

    ctaButtons.forEach(button => {
        if (button.textContent.includes('Quote')) {
            button.addEventListener('click', function () {
                const ctaSection = document.getElementById('cta');
                if (ctaSection) {
                    ctaSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        if (button.textContent.includes('Talk to an Expert')) {
            button.addEventListener('click', function () {
                const contact = document.querySelector('.contact-info');
                if (contact) {
                    showMessage('Please call us at +91-XXX-XXX-XXXX or email info@mexalux.com', 'info');
                }
            });
        }
    });
});

// =====================================================
// UTILITIES
// ===================================================== 

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideInLeft {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// Mobile menu toggle (if implemented)
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    }
});

console.log('Manufacturing website initialized successfully!');
