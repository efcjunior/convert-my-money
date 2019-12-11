const axios = require('axios')

const getURL = date => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${date}%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`

const getToday = () => {
    const today = new Date()
    const mm = today.getDate()    
    const dd = today.getMonth()
    const yyyy = today.getFullYear()
    return `${mm + 1}-${dd}-${yyyy}`
}
const getQuoteAPI = url => axios.get(url)
const extractQuote = (response) => response.data.value[0].cotacaoVenda
const getQuote = async () => {
    try{
        //getToday()
        const url = getURL('11-11-2019')
        const response = await getQuoteAPI(url)
        const quote = extractQuote(response)
        console.log(quote)
        return quote
    }catch(err){
        console.log(err)
        return ''
    }
}

//getQuote()

module.exports = {
    getQuoteAPI,
    getQuote,
    extractQuote
}