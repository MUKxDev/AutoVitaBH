// smooth scroll
var scroll = new SmoothScroll('.nav-bar, a[href*="#"]', {
  speed: 700
});

var scroll = new SmoothScroll('#mySidenav, a[href*="#"]', {
  speed: 700
});

// side navBar
function openNav() {
  document.getElementById("mySidenav").style.width = "100%";
  document.getElementById("side-nav-bar").style.display = "none";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("side-nav-bar").style.display = "block";
}
