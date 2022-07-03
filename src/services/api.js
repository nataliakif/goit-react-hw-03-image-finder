function fetchImages(query, page) {
  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=26861393-22f68a93d11eca8c337dbb001&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => response.json());
}
const API = {
  fetchImages,
};
export default API;
