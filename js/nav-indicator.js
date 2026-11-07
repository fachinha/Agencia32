/**
 * NAV INDICATOR - ESTILO EMPORIO 69
 * Barra animada deslizante bajo los enlaces del header
 */
(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.header-nav');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.site-header');
    const hamburger = document.querySelector('.header-hamburger');
    const drawer = document.querySelector('.mobile-nav-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (!navList || !navLinks.length) return;

    // Crear la barra indicadora deslizante si no existe
    let indicator = document.querySelector('.nav-sliding-indicator');
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.className = 'nav-sliding-indicator';
      navList.appendChild(indicator);
    }

    let activeLink = document.querySelector('.nav-link.active') || navLinks[0];

    // Posiciona la barra animada exactamente sobre el link
    function moveIndicatorTo(link) {
      if (!link) {
        indicator.style.opacity = '0';
        return;
      }
      const navRect = navList.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();

      const left = linkRect.left - navRect.left;
      const width = linkRect.width;

      indicator.style.transform = `translateX(${left}px)`;
      indicator.style.width = `${width}px`;
      indicator.style.opacity = '1';
    }

    // Inicializar posición
    setTimeout(() => {
      moveIndicatorTo(activeLink);
    }, 150);

    // Eventos hover y mouseleave
    navLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        moveIndicatorTo(link);
      });

      link.addEventListener('click', (e) => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        activeLink = link;
        moveIndicatorTo(link);
      });
    });

    navList.addEventListener('mouseleave', () => {
      moveIndicatorTo(activeLink);
    });

    window.addEventListener('resize', () => {
      moveIndicatorTo(activeLink);
    });

    // Header scroll background effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });

    // Scrollspy interactivo usando IntersectionObserver
    const sections = document.querySelectorAll('section[id], div[id].ticker, div[id].casinoclub-wrap');
    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -65% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (!id) return;
          const matchingLink = document.querySelector(`.nav-link[href="#${id}"]`);
          if (matchingLink && matchingLink !== activeLink) {
            navLinks.forEach(l => l.classList.remove('active'));
            matchingLink.classList.add('active');
            activeLink = matchingLink;
            moveIndicatorTo(matchingLink);
          }

          // También actualizar links de mobile drawer
          mobileLinks.forEach(ml => {
            if (ml.getAttribute('href') === `#${id}`) {
              mobileLinks.forEach(m => m.classList.remove('active'));
              ml.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(sec => observer.observe(sec));

    // Menú hamburguesa móvil
    if (hamburger && drawer) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        drawer.classList.toggle('open');
      });

      mobileLinks.forEach(ml => {
        ml.addEventListener('click', () => {
          hamburger.classList.remove('active');
          drawer.classList.remove('open');
        });
      });
    }
  });
})();
