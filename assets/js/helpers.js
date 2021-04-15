// 
function refreshTickers(){
    console.log('requesting data');
    // gets the key of the coins dictionary
    for (const exch in coins) {
        getSingleExchangeData(exch);
    }
}

// filters the data based on conditions of selection
function filterData() {
    let exchange = document.getElementById('exchange').value;
    let currency = document.getElementById('currency').value;
    
    let priceRange = document.getElementById('price').value.split('-');
    // first part after question is true condition (to execute) and after : is the false part to (execute if is not undefined) 
    let minPrice = priceRange[0] === "" ? 0 : Number(priceRange[0]);
    let maxPrice = priceRange[1] === "" ? Number.MAX_VALUE : Number(priceRange[1]);


    filtered = coins[exchange].filter(ticker => ticker.target === currency && ticker.last >= minPrice && ticker.last <= maxPrice);

    displayFilteredData(exchange);

    $('#coins-table').DataTable({ responsive: true });
    displayChart();
};

//
function refreshData() {
    refreshTickers();
};
