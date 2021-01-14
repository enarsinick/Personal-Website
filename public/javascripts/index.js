var acc = document.querySelectorAll("#accordion");
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
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.body.style.backgroundColor = "white";
  document.body.classList.remove('stop-scroll');
}


// Initialise butter.js
butter.init({
  wrapperDamper: 0.06
});