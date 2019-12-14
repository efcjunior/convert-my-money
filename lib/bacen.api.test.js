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

describe('getToday', () => {
    const RealDate = Date

    function mockDate(date){
        global.Date = class extends RealDate {
            constructor(){
                return new RealDate(date)
            }
        }
    }
    
    afterEach(() => {
        global.Date = RealDate
    })

    test('getToday', () => {
        mockDate('2019-01-01T12:00:00z')
        const today = bacenAPI.getToday()
        expect(today).toBe('1-1-2019')
    })
})

test('getURL', ()=>{
    const URL = bacenAPI.getURL('12-13-2019')
    expect(URL).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%2712-13-2019%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')

})

test('getQuote', () => {
    const response = {
        data : {
            value : [
                {cotacaoVenda : 3.90}
            ]
        }
    }
    const getToday = jest.fn() 
    getToday.mockReturnValue('01-01-2019')
    const getURL = jest.fn() 
    getURL.mockReturnValue('url')
    const getQuoteAPI = jest.fn() 
    getQuoteAPI.mockResolvedValue(response)
    const extractQuote = jest.fn()
    extractQuote.mockReturnValue(3.9)
    
    bacenAPI.pure
        .getQuote({getToday, getURL, getQuoteAPI, extractQuote})()
        .then( res => {
            expect(res).toBe(3.9)
        })

})


test('getQuote', () => {
    const response = {
        data : {
            value : [
                {cotacaoVenda : 3.90}
            ]
        }
    }
    const getToday = jest.fn() 
    getToday.mockReturnValue('01-01-2019')
    const getURL = jest.fn() 
    getURL.mockReturnValue('url')
    const getQuoteAPI = jest.fn() 
    getQuoteAPI.mockReturnValue(Promise.reject())
    const extractQuote = jest.fn()
    extractQuote.mockReturnValue(3.9)
    
    bacenAPI.pure
        .getQuote({getToday, getURL, getQuoteAPI, extractQuote})()
        .then( res => {
            expect(res).toBe('')
        })

})