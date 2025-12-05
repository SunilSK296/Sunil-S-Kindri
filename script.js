document.addEventListener('DOMContentLoaded', () => {
    // 1. Metric Counter Animation
    const counters = document.querySelectorAll('.metric-value');

    const startCounter = (targetElement) => {
        const target = parseFloat(targetElement.getAttribute('data-target'));
        const isDecimal = targetElement.textContent.includes('.');
        const duration = 2000; // 2 seconds
        let start = 0;
        let increment = (target / (duration / 16)); // ~60fps

        const updateCounter = () => {
            start += increment;
            
            if (start < target) {
                targetElement.textContent = isDecimal 
                    ? start.toFixed(1) 
                    : Math.ceil(start).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                targetElement.textContent = isDecimal 
                    ? target.toFixed(1) 
                    : target.toLocaleString();
            }
        };
        updateCounter();
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.7 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // 2. Section Fade-in on Scroll (Optional but recommended)
    const sections = document.querySelectorAll('.flux-section, .metrics-section');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        sectionObserver.observe(section);
    });
});
