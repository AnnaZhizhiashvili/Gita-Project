const apiKey = "89a29fe6830e4576b6d3ebcc66a944cf";
const ROOT_URL = `https://newsapi.org/v2`;
const urls = {
  latest_posts: `${ROOT_URL}/everything?q=all&language=en&pageSize=20&apiKey=${apiKey}`,
  top_posts: `${ROOT_URL}/top-headlines?q=all&language=en&pageSize=4&apiKey=${apiKey}`,
  category: `${ROOT_URL}/top-headlines?q=all&language=en&category=:category&pageSize=:limit&apiKey=${apiKey}`,
  weatherInTbilisi:
    "https://api.open-meteo.com/v1/forecast?latitude=41.69&longitude=44.83&hourly=temperature_2m",
};

export const getLatestPosts = async () => {
  let resJson = await fetchData(urls.latest_posts);
  return resJson.articles;
};

export const getTopPosts = async () => {
  let resJson = await fetchData(urls.top_posts);
  return resJson.articles;
};

export const getByCategory = async (category, limit) => {
  let url = urls.category.replace(":category", category);
  url = url.replace(":limit", limit);
  let resJson = await fetchData(url);
  return resJson.articles;
};

export const getWeather = async () => {
  let resJson = await fetchData(urls.weatherInTbilisi);
  return resJson;
};

const fetchData = async (url) => {
  let resJson;
  try {
    const res = await fetch(url);
    resJson = await res.json();
  } catch (err) {
    console.log(err);
  }
  return resJson;
};
