const express = require("express");
const app = express();
const axios = require("axios");
//Hello comment

async function getCoin(coinCode) {
  //Make api get call
  const response = await axios.get(
    `http://rest.coinapi.io/v1/exchangerate/${coinCode}?apikey=53B9CC2B-A8A9-45AA-A091-17F82FEB99C2`
  );
  const resRates = response.data.rates;
  //Sort through results and find USD rate for given coin
  let convertedCode;
  let currencyRate;
  for (let i = 0; i < resRates.length; i++) {
    if (resRates[i].asset_id_quote == "USD") {
      convertedCode = resRates[i].asset_id_quote;
      currencyRate = resRates[i].rate;
      console.log(convertedCode);
      console.log(currencyRate);
      return currencyRate;
    }
  }
}

async function getCoinByDate(coinCode, startDate) {
  //Make api get call
  // const response = await axios.get(`https://rest.coinapi.io/v1/trades/${coinCode}/history?time_start=${startDate}&time_end=${endDate}?apikey=53B9CC2B-A8A9-45AA-A091-17F82FEB99C2`)
  const response = await axios.get(
    `https://rest.coinapi.io/v1/exchangerate/${coinCode}/USD?time=${startDate}&apikey=B7BA69D7-6AF4-46C2-924C-7DDE31F0BE3B`
  );
  const resRate = response.data.rate;
  return resRate;
}

function priceDiff(lastPrice, currPrice) {
  let diff = currPrice - lastPrice;
  let percentDifference = (diff / lastPrice) * 100;
  return [diff, percentDifference];
}
app
  .get("/", async (req, res) => {
    var result = "App is running";
    res.send(result);
  }).listen(app.get("port"), function () {
    console.log(
      "App is running, server is listening on port ",
      app.get("port")
    );
  });

app.get("/currency/:code", async (req, res) => {
  const code = req.params.code;
  const price = await getCoin(code);
  res.json({
    Code: `${code}`,
    CurrentPrice: `${price}`,
  });
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
  // Calculate price difference. Percentage as well
  let diffs = priceDiff(lastPrice, currPrice);
  res.json({
    code: `${code}`,
    urrentPrice: `${currPrice}`,
    yesterdayPrice: `${lastPrice}`,
    priceDifference: `${diffs[0]}`,
    percentDifference: `${diffs[1]}%`,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.warn(`App listening on http://localhost:${PORT}`);
});
// app.listen(5000, () => {console.log("Server started on port 5000")});
