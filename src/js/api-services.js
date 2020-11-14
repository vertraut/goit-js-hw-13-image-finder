export default class ApiServices {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
    this.perPage = 12;
    this.images = [];
  }

  fetchImages() {
    const API_KEY = "19101483-97eb89a6c64111aa623235b5f";
    const BASE_URL = `https://pixabay.com/api/`;
    this.url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&key=${API_KEY}`;
    console.log(this.url);
    return fetch(this.url).then((r) => r.json());
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get numPage() {
    return this.page;
  }

  set numPage(numPage) {
    this.page = numPage;
  }
}
