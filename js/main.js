// Css animation
AOS.init({
  disable: window.innerWidth < 768
});

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

// lazy load map
let map_container = document.getElementById('map');

map_container.addEventListener('mouseover', function() {
  map_container.insertAdjacentHTML('afterBegin', 
  '<iframe id="lazy" class="map__size" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6307.44741635654!2d-122.4186161557082!3d37.77307614436112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sru!4v1615206593579!5m2!1sru!2sru" width="350" height="213" style="border: 0" allowfullscreen="" loading="lazy" ></iframe>');
}, {once: true});


// form validation

$(".form").each(function () {
  $(this).validate({
    errorClass: "form-validate",
    rules: {
      name: {
        required: true,
        minlength: 2,
      },
      phone: {
        required: true,
        minlength: 17,
      },
    },
    messages: {
      name: {
        required: "Please specify your name",
        minlength: jQuery.validator.format("At least {0} characters required!"),
      },
      phone: {
        required: "Please specify your phone",
        minlength: "At least 11 characters required!",
      },
      email: {
        required: "We need your email address to contact you",
        email: "Your email address must be in the format of name@domain.com",
      },
    },
  });
});

// phone masc
$("input[type=tel]").mask("+7 (999) 999-9999");
$("input[type=tel]").focus(function () {
  $("input[type=tel]").val("+7");
});

// Modal window

let modalWindow = document.querySelector(".modal"),
  closeBtn = document.querySelector(".modal-close");

// Прослушивание документа на нажатие. Если нажали на элемент с классом .modal-btn то произойдет событие.
document.addEventListener("click", function (e) {
  const target = e.target;
  if (target.matches(".modal-btn")) {
    modalWindow.classList.toggle("modal-active");
    $("body").css({"overflow": "hidden"});
  }
});

// Закрытие по кнопе ESC
$(document).keydown(function (eventObject) {
  if (eventObject.which == 27 && modalWindow.classList.contains('modal-active')){
    modalWindow.classList.remove("modal-active");
    $("body").css({"overflow": "visible"});
  }
});

closeBtn.addEventListener("click", function () {
  modalWindow.classList.toggle("modal-active");
  $("body").css({"overflow": "visible"});
});

$(document).click(function (e) {
  if ($(e.target).is(".modal")) {
    modalWindow.classList.toggle("modal-active");
    $("body").css({"overflow": "visible"});
  }
});
