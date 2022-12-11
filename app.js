import {
  getLatestPosts,
  getWeather,
  getTopPosts,
  // getByCategory,
} from "./server.js";
import { moveSliderBoxes, initializeSlider, truncateText } from "./slider.js";
import {
  initializeTopNews,
  clickStyleEffectOnCategory,
  filterByCategories,
  initializeLatestPosts,
} from "./helper.js";

// get data from api

const data = await getLatestPosts();
const topPosts = await getTopPosts();
// const data = {};
// const topPosts = {};
initializeTopNews(topPosts);
filterByCategories();
document.getElementById("main").style.display = "block";
document.querySelector(".loader").style.display = "none";

const background = document.querySelector(".background-cover");
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
    newsDate.innerHTML = data[i]?.published_at.substring(0, 10);
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

// free trial of this fake api only lets me use 5 articles pre request, that's why I'm spreading my data

const increasedData = [...data, ...data, ...data];
initializeLatestPosts(increasedData);
