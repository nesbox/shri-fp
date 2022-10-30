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
 import Api from '../tools/api';

 const api = new Api();

 const processSequence = ({value, writeLog, handleSuccess, handleError}) => {

    writeLog(value)

    if(value.length < 10 && value.length > 2 && /^[0-9.]+$/.test(value))
    {
        let number = Math.round(Number(value))
        writeLog(number)

        api.get('https://api.tech/numbers/base', { from: 10, to: 2, number: number })
            .then(({ result }) => {
                writeLog(result);
                writeLog(result.length);

                number = Math.pow(number, 2)

                writeLog(number);

                number %= 3

                writeLog(number);

            })
            .then(() => 
            {
                api.get(`https://animals.tech/${number}`, {})
                .then(({result}) => 
                {
                    handleSuccess(result)
                })
                .catch(handleError)

            })
            .catch(handleError)
    }
    else
    {
        handleError('ValidationError')
    }
 }

 export default processSequence;
