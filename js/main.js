const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Testimonials Carousel - 3 items display
let carouselData = {
    slidesContainer: null,
    slides: null,
    currentIndex: 0,
    autoPlayInterval: null
};

function initCarousel() {
    carouselData.slidesContainer = document.querySelector('.carousel-slides');
    carouselData.slides = document.querySelectorAll('.testimonial-slide');
    
    if (carouselData.slides.length > 0) {
        cloneSlides();
        startAutoPlay();
        
        const carousel = document.querySelector('.testimonials-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', stopAutoPlay);
            carousel.addEventListener('mouseleave', startAutoPlay);
        }
    }
}

function cloneSlides() {
    const firstSlide = carouselData.slides[0].cloneNode(true);
    carouselData.slidesContainer.appendChild(firstSlide);
}

function moveToSlide() {
    const translateX = -(carouselData.currentIndex * 33.333);
    carouselData.slidesContainer.style.transform = `translateX(${translateX}%)`;
    
    if (carouselData.currentIndex >= carouselData.slides.length) {
        setTimeout(() => {
            carouselData.slidesContainer.style.transition = 'none';
            carouselData.currentIndex = 0;
            carouselData.slidesContainer.style.transform = 'translateX(0%)';
            setTimeout(() => {
                carouselData.slidesContainer.style.transition = 'transform 0.5s ease-in-out';
            }, 50);
        }, 500);
    }
}

function nextSlide() {
    carouselData.currentIndex++;
    moveToSlide();
}

function startAutoPlay() {
    stopAutoPlay();
    carouselData.autoPlayInterval = setInterval(() => {
        nextSlide();
    }, 1500);
}

function stopAutoPlay() {
    if (carouselData.autoPlayInterval) {
        clearInterval(carouselData.autoPlayInterval);
        carouselData.autoPlayInterval = null;
    }
}

// Custom form validation
function validateForm() {
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
    document.querySelectorAll('.form-control').forEach(el => el.classList.remove('error'));
    
    // Validate first name
    const firstName = document.getElementById('firstName').value.trim();
    if (!firstName) {
        showError('firstName', 'First name is required');
        isValid = false;
    }
    
    // Validate last name
    const lastName = document.getElementById('lastName').value.trim();
    if (!lastName) {
        showError('lastName', 'Last name is required');
        isValid = false;
    }
    
    // Validate email
    const email = document.getElementById('email').value.trim();
    if (!email) {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('email', 'Please enter a valid email');
        isValid = false;
    }
    
    // Validate phone
    const phone = document.getElementById('phone').value.trim();
    if (!phone) {
        showError('phone', 'Phone number is required');
        isValid = false;
    }
    
    // Validate topic
    const topic = document.getElementById('topic').value;
    if (!topic) {
        showError('topic', 'Please select a topic');
        isValid = false;
    }
    
    // Validate message
    const message = document.getElementById('message').value.trim();
    if (!message) {
        showError('message', 'Message is required');
        isValid = false;
    }
    
    // Validate terms
    const terms = document.getElementById('terms').checked;
    if (!terms) {
        showToast('Please accept the terms');
        isValid = false;
    }
    
    return isValid;
}

function showError(fieldId, message) {
    document.getElementById(fieldId).classList.add('error');
    document.getElementById(fieldId + 'Error').textContent = message;
}

function showToast(message, type = 'error') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateForm()) {
        showToast('Form submitted successfully!', 'success');
    }
});

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.expertise-card, .portfolio-card, .testimonial-card, .form-group');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
}



// Floating animation for decorative elements
function floatingAnimation() {
    const decorations = document.querySelectorAll('.decoration');
    decorations.forEach((el, index) => {
        setInterval(() => {
            el.style.transform = `translateY(${Math.sin(Date.now() * 0.001 + index) * 10}px)`;
        }, 50);
    });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    // Set initial states for scroll animations
    const elements = document.querySelectorAll('.expertise-card, .portfolio-card, .testimonial-card, .form-group');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
    });
    
    // Start animations
    initCarousel();
    floatingAnimation();
    animateOnScroll();
    smoothScroll();
    addHoverEffects();
    
    // Add ripple effect to buttons
    document.querySelectorAll('.cta-btn, .submit-btn, .visit-btn').forEach(btn => {
        btn.addEventListener('click', createRipple);
    });
    

    
    // Stagger animation for cards
    setTimeout(() => {
        document.querySelectorAll('.expertise-card').forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 1000);
});

// Button ripple effect
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255,255,255,0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

// Smooth scroll for navigation
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Enhanced hover effects
function addHoverEffects() {
    document.querySelectorAll('.portfolio-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to { transform: scale(4); opacity: 0; }
    }
    .cta-btn, .submit-btn { position: relative; overflow: hidden; }
`;
document.head.appendChild(style);
