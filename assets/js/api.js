/*looping through the api pages for a specific exchange to get information, (hardcoded by constant - number of pages)
*/
function getSingleExchangeData(exch) {
  //empty arrays to clear information
  coins[exch] = [];
  filtered = [];
  // for loop to request all of the pages from the API 
  for (let i = 1; i < pageNumber; i++) {
    const url = exchURL + exch + `/tickers?page=${i}`;
    processRequest(exch, url);
  }
}

/*function to request our data from api (coingecko)*/
function processRequest(exch, url) {
  let xhr = new XMLHttpRequest();
  //annonymous function on readystatechange method (our event handler)
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    //adding to coins[exch] the data from the response text
      coins[exch] = coins[exch].concat(JSON.parse(this.responseText).tickers);
      //saving this data in session storage as a sting 
      sessionStorage.setItem('coins', JSON.stringify(coins));
      filterData();
    }
  };
  // using the XMLHttpRequest built in methods
  xhr.open("GET", url);
  xhr.send();
}

/*caller function to request our data from api2 (other strand of data)*/
function processRequestSecondEndPoint() {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // saving as an array our response text
      moreCoinsData = JSON.parse(this.responseText);
      //saving in session storage as a string
      sessionStorage.setItem('moreCoinsData', this.responseText);
      filterData();
    }
  };
  // using the XMLHttpRequest built in methods
  xhr.open("GET", "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=300&page=1&sparkline=false");
  xhr.send();
}