const express = require('express');
const app = express();
const axios = require('axios');

async function getCoin(coinCode){
    //Make api get call
    const response = await axios.get(`http://rest.coinapi.io/v1/exchangerate/${coinCode}?apikey=B7BA69D7-6AF4-46C2-924C-7DDE31F0BE3B`)
    const resRates = response.data.rates;
    //Sort through results and find USD rate for given coin
    let convertedCode;
    let currencyRate;
    for(let i = 0; i < resRates.length; i++){
        if(resRates[i].asset_id_quote == "USD"){
            convertedCode = resRates[i].asset_id_quote
            currencyRate = resRates[i].rate
            console.log(convertedCode)
            console.log(currencyRate);
            return currencyRate
        }
    }
}

async function getCoinByDate(coinCode, startDate){
    //Make api get call
    // const response = await axios.get(`https://rest.coinapi.io/v1/trades/${coinCode}/history?time_start=${startDate}&time_end=${endDate}?apikey=B7BA69D7-6AF4-46C2-924C-7DDE31F0BE3B`)
    console.log(startDate);
    const response = await axios.get(`https://rest.coinapi.io/v1/exchangerate/${coinCode}/USD?time=${startDate}&apikey=B7BA69D7-6AF4-46C2-924C-7DDE31F0BE3B`)
    console.log(response);
    const resRate = response.data.rate;
    console.log(resRate)
    return resRate
    //Sort through results and find USD rate for given coin
    let convertedCode;
    let currencyRate;
    // for(let i = 0; i < resRates.length -1; i++){
    //     if(resRates[i].asset_id_quote == "USD"){
    //         convertedCode = resRates[i].asset_id_quote
    //         currencyRate = resRates[i].rate
    //         console.log(convertedCode)
    //         console.log(currencyRate);
    //         return currencyRate
    //     }
    // }
}

function priceUpdate(){
    //Get two dates for 24 hour periodclear
    const date1 = new Date();
    const date2 = new Date();
    date2.setDate(date2.getDate() - 1);
    console.log(date1);
    console.log(date2);

  }

function priceDiff(lastPrice, currPrice){
    let diff = currPrice - lastPrice;
    let percentDifference = diff / lastPrice * 100
    return [diff, percentDifference];
}

app.get("/currency/:code", async (req, res) => {
    const code = req.params.code;
    console.log(req.params.code);
    const price = await getCoin(code);
    res.json({
        "Code": `${code}`,
        "CurrentPrice" : `${price}`,
        // "Yesterdays Price": ``,
            })
});

app.get("/currency/:code/history", async (req, res) => {
    const code = req.params.code;
    let startDate = new Date();
    let endDate = new Date();
    startDate.setDate(startDate.getDate() - 1);
    startDate = startDate.toISOString();
    endDate = endDate.toISOString();
    // Make calls to api to get prices
    const lastPrice = await getCoinByDate(code, startDate);
    const currPrice = await getCoinByDate(code, endDate);
    console.log("Yesterdays Price: " + lastPrice + " Todays Price: " + currPrice);
    // Calculate price difference. Percentage as well
    let diffs = priceDiff(lastPrice, currPrice);
    res.json({
        "code": `${code}`,
        "vurrentPrice" : `${currPrice}`,
        "yesterdayPrice" : `${lastPrice}`,
        "priceDifference" : `${diffs[0]}`,
        "percentDifference" : `${diffs[1]}%`
            })
});

app.listen(5000, () => {console.log("Server started on port 5000")});

