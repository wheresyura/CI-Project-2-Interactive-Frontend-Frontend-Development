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

            sessionStorage.setItem('coins', JSON.stringify(coins));

            filterData();

        }
    };

    xhr.open("GET", url);
    xhr.send();
}

// let arrivedData = function () {} // same as below
function displayFilteredData(exch) {
    let result = '<thead><tr><th>Exchange</th><th>Base</th><th>Target</th><th>Last</th><th>Volume</th><th>Volume*Price</th></tr></thead><tbody>';
    for (const i in filtered) {
        // K - because we made the data into an array rather then a dictionary earlier we removed .tickers (which would have given us this array)
       
        
            result += `<tr><td>${exch}</td> <td>${filtered[i].base}</td> <td>${filtered[i].target}</td><td>${filtered[i].last}</td><td>${filtered[i].volume}</td><td>${filtered[i].volume*filtered[i].last}</td></tr>`;
            //result = result +  // the same
       
    }
    //console.log(result); 
    let el = document.getElementById('data-table');
    el.innerHTML = ` <div class="container"> <button type="button" id="refresh" class="btn btn-light" onclick="refreshData()">Refresh <i class="fas fa-redo"></i></button><br><table class='table table-light table-striped table-bordered nowrap' id='coins-table'>${result}</tbody></table></div>`;
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
    console.log('requesting data');
    for (const exch in coins) {
        getData2(exch);
    }
}


function filterData() {
    let exchange = document.getElementById('exchange').value;
    let currency = document.getElementById('currency').value;

    filtered = coins[exchange].filter(ticker => ticker.target === currency);

    displayFilteredData(exchange);

 
    $('#coins-table').DataTable({ responsive: true });

    

};

window.onload = function(e) {
    let saved = sessionStorage.getItem('coins');
    if (saved == null) {
        refreshTickers();
    }
    else {
        console.log('using saved data');
        coins = JSON.parse(saved);
    }
    filterData();
// this was how we called the bellow
    // this.test1();

};

// function test1(){
//     console.log( 'test1: ' + coins['binance'][1].last);
// }
//

function refreshData() {
    refreshTickers();


    // //document.getElementById('refresh').onclick = function() {
    // let saved = sessionStorage.getItem('coins');
    // if (saved !== null) {
    //     console.log('requesting data');
    //     refreshTickers();
    // }
    // filterData();

//};
};


// setTimeout(()=> {
//     console.log(coins['binance'][10].last);
//     console.log(filtered[10]);
// }, 3000);

//
function displayChart() {
    const ctx = document.getElementById('chart').getContext('2d');
    const xlabels = ['bitcoin', 'ethereum', 'ripple', 'tezzos'];
    const ylabels = [];
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: xlabels,
            datasets: [{
                label: 'Price of Crypto Currencies',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
    
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
    
                ],
                borderWidth: 1
            }]
        },
    });
};
//xlabels.push(coins['exch'].base)