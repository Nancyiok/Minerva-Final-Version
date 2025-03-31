export default function checkSections() {
    const sections = document.querySelectorAll('.lazy-section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            section.classList.add('loaded');
        }
    });
}

window.addEventListener('scroll', checkSections);
checkSections();