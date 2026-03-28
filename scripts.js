const toggler = document.querySelector('.toggle');
const navbar = document.querySelector('.navbar');
const navItems = document.querySelectorAll('.navItem');

const home = document.querySelector('.home');

const navLinks = document.querySelectorAll('.navbar .navItem a');

const sections = document.querySelectorAll('section');

toggler.addEventListener('click', (e)=> {

    if(navbar.classList.contains('show')){
        navbar.classList.remove('show');
        toggler.querySelector('a').innerHTML = '<i class="fa-solid fa-bars"></i>' ;
        home.style.marginTop = '0';

    }else{
        navbar.classList.add('show');
        toggler.querySelector('a').innerHTML = '<i class="fa-solid fa-xmark"></i>' ;
        home.style.marginTop = `${navbar.offsetHeight}px`;
    }

})



navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    // Remove active class from all links
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to the clicked link
    e.target.classList.add('active');
    navbar.classList.remove('show');
    toggler.querySelector('a').innerHTML = '<i class="fa-solid fa-bars"></i>' ;
    home.style.marginTop = '0';
  });
});

window.addEventListener('scroll', () => {
    let current = '';
  
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 50) {
        current = section.getAttribute('id');
      }
    });
  
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });
