export function runGiphy() {
  const apiKey = document.querySelector("#api-key");
  const searchPhrase = document.querySelector("#search-phrase");
  const btnGo = document.querySelector("#btn-go");
  const prompt = document.querySelector("#prompt");
  const image = document.querySelector("#image");
  //const facts = document.querySelector("#facts");
  const randomFactsFrame = document.querySelector(".random-facts-frame");
  const randomFacts = document.querySelector("#random-facts");
  const newsAPIKey = window.prompt(
    "Enter API Key for 'thenewsapi.com'",
    "newsapi.com API Key",
  );
  let locale = "in";
  const newsHeadlines = `https://api.thenewsapi.com/v1/news/top?api_token=${newsAPIKey}&locale=${locale}&limit=3`;
  let giphyAPIKey = "xxx";
  let searchText = "";
  let promptText = "";
  let giphyRequest = "";
  let scrollEffectOffset = 0;

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
        getFacts();
      })
      .catch((err) => {
        console.log(err);
        image.src = "../assets/images/404.jpg";
        prompt.innerText = "Unable to fetch!";
      });
  }
  function getFacts() {
    if (newsAPIKey) {
      fetch(newsHeadlines, { mode: "cors" })
        .then((response) => response.json())
        .then((response) => {
          // console.log(response);
          let newsArray = response.data;
          let html = ``;
          for (let i = 0; i < newsArray.length; i++) {
            html += `<span class="fact-title">${newsArray[i].title}</span><br>${newsArray[i].description}<br>`;
          }
          randomFacts.innerHTML = html;
          console.log(randomFacts.innerHTML);
          randomFactsFrame.classList.remove("hidden");
          scrollFacts();
        })
        .catch((response) => {
          console.log("Unable to Fetch News" + response);
          randomFactsFrame.classList.add("hidden");
        });
    } else {
      randomFactsFrame.classList.add("hidden");
    }
  }
  function scrollFacts() {
    scrollEffectOffset -= 0.25; // speed of scroll
    randomFacts.style.top = scrollEffectOffset + "px";

    // Reset when the entire paragraph has scrolled past
    if (-scrollEffectOffset >= randomFacts.scrollEffectOffsetHeight) {
      scrollEffectOffset = x.scrollEffectOffsetHeight; // start from bottom again
    }

    requestAnimationFrame(scrollFacts);
  }
}
