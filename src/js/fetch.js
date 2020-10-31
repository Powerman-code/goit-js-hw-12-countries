import pokemonCardTpl from '../templates/pokemon-card.hbs';
// const pokemonCardTpl = require("../templates/pokemon-card.hbs");

// const refs = {
//     cardContainer: document.querySelector('.js-card-container'),
// }
// console.log(refs.cardContainer);

let cardContainer = document.querySelector('.js-card-container');
const buttonSubmit = document.querySelector('.btn-primary');
const buttonForward = document.querySelector('.js-button-forward');
const buttonBackward = document.querySelector('.js-button-backward');
const searchForm = document.querySelector('.js-search-form');

// Создаем строку поиска, форму, ф-ю, в которую помещаем вызов фетч покемон, при сабмите формы.

// searchForm.addEventListener('submit', onSearch)
buttonSubmit.addEventListener('click', onSearch);
buttonForward.addEventListener('click', onButtonSwitchClick);
buttonBackward.addEventListener('click', onButtonSwitchClick);

function onButtonSwitchClick(evt) {
    evt.preventDefault();

    const form = evt.currentTarget.form;
    let searchQuerry = parseInt(form.elements.querry.value ? form.elements.querry.value : 0);

    searchQuerry += (evt.currentTarget.dataset.action === 'next' ? 1 : -1);
    form.elements.querry.value = searchQuerry;
    onSearch(evt);
};


function onSearch(evt) {
    evt.preventDefault();

    // для того, чтоб взять ID динамически, нужно взять значение инпута с атрибутом name querry
    // чтоб получить на него ссылку: const form = evt.currentTarget; (12 видео,1.14 минута)
    const form = evt.currentTarget.form;
    const searchQuerry = form.elements.querry.value;

    fetchPokemon(searchQuerry)
        .then(renderPokemonCard)
        .catch(onFetchError);
        // .finally(() => form.reset());
}



console.log(cardContainer);

// fetchPokemon(6)
//     .then(renderPokemonCard)
//     .catch(error => console.log('error'));

// fetch('https://pokeapi.co/api/v2/pokemon/3')
//     .then(response => {
//         // console.log(response.json());
//         return response.json();
//     })
//     // .then(pokemon => {
//     //     // console.log(pokemon);
//     //     const markup = pokemonCardTpl(pokemon);
//     //     cardContainer.innerHTML = markup;
//     //     console.log(markup);
//     // })
//     .then(renderPokemonCard)
//     .catch(console.log('Есть ошибка'))

function renderPokemonCard(pokemon) {
        const markup = pokemonCardTpl(pokemon);
        cardContainer.innerHTML = markup;
};


// функция fetchPokemon только забирает данные, и возвращает промис (должна)

// function fetchPokemon(pokemonId) {
// fetch('https://pokeapi.co/api/v2/pokemon/3')
//     .then(response => {
//         // console.log(response.json());
//         return response.json();
//     })
//     .then(renderPokemonCard)
//     .catch(console.log('Есть ошибка'))
// };

// потому делаем так


function fetchPokemon(pokemonId, onButtonForwardClick, onButtonBackwardClick) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    return fetch(url)
        .then(response => {
            // console.log(response.json());
            return response.json();
        })
        // .then(renderPokemonCard)
        // .catch(console.log('Есть ошибка'))
};

function onFetchError(error) {
    console.log('error');
};

