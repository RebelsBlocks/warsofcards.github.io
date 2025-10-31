// Documentation Navigation Script
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section[id]');
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    const prevArrow = document.querySelector('.nav-prev');
    const nextArrow = document.querySelector('.nav-next');

    // Create array of section IDs in order
    const sectionIds = Array.from(sections).map(section => section.getAttribute('id'));
    let currentSectionIndex = 0;

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

        // Update nav items
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });

        // Update current section index and arrow states
        if (currentSection) {
            currentSectionIndex = sectionIds.indexOf(currentSection);
            updateArrowStates();
        }
    }

    // Update arrow button states
    function updateArrowStates() {
        // Disable previous arrow on first section
        if (currentSectionIndex === 0) {
            prevArrow.disabled = true;
        } else {
            prevArrow.disabled = false;
        }

        // Disable next arrow on last section
        if (currentSectionIndex === sectionIds.length - 1) {
            nextArrow.disabled = true;
        } else {
            nextArrow.disabled = false;
        }
    }

    // Navigate to previous section
    prevArrow.addEventListener('click', () => {
        if (currentSectionIndex > 0) {
            const prevSectionId = sectionIds[currentSectionIndex - 1];
            const prevSection = document.getElementById(prevSectionId);
            
            if (prevSection) {
                prevSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });

    // Navigate to next section
    nextArrow.addEventListener('click', () => {
        if (currentSectionIndex < sectionIds.length - 1) {
            const nextSectionId = sectionIds[currentSectionIndex + 1];
            const nextSection = document.getElementById(nextSectionId);
            
            if (nextSection) {
                nextSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Close sidebar on Escape key
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
        
        // Arrow key navigation
        if (e.key === 'ArrowLeft' && !prevArrow.disabled) {
            prevArrow.click();
        }
        
        if (e.key === 'ArrowRight' && !nextArrow.disabled) {
            nextArrow.click();
        }
    });

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

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Remove active class if resizing above mobile breakpoint
            if (window.innerWidth > 768) {
                sidebar.classList.remove('active');
            }
            // Update active nav item for new viewport
            updateActiveNavItem();
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
