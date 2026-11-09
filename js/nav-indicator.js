/**
 * NAV INDICATOR - ESTILO EMPORIO 69
 * Barra animada deslizante bajo los enlaces del header con ScrollSpy preciso
 */
(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.header-nav');
    const navList = document.querySelector('.nav-list');
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    const header = document.querySelector('.site-header');
    const hamburger = document.querySelector('.header-hamburger');
    const drawer = document.querySelector('.mobile-nav-drawer');
    const mobileLinks = Array.from(document.querySelectorAll('.mobile-nav-link'));

    if (!navList || !navLinks.length) return;

    // Crear la barra indicadora deslizante si no existe
    let indicator = document.querySelector('.nav-sliding-indicator');
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.className = 'nav-sliding-indicator';
      navList.appendChild(indicator);
    }

    let activeLink = document.querySelector('.nav-link.active') || navLinks[0];
    let isHovering = false;

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

    // Mapeo dinámico de enlaces a sus secciones destino
    const sectionTargets = navLinks.map(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const el = document.querySelector(href);
        if (el) {
          return { link, el, id: href.replace('#', '') };
        }
      }
      return null;
    }).filter(Boolean);

    // Actualizar sección activa y mover indicador
    function setActiveSection(id) {
      const targetItem = sectionTargets.find(s => s.id === id);
      if (!targetItem) return;

      if (activeLink !== targetItem.link) {
        navLinks.forEach(l => l.classList.remove('active'));
        targetItem.link.classList.add('active');
        activeLink = targetItem.link;
        if (!isHovering) {
          moveIndicatorTo(activeLink);
        }
      }

      // Sincronizar mobile drawer
      mobileLinks.forEach(ml => {
        const mHref = ml.getAttribute('href');
        if (mHref === `#${id}`) {
          ml.classList.add('active');
        } else {
          ml.classList.remove('active');
        }
      });
    }

    // ScrollSpy de alta precisión
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Header scroll style
          if (window.scrollY > 40) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }

          if (sectionTargets.length === 0) {
            ticking = false;
            return;
          }

          // Si estamos al fondo de la página, activar el último link
          const atBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60);
          if (atBottom) {
            setActiveSection(sectionTargets[sectionTargets.length - 1].id);
            ticking = false;
            return;
          }

          // Detección por posición de viewport
          const scrollOffset = 180; // Offset visual bajo el header
          let currentId = sectionTargets[0].id;

          for (let i = 0; i < sectionTargets.length; i++) {
            const sec = sectionTargets[i].el;
            const top = sec.offsetTop;
            if (window.scrollY + scrollOffset >= top) {
              currentId = sectionTargets[i].id;
            }
          }

          setActiveSection(currentId);
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    // Ejecutar una vez al inicio
    onScroll();

    // Eventos hover y mouseleave
    navLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        isHovering = true;
        moveIndicatorTo(link);
      });

      link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        activeLink = link;
        isHovering = false;
        moveIndicatorTo(link);
      });
    });

    navList.addEventListener('mouseleave', () => {
      isHovering = false;
      moveIndicatorTo(activeLink);
    });

    window.addEventListener('resize', () => {
      moveIndicatorTo(activeLink);
    });

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
