import React from "react";
import Navigation from "./Navigation";
import axios from "axios";

const CalculatePage = (props) => {
  return (
    <>
      {/* <Navigation /> */}<br/>
      <h2>CONVERSION</h2>
    <div class="d-xl-flex p-4 form-group">

        <h3>From: </h3>
        <select class="form-control" id="convertA">
          <option value="BTC">Bitcoin - BTC</option>
          <option value="ETH">Ethereum - ETH</option>
          <option value="DOGE">Dogecoin - DOGE</option>
          <option value="ADA">Cardano - ADA</option>
          <option value="XRP">Ripple - XRP</option>
        </select>
        <br />
        <h3>To: </h3>
        <select id="convertB">
          <option value="BTC">Bitcoin - BTC</option>
          <option value="ETH">Ethereum - ETH</option>
          <option value="DOGE">Dogecoin - DOGE</option>
          <option value="ADA">Cardano - ADA</option>
          <option value="XRP">Ripple - XRP</option>
        </select>
        <br />
        <button onClick={convertCoin}>Convert</button>
        <h2 id="convertResults"></h2>
      </div><br/>

      <h2>CALCULATE</h2>
      <div class="d-xl-flex p-4 form-group">
        <div id="first">
        <select class="form-control" id="currencyCalculate">
            <option value="USD">US Dollar - USD</option>
            <option value="JNY">Japanese Yen - JNY</option>
            <option value="CNY">Chinese Yen - CNY</option>
            <option value="GBP">Great British Pound - GBP</option>
            <option value="Euro">Euro</option>
          </select>
          <input id="calculateInput" type="number" defaultValue="0.00" />
          <br />
        </div>

        <label>To</label>
        {/* <button>⇅</button> */}
        <br />
        <div id="second">
          <select class="form-control" id="coinCalculate">
            <option value="BTC">Bitcoin - BTC</option>
            <option value="ETH">Ethereum - ETH</option>
            <option value="DOGE">Dogecoin - DOGE</option>
            <option value="ADA">Cardano - ADA</option>
            <option value="XRP">Ripple - XRP</option>
          </select>
          <br />
        </div>

        <button onClick={calculate}>Calculate</button>
        <h2 id="calculateDisplay"></h2>
      </div>

      <h2>MICROSERVICE</h2>
      <div class="d-xl-flex p-4 form-group"><br/>
      <button id='microButton' onClick={priceUpdate}>DIFF-Temp button</button><br/>
        <h4 id="microResults"></h4>
      </div>
    </>
  );
};

// calculation proption of app
async function calculate() {
    const coinRate = await getCoinCalculate(); //value in USD
    const currency = document.getElementById('currencyCalculate').value;
    const coinCode = document.getElementById('coinCalculate').value;
    const userInputVal = document.getElementById('calculateInput').value;

    let result;
    if(coinRate >= 1.00){
        result = userInputVal / coinRate;
    }else{
        result = coinRate * userInputVal;
    }
    // console.log(result);

    //Display results
    document.getElementById("calculateDisplay").innerHTML = `${userInputVal} ${currency} = ${result.toFixed(4)} ${coinCode}`;

}

// function swap() {
//   let first = document.getElementById("first").childNodes;
//   let second = document.getElementById("second").childNodes;
  
//   const temp = second;

//   second = first;
//   first = temp;
//   console.log(first);
//   console.log(second);
// }

// Converstion of coin A to coin B
async function convertCoin() {
  //Get rate of Coin A in price of Coin B
  const rateCoinB = await getCoinConvert();
  console.log(rateCoinB);

  //Display results
  const coinCodeA = document.getElementById("convertA").value;
  const coinCodeB = document.getElementById("convertB").value;
  document.getElementById(
    "convertResults"
  ).innerHTML = `1 ${coinCodeA} = ${rateCoinB} ${coinCodeB} `;
}

// Get coin rate for the conversion portion of app
async function getCoinConvert() {
  //Make api get call
  const coinCodeA = document.getElementById("convertA").value;
  const coinCodeB = document.getElementById("convertB").value;
  const responseA = await axios.get(
    `http://rest.coinapi.io/v1/exchangerate/${coinCodeA}?apikey=B7BA69D7-6AF4-46C2-924C-7DDE31F0BE3B`
  );
  const resRatesA = responseA.data.rates;

  //Sort through results and find USD rate for given coin
  let currencyRateA;
  for (let i = 0; i < resRatesA.length; i++) {

    //Want to get coin A in terms of Coin B - find rate of coin A in price of coin B
    if (resRatesA[i].asset_id_quote == `${coinCodeB}`) {
      currencyRateA = resRatesA[i].rate;
      return currencyRateA.toFixed(4);
    }
  }
}

// Get coin rate for calculation portion
async function getCoinCalculate() {
    //Make api get call
    const coinCode = document.getElementById("coinCalculate").value;
    const responseA = await axios.get(
      `http://rest.coinapi.io/v1/exchangerate/${coinCode}?apikey=B7BA69D7-6AF4-46C2-924C-7DDE31F0BE3B`
    );
    const resRates = responseA.data.rates;
    //Sort through results and find USD rate for given coin
    let currencyRate;
    for (let i = 0; i < resRates.length; i++) {
      //Want to get coin A in terms of Coin B - find rate of coin A in price of coin B
      if (resRates[i].asset_id_quote == "USD") {
        currencyRate = resRates[i].rate;
        return currencyRate;
      }
    }
  }

// Microservice -- Receive request and send out data

function priceUpdate(){
  //Get two dates for 24 hour period
  const date1 = new Date();
  const date2 = new Date();
  date2.setDate(date2.getDate() - 1);
  console.log(date1);
  console.log(date2);

  
}

export default CalculatePage;
