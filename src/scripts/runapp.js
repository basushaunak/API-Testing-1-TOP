export function runGiphy() {
  const apiKey = document.querySelector("#api-key");
  const searchPhrase = document.querySelector("#search-phrase");
  const btnGo = document.querySelector("#btn-go");
  const prompt = document.querySelector("#prompt");
  const image = document.querySelector("#image");
  const facts = document.querySelector("#facts");
  let giphyAPIKey = "xxx";
  let searchText = "";
  let promptText = "";
  let request = "";
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
    request = `https://api.giphy.com/v1/gifs/translate?api_key=${giphyAPIKey}&s=${searchText}`;
    fetchImage();
  });
  function fetchImage() {
    fetch(request, { mode: "cors" })
      .then(function (response) {
        return response.json();
      })
      .then((response) => {
        console.log(response);
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
  function getFacts(){
    return "Fact/Fun/BS";
  }
}

