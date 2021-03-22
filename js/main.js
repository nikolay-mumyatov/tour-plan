// settings slider
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

var menuBtn = document.querySelector(".burger"),
  burgerLine = document.querySelectorAll(".burger__line");

burgerLine.forEach(function (line) {
  menuBtn.addEventListener("click", function () {
    line.classList.toggle("burger__line-active");
    document
      .querySelector(".header-nav")
      .classList.toggle("header-nav__visible");
  });
});

// form validation

$(".form").each(function () {
  $(this).validate({
    errorClass: "form-validate",
    messages: {
      name: "Please specify your name",
      phone: "Please specify your phone",
      email: {
        required: "We need your email address to contact you",
        email: "Your email address must be in the format of name@domain.com",
      },
    },
  });
});

// phone masc
$("input[type=tel]").mask("+7 (999) 999-9999");

// Modal window

let modalWindow = document.querySelector(".modal"),
  closeBtn = document.querySelector(".modal-close");

// Прослушивание документа на нажатие. Если нажали на элемент с классом .modal-btn то произойдет событие.
document.addEventListener("click", function (e) {
  const target = e.target;
  if (target.matches(".modal-btn")) {
    modalWindow.classList.toggle("modal-active");
  }
});

// Закрытие по кнопе ESC
$(document).keydown(function (eventObject) {
  if (eventObject.which == 27) {
    modalWindow.classList.toggle("modal-active");
  }
});

closeBtn.addEventListener("click", function () {
  modalWindow.classList.toggle("modal-active");
});

$(document).click(function (e) {
  if ($(e.target).is(".modal")) {
    modalWindow.classList.toggle("modal-active");
  }
});
