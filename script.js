// Documentation Navigation Script

document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section[id]');

    // Smooth scroll for navigation links
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
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
            
            if (window.pageYOffset >= sectionTop - 100) {
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

    // Update on scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveNavItem, 50);
    });

    // Set initial active state
    updateActiveNavItem();

    // Mobile menu toggle (for responsive design)
    const createMobileMenuToggle = () => {
        if (window.innerWidth <= 768 && !document.querySelector('.menu-toggle')) {
            const toggle = document.createElement('button');
            toggle.className = 'menu-toggle';
            toggle.innerHTML = '☰ Menu';
            toggle.style.cssText = `
                position: fixed;
                top: 1rem;
                left: 1rem;
                z-index: 1000;
                padding: 0.5rem 1rem;
                background: white;
                border: 1px solid #e9e9e7;
                border-radius: 4px;
                font-size: 0.875rem;
                cursor: pointer;
            `;

            document.body.appendChild(toggle);

            toggle.addEventListener('click', () => {
                document.querySelector('.sidebar').classList.toggle('active');
            });

            // Close sidebar when clicking outside
            document.addEventListener('click', (e) => {
                const sidebar = document.querySelector('.sidebar');
                if (sidebar.classList.contains('active') && 
                    !sidebar.contains(e.target) && 
                    !toggle.contains(e.target)) {
                    sidebar.classList.remove('active');
                }
            });
        }
    };

    createMobileMenuToggle();
    window.addEventListener('resize', createMobileMenuToggle);

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        }
    });

    // Console greeting
    console.log('%c🎴 Wars of Cards Documentation', 'font-size: 16px; font-weight: bold; color: #37352f;');
    console.log('%cBuilt on NEAR Protocol', 'font-size: 12px; color: #6b6b6b;');
});
