/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import { gte, lte, values } from "lodash";
import { allPass, complement, compose, count, curry, equals, partial, prop } from "ramda";

const star = prop('star')
const square = prop('square')
const triangle = prop('triangle')
const circle = prop('circle')

const red = equals('red')
const green = equals('green')
const white = equals('white')
const orange = equals('orange')
const blue = equals('blue')

// const isNotRed = complement(isRed)
// const isNotGreen = complement(isGreen)
// const isNotWhite = complement(isWhite)
// const isNotOrange = complement(isOrange)
// const isNotBlue = complement(isBlue)

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
    compose(white, triangle),
    compose(white, circle),
    compose(red, star),
    compose(green, square),
])

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(curry(lte, 2), curry(count, green), values)

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = () => false;

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = () => false;

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = () => false;

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = () => false;

// 7. Все фигуры оранжевые.
export const validateFieldN7 = () => false;

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = () => false;

// 9. Все фигуры зеленые.
export const validateFieldN9 = () => false;

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = () => false;
