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

/*
** jQuery function for smooth scrolling taken from
** https://css-tricks.com/snippets/jquery/smooth-scrolling/
*/
$('a[href*="#"]')
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) {
            return false;
          } else {
            $target.attr('tabindex','-1');
            $target.focus();
          };
        });
      }
    }
  });
