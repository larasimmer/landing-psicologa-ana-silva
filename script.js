document.addEventListener('DOMContentLoaded', () => {
    // --- Slider Logic ---
    const viewport = document.querySelector('.slider-viewport');
    const prevBtn = document.querySelector('.arrow.left');
    const nextBtn = document.querySelector('.arrow.right');

    function updateArrows() {
        if (!viewport) return;
        const scrollLeft = viewport.scrollLeft;
        const maxScroll = viewport.scrollWidth - viewport.clientWidth;

        if (prevBtn) prevBtn.classList.toggle('disabled', scrollLeft <= 5);
        if (nextBtn) nextBtn.classList.toggle('disabled', scrollLeft >= maxScroll - 5);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const firstCard = viewport.querySelector('.small-card');
            if (!firstCard) return;
            const cardWidth = firstCard.offsetWidth;
            const gap = 30; // matched from CSS
            const scrollAmount = window.innerWidth <= 768 ? (cardWidth + gap) : (cardWidth + gap) * 2;
            
            viewport.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const firstCard = viewport.querySelector('.small-card');
            if (!firstCard) return;
            const cardWidth = firstCard.offsetWidth;
            const gap = 30; // matched from CSS
            const scrollAmount = window.innerWidth <= 768 ? (cardWidth + gap) : (cardWidth + gap) * 2;

            viewport.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }

    if (viewport) viewport.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);

    // Initial check
    setTimeout(updateArrows, 100);

    // --- Hamburger Menu Logic ---
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('.header nav');
    const navLinks = document.querySelectorAll('.header nav a');

    if (hamburgerBtn && nav) {
        hamburgerBtn.addEventListener('click', () => {
            const isActive = nav.classList.toggle('active');
            hamburgerBtn.setAttribute('aria-expanded', isActive);
            
            // Toggle icon between bars and X
            const icon = hamburgerBtn.querySelector('i');
            if (isActive) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                const icon = hamburgerBtn.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }
});
