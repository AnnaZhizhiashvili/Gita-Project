import { getLatestPosts, getWeather, getTopPosts } from "./server.js";
import { moveSliderBoxes, initializeSlider } from "./slider.js";
import { initializeTopNews } from "./helper.js";

const hamburger = document.querySelector(".hamburger");
const navMenuSmall = document.querySelector(".navbar.small-res");
const background = document.querySelector(".background-news-wrapper");
const newsHeader = document.querySelector(
  ".background-news-wrapper .news-title"
);
const newsCategory = document.querySelector(
  ".background-news-wrapper .news-category"
);
const newsDate = document.querySelector(".background-news-wrapper .news-date");
const newsAuthor = document.querySelector(
  ".background-news-wrapper .news-author"
);
const categories = document.querySelector(".categories");
const subCategories = document.querySelector(".sub-categories");
const weather = document.querySelector(
  ".weather-container .temperature-wrapper"
);

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

// working with API

const data = await getLatestPosts();
const topPosts = await getTopPosts();
// const data = {};
// const topPosts = {};
console.log(topPosts, "top");
initializeTopNews(topPosts);

let i = 0;
const changeBackgroundNews = () => {
  background.style.backgroundImage = `url("../assets/images/background-images/${i}.jpg")`;
  if (data) {
    newsHeader.innerHTML = data[i]?.title;
    // newsCategory.innerHTML = data[i]?.category;
    newsDate.innerHTML = data[i]?.publishedAt.substring(0, 10);
    newsAuthor.innerHTML = data[i]?.author ? "By " + data[i]?.author : "";
  }
  i++;
  if (i > 3) {
    i = 0;
  }
};

setInterval(changeBackgroundNews, 2000);

// weather api
const weatherData = await getWeather();
weather.innerHTML =
  Math.round(weatherData.hourly.temperature_2m[0]) + "&#176; C";

// mini slider
initializeSlider(data);
moveSliderBoxes();

// on click categories

const filterCategories = document.querySelectorAll(
  ".container-2--categories li"
);

filterCategories.forEach((cat, i) => {
  cat.addEventListener("click", () => {
    const chosenCategory = document.querySelector(
      ".container-2--categories .chosen-category"
    );
    chosenCategory.classList.remove("chosen-category");
    cat.classList.add("chosen-category");
  });
});
console.log(filterCategories);
