const convert = (quote, amount) => {
    return quote * amount
}

const toMoney = valor => {
    return parseFloat(valor).toFixed(2)
}

module.exports = {
    convert,
    toMoney
}