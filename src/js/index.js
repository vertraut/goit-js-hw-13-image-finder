import ApiServices from "./api-services";
import refs from "./refs";
import imagesHbs from "../tamplate/images.hbs";

const searchImages = new ApiServices();

addEvents();

function addEvents() {
  refs.searchForm.addEventListener("submit", newSearch);
  refs.showMore.addEventListener("click", showMore);
}

async function newSearch(e) {
  e.preventDefault();
  showMoreDisable(); //чтобы кнопка "показать больше" была скрыта при повтором поиске
  clearMakrup(); // удаляем старые результаты поиска
  searchImages.numPage = 1;
  searchImages.searchQuery = refs.inputQuery.value;
  console.log("Поиск картинок по запросу", searchImages.searchQuery);
  await searchImages.fetchImages().then(appendImages);
  showMoreEnable();
}

async function showMore() {
  searchImages.numPage += 1;
  console.log(searchImages.page);
  const heigthToScroll = refs.imagesList.clientHeight; //запоминаем высоту списка с картинками до добавления новых
  await searchImages.fetchImages().then(appendImages);
  scroll(heigthToScroll); //скролим на начало новых картинок
}

function showMoreEnable() {
  refs.showMoreWrapper.classList.remove("hidden");
}

function showMoreDisable() {
  refs.showMoreWrapper.classList.add("hidden");
}

function clearMakrup() {
  refs.imagesList.innerHTML = "";
}

function appendImages(images) {
  console.log(images.hits);
  const makrup = imagesHbs(images.hits);
  refs.imagesList.insertAdjacentHTML("beforeend", makrup);
}

function scroll(top) {
  window.scrollTo({
    top: top,
    behavior: "smooth",
  });
}
