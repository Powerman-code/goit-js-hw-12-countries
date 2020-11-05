import countryCardTpl from '../templates/countries-card.hbs';
import allCountryCardTpl from '../templates/all-countries-card.hbs';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
const debounce = require('lodash.debounce');

const cardContainer = document.querySelector('.js-card-container');
const inputRef = document.querySelector('.js-search-form');
const BASE_URL = 'https://restcountries.eu/rest/v2/name/';


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

// console.log(countryCardTpl);

function fetchCountries(searchQuery) {

    fetch(`${BASE_URL}${searchQuery}`)
        .then(response => {
            // console.log(`${BASE_URL}${searchQuery}`);
            // console.log(response.json);
            return response.json();
        })
        .then(response => {
            console.log(response);
            if (response.length > 10) {
                console.log('Больше 10 стран');
                clearMarkup();
                ifTooManyCountries();
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
        })
        .catch(console.log('Есть ошибка'));
}

function ifTooManyCountries() {
    error({
        title: "error",
        text: "Слишком много совпадений. Уточните Ваш запрос.",
        addClass: 'errorMsg'
    });
};

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