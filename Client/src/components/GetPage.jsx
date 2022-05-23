import React, { useEffect, useState } from "react";
import CalculatePage from "./CalculatePage";
import Navigation from "./Navigation";
import axios from "axios";
import { Link } from "react-router-dom";

const GetPage = () => {
  return (
    <>
     <h2>Get Price of: </h2>
      <div class="d-xl-flex p-4 form-group">
        <select id="select" class="form-control">
          <option value="BTC">Bitcoin - BTC</option>
          <option value="ETH">Ethereum - ETH</option>
          <option value="DOGE">Dogecoin - DOGE</option>
          <option value="ADA">Cardano - ADA</option>
          <option value="XRP">Ripple - XRP</option>
        </select>
        <br />
        <button onClick={getCoin}>Get Price in USD</button>
      </div>

      <div>
        <h2 id="resultsDisplay"> </h2>
      </div>
    </>
  );
};

async function getCoin() {
  //Make api get call
  const coinCode = document.getElementById("select").value;
  const response = await axios.get(
    `http://rest.coinapi.io/v1/exchangerate/${coinCode}?apikey=B7BA69D7-6AF4-46C2-924C-7DDE31F0BE3B`
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
      break;
    }
  }
  // Set results and display on
  document.getElementById(
    "resultsDisplay"
  ).innerHTML = `Cost of 1 ${coinCode} = ${currencyRate.toFixed(
    4
  )} ${convertedCode}`;
}

export default GetPage;
