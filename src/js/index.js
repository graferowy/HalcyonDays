/*
** Checking if user pressed the hamburger icon
** If so button's animation is toggling
** And menu's appearing / disappearing
*/
const hamburgerIcon = document.querySelector(".hamburger");
const menu = document.getElementById("navigation");
hamburgerIcon.addEventListener("click", function() {
  hamburgerIcon.classList.toggle("is-active");
  menu.classList.toggle("navigation_active");
});
