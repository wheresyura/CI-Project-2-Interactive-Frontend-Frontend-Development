// 
function refreshTickers(){
    console.log('requesting data');
    for (const exch in coins) {
        getData2(exch);
    }
}

//
function filterData() {
    let exchange = document.getElementById('exchange').value;
    let currency = document.getElementById('currency').value;
    filtered = coins[exchange].filter(ticker => ticker.target === currency);
    displayFilteredData(exchange);
    $('#coins-table').DataTable({ responsive: true });
    displayChart();
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
