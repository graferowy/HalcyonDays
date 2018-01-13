/*
** Checking if user pressed the hamburger icon
** If so button's animation is toggling
** And menu's appearing / disappearing
*/
const hamburgerIcon = document.querySelector(".hamburger");
const menu = document.getElementById("navigation");
hamburgerIcon.addEventListener("click", () => {
  hamburgerIcon.classList.toggle("is-active");
  menu.classList.toggle("navigation_active");
});

/*
** Upon clicking next review button script is looping through
** all of the reviews. If the current review in the loop is active
** script's toggling active class on the next review and then on the
** current review. After this action script breaks from the loop
** since there's no reason to go further.
*/
const nextReview = document.getElementById("next-article");
const reviews = document.querySelectorAll('.reviews__review');
nextReview.addEventListener("click", () => {
  let i = 1;
  for (let review of reviews) {
    if(review.classList.contains("reviews__review_active")) {
      reviews[i%reviews.length].classList.toggle("reviews__review_active");
      review.classList.toggle("reviews__review_active");
      break;
    }
    i++;
  }
});
