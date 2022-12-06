const apiKey = "715a068203ec45c3bac1c8021bbadd28";

const ROOT_URL = `https://newsapi.org/v2`;

const urls = {
  latest_posts: `${ROOT_URL}/everything?q=all&pageSize=4&apiKey=${apiKey}`,
  top_posts: `${ROOT_URL}/top-headlines?q=all&pageSize=4&apiKey=${apiKey}`,

  weatherInTbilisi:
    "https://api.open-meteo.com/v1/forecast?latitude=41.69&longitude=44.83&hourly=temperature_2m",
};

export async function getLatestPosts() {
  let resJson;
  try {
    const res = await fetch(urls.latest_posts);
    resJson = await res.json();
  } catch (err) {
    console.log(err);
  }
  return resJson.articles;
}

export async function getTopPosts() {
  let resJson;
  try {
    const res = await fetch(urls.top_posts);
    resJson = await res.json();
  } catch (err) {
    console.log(err);
  }
  return resJson.articles;
}

export async function getWeather() {
  let resJson;
  try {
    const res = await fetch(urls.weatherInTbilisi);
    resJson = await res.json();
  } catch (err) {
    console.log(err);
  }
  return resJson;
}
