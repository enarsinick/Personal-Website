var acc = document.querySelectorAll("#accordion");
const closebtn = document.querySelector('.closebtn');
const menuItems = document.querySelector('.menu-items');
const menuSocialDiv = document.querySelector('.menu-social-icons');
var i;

for (i = 0; i < acc.length; i++) {
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
  } else {
    document.getElementById("mySidenav").style.width = "560px";
  }
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
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
    document.body.style.backgroundColor = "white";
    document.body.classList.remove('stop-scroll');
  }, 400);

}


// Initialise butter.js
butter.init({
  wrapperDamper: 0.06
});