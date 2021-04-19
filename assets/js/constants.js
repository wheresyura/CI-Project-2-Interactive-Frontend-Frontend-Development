//created a constant with the api URL and page numbers and variables with desired exchanges
const exchURL = "https://api.coingecko.com/api/v3/exchanges/";
const pageNumber = 3;

let coins = {
  binance: [],
  gdax: [],
  kraken: [],
  hotbit: []
};
let filtered = [];
let myChart = null;
let moreCoinsData = [];
let pieChart = null;