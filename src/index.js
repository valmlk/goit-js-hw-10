import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import { createMarkupSelect, createMarkup } from './js/markup';

const selector = document.querySelector('.breed-select');
const divCatInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader-container');
const error = document.querySelector('.error');

selector.addEventListener('change', onChangeSelect);

fetchBreeds()
  .then(obj => {
    selector.hidden = false;
    loader.hidden = true;
    selector.innerHTML = createMarkupSelect(obj.data);
    slimSelect();
  })
  .catch(onError);

function onChangeSelect(e) {
  const breedId = e.currentTarget.value;

  loader.hidden = false;
  divCatInfo.hidden = true;

  fetchCatByBreed(breedId)
    .then(response => {
      if (response.status !== 200) {
        throw new Error();
      }
      return response.data;
    })
    .then(data => {
      divCatInfo.hidden = false;
      loader.hidden = true;
      divCatInfo.innerHTML = createMarkup(data);
      success();
    })
    .catch(onError);
}

function success() {
  Notify.success('Search successful!', {
    position: 'right-top',
    timeout: 1000,
  });
}

function onError() {
  divCatInfo.hidden = true;
  Report.failure(error.textContent, '');
}

function slimSelect() {
  new SlimSelect({
    select: selector,
  });
}
