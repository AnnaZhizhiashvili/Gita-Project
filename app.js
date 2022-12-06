import { getData, getWeather } from "./server.js";
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

const data = await getData();
let i = 0;
const changeBackgroundNews = () => {
  background.style.backgroundImage = `url("../assets/images/background-images/${i}.jpg")`;
  if (data) {
    newsHeader.innerHTML = data[i]?.title;
    newsCategory.innerHTML = data[i]?.category;
    newsDate.innerHTML = data[i]?.published_at.substring(0, 10);
    newsAuthor.innerHTML = data[i]?.author ? "By " + data[i]?.author : "";
  }

  i++;
  if (i > 3) {
    i = 0;
  }
};

setInterval(changeBackgroundNews, 2000);

// weather
const weatherData = await getWeather();
weather.innerHTML =
  Math.round(weatherData.hourly.temperature_2m[0]) + "&#176; C";

let sliderContainers = document.querySelectorAll(".slider-box");
let boxesArr = Array.from(sliderContainers);
let sliderImgBoxes = document.querySelectorAll(".slider-box--img");
let sliderDateTexts = document.querySelectorAll(".slider-box .news-date");
let sliderHeaderTexts = document.querySelectorAll(
  ".slider-box .slider-box--text-title"
);

const truncateText = (str, limit) => {
  if (str.length > limit) {
    return str.substring(0, limit) + "...";
  }
  return str;
};
if (data) {
  sliderImgBoxes.forEach((box, i) => {
    box.style.backgroundImage = `url('../assets/images/background-images/${i}.jpg`;
  });

  sliderDateTexts.forEach((box, i) => {
    console.log(data[i].published_at, box);
    box.innerHTML = data[i]?.published_at.substring(0, 10);
  });

  sliderHeaderTexts.forEach((box, i) => {
    const text = truncateText(data[i].title, 60);
    box.innerHTML = text;
  });
}

const sliderBoxWidth = 45;
const gap = 4;
const movement = sliderBoxWidth + gap;

let toggleElementsPositions = (movement) => {
  let position = -sliderBoxWidth;
  let firstEl = boxesArr.shift();
  boxesArr.push(firstEl);
  boxesArr.forEach((el, i) => {
    el.style.left = position + "%";
    if (i === 0 || i === 3) {
      el.style.opacity = "0";
    } else {
      el.style.opacity = "1";
    }
    position += movement;
  });
};
setInterval(() => toggleElementsPositions(movement), 2000);

console.log(boxesArr);
