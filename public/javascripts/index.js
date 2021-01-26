const acc = document.querySelectorAll("#accordion");

const openBtn = document.querySelector('.menu-button-open');
const closebtn = document.querySelector('.closebtn');
const menuOverlay = document.querySelector('.menu-overlay');
const logo = document.querySelector('.logo-wrapper');
const backToTop = document.querySelector('.back-to-top');
const footer = document.getElementById('footer');


// Event listener for menu open button
openBtn.addEventListener('click', () => {
  let menu_tl_open = gsap.timeline();
  document.body.classList.add('stop-scroll');
  
  // If window is X wide, do certain animation
  // or do another if window is y width
  if (window.innerWidth > 1190) {
    menu_tl_open
      .to('.sidenav', {width: "560px", duration: 1, ease: "power4.out"})
      .to(menuOverlay, {opacity: 1, duration: 0.2,},"-=1")
      .to('.menu-items', {opacity: 1, duration: 1.5},"-=0.8")
      .to(closebtn, {opacity: 1, duration: 0.6},"-=0.8")
      .to('.menu-social-icons-container', {opacity: 1,duration: 0.6},"-=0.8");
  } else {
    logo.style.zIndex = "4";
    menu_tl_open
      .to('.sidenav', {width: "100%", duration: 0.8, ease: "power4.out"})
      .to(menuOverlay, {opacity: 1, duration: 0.1,},"-=0.8")
      .to('.menu-items', {opacity: 1, duration: 1.5},"-=0.6")
      .to(closebtn, {opacity: 1, duration: 0.6},"-=1")
      .to('.menu-social-icons-container', {opacity: 1,duration: 0.6},"-=1")
  }
})

// Event listener for menu close button
closebtn.addEventListener('click', () => {
  let menu_tl_close = gsap.timeline();
  document.body.classList.remove('stop-scroll');
  logo.style.zIndex = "initial";
  menu_tl_close
    .to('.menu-items', {opacity: 0, duration: 0.4})
    .to(closebtn, {opacity: 0, duration: 0.4},"-=0.4")
    .to('.menu-social-icons-container', {opacity: 0,duration: 0.4},"-=0.4")
    .to('.sidenav', {width: "0", duration: 0.5, ease: "power4.out"},"-=0.1")
    .to(menuOverlay, {opacity: 0, duration: 0.2,},"-=0.8")
})




// Accordian functionality
for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}


// If user has scrolled certain distance, display back to top button
window.addEventListener("scroll", () => {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    backToTop.style.opacity = 1;
    footer.style.opacity = 1;
  } else {
    backToTop.style.opacity = 0;
    footer.style.opacity = 0;
  }
});

// Scroll back to top once user clicks button
backToTop.addEventListener('click', () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

// Checks whenever user scrolls to see if they're at the footer yet
window.addEventListener("scroll", () => {
  let pageHeight = document.body.scrollHeight;
  let footerHeight = footer.offsetHeight;
  let scrollPosition = window.scrollY;
  let halfViewportHeight = window.innerHeight / 2;

  // Is the user on a tablet or not
  if (window.innerWidth < 1190 && window.innerWidth > 728) {
    if (((scrollPosition + halfViewportHeight) + 100) > (pageHeight - footerHeight)) {
      document.querySelector('.footer-inner').classList.add('show-footer');
    } else {
      document.querySelector('.footer-inner').classList.remove('show-footer');
    }
  } else {
    if ((scrollPosition + halfViewportHeight) > (pageHeight - footerHeight)) {
      document.querySelector('.footer-inner').classList.add('show-footer');
    } else {
      document.querySelector('.footer-inner').classList.remove('show-footer');
    }
  }
});

// Page transition element on pageload
window.onload = () => {
  const transitionElement = document.querySelector('.transition');
  const anchors = document.querySelectorAll('.transition-link')
  const transitionContent = document.querySelectorAll('.transition-content');

  setTimeout(() => {
    transitionElement.classList.remove('is-active')
  }, 360);

  setTimeout(() => {
    for(let i = 0; i < transitionContent.length; i++) {
      transitionContent[i].classList.add('content-active')
    }
  }, 500);

  for (let i = 0; i < anchors.length; i++) {
    const anchor = anchors[i]; 
    anchor.addEventListener('click', e => {
      e.preventDefault(); 
      let target = e.target.href || e.target.parentElement.href;
      transitionElement.classList.add('is-active');
      setTimeout(() => {
        window.location.href = target;
      }, 360);
    });
  }
};
