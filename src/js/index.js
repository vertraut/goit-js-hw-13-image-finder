import ApiServices from "./api-services";
import refs from "./refs";
import imagesHbs from "../tamplate/images.hbs";

const searchImages = new ApiServices();

addEvents();

function addEvents() {
  refs.searchForm.addEventListener("submit", newSearch);
  refs.showMore.addEventListener("click", showMore);
}

function newSearch(e) {
  e.preventDefault();
  showMoreVisible();
  clearMakrup();
  searchImages.numPage = 1;
  searchImages.searchQuery = refs.inputQuery.value;
  console.log("Поиск картинок по запросу", searchImages.searchQuery);
  searchImages.fetchImages().then(appendImages);
}

function showMore() {
  searchImages.numPage += 1;
  console.log(searchImages.page);
  searchImages.fetchImages().then(appendImages);
}

function showMoreVisible() {
  refs.showMoreWrapper.classList.toggle("hidden");
}

function clearMakrup() {
  refs.imagesList.innerHTML = "";
}

function appendImages(images) {
  console.log(images.hits);
  const makrup = imagesHbs(images.hits);
  refs.imagesList.insertAdjacentHTML("beforeend", makrup);
}
