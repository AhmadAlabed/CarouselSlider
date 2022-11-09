// 1
const innerCarousel = document.querySelector(".inner-carousel");
const iconPrev = document.querySelector(".icon-prev");
const iconNext = document.querySelector(".icon-next");
//////////////////////////////////////////////////////////////////
let isCarouselHold = false,
  prevPageX,
  prevScrollLeft;
//////////////////////////////////////////////////////////////////
let down = (e) => {
  isCarouselHold = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = innerCarousel.scrollLeft;
};
let up = () => {
  isCarouselHold = false;
};
let move = (e) => {
  if (isCarouselHold) {
    e.preventDefault();
    let position = (e.pageX || e.touches[0].pageX) - prevPageX;
    innerCarousel.scrollLeft = prevScrollLeft - position;
  }
};
//////////////////////////////////////////////////////////////////
innerCarousel.addEventListener("mousedown", down);
innerCarousel.addEventListener("mouseup", up);
innerCarousel.addEventListener("mousemove", move);
//////////////////////////////////////////////////////////////////
innerCarousel.addEventListener("touchstart", down);
innerCarousel.addEventListener("touchend", up);
innerCarousel.addEventListener("touchmove", move);
//////////////////////////////////////////////////////////////////
iconPrev.addEventListener("click", function () {
  innerCarousel.scrollLeft -=
    innerCarousel.querySelectorAll("img")[0].width + 10;
});
iconNext.addEventListener("click", function () {
  innerCarousel.scrollLeft +=
    innerCarousel.querySelectorAll("img")[0].width + 10;
});
//////////////////////////////////////////////////////////////////
// 2
const items = Array.from(
  document.querySelectorAll(".carousel-home .carousel-items img")
);
const next = document.querySelector(
  ".carousel-home .carousel-control .carousel-control-next i"
);
const prev = document.querySelector(
  ".carousel-home .carousel-control .carousel-control-prev i"
);
const carouselIndicator = document.querySelector(
  ".carousel-home .carousel-indicator"
);
//////////////////////////////////////////////////////////////////
let currentItem = 0;
createIndicators();
setImageActive();
//////////////////////////////////////////////////////////////////
function createIndicators() {
  let indicators = "";
  for (let i = 0; i < items.length; i++) {
    i === currentItem
      ? (indicators += `<div class="icon-indicator active"></div>`)
      : (indicators += `<div class="icon-indicator"></div>`);
  }
  carouselIndicator.innerHTML = indicators;
  Array.from(carouselIndicator.children).forEach((item, index) => {
    item.addEventListener("click", () => {
      currentItem = index;
      setImageActive();
      setIndicatorsActive();
    });
  });
}
function setImageActive() {
  items.forEach((item, index) => {
    index === currentItem
      ? item.classList.add("active")
      : item.classList.remove("active");
  });
}
function setIndicatorsActive() {
  Array.from(carouselIndicator.children).forEach((item, index) => {
    index === currentItem
      ? item.classList.add("active")
      : item.classList.remove("active");
  });
}
function moveNext() {
  currentItem++;
  if (currentItem === items.length) {
    currentItem = 0;
  }
  setImageActive();
  setIndicatorsActive();
}
function movePrev() {
  currentItem--;
  if (currentItem === -1) {
    currentItem = items.length - 1;
  }
  setImageActive();
  setIndicatorsActive();
}
next.addEventListener("click", moveNext);
prev.addEventListener("click", movePrev);
const autoSlide = setInterval(() => {
  moveNext();
}, 4000);
