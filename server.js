const apiKey = "5c06f79c53cf7004265be2850817d2db";

const ROOT_URL = "http://api.mediastack.com/v1/news";

const urls = {
  all_posts: `${ROOT_URL}?access_key=${apiKey}&languages=en`,
  weatherInTbilisi:
    "https://api.open-meteo.com/v1/forecast?latitude=41.69&longitude=44.83&hourly=temperature_2m",
};

export async function getData() {
  let resJson;
  try {
    const res = await fetch(urls.all_posts);
    resJson = await res.json();
  } catch (err) {
    console.log(err);
  }
  return resJson.data;
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
