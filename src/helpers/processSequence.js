/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */

import * as R from 'ramda'
import { __ } from 'ramda';

import Api from '../tools/api';

const api = new Api();

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {

    const tapLog = R.tap(writeLog)
    const length = R.prop('length')
    const getResult = R.prop('result')

    const symbolCountPow2 = R.pipe(
        R.compose(tapLog, length),
        R.partialRight(Math.pow, [2]),
    )

    const resultMod3 = R.partialRight(R.mathMod, [3])

    const numberBaseParams = R.assoc('number', __, { from: 10, to: 2 })
    const getNumberBase = R.compose(api.get('https://api.tech/numbers/base'), numberBaseParams)

    const getAnimal = R.pipe(
        R.compose(R.concat('https://animals.tech/'), String),
        R.partialRight(api.get, [{}]),
    )

    const otherwiseError = R.otherwise(handleError)

    const validationSuccess = R.pipe(
        R.compose(Math.round, Number),
        tapLog,
        
        getNumberBase,
        R.andThen(R.pipe(
            getResult,
            tapLog,

            symbolCountPow2,
            tapLog,

            resultMod3,
            tapLog,

            getAnimal,
            R.andThen(
                R.compose(handleSuccess, getResult)
            ),    
            otherwiseError,
        )),
        otherwiseError,
    )

    const validationError = R.partial(handleError, ['ValidationError'])

    const process = R.pipe(
        tapLog,
        R.ifElse(R.allPass([
            R.compose(R.lt(__, 10), length),
            R.compose(R.gt(__, 2), length),
            R.test(/^[0-9]+(.[0-9]+)$/),
        ]), validationSuccess, validationError),
    )

    process(value)

}

export default processSequence;
