const express = require("express");
const axios = require("axios");
const app = express();


app.set('view engine', 'ejs');


const getValue = async(currency) => {
    const req = await axios.get(`https://api.coinstats.app/public/v1/coins/${currency}?currency=US`)
    return req
}

app.get('/crypto', async(req, res) => {
    const usd = await getValue(req.query.currency)
    if (Object.keys(usd.data).length === 0) {
        res.render('notfound', req.query)
    } else {
        const param = { currency: req.query.currency, value: usd.data.coin.price.toFixed() }
        res.render('currency', param);
    }
})
app.listen(3000)