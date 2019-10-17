import { randomNumber } from "./randomNumber";
/**
 * @param {Array} array - The array to choose the random element from
 * @param {Number} count - How much random elements to pick
 */

export function randomElement(array: any, count?: number) {
    if (!Array.isArray(array) || !array[0]) return [];
    if (!array[1]) return array[0];
    if (!count) array[randomNumber(array.length, 0)];

    let newArr = [];
    for (let i = 0; i < count!; i++) {
        newArr.push(array[randomNumber(array.length, 0)]);
    }

    return newArr;
};