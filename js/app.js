/**
 * OYANGE PORTFOLIO - CORE JAVASCRIPT
 * Handles Navigation, Mobile Menu, and Shared Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initMobileMenu();
    initScrollReveal();
    initScrollToTop();
});

function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.id = 'scroll-to-top';
    scrollBtn.className = 'fixed bottom-8 right-8 z-40 bg-brand-gold text-brand-dark p-3 rounded-full shadow-xl translate-y-20 opacity-0 transition-all duration-300 hover:bg-brand-dark hover:text-white hover:scale-110 flex items-center justify-center';
    scrollBtn.innerHTML = '<span class="material-symbols-outlined">arrow_upward</span>';
    scrollBtn.ariaLabel = 'Scroll to top';

    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.remove('translate-y-20', 'opacity-0');
        } else {
            scrollBtn.classList.add('translate-y-20', 'opacity-0');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navInner = document.querySelector('#navbar nav'); // Select the inner nav element

    if (!navbar || !navInner) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.remove('py-6', 'md:py-8');
            navbar.classList.add('py-4');
            navInner.classList.remove('bg-white/70', 'text-brand-dark', 'border-brand-dark/5');
            navInner.classList.add('bg-brand-dark/90', 'text-white', 'shadow-xl', 'backdrop-blur-md', 'border-white/10');
        } else {
            navbar.classList.add('py-6', 'md:py-8');
            navbar.classList.remove('py-4');
            navInner.classList.add('bg-white/70', 'text-brand-dark', 'border-brand-dark/5');
            navInner.classList.remove('bg-brand-dark/90', 'text-white', 'shadow-xl', 'backdrop-blur-md', 'border-white/10');
        }
    });
}

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (!mobileMenuBtn || !mobileMenu || !menuIcon) return;

    // Toggle Menu
    mobileMenuBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            menuIcon.textContent = 'close';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
        } else {
            closeMobileMenu();
        }
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    function closeMobileMenu() {
        mobileMenu.classList.add('hidden');
        menuIcon.textContent = 'menu';
        document.body.style.overflow = '';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
}

function initScrollReveal() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                entry.target.classList.remove('opacity-0', 'translate-y-8');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements to animate
    const elementsToAnimate = document.querySelectorAll('section > div, section > h2, .gallery-item, footer > div');

    elementsToAnimate.forEach(el => {
        // Only add if not already animated
        if (!el.classList.contains('animate-fade-in-up')) {
            el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out');
            observer.observe(el);
        }
    });
}
