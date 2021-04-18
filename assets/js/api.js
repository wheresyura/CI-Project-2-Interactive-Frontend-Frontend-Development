//looping through the api pages for a specific exchange to get information, (hardcoded by constant)
function getSingleExchangeData(exch) {
    //empty arrays
    coins[exch] = [];
    filtered = [];
    // for loop to go through all of the pages for the API
    for (let i = 1; i < pageNumber; i++) {
        const url = exchURL + exch + `/tickers?page=${i}`;
        processRequest(exch, url);
    }
}

// caller function to request our data from api
function processRequest(exch, url){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // 
            coins[exch] = coins[exch].concat(JSON.parse(this.responseText).tickers);
            sessionStorage.setItem('coins', JSON.stringify(coins));
            filterData();
        }
    };
    // using the XMLHttpRequest built in methods
    xhr.open("GET", url);
    xhr.send();
}

// caller function to request our data from api2
function processRequestSecondEndPoint (){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // 
            moreCoinsData = JSON.parse(this.responseText);
            sessionStorage.setItem('moreCoinsData', this.responseText);
            filterData();
            console.log(moreCoinsData);
        }
    };
    // using the XMLHttpRequest built in methods
    xhr.open("GET", "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false");
    xhr.send();
    
}

