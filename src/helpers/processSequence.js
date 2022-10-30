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

import { andThen, assoc, concat, gt, mathMod, otherwise, partial, partialRight, test, __ } from 'ramda';
import { ifElse } from 'ramda';
import { allPass, compose, lt, pipe, prop, tap } from 'ramda';

import Api from '../tools/api';

const api = new Api();

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {

    const tapLog = tap(writeLog)
    const length = prop('length')

    const validate = allPass([
        compose(lt(__, 10), length),
        compose(gt(__, 2), length),
        test(/^[0-9]+(.[0-9]+)$/),
    ])

    const pow2 = partialRight(Math.pow, [2])
    const mod3 = partialRight(mathMod, [3])

    const validationSuccess = pipe(
        Number,
        Math.round,
        tapLog,

        assoc('number', __, { from: 10, to: 2 }),
        compose(api.get('https://api.tech/numbers/base')),
        andThen(pipe(
            prop('result'),
            tapLog,
            compose(tapLog, length),
            pow2,
            tapLog,
            mod3,
            tapLog,
            String,
            concat('https://animals.tech/'),
            partialRight(api.get, [{}]),
            andThen(
                compose(handleSuccess, prop('result'))
            ),
            otherwise(handleError),
        )),
        otherwise(handleError),
    )

    const validationError = partial(handleError, ['ValidationError'])

    const process = pipe(
        tapLog,
        ifElse(validate, validationSuccess, validationError),
    )

    process(value)

}

export default processSequence;
