let sliderContainers = document.querySelectorAll(".slider-box");
let boxesArr = Array.from(sliderContainers);
let sliderImgBoxes = document.querySelectorAll(".slider-box--img");
let sliderDateTexts = document.querySelectorAll(".slider-box .news-date");
let sliderHeaderTexts = document.querySelectorAll(
  ".slider-box .slider-box--text-title"
);
const sliderBoxWidth = 45;
const gap = 4;
const movement = sliderBoxWidth + gap;

export const truncateText = (str, limit) => {
  if (str?.length > limit) {
    return str.substring(0, limit) + "...";
  }
  return str;
};

export const initializeSlider = (newsData) => {
  if (newsData) {
    sliderImgBoxes.forEach((box, i) => {
      box.style.backgroundImage = `url('../assets/images/background-images/${i}.jpg`;
    });

    sliderDateTexts.forEach((box, i) => {
      box.innerHTML = newsData[i]?.published_at.substring(0, 10);
    });

    sliderHeaderTexts.forEach((box, i) => {
      const text = truncateText(newsData[i]?.title, 40);
      box.innerHTML = text;
    });
  }
};

export const moveSliderBoxes = () => {
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
};
