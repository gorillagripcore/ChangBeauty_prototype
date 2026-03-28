/* ============================================
   CHANG BEAUTY – SCRIPTS
   ============================================ */

(function () {
  'use strict';

  /* ===== MOBILE NAV TOGGLE ===== */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      document.documentElement.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on nav link click
    navMenu.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        navToggle.focus();
      }
    });
  }

  /* ===== STICKY HEADER SHADOW ===== */
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  /* ===== FLOATING CTA ===== */
  const floatingCta = document.getElementById('floatingCta');
  const hero = document.querySelector('.hero');

  if (floatingCta && hero) {
    const observer = new IntersectionObserver(function (entries) {
      // Show floating CTA once hero is out of view
      floatingCta.classList.toggle('visible', !entries[0].isIntersecting);
    }, { threshold: 0.1 });
    observer.observe(hero);
  }

  /* ===== SCROLL REVEAL ===== */
  const reveals = document.querySelectorAll('.service-card, .staff-card, .badge-card, .policy__item, .faq__item, .trust-bar__item');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal', 'visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) {
      el.classList.add('reveal');
      revealObserver.observe(el);
    });
  }

  /* ===== SMOOTH SCROLL for anchor links ===== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerH = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ===== ANIMATE RATING BARS on scroll ===== */
  const bars = document.querySelectorAll('.rating-bar__fill');
  if (bars.length && 'IntersectionObserver' in window) {
    const barObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Width is set via inline style in HTML — trigger CSS transition
          entry.target.style.width = entry.target.style.width;
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    bars.forEach(function (bar) {
      const finalWidth = bar.style.width;
      bar.style.width = '0%';
      barObserver.observe(bar);
      // Reset after a tiny delay to allow CSS transition to work
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          bar.style.width = finalWidth;
        });
      });
    });
  }

})();
