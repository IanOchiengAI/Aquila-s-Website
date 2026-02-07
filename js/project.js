/**
 * OYANGE PORTFOLIO - PROJECT PAGE ANIMATIONS
 */

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax Header
    gsap.to(".project-img", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
            trigger: "header",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // Reveal Content
    const tl = gsap.timeline();
    tl.to("#project-title", { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 })
        .to("#project-meta", { opacity: 1, y: 0, duration: 0.8 }, "-=0.2")
        .to("#project-desc", { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");

    // Scroll Reveal Gallery
    gsap.utils.toArray(".project-gallery-item").forEach(item => {
        gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: item,
                start: "top 80%"
            }
        });
    });

    // Footer Reveal
    if (document.getElementById('project-footer')) {
        gsap.to("#project-footer", {
            opacity: 1,
            scrollTrigger: { trigger: "#project-footer", start: "top 90%" }
        });
    }
});
