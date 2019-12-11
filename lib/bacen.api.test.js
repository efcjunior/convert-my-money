const bacenAPI = require('./bacen.api')
const axios = require('axios')

jest.mock('axios')

test('quoteAPI', () => {
    const response = {
        data : {
            value : [
                {cotacaoVenda : 3.90}
            ]
        }
    }

    axios.get.mockResolvedValue(response)
    bacenAPI.getQuoteAPI('url').then( value => {
        expect(value).toEqual(response)
        expect(axios.get.mock.calls[0][0]).toBe('url')
    }).catch(err => console.log(err))
})

test('extractQuote', () => {
    const response = {
        data : {
            value : [
                {cotacaoVenda : 3.90}
            ]
        }
    }
    expect(bacenAPI.extractQuote(response)).toBe(3.90)
})