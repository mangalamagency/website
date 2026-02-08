document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  // Mobile Menu Toggle
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = navLinks.classList.contains('active') ? 'fa-times' : 'fa-bars';
      menuBtn.innerHTML = `<i class="fas ${icon}"></i>`;
    });
  }

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80, // Offset for sticky header
          behavior: 'smooth'
        });
        // Close menu on mobile after click
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
      }
    });
  });

  // Scroll Animation Observer for Fade In Up
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.service-card, .brand-item, .contact-details .item, .testimonial-card').forEach(el => {
    fadeInObserver.observe(el);
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
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

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      // Close other open items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });

      // Toggle current item
      item.classList.toggle('active');
      if (item.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = null;
      }
    });
  });


  // Scroll Spy for Active Link Highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLi = document.querySelectorAll('.nav-links li a');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 250; // Increased offset to trigger active state earlier

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLi.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href').includes(current)) {
        a.classList.add('active');
      }
    });
  });

  // Dynamically add the fade-in-up class style if not present
  const styleSheet = document.createElement("style");
  styleSheet.innerText = `
    .fade-in-up {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(styleSheet);
});
