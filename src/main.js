import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getPictures } from './js/pixabay-api.js';
import appendCards from './js/render-functions.js';

const refs = {
  searchForm: document.getElementById('search-form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader-container'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const hiddenClass = 'hidden';

const lightbox = new SimpleLightbox('.photo-card a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const queryParams = {
  currentPage: 1,
  searchQuery: '',
  maxPage: 1,
  perPage: 15,
};

refs.searchForm.addEventListener('submit', handleSearch);

async function handleSearch(event) {
  event.preventDefault();

  const form = event.currentTarget;
  queryParams.searchQuery = form.elements.searchQuery.value.trim();

  if (!queryParams.searchQuery) {
    iziToast.error({
      position: 'topRight',
      message: 'Empty query!',
    });
    return;
  }

  refs.loader.classList.remove(hiddenClass);

  queryParams.currentPage = 1;

  try {
    const { hits, totalHits } = await getPictures(queryParams);

    if (totalHits === 0) {
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    }

    queryParams.maxPage = Math.ceil(totalHits / queryParams.perPage);

    refs.gallery.innerHTML = '';

    appendCards(hits, refs.gallery);

    lightbox.refresh();

    if (totalHits > queryParams.perPage) {
      refs.loadMoreBtn.classList.remove(hiddenClass);
      refs.loadMoreBtn.addEventListener('click', handleLoadMore);
    }
  } catch (err) {
    iziToast.error({
      position: 'topRight',
      message: err.message,
    });
  } finally {
    form.reset();
    refs.loader.classList.add(hiddenClass);
  }
}

async function handleLoadMore() {
  queryParams.currentPage += 1;
  refs.loader.classList.remove(hiddenClass);
  refs.loadMoreBtn.classList.add(hiddenClass);

  try {
    const { hits } = await getPictures(queryParams);

    appendCards(hits, refs.gallery);

    lightbox.refresh();
    scrollToNextImages();
  } catch (err) {
    iziToast.error({
      position: 'topRight',
      message: err.message,
    });
  } finally {
    refs.loader.classList.add(hiddenClass);

    if (queryParams.currentPage + 1 <= queryParams.maxPage) {
      refs.loadMoreBtn.classList.remove(hiddenClass);
    } else {
      refs.loadMoreBtn.classList.add(hiddenClass);
      iziToast.error({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
      refs.loadMoreBtn.removeEventListener('click', handleLoadMore);
    }
  }
}

function scrollToNextImages() {
  const card = document.querySelector('.photo-card');

  if (!card) return;

  const cardHeight = card.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
