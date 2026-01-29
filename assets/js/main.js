/* 
* Modern Premium Portfolio - Main.js
*/

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initAnimations();
    updateCopyright();
    initScrollToTop();
});

/* Theme Toggle */
function initTheme() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'btn-ghost theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.style.marginLeft = '1rem';

    const nav = document.querySelector('.nav');
    if (nav) nav.appendChild(themeToggle);

    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(themeToggle, savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(themeToggle, newTheme);
    });
}

function updateThemeIcon(btn, theme) {
    btn.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

/* Navigation */
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open', isActive);
            hamburger.innerHTML = isActive ? '✕' : '☰';
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
                hamburger.innerHTML = '☰';
            });
        });
    }

    // Active Link Highlight
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.nav-link');

    links.forEach(link => {
        if (link.getAttribute('href') === currentPath ||
            (currentPath.includes(link.getAttribute('href')) && link.getAttribute('href') !== '/')) {
            link.classList.add('active');
        }
    });

    // Floating Nav "Sticky" Behavior
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}



/* Animations (Intersection Observer) */
/* Animations (Intersection Observer) */
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // General Fade In
                if (entry.target.classList.contains('fade-in')) {
                    entry.target.classList.add('visible');
                }

                // Skill Bar Animation
                if (entry.target.classList.contains('skill-bar-fill')) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = width;
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe General Elements
    document.querySelectorAll('.section, .card, h2, .fade-in').forEach(el => {
        // Only hide if it's a fade-in element
        if (el.classList.contains('fade-in')) {
            // Ensure initial state is hidden (if not handled by CSS)
            // CSS .fade-in handles opacity: 0 and transform
        }
        observer.observe(el);
    });

    // Observe Skill Bars
    document.querySelectorAll('.skill-bar-fill').forEach(el => {
        el.style.width = '0'; // Reset width
        observer.observe(el);
    });
}

/* Utilities */
function updateCopyright() {
    const yearSpan = document.querySelector('#year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

/* Scroll to Top */
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


