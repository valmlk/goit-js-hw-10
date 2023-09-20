import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_z7t2TUsDluC3CUIdAwT1j663QsH5oMStuyruNLrJxYOrJ6pbaJa9XnrGSrmZWmgr';
axios.defaults.baseURL = `https://api.thecatapi.com/v1/`;

export function fetchBreeds() {
  return axios.get('breeds');
}

export function fetchCatByBreed(breedId) {
  return axios.get(`images/search?breed_ids=${breedId}`);
}
