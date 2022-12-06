import { truncateText } from "./slider.js";

const topNewsImages = document.querySelectorAll(".top-news-box img");
const topNewsDates = document.querySelectorAll(".top-news-box .news-date");
const topNewsTitles = document.querySelectorAll(".top-news-box h5");

export const initializeTopNews = (data) => {
  if (data) {
    topNewsImages.forEach((img, i) => {
      img.src = data[i]?.urlToImage;
    });
    topNewsDates.forEach((date, i) => {
      console.log(data[i]);
      date.innerHTML = data[i]?.publishedAt.substring(0, 10);
    });

    topNewsTitles.forEach((title, i) => {
      const text = truncateText(data[i]?.title, 50);
      title.innerHTML = text;
    });
  }
};
