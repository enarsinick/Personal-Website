var acc = document.querySelectorAll("#accordion");
const closebtn = document.querySelector('.closebtn');
const menuItems = document.querySelector('.menu-items');
const menuSocialDiv = document.querySelector('.menu-social-icons-container');
const menuOverlay = document.querySelector('.menu-overlay');
const logo = document.querySelector('.logo-wrapper');
const backToTop = document.querySelector('.back-to-top');
const footer = document.getElementById('footer');

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

/* Set the width of the side navigation to 250px */
function openNav() {
  if (window.innerWidth < 1190) {
    document.getElementById("mySidenav").style.width = "100%";
    logo.style.zIndex = "4";
  } else {
    document.getElementById("mySidenav").style.width = "560px";
  }
  menuOverlay.style.width = "100%";
  // wait 250ms for menu and menu overlay to animate out, then reveal overlay
  setTimeout(() => { menuOverlay.style.opacity = 1; }, 250);
  document.body.classList.add('stop-scroll');
  setTimeout(() => {
    closebtn.classList.add('show-menu-items');
    menuItems.classList.add('show-menu-items');
    menuSocialDiv.classList.add('show-menu-items');
  }, 250);
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    closebtn.classList.remove('show-menu-items');
    menuItems.classList.remove('show-menu-items');
    menuSocialDiv.classList.remove('show-menu-items');
  setTimeout(() => {
    document.getElementById("mySidenav").style.width = "0";
    menuOverlay.style.opacity = 0;
    logo.style.zIndex = "initial";
    document.body.classList.remove('stop-scroll');
  }, 400);
  setTimeout(() => {
    menuOverlay.style.width = "0"; 
  }, 900);
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