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
class TestimonialsCarousel {
    constructor() {
        this.slidesContainer = document.querySelector('.carousel-slides');
        this.slides = document.querySelectorAll('.testimonial-slide');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        
        if (this.slides.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.cloneSlides();
        this.startAutoPlay();
        
        const carousel = document.querySelector('.testimonials-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
            carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    }
    
    cloneSlides() {
        const firstSlide = this.slides[0].cloneNode(true);
        this.slidesContainer.appendChild(firstSlide);
    }
    
    moveToSlide() {
        const translateX = -(this.currentIndex * 33.333);
        this.slidesContainer.style.transform = `translateX(${translateX}%)`;
        
        if (this.currentIndex >= this.slides.length) {
            setTimeout(() => {
                this.slidesContainer.style.transition = 'none';
                this.currentIndex = 0;
                this.slidesContainer.style.transform = 'translateX(0%)';
                setTimeout(() => {
                    this.slidesContainer.style.transition = 'transform 0.5s ease-in-out';
                }, 50);
            }, 500);
        }
    }
    
    nextSlide() {
        this.currentIndex++;
        this.moveToSlide();
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 1500);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
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

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
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
    new TestimonialsCarousel();
    floatingAnimation();
    animateOnScroll();
    
    // Hero title typing effect
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => typeWriter(heroTitle, originalText, 80), 500);
    }
});

// Scroll event listener
window.addEventListener('scroll', animateOnScroll);
