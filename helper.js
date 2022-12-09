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
  console.log("here");
  filterCategories.forEach((cat, i) => {
    cat.addEventListener("click", () => {
      const chosenCategory = document.querySelector(
        ".container-2--categories .active-red"
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
  ".container-4 .latest-news-main .latest-new"
);
const latestNewsMainContainer = document.querySelector(
  ".container-4 .latest-news-container.main"
);

export const initializeLatestPosts = (latestData) => {
  for (let i = 0; i < 5; i++) {
    const clonedNode = latestNewsLargeBox.cloneNode(true);
    latestNewsMainContainer.append(clonedNode);
  }

  const latestNewsSmallBox = document.querySelector(
    ".container-4 .sidebar .latest-news-box "
  );
  const latestNewsSidebarContainer = document.querySelector(
    ".container-4 .sidebar-posts"
  );
  for (let i = 0; i < 5; i++) {
    const clonedNode = latestNewsSmallBox.cloneNode(true);
    latestNewsSidebarContainer.append(clonedNode);
  }

  const latestNewsImages = document.querySelectorAll(
    ".container-4 .latest-news-container img:not(.logo-img)"
  );

  const latestNewsDates = document.querySelectorAll(
    ".container-4 .latest-news-container .news-date"
  );

  const latestNewsTitles = document.querySelectorAll(
    ".container-4 .latest-news-container .title"
  );

  const latestNewsDescriptions = document.querySelectorAll(
    ".container-4 .latest-news-container .description"
  );
  for (let i = 0; i < latestNewsImages.length; i++) {
    latestNewsImages[i].src = latestData[i]?.urlToImage;
    latestNewsDates[i].innerHTML = latestData[i]?.publishedAt.substring(0, 10);
    latestNewsTitles[i].innerHTML = truncateText(latestData[i]?.title, 60);
    if (latestNewsDescriptions[i]) {
      latestNewsDescriptions[i].innerHTML = truncateText(
        latestData[i]?.description,
        100
      );
    }
  }
};
