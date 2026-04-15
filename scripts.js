/* ── Toggle Menu ────────────────────────────── */
const toggler  = document.querySelector('.toggle');
const navbar   = document.querySelector('.navbar');
const navList  = document.querySelector('.nav-list');
const home     = document.querySelector('.home');
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

/* ── Hire Modal ─────────────────────────────── */
const modal    = document.getElementById("hireModal");
const hireBtn  = document.getElementById("hireBtn");
const closeBtn = document.querySelector(".close");

hireBtn.onclick = function (e) {
  e.preventDefault();
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
};

closeBtn.onclick = function () {
  modal.style.display = "none";
  document.body.style.overflow = "";
};

window.onclick = function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
};

/* ── Date formatting in hire form ──────────── */
const dateInput = document.getElementById("startDate");
dateInput.addEventListener("change", function () {
  const date = new Date(this.value);
  const formatted = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  this.type = "text";
  this.value = formatted;
});

/* ── Form Submit via EmailJS ────────────────── */
const form       = document.getElementById("hireForm");
const successMsg = document.getElementById("successMessage");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const submitBtn = form.querySelector("button[type='submit']");
  submitBtn.textContent = "Sending…";
  submitBtn.disabled = true;

  emailjs.sendForm("service_rzwi3qw", "template_47u5h57", this)
    .then(() => {
      successMsg.style.display = "block";
      form.style.display = "none";
    })
    .catch((error) => {
      submitBtn.textContent = "Submit Enquiry";
      submitBtn.disabled = false;
      alert("Failed to send. Please try again.");
      console.error(error);
    });
});

/* ── Close menu on nav link click ───────────── */
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    navbar.classList.remove("show");
    navList.classList.remove("show");
    toggler.querySelector("a").innerHTML = '<i class="fa-solid fa-bars"></i>';
    home.style.marginTop = "0";
  });
});

/* ── Active link on scroll ───────────────────── */
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    if (scrollY >= section.offsetTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* ── Scroll Reveal ───────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const siblings = Array.from(
          entry.target.parentElement.querySelectorAll(".reveal")
        );
        const i = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ── Dynamic footer year ─────────────────────── */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
