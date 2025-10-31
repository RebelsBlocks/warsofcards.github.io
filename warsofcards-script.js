// Loading Screen Handler
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');

    // Hide loader and show content when page is fully loaded
    window.addEventListener('load', function() {
        if (loader && content) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                content.classList.add('visible');
            }, 500);
        }
    });
});

// Smooth scroll to top when navigating
window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
});
