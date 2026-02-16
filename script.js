// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
    // Remove loading screen after animation
    setTimeout(function () {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.remove();
        }
    }, 4500);

    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
        const isClickInside = navMenu.contains(event.target) || navToggle.contains(event.target);
        if (!isClickInside && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#' && targetId !== '#0') {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Animated counters for stats
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-target'));

                if (target > 0) {
                    animateCounter(statNumber, target);
                    observer.unobserve(statNumber);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat-number').forEach(stat => {
        observer.observe(stat);
    });

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepTime);
    }

    // Navbar scroll effect
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.style.background = 'rgba(0, 0, 0, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
            nav.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
});
