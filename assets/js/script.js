//created a constant with the api URL and variables with desired exchanges
const exchURL = "https://api.coingecko.com/api/v3/exchanges/";
let coins = { binance: [], gdax: [], kraken: [], hotbit: [] };

//looping through all of the pages code to show information, (hardcoded)
function getData2(exch) {
    coins[exch] = [];
    for (let i = 1; i < 3; i++) {
        const url = exchURL + exch + `/tickers?page=${i}`;
        processRequest(exch, url);
    }
}

// caller 
function processRequest(exch, url){
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            coins[exch] = coins[exch].concat(JSON.parse(this.responseText).tickers);

            localStorage.setItem('coins', JSON.stringify(coins));
            arrivedData();
        }
    };

    xhr.open("GET", url);
    xhr.send();
}

// let arrivedData = function () {} // same as below
function arrivedData() {
    let result = '';
    for (const exch in coins) {
        // if (!exch.hasOwnProperty('tickers')) {
        //     continue;
        // }
        // K - because we made the data into an array rather then a dictionary earlier we removed .tickers (which would have given us this array)
        let tickers = coins[exch];
        for (let i in tickers) {
            result += `<tr><td>${exch}</td> <td>${tickers[i].base}</td> <td>${tickers[i].target}</td><td>${tickers[i].last}</td><td>${tickers[i].volume}</td></tr>`;
            //result = result +  // the same
        }
    }
    //console.log(result); 
    let el = document.getElementById('test');
    el.innerHTML = `<table class='table table-dark'>${result}</table>`;
}

//Filter 

// if (coins['binance'] !== []) {
//     function filterUSDT(obj) {
//         let USDTCoins = obj.filter( item => item.target === 'USDT'  );
//         return USDTCoins;
//         console.log(filterUSDT(coins['binance']));
//     };
// }


function filterUSDT(obj) {
    let USDTCoins = obj.filter( item => item.target === 'USDT');
    return USDTCoins;
    
};


// setTimeout( ()=> filterUSDT(coins['binance']), 5000);
//console.log(filterUSDT(coins['binance']));



function refreshTickers(){
    for (const exch in coins) {
        getData2(exch);
      
    }
}



window.onload = function(e) {
    let saved = localStorage.getItem('coins');
    if (saved == null) {
        console.log('requesting data');
        
        refreshTickers();
    }
    else {
        console.log('using saved data');
        coins = JSON.parse(saved);

    }
};

