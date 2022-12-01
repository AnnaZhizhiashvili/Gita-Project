import { getData } from "./server.js";
const hamburger = document.querySelector(".hamburger");
const navMenuSmall = document.querySelector(".navbar.small-res");
const background = document.querySelector(".background-img");
const newsHeader = document.querySelector(".background-img h2");
const newsDescription = document.querySelector(".background-img p");
const categories = document.querySelector(".categories");
const subCategories = document.querySelector(".sub-categories");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenuSmall.classList.toggle("active");
});

window.addEventListener("resize", (event) => {
  subCategories.classList.remove("visible");
  if (window.innerWidth > 768) {
    hamburger.classList.remove("active");
    navMenuSmall.classList.remove("active");
  }
});

document.addEventListener("click", function (e) {
  var el = e.target;
  if (!categories.contains(el)) {
    subCategories.classList.remove("visible");
  }
});

categories.addEventListener("click", () => {
  subCategories.classList.toggle("visible");
});

const data = await getData();
let i = 0;
const changeBackgroundNews = () => {
  background.style.backgroundImage = `url("../assets/images/background-images/${i}.jpg")`;
  newsHeader.innerHTML = data[i].title;
  newsDescription.innerHTML = data[i].description;
  i++;
  if (i > 3) {
    i = 0;
  }
};

console.log(data);

setInterval(changeBackgroundNews, 2000);
