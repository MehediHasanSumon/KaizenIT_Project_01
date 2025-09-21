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

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialsCarousel();
});
