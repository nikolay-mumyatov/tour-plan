const hotelSlider = new Swiper(".hotel-info-container", {
  // Optional parameters
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: ".hotel-info-button--next",
    prevEl: ".hotel-info-button--prev",
  },

  autoplay: {
    delay: 5000,
  },

  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
});


// Paralax effect
$(".parallax-window").parallax({ imageSrc: "img/subscribe/subscribe.jpg" });


// Reviews slider
const reviews = new Swiper(".reviews-slider-container", {
  // Optional parameters
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: ".reviews-slider-button--next",
    prevEl: ".reviews-slider-button--prev",
  },
});


// Burger menu

var menuBtn = document.querySelector(".burger");

menuBtn.addEventListener("click", function () {
  console.log("нажал");
  document.querySelector(".header-nav").classList.toggle("header-nav__visible");
});