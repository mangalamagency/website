document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Behavior (Bootstrap handles toggle, we handle link clicks close)
  const navLinks = document.querySelectorAll('.nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.getComputedStyle(navbarCollapse).display !== 'none' && navbarCollapse.classList.contains('show')) {
        // Bootstrap 5 Collapse Instance
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: true
        });
      }
    });
  });

  // Smooth Scroll for Anchor Links (with offset for fixed header)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80, // Offset for sticky header
          behavior: 'smooth'
        });
      }
    });
  });

  // Scroll Animation Observer for Fade In Up
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-up');
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  // Observe elements
  document.querySelectorAll('.service-card, .brand-item, .card, .img-fluid').forEach(el => {
    // Only apply if not already animated
    if (!el.classList.contains('animate-up')) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      fadeInObserver.observe(el);
    }
  });

  // Animated Counters
  const counters = document.querySelectorAll('.counter');
  const speed = 200; // The lower the slower

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const updateCount = () => {
          const target = +counter.getAttribute('data-target');
          const count = +counter.innerText;
          const inc = target / speed;

          if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 20);
          } else {
            counter.innerText = target + "+";
          }
        };
        updateCount();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });

  // Scroll Spy for Active Link Highlighting
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100; // Offset

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(a => {
      a.classList.remove('active');
      if (current && a.getAttribute('href').includes(current)) {
        a.classList.add('active');
      }
    });
  });

});
