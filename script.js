document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Fade-in on Scroll Logic (Intersection Observer) ---

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll, .vision-card');
    const metricItems = document.querySelectorAll('.metric-item');

    // Configuration for the observer
    const observerOptions = {
        root: null, // Use the viewport as the container
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a class that triggers the CSS fade/transform transition
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';

                // If it's a metric item, start the progress bar animation
                if (entry.target.classList.contains('metric-item')) {
                    const progressBar = entry.target.querySelector('.progress-bar');
                    // CSS is pre-configured with --progress variable, just observing is enough.
                    // The CSS transition handles the smooth animation of the width.
                    // No need for complex JS counter animation here.
                }

                // Stop observing once the animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Set initial state and observe all elements
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px) scale(0.95)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });

    // We observe metric items separately to trigger the progress bar animation implicitly
    metricItems.forEach(metric => {
         // The animate-on-scroll handles the main item fade, but we need to ensure the
         // progress bars start wide when the section is visible.
         // Since the progress bar CSS already has the transition set on its width,
         // just being observed with the main group is sufficient for the visual effect.
    });
});
