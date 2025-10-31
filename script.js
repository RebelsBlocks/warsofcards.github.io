// Documentation Navigation Script
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section[id]');
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.querySelector('.menu-toggle');

    // Smooth scroll for navigation links
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Close sidebar on mobile when clicking a link
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                }

                // Scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update active nav item on scroll
    function updateActiveNavItem() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Account for header offset on mobile
            const offset = window.innerWidth <= 768 ? 150 : 100;
            
            if (window.pageYOffset >= sectionTop - offset) {
                currentSection = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    }

    // Update on scroll (with throttling for better performance)
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveNavItem, 50);
    });

    // Set initial active state
    updateActiveNavItem();

    // Mobile menu toggle functionality
    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('active');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (sidebar.classList.contains('active') && 
                !sidebar.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Close sidebar on Escape key
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Remove active class if resizing above mobile breakpoint
            if (window.innerWidth > 768) {
                sidebar.classList.remove('active');
            }
        }, 250);
    });

    // Prevent body scroll when sidebar is open on mobile
    const preventBodyScroll = () => {
        if (window.innerWidth <= 768) {
            if (sidebar.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        } else {
            document.body.style.overflow = '';
        }
    };

    // Watch for sidebar class changes
    const observer = new MutationObserver(preventBodyScroll);
    observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });

    // Console greeting
    console.log('%c🎴 Wars of Cards Documentation', 'font-size: 16px; font-weight: bold; color: #37352f;');
    console.log('%cBuilt on NEAR Protocol', 'font-size: 12px; color: #6b6b6b;');
});
