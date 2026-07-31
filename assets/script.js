// ===========================================
// FEPICO — Funcionalidad de la landing
// ===========================================

document.addEventListener('DOMContentLoaded', () => {

  /* ============ COUNTDOWN ============ */
  function updateCountdown() {
    const target = new Date('2026-10-09T09:00:00-03:00');
    const now = new Date();
    const diff = target - now;

    const dEl = document.getElementById('cd-days');
    const hEl = document.getElementById('cd-hours');
    const mEl = document.getElementById('cd-mins');
    const sEl = document.getElementById('cd-secs');
    if (!dEl) return;

    if (diff <= 0) {
      dEl.textContent = '00';
      hEl.textContent = '00';
      mEl.textContent = '00';
      sEl.textContent = '00';
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    const pad = n => String(n).padStart(2, '0');

    dEl.textContent = days;
    hEl.textContent = pad(hours);
    mEl.textContent = pad(mins);
    sEl.textContent = pad(secs);
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ============ NAV MOBILE ============ */
  const burger = document.querySelector('.nav-burger');
  const navMobile = document.querySelector('.nav-mobile');
  if (burger && navMobile) {
    burger.addEventListener('click', () => {
      navMobile.classList.toggle('open');
    });
    // Cerrar al click en un link
    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navMobile.classList.remove('open'));
    });
  }

  /* ============ MANIFIESTO TOGGLE ============ */
  /* ============ MANIFIESTO SCROLL-REVEAL ============ */
  const manifestoParagraphs = document.querySelectorAll('.manifiesto-p');
  if (manifestoParagraphs.length) {
    if (!('IntersectionObserver' in window)) {
      manifestoParagraphs.forEach(p => p.classList.add('lit'));
    } else {
      const manifObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('lit');
        });
      }, { rootMargin: '0px 0px -30% 0px', threshold: 0.2 });
      manifestoParagraphs.forEach(p => manifObserver.observe(p));
    }
  }

  /* ============ FAQ ACCORDION ============ */
  function toggleFaq(item) {
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  }

  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', function() {
      toggleFaq(this.closest('.faq-item'));
    });
    btn.addEventListener('touchend', function(e) {
      e.preventDefault();
      toggleFaq(this.closest('.faq-item'));
    });
  });

  /* ============ FLIP CARDS — tap en mobile ============ */
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) {
    document.querySelectorAll('.flip-card').forEach(card => {
      card.addEventListener('click', () => {
        // Cerrar las demás
        document.querySelectorAll('.flip-card').forEach(c => {
          if (c !== card) c.classList.remove('flipped');
        });
        card.classList.toggle('flipped');
      });
    });
  }

  /* ============ SMOOTH SCROLL para anchors ============ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ============ ANIMACIONES DE SCROLL ============ */
  // Marcar el body como js-ready para activar las animaciones CSS
  document.body.classList.add('js-ready');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });

});