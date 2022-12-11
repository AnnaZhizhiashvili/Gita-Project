const apiKey = "rN3BY9QDbOjaXF8CjZS0iRgKj2dXCXCAErrdNgzD";
const ROOT_URL = `https://api.thenewsapi.com/v1/news`;
const urls = {
  latest_posts: `${ROOT_URL}/all?api_token=${apiKey}&language=en`,
  top_posts: `${ROOT_URL}/top?api_token=${apiKey}&language=en`,
  category: `${ROOT_URL}/all?api_token=${apiKey}&language=en&category=:category`,
  weatherInTbilisi:
    "https://api.open-meteo.com/v1/forecast?latitude=41.69&longitude=44.83&hourly=temperature_2m",
};

export const getLatestPosts = async () => {
  let resJson = await fetchData(urls.latest_posts);
  return resJson.data;
};

export const getTopPosts = async () => {
  let resJson = await fetchData(urls.top_posts);
  return resJson.data;
};

export const getByCategory = async (category) => {
  let url = urls.category.replace(":category", category);
  let resJson = await fetchData(url);
  return resJson.data;
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
