const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        navbar.classList.add('navbar-shadow');
      } else {
        navbar.classList.remove('navbar-shadow');
      }
    });

    // Hero entrance animations
    const heroElements = document.querySelectorAll('.fade-in-up');
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('active');
          }, index * 100);
        }
      });
    }, observerOptions);

    heroElements.forEach(el => observer.observe(el));

    // Desktop dropdown hover
    const dropdownContainers = document.querySelectorAll('.dropdown-container');

    dropdownContainers.forEach(container => {
      const button = container.querySelector('button');
      const menu = container.querySelector('.dropdown-menu');
      let timeoutId;

      const showDropdown = () => {
        clearTimeout(timeoutId);
        menu.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
      };

      const hideDropdown = () => {
        timeoutId = setTimeout(() => {
          menu.classList.remove('active');
          button.setAttribute('aria-expanded', 'false');
        }, 150);
      };

      // Mouse events
      container.addEventListener('mouseenter', showDropdown);
      container.addEventListener('mouseleave', hideDropdown);

      // Keyboard navigation
      button.addEventListener('focus', showDropdown);
      button.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          hideDropdown();
          button.focus();
        }
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          showDropdown();
          const firstLink = menu.querySelector('a');
          if (firstLink) firstLink.focus();
        }
      });

      // Allow keyboard navigation within dropdown
      const links = menu.querySelectorAll('a');
      links.forEach((link, index) => {
        link.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextLink = links[index + 1];
            if (nextLink) nextLink.focus();
          }
          if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevLink = links[index - 1];
            if (prevLink) {
              prevLink.focus();
            } else {
              button.focus();
            }
          }
          if (e.key === 'Escape') {
            hideDropdown();
            button.focus();
          }
        });

        link.addEventListener('blur', (e) => {
          if (!container.contains(e.relatedTarget)) {
            hideDropdown();
          }
        });
      });
    });

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('active');
      mobileMenuButton.setAttribute('aria-expanded', isOpen);
    });

    // Mobile services submenu toggle
    const mobileServicesButton = document.getElementById('mobile-services-button');
    const mobileServicesMenu = document.getElementById('mobile-services-menu');

    mobileServicesButton.addEventListener('click', () => {
      const isOpen = mobileServicesMenu.classList.toggle('active');
      mobileServicesButton.setAttribute('aria-expanded', isOpen);
      const icon = mobileServicesButton.querySelector('svg');
      icon.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0)';
    });

    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
      });
    });
