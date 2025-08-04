export function runGiphy() {
  const apiKey = document.querySelector("#api-key");
  const searchPhrase = document.querySelector("#search-phrase");
  const btnGo = document.querySelector("#btn-go");
  const prompt = document.querySelector("#prompt");
  const image = document.querySelector("#image");
  const facts = document.querySelector("#facts");
  const randomFactsFrame = document.querySelector("#random-facts-frame");
  const newsAPIKey = prompt("Enter thenewsapi.com API Key: ");
  const newsHeadlines = `https://api.thenewsapi.com/v1/news/top?api_token=${newsAPIKey}&locale=in&limit=3`;
  let giphyAPIKey = "xxx";
  let searchText = "";
  let promptText = "";
  let giphyRequest = "";
  btnGo.addEventListener("click", (e) => {
    e.preventDefault();
    if (!apiKey.validity.valid) {
      return;
    }
    if (!searchPhrase.validity.valid) {
      return;
    }
    giphyAPIKey = apiKey.value;
    searchText = searchPhrase.value;
    promptText = `"${searchText}"\nPowered by Giphy.com`;
    giphyRequest = `https://api.giphy.com/v1/gifs/translate?api_key=${giphyAPIKey}&s=${searchText}`;
    fetchImage();
  });
  function fetchImage() {
    fetch(giphyRequest, { mode: "cors" })
      .then(function (response) {
        return response.json();
      })
      .then((response) => {
        image.src = response.data.images["original"].url;
      })
      .then(() => {
        prompt.innerText = promptText;
        facts.innerText = getFacts();
      })
      .catch(() => {
        image.src = "../assets/images/404.jpg";
        prompt.innerText = "Unable to fetch!";
      });
  }
  function getFacts() {
    if (newsAPIKey) {
      fetch(newsHeadlines, { mode: "cors" })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          randomFactsFrame.classList.remove("hidden");
        })
        .catch((response) => console.log("Unable to Fetch" + response));
    } else {
      randomFactsFrame.classList.add("hidden");
    }
  }
}
