const hamburger = document.querySelector(".hamburger");
const navMenuSmall = document.querySelector(".navbar.small-res");

const categories = document.querySelector(".categories");
const subCategories = document.querySelector(".sub-categories");

const disableSideMenu = () => {
  navMenuSmall.classList.remove("active");
  hamburger.classList.remove("active");
};

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenuSmall.classList.toggle("active");
});

window.addEventListener("resize", (event) => {
  subCategories.classList.remove("visible");
  if (window.innerWidtouth > 768) {
    disableSideMenu();
  }
});

document.addEventListener("click", function (e) {
  var el = e.target;
  if (!categories.contains(el)) {
    subCategories.classList.remove("visible");
  }
  if (!navMenuSmall.contains(el) && !hamburger.contains(el)) {
    disableSideMenu();
  }
});

categories.addEventListener("click", () => {
  subCategories.classList.toggle("visible");
});
