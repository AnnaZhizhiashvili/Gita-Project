const apiKey = "3eaefda756963830cca66705c8189ef4";

const ROOT_URL = "http://api.mediastack.com/v1/news";

const urls = {
  all: `${ROOT_URL}?access_key=${apiKey}&languages=en`,
};

export async function getData() {
  let resJson;
  try {
    const res = await fetch(urls.all);
    resJson = await res.json();
  } catch (err) {
    console.log(err);
  }
  return resJson.data;
}
