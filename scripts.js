/* ── Toggle Menu ────────────────────────────── */
const toggler = document.querySelector('.toggle');
const navbar  = document.querySelector('.navbar');
const navList = document.querySelector('.nav-list');
const home    = document.querySelector('.home');
const navLinks = document.querySelectorAll('.navbar .navItem a');
const sections = document.querySelectorAll('section');

toggler.addEventListener('click', () => {
  const isOpen = navbar.classList.toggle('show');
  navList.classList.toggle('show', isOpen);
  toggler.querySelector('a').innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
  home.style.marginTop = isOpen ? `${navbar.offsetHeight}px` : '0';
});

/* ── Close menu on nav link click ───────────── */
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    navbar.classList.remove('show');
    navList.classList.remove('show');
    toggler.querySelector('a').innerHTML = '<i class="fa-solid fa-bars"></i>';
    home.style.marginTop = '0';
  });
});

/* ── Active link on scroll ───────────────────── */
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (scrollY >= section.offsetTop - 80) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

/* ── Scroll Reveal ───────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger sibling reveals slightly
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
      const i = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Dynamic footer year ─────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
