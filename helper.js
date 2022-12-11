import { truncateText } from "./slider.js";
import { getByCategory } from "./server.js";

const newsImages = document.querySelectorAll(".top-news-box img");
const newsDates = document.querySelectorAll(".top-news-box .news-date");
const newsTitles = document.querySelectorAll(".top-news-box h5");
const badges = document.querySelectorAll(".top-news-box .badge");

export const initializeTopNews = (data) => {
  if (data) {
    for (let i = 0; i < newsImages.length; i++) {
      newsImages[i].src = data[i]?.image_url;
      newsDates[i].innerHTML = data[i]?.published_at?.substring(0, 10);
      const text = truncateText(data[i]?.title, 50);
      newsTitles[i].innerHTML = text;
    }
  }
};

// top news categories

const filterCategories = document.querySelectorAll(
  ".container-top-news--categories li a"
);

export const clickStyleEffectOnCategory = () => {
  filterCategories.forEach((cat, i) => {
    cat.addEventListener("click", () => {
      const chosenCategory = document.querySelector(
        ".container-top-news--categories .active-red"
      );
      chosenCategory.classList.remove("active-red");
      cat.classList.add("active-red");
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

// latest news

const latestNewsLargeBox = document.querySelector(
  ".container-latest-news .latest-news-main .latest-new"
);
const latestNewsMainContainer = document.querySelector(
  ".container-latest-news .latest-news-container.main"
);

export const initializeLatestPosts = (latestData) => {
  for (let i = 0; i < 5; i++) {
    const clonedNode = latestNewsLargeBox.cloneNode(true);
    latestNewsMainContainer.append(clonedNode);
  }

  const latestNewsSmallBox = document.querySelector(
    ".container-latest-news .sidebar .latest-news-box "
  );
  const latestNewsSidebarContainer = document.querySelector(
    ".container-latest-news .sidebar-posts"
  );
  for (let i = 0; i < 5; i++) {
    const clonedNode = latestNewsSmallBox.cloneNode(true);
    latestNewsSidebarContainer.append(clonedNode);
  }

  const latestNewsImages = document.querySelectorAll(
    ".container-latest-news .latest-news-container img:not(.logo-img)"
  );

  const latestNewsDates = document.querySelectorAll(
    ".container-latest-news .latest-news-container .news-date"
  );

  const latestNewsTitles = document.querySelectorAll(
    ".container-latest-news .latest-news-container .title"
  );

  const latestNewsDescriptions = document.querySelectorAll(
    ".container-latest-news .latest-news-container .description"
  );
  for (let i = 0; i < latestNewsImages.length; i++) {
    latestNewsImages[i].src = latestData[i]?.image_url;
    latestNewsDates[i].innerHTML = latestData[i]?.published_at?.substring(
      0,
      10
    );
    latestNewsTitles[i].innerHTML = truncateText(latestData[i]?.title, 60);
    if (latestNewsDescriptions[i]) {
      latestNewsDescriptions[i].innerHTML = truncateText(
        latestData[i]?.description,
        100
      );
    }
  }
};
