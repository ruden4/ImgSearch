import axios from "axios";
import page from "../src/index.js";
const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "38794052-11ed7c3031d83bd0448aacf33";

export async function fetchImages(query, page) { 
    const searchParams = new URLSearchParams({
      image_type: "photo",
      orientation: "horizontal",
      safesearch: "true",
      per_page: 40
  });
      const resp = await axios
      .get(`${BASE_URL}?key=${API_KEY}&q="${query}"&${searchParams.toString()}&page=${page}`);
    return resp;
}