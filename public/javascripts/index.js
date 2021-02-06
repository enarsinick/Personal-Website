const acc = document.querySelectorAll("#accordion");
const openBtn = document.querySelector('.menu-button-open');
const closebtn = document.querySelector('.closebtn');
const menuOverlay = document.querySelector('.menu-overlay');
const logo = document.querySelector('.logo-wrapper');
const backToTop = document.querySelector('.back-to-top');

gsap.registerPlugin(ScrollTrigger);


gsap.utils.toArray(".section-parallax .parallax-image").forEach((section, i) => {
  const heightDiff = section.offsetHeight - section.parentElement.offsetHeight;

  gsap.fromTo(section,{ 
    y: -heightDiff
    }, {
    scrollTrigger: {
      trigger: section.parentElement,
      scrub: true
    },
    y: 0,
    ease: "none"
  });
});


const getScrollerStart = () => {
  if (window.innerWidth >= 1190) {
    return 75;
  } else if(window.innerWidth >= 768) {
    return 80;
  } else {
    return 90;
  }
}

// GSAP Timeline for footer animation
let footer_tl = gsap.timeline();
footer_tl.to('.footer-inner', {
  scrollTrigger: {
    trigger: ".footer-trigger",
    start: () => {
      if (window.innerWidth >= 1190) {
        return "100% 75%";
      } else if(window.innerWidth >= 768) {
        return "100% 80%";
      } else {
        return "100% 90%";
      }
    },
    end: () => {
      let viewportHeight = window.innerHeight;
      let scrollStartPercent = getScrollerStart();
      let footerHeight = document.getElementById('footer').offsetHeight;
      let scrollStartFromBottom = viewportHeight - (viewportHeight * (scrollStartPercent / 100));
      return "+=" + (footerHeight - scrollStartFromBottom);
    },
    scrub: true,
  },
  opacity: 1,
  y: 0
});

// GSAP timeline for text content animation
let animate_content = gsap.timeline();
const animate = gsap.utils.toArray('.animate-content');
animate.forEach(element => {
  animate_content.to(element, {
    scrollTrigger: {
      trigger: element,
      start: () => {
        if(window.innerWidth >= 768) {
          return "top 90%";
        } else {
          return "top 85%";
        }
      },
      toggleActions: "play none none reset"
    },
    opacity: 1, 
    y: 0,
  });
});

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


// Page transition element on pageload
window.onload = () => {
  const anchors = document.querySelectorAll('.transition-link')
  let page_transition_enter = gsap.timeline();
  let page_transition_exit = gsap.timeline();
  page_transition_enter
    .to('.transition', {top: "-100%", duration: 1, delay: 0.3, ease: "power4.inOut"})
    .to('.transition-logo', {opacity: 0},"-=0.6")
    .to('.transition-content', {opacity: 1, duration: 1, y: 0, ease: "power4.out"},"-=0.5")

    for (let i = 0; i < anchors.length; i++) {
      const anchor = anchors[i]; 
      anchor.addEventListener('click', e => {
        e.preventDefault(); 
        let target = e.target.href || e.target.parentElement.href;

        page_transition_exit
          .to('.transition', {top: 0, duration: 0.6, ease: "power4.inOut"})
          .to('.transition-logo', {opacity: 1, duration: 0.5},"-=0.2")

        setTimeout(() => {
          window.location.href = target;
        }, 950);
      });
    }
};


