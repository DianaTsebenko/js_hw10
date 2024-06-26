import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_t6cGcpRVyggLjdI1QJPM5xW9wwn59B1ihp6K3FKFfKXitauaN5QA2icFjOkyXj10';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching breeds:', error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching cat by breed:', error);
      throw error;
    });
}
