import { truncateText } from "./slider.js";
import { getByCategory } from "./server.js";

const newsImages = document.querySelectorAll(".top-news-box img");
const newsDates = document.querySelectorAll(".top-news-box .news-date");
const newsTitles = document.querySelectorAll(".top-news-box h5");
const badges = document.querySelectorAll(".top-news-box .badge");

export const initializeTopNews = (data) => {
  if (data) {
    newsImages.forEach((img, i) => {
      img.src = data[i]?.urlToImage;
    });
    newsDates.forEach((date, i) => {
      date.innerHTML = data[i]?.publishedAt.substring(0, 10);
    });

    newsTitles.forEach((title, i) => {
      const text = truncateText(data[i]?.title, 50);
      title.innerHTML = text;
    });
  }
};

const filterCategories = document.querySelectorAll(
  ".container-2--categories li a"
);

export const clickStyleEffectOnCategory = () => {
  filterCategories.forEach((cat, i) => {
    cat.addEventListener("click", () => {
      const chosenCategory = document.querySelector(
        ".container-2--categories .chosen-category"
      );
      chosenCategory.classList.remove("chosen-category");
      cat.classList.add("chosen-category");
    });
  });
};

export const filterByCategories = async () => {
  let filteredData;
  let category;
  filterCategories.forEach((cat) => {
    cat.addEventListener("click", async () => {
      category = cat.innerHTML.toLowerCase();
      filteredData = await getByCategory(category, 4);
      initializeTopNews(filteredData);
      badges.forEach((badge) => {
        badge.innerHTML = category;
      });
    });
  });
};
