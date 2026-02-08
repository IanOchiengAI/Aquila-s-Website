/**
 * OYANGE Portfolio - Animation System
 * Art museum-level scroll reveals and micro-interactions
 */

const OyangeAnimations = {
    // Configuration
    config: {
        revealThreshold: 0.15,
        staggerDelay: 100,
        duration: 800,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
    },

    /**
     * Initialize all animation systems
     */
    init() {
        this.setupScrollReveal();
        this.setupStaggeredChildren();
        this.setupParallax();
        this.setupMagneticButtons();
        this.setupTextReveal();
        console.log('🎨 OYANGE Animations initialized');
    },

    /**
     * Scroll Reveal - Elements fade/slide in on scroll
     */
    setupScrollReveal() {
        const revealElements = document.querySelectorAll('[data-reveal]');

        if (!revealElements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.revealDelay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: this.config.revealThreshold,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    },

    /**
     * Staggered Children - Gallery items animate in sequence
     */
    setupStaggeredChildren() {
        const staggerContainers = document.querySelectorAll('[data-stagger]');

        staggerContainers.forEach(container => {
            const children = container.children;
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        Array.from(children).forEach((child, i) => {
                            child.style.transitionDelay = `${i * this.config.staggerDelay}ms`;
                            child.classList.add('stagger-revealed');
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            observer.observe(container);
        });
    },

    /**
     * Parallax Effect - Subtle depth on scroll
     */
    setupParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');

        if (!parallaxElements.length) return;

        let ticking = false;

        const updateParallax = () => {
            const scrollY = window.scrollY;

            parallaxElements.forEach(el => {
                const speed = parseFloat(el.dataset.parallax) || 0.1;
                const rect = el.getBoundingClientRect();
                const inView = rect.top < window.innerHeight && rect.bottom > 0;

                if (inView) {
                    const yPos = (scrollY - el.offsetTop) * speed;
                    el.style.transform = `translateY(${yPos}px)`;
                }
            });

            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });
    },

    /**
     * Magnetic Buttons - Cursor attraction effect
     */
    setupMagneticButtons() {
        const magneticElements = document.querySelectorAll('[data-magnetic]');

        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                const strength = parseFloat(el.dataset.magnetic) || 0.3;
                el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0, 0)';
                el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            });

            el.addEventListener('mouseenter', () => {
                el.style.transition = 'none';
            });
        });
    },

    /**
     * Text Reveal - Clip-path based text animation
     */
    setupTextReveal() {
        const textElements = document.querySelectorAll('[data-text-reveal]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('text-revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        textElements.forEach(el => observer.observe(el));
    },

    /**
     * Floating CTA - Appears after scroll
     */
    setupFloatingCTA() {
        const cta = document.getElementById('floating-cta');
        if (!cta) return;

        let lastScroll = 0;
        const showAfter = 300;

        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;

            if (currentScroll > showAfter) {
                cta.classList.add('visible');
            } else {
                cta.classList.remove('visible');
            }

            lastScroll = currentScroll;
        }, { passive: true });
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => OyangeAnimations.init());
} else {
    OyangeAnimations.init();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OyangeAnimations;
}
