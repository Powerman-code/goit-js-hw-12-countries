import { BASE_URL, onResponseQuantity } from './Countries';

// console.log(countryCardTpl);
export function fetchCountries(searchQuery) {

    fetch(`${BASE_URL}${searchQuery}`)
        .then(response => {
            // console.log(`${BASE_URL}${searchQuery}`);
            // console.log(response.json);
            return response.json();
        })
        .then(onResponseQuantity)
        .catch(console.log('Есть ошибка'));
}
;
