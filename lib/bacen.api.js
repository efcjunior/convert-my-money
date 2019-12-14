const axios = require('axios')

const getURL = (date) => {
    //const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${date}%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`
    //console.log(url)
    return 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%2712-13-2019%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao'

}

const getToday = () => {
    const today = new Date()
    const mm = today.getMonth()    
    const dd = today.getDate()
    const yyyy = today.getFullYear()
    return `${mm + 1}-${dd}-${yyyy}`
}
const getQuoteAPI = url => axios.get(url)
const extractQuote = (response) => response.data.value[0].cotacaoVenda
const getQuote = ({getToday, getURL, getQuoteAPI, extractQuote}) => async () => {
    try{
        const today = getToday()
        const url = getURL(today)
        const response = await getQuoteAPI(url)
        const quote = extractQuote(response)
        console.log(quote)
        return quote
    }catch(err){
        return ''
    }
}

//getQuote()

module.exports = {
    getQuoteAPI,
    getQuote: getQuote({getToday, getURL, getQuoteAPI, extractQuote}),
    extractQuote,
    getToday,
    getURL,
    pure: {
        getQuote
    }
}