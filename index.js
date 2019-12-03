/* import*/
const express = require('express')
const path = require('path')
const currency = require('./lib/currency')

/* config*/
const app = express()
app.set('view engine', 'ejs')
console.log('[Info] setting view engine with ejs')
app.set('views', path.join(__dirname, 'views'))
console.log('[Info] setting views directory ' + path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname,'public')))
console.log('[Info] setting public directory ' + path.join(__dirname, 'public'))
app.listen(3000, err =>{
    if(err){
        console.log('[Error] Failed application initialization')
    }else{
        console.log('[Info] Application Up')
    }
})

/*view methods*/
app.get('/',(req, res) => {
    res.render('home')
})

app.get('/quote', (req, res) =>{
    const {quote, amount} = req.query
    if(quote && amount){
        const conversion = currency.convert(quote, amount)
        res.render('quote', {
            error: false,
            quote: currency.toMoney(quote),
            amount: currency.toMoney(amount),
            conversion: currency.toMoney(conversion)
        })
    }else{
        res.render('quote',{
            error: 'invalid values'
        })
    }
   
})