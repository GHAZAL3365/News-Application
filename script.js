const API_KEY = "76976c283aab433e8e05fd4484d43832";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
  window.location.reload();
}

async function fetchNews(query) {
  let response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  let data = await response.json();

  dataBind(data.articles);
}

function dataBind(articles) {
  const cardsContainerEl = document.querySelector("#cards-container");
  const templateNewsCardEl = document.querySelector("#template-news-card");

  cardsContainerEl.innerHTML = "";
  // console.log(articles);
  //
  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardCloneEl = templateNewsCardEl.content.cloneNode(true);

    fillDataCard(cardCloneEl, article);
    cardsContainerEl.appendChild(cardCloneEl);
  });
}

// function fill data into cards

function fillDataCard(cardCloneEl, article) {
  const newsImgEl = cardCloneEl.querySelector("#news-img");
  const newsTitleEl = cardCloneEl.querySelector("#news-title");
  const newsSourceEl = cardCloneEl.querySelector("#news-source");
  const newsDescEl = cardCloneEl.querySelector("#news-desc");

  newsImgEl.src = article.urlToImage;
  newsTitleEl.textContent = article.title;
  newsDescEl.textContent = article.description;

  let date = new Date(article.publishedAt).toLocaleString("en-Us", {
    timeZone: "Asia/Kolkata",
  });

  newsSourceEl.textContent = `${article.source.name} . ${date}`;

  cardCloneEl.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let currentSelectedNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItemEl = document.getElementById(id);
  currentSelectedNav?.classList.remove("active");
  currentSelectedNav = navItemEl;

  currentSelectedNav.classList.add("active");
}

const searchBtnEl = document.querySelector("#search-btn");
searchBtnEl.addEventListener("click", () => {
  const searchQueryEl = document.querySelector("#search-query");
  let searchQuery = searchQueryEl.value;
  if (!searchQuery) {
    alert("Please enter a valid query!");
  } else {
    fetchNews(searchQuery);
    searchQueryEl.value = "";
    currentSelectedNav?.classList.remove("active");
    currentSelectedNav = null;
  }
});
