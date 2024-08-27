import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33291155-7539ac0bf1c0d1be65bb6c22f';

async function getPictures({ searchQuery, currentPage, perPage }) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: perPage,
  });

  const { data } = await axios(`${BASE_URL}?${params}`);

  return data;
}

export { getPictures };
