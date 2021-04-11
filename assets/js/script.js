//created a constant with the api URL and variables with desired exchanges
const exchURL = "https://api.coingecko.com/api/v3/exchanges/";
let coins = { binance: [], gdax: [], kraken: [], hotbit: [] };
let filtered = [];


//looping through all of the pages code to show information, (hardcoded)
function getData2(exch) {
    coins[exch] = [];
    filtered = [];

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
function displayFilteredData(exch) {
    let result = '<thead><tr><th>Exchange</th><th>Base</th><th>Target</th><th>Last</th><th>Volume</th></tr></thead><tbody>';
    for (const i in filtered) {
        // K - because we made the data into an array rather then a dictionary earlier we removed .tickers (which would have given us this array)
       
        
            result += `<tr><td>${exch}</td> <td>${filtered[i].base}</td> <td>${filtered[i].target}</td><td>${filtered[i].last}</td><td>${filtered[i].volume}</td></tr>`;
            //result = result +  // the same
       
    }
    //console.log(result); 
    let el = document.getElementById('data-table');
    el.innerHTML = ` <div class="container"><table class='table table-dark table-striped table-bordered nowrap' id='coins-table'>${result}</tbody><tfoot><tr><th>Exchange</th><th>Base</th><th>Target</th><th>Last</th><th>Volume</th></tr></thead><tfoot></table></div>`;
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

// note

function refreshTickers(){
    for (const exch in coins) {
        getData2(exch);
    }
}


function filterData() {
    let exchange = document.getElementById('exchange').value;
    let currency = document.getElementById('currency').value;

    filtered = coins[exchange].filter(ticker => ticker.target === currency);

    displayFilteredData(exchange);

    //setTimeout(()=> { $('#coins-table').DataTable({ responsive: true }); }, 1);

    $('#coins-table').DataTable({ responsive: true });




    // $(document).ready(function() {
    //         var table = $('#example').DataTable( {
    //             responsive: true
    //         } );
        
    //         new $.fn.dataTable.FixedHeader( table );
    //     } );




};

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
    filterData();

};




