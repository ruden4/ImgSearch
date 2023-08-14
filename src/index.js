import { fetchImages } from "../src/fetch-API";
import Notiflix from 'notiflix';
const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');
loadMoreBtnEl.classList.add("is-hidden");

let queryParam = "";
export let page = 1;
let totalHits = null;

//ПОЛУЧАЕМ ЗНАЧЕНИЕ ИНПУТА И ПЕРЕДАЕМ ЕГО В ПЕРЕМЕННУЮ.
formEl.addEventListener('input', onInputHandler); 
function onInputHandler(e) {
  queryParam = e.target.value.trim();
}

//ОБРАБОТКА САБМИТА.(ЗАГРУЗКА ФОТО НА СТРАНИЦУ)
formEl.addEventListener('submit', onSubmitHandler);
function onSubmitHandler(e) {
    e.preventDefault();
    clearGallery();
    createMarkup();
  }

//ФУНКЦИЯ СОЗДАНИЯ РАЗМЕМКТИ НА ОСНОВЕ ПОЛУЧЕННЫХ ДАННЫХ.
async function createMarkup() {
    try {
        const response = await fetchImages(queryParam, page);
        const hits = response.data.hits;
        const markup = hits.map(({ webformatURL, tags, likes, views, comments, downloads }) => {
            return `
                <div class="photo-card">
                    <img src="${webformatURL}" 
                        alt="${tags}" 
                        loading="lazy"
                        height="270px" />
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
            `;
        }).join('');

        galleryEl.insertAdjacentHTML("beforeend", markup);

        if (hits.length > 0) {
            loadMoreBtnEl.classList.remove("is-hidden");
            totalHits = response.data.totalHits;
            const totalPages = Math.ceil(totalHits / 40);
            if (page >= totalPages) {loadMoreBtnEl.classList.add("is-hidden")}
        } else {
            loadMoreBtnEl.classList.add("is-hidden");
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }
    } catch (error) {
        console.error(error);
    }
}

//ОБРАБОТКА КНОПКИ LOAD MORE
loadMoreBtnEl.addEventListener('click', onLoadMoreHandle)
function onLoadMoreHandle() {
    page += 1;
    createMarkup();
}

//ФУНКЦИЯ ОЧИСТКИ ГАЛЕРЕИ ПРИ НОВОМ ПОИСКЕ.
function clearGallery() {
    galleryEl.innerHTML = "";
    loadMoreBtnEl.classList.add("is-hidden");
    page = 1;
  }