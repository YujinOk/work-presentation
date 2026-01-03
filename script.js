// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // Update navigation dots
            const sections = document.querySelectorAll('.section');
            const index = Array.from(sections).indexOf(entry.target);
            updateNavDots(index);

            // Hide scroll hint after first scroll
            if (index > 0) {
                document.querySelector('.scroll-hint').classList.add('hidden');
            }
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Navigation dots functionality
function updateNavDots(activeIndex) {
    document.querySelectorAll('.dot').forEach((dot, index) => {
        if (index === activeIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Smooth scroll for navigation dots
document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.addEventListener('click', (e) => {
        e.preventDefault();
        const sections = document.querySelectorAll('.section');
        sections[index].scrollIntoView({ behavior: 'smooth' });
    });
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    const sections = document.querySelectorAll('.section');
    const currentIndex = Array.from(sections).findIndex(section =>
        section.classList.contains('active')
    );

    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        if (currentIndex < sections.length - 1) {
            sections[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
        }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentIndex > 0) {
            sections[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
        }
    } else if (e.key === 'Home') {
        e.preventDefault();
        sections[0].scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'End') {
        e.preventDefault();
        sections[sections.length - 1].scrollIntoView({ behavior: 'smooth' });
    }
});

// Activate first section on load
window.addEventListener('load', () => {
    const firstSection = document.querySelector('.section');
    if (firstSection) {
        firstSection.classList.add('active');
        updateNavDots(0);
    }
});

// Add scroll event for smoother navigation dot updates
let scrollTimeout;
const container = document.querySelector('.container');

container.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const sections = document.querySelectorAll('.section');
        const scrollPosition = container.scrollTop + window.innerHeight / 2;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                updateNavDots(index);
            }
        });
    }, 100);
});
