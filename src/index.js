import axios from "axios";
const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "38794052-11ed7c3031d83bd0448aacf33";

const searchParams = new URLSearchParams({
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    page: 1,
    per_page: 40
});

async function fetchImages() {
    const responce = await axios.get(`${BASE_URL}?key=${API_KEY}&q="cat"&${searchParams.toString()}`);
    console.log(responce)
} 
fetchImages()





































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
