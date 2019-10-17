/**
 * @param {Number} max - Maximum number
 * @param {Number} min - Minimum number
 */

export const randomNumber = (max: number = 5, min: number = 0) => Math.floor(Math.random() * max) + min;