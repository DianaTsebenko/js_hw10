// index.js

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

loader.classList.add('hidden');
error.classList.add('hidden');

fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.text = breed.name;
      breedSelect.appendChild(option);
    });
  })
  .catch(() => {
    error.classList.remove('hidden');
  });

breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;
  loader.classList.remove('hidden');
  catInfo.innerHTML = '';

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      const imageUrl = catData[0].url;
      const breedName = catData[0].breeds[0].name;
      const description = catData[0].breeds[0].description;
      const temperament = catData[0].breeds[0].temperament;

      catInfo.innerHTML = `
      <img src="${imageUrl}" alt="cat" class="cat-image">
      <div class="container">
        <h2 class="name">${breedName}</h2>
        <p class="description">${description}</p>
        <p class="temperament"><span class="bold-text">Temperament</span>:${temperament}</p>
      </div>
    `;

      breedSelect.classList.remove('hidden');
      error.classList.add('hidden');
      loader.classList.add('hidden');
    })
    .catch(() => {
      loader.classList.add('hidden');
      error.classList.remove('hidden');
    });
});
