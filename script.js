document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const projectTexts = document.querySelectorAll('.project-text');

    function updateTextOverflow(textEl) {
        if (!textEl) return;
        const isOverflowing = textEl.scrollHeight > textEl.clientHeight;
        textEl.classList.toggle('show-button', isOverflowing);
    }

    projectTexts.forEach(updateTextOverflow);

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectCard = this.closest('.project-card');
            const isExpanded = projectCard.classList.toggle('expanded');
            const textEl = projectCard.querySelector('.project-text');

            this.textContent = isExpanded ? 'Less' : 'Read more';
            this.classList.toggle('expanded', isExpanded);

            if (isExpanded) {
                textEl.classList.remove('show-button');
            } else {
                updateTextOverflow(textEl);
            }
        });
    });

    // Re-check overflow on resize
    window.addEventListener('resize', () => {
        document.querySelectorAll('.project-card:not(.expanded) .project-text')
            .forEach(updateTextOverflow);
    });

    // Image lightbox
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    const lightboxImage = document.getElementById('lightbox-image');
    const projectImages = document.querySelectorAll('.project-image img');

    function openLightbox(img) {
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxOverlay.classList.add('active');
        document.body.classList.add('lightbox-open');
    }

    function closeLightbox() {
        lightboxOverlay.classList.remove('active');
        document.body.classList.remove('lightbox-open');
        setTimeout(() => {
            if (!lightboxOverlay.classList.contains('active')) {
                lightboxImage.src = '';
            }
        }, 250);
    }

    projectImages.forEach(img => {
        img.addEventListener('click', () => openLightbox(img));
    });

    lightboxOverlay.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxOverlay.classList.contains('active')) {
            closeLightbox();
        }
    });
});
