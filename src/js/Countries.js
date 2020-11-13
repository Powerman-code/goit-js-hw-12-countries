import countryCardTpl from '../templates/countries-card.hbs';
import allCountryCardTpl from '../templates/all-countries-card.hbs';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { showManyCountriesError } from './showManyCountriesError';
import { fetchCountries } from './fetchCountries';
const debounce = require('lodash.debounce');

const cardContainer = document.querySelector('.js-card-container');
const inputRef = document.querySelector('.js-search-form');
export const BASE_URL = 'https://restcountries.eu/rest/v2/name/';


inputRef.addEventListener('input', debounce(onInputChange, 500));

function onInputChange(e) {
    // const savedCountryName = e.target.value;
    let searchQuerry = e.target.value ? e.target.value : '';
    // console.log(e.target.value);
    // console.log(savedCountryName);
    console.log(searchQuerry);
    if (searchQuerry !== '') {
        fetchCountries(searchQuerry);
    } else {
        clearMarkup();
    };
};

export function onResponseQuantity(response) {
    console.log(response);
            if (response.length > 10) {
                console.log('Больше 10 стран');
                clearMarkup();
                showManyCountriesError();
            } else if (response.length > 1 && response.length <= 10) {
                console.log('Больше одной страны и до 10 стран');
                console.log(response.length);
                console.log(response);
                renderAllCountryCard(response);
            } else if (response.length === 1) {
                console.log('одна страна');
                console.log(response.length);
                console.log(response);
                renderCountryCard(response);
            }
}

function renderCountryCard(country) {
    // console.log(...country);
    const markup = countryCardTpl(...country);
    // console.log(markup);
    cardContainer.innerHTML = markup;
    // или cardContainer.insertAdjacentHTML('beforeend', markup);
}

function renderAllCountryCard(country) {
    // console.log(...country);
    const markup = allCountryCardTpl(country);
    // console.log(markup);
    cardContainer.innerHTML = markup;
}

function clearMarkup() {
    cardContainer.innerHTML = '';
}

// function onFetchError(error) {
//     alert('Error');
// }

// https://restcountries.eu/rest/v2/name/{name}

// buttonSubmit.addEventListener('click', onSearch);

// function fetchPokemon(pokemonId) {
// fetch('https://pokeapi.co/api/v2/pokemon/3')
//     .then(response => {
//         // console.log(response.json());
//         return response.json();
//     })
//     .then(renderPokemonCard)
//     .catch(console.log('Есть ошибка'))
// };


// .then(response => {
//             console.log(response);
//             if (response.length === 1) {
//                 console.log('одна страна');
//                 // console.log('Больше одной страны');
//                 console.log(response.length);
//                 console.log(response);
//                 renderCountryCard(response);
//                 // renderAllCountryCard(response);
//             } else if (response.length >= 2) {
//                 console.log('Больше одной страны');
//                 // console.log('одна страна');
//                 console.log(response.length);
//                 renderAllCountryCard(response);
//                 // renderCountryCard(response);
//                 console.log(response);
//                 // console.log(response);
//             } else if (response.length > 10) {
//                 console.log('Больше 10');
                    // clearMarkup();
//             };
//         })
//         // .catch(console.log('Есть ошибка'));