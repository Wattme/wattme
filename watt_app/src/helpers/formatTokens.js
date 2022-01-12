const converterToken = (code) => {}
const getDecimalValue = (value) => {

    let number = [1]

    for(let key = 0; key < value; key++) {
        number.push(0)
    }

    return Number.parseFloat(number.join(''))
}

export {
    converterToken,
    getDecimalValue
}
