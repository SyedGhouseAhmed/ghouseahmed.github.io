// ========================================
// GHOUSE AHMED — Personal Brand Website
// script.js — Animations & Interactions
// ========================================

// ===== TYPING EFFECT =====
const typedTextEl = document.querySelector('.typed-text');
const roles = [
    'Product Owner',
    'Sr. Business Systems Analyst',
    'Healthcare IT Specialist',
    'Utility & Energy Tech Expert',
    'Agile Delivery Leader'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typedTextEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedTextEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
});


// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.padding = '12px 60px';
        navbar.style.background = 'rgba(10, 25, 47, 0.98)';
        navbar.style.boxShadow = '0 5px 30px rgba(0,0,0,0.3)';
    } else {
        navbar.style.padding = '20px 60px';
        navbar.style.background = 'rgba(10, 25, 47, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});


// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// ===== FADE IN ON SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll(
    '.timeline-item, .about-card, .skill-category, .edu-card, .contact-card'
).forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});


// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});


// ===== STAT COUNTER ANIMATION =====
function animateCounter(el, target, suffix = '') {
    let count = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
            el.textContent = target + suffix;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(count) + suffix;
        }
    }, 30);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('12+')) animateCounter(stat, 12, '+');
                else if (text.includes('36')) animateCounter(stat, 36, '');
                else if (text === '2') animateCounter(stat, 2, '');
                else if (text.includes('54K+')) {
                    stat.textContent = '0K+';
                    let count = 0;
                    const timer = setInterval(() => {
                        count += 1;
                        stat.textContent = count + 'K+';
                        if (count >= 54) clearInterval(timer);
                    }, 40);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);