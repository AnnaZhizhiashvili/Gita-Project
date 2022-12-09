import {
  getLatestPosts,
  getWeather,
  getTopPosts,
  getByCategory,
} from "./server.js";
import { moveSliderBoxes, initializeSlider, truncateText } from "./slider.js";
import {
  initializeTopNews,
  clickStyleEffectOnCategory,
  filterByCategories,
  initializeLatestPosts,
} from "./helper.js";

// working with API

// const data = await getLatestPosts();
// const topPosts = await getTopPosts();
const data = {};
const topPosts = {};
initializeTopNews(topPosts);
filterByCategories();

const background = document.querySelector(".background-news-wrapper");
const newsHeader = document.querySelector(
  ".background-news-wrapper .news-title"
);

const newsDate = document.querySelector(".background-news-wrapper .news-date");
const newsAuthor = document.querySelector(
  ".background-news-wrapper .news-author"
);
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
const weather = document.querySelector(
  ".weather-container .temperature-wrapper"
);

const weatherData = await getWeather();
weather.innerHTML =
  Math.round(weatherData.hourly.temperature_2m[0]) + "&#176; C";

// mini slider
initializeSlider(data);
moveSliderBoxes();

// on click categories

clickStyleEffectOnCategory();

initializeLatestPosts(data);

// const goToCategoryPage = (category) => {
//   console.log(category);
// };

// const categoryLinks = document.querySelectorAll(".category-link");
// categoryLinks.forEach((node) => {
//   const category = node.innerHTML;
//   node.addEventListener("click", goToCategoryPage(category));
// });

// console.log(categoryLinks);
