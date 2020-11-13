import * as core from '@pnotify/core';

export function showManyCountriesError() {
    core.error({
        title: "error",
        text: "Слишком много совпадений. Уточните Ваш запрос.",
        addClass: 'errorMsg'
    });
}
