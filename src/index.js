import axios from "axios";
const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "38794052-11ed7c3031d83bd0448aacf33";

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

loadMoreBtnEl.classList.add("is-hidden");

let queryParam = "";
let page = 1;

//ПОЛУЧАЕМ ЗНАЧЕНИЕ ИНПУТА И ПЕРЕДАЕМ ЕГО В ПЕРЕМЕННУЮ.
formEl.addEventListener('input', onInputHandler); 
function onInputHandler(e) {
  queryParam = e.target.value.trim();
}

//ЗАГРУЖАЕМ ГАЛЕРЕЮ ИСХОДЯ ИЗ ПОИСКОВОГО ЗАПРОСА
formEl.addEventListener('submit', onSubmitHandler);

async function fetchImages(query) { 
  
  if (!query) {
    return console.log('Please, write something in search input!')
  }

  const searchParams = new URLSearchParams({
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    per_page: 40
});
    const responce = await axios
    .get(`${BASE_URL}?key=${API_KEY}&q="${query}"&${searchParams.toString()}&page=${page}`);
    const data = responce.data.hits;

    if (data.length === 0) {
      console.log("Sorry, there are no images matching your search query. Please try again.")
    } else {
      const markup = data
      .map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => `
      <div class="photo-card">
      <img src="${webformatURL}" 
      alt="${tags}" 
      loading="lazy"
      height="300px" />
      <div class="info">
        <p class="info-item">
          <b>Likes ${likes}</b>
        </p>
        <p class="info-item">
          <b>Views ${views}</b>
        </p>
        <p class="info-item">
          <b>Comments ${comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads ${downloads}</b>
        </p>
      </div>
    </div>
      `).join('')
      galleryEl.insertAdjacentHTML("beforeend", markup);
      loadMoreBtnEl.classList.remove("is-hidden");
    }
} 

//ФУНКЦИЯ ЗАПРОСА ДАННЫХ
function onSubmitHandler(e) {
  e.preventDefault();
fetchImages(queryParam);
}

loadMoreBtnEl.addEventListener('click', onLoadMoreHandle)

function onLoadMoreHandle() {
page += 1;
fetchImages(queryParam);
}



// const { webformatURL, largeImageURL, tags, likes, views, comments, downloads} = data;
// webformatURL - посилання на маленьке зображення для списку карток.
// largeImageURL - посилання на велике зображення.
// tags - рядок з описом зображення. Підійде для атрибуту alt.
// likes - кількість лайків.
// views - кількість переглядів.
// comments - кількість коментарів.
// downloads - кількість завантажень.








































{/* <div class="photo-card">
        <img src="" 
        alt="" 
        loading="lazy"
        height="300px" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
          </p>
          <p class="info-item">
            <b>Views</b>
          </p>
          <p class="info-item">
            <b>Comments</b>
          </p>
          <p class="info-item">
            <b>Downloads</b>
          </p>
        </div>
      </div> */}
