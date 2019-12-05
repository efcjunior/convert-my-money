const currency = require('./currency')

test ('convert test 1 4 to 4', () => {
    expect(currency.convert(4,4)).toBe(16)
})

test ('convert test 0 4 to 4', () => {
    expect(currency.convert(0,4)).toBe(0)
})

test ('toMoney test converts float', () =>{
    expect(currency.toMoney(2)).toBe('2.00')
})