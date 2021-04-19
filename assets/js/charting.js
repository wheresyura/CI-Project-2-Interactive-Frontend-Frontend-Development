// the function for displaying our data in a html table
// let displayFilteredData = function () {} // same as below
function displayFilteredData(exch) {
    let result = '<thead><tr><th>Exchange</th><th>Base</th><th>Target</th><th>Last</th><th>Volume</th><th>Volume*Price</th><th>Market Cap</th></tr></thead><tbody>';
    for (const i in filtered) {
        // K - because we made the data into an array rather then a dictionary earlier we removed .tickers (which would have given us this array)
            let coinInfo = moreCoinsData.find(item => item.symbol.toUpperCase() ===     filtered[i].base);
            let market_cap = coinInfo === undefined ? 0 : coinInfo.market_cap;
            
            result += `<tr>
                            <td>${exch}</td> 
                            <td>${filtered[i].base}</td> 
                            <td>${filtered[i].target}</td>
                            <td>${filtered[i].last}</td>
                            <td>${filtered[i].volume}</td>
                            <td>${filtered[i].volume*filtered[i].last}</td>
                            <td>${market_cap}</td>
                        </tr>`;
            //result = result +  // the same
    }
    //console.log(result); 
    let el = document.getElementById('data-table');
    el.innerHTML = `<div class="container"> 
                        <button type="button" id="refresh" class="btn btn-light" onclick="refreshTickers()">Refresh <i class="fas fa-redo"></i></button>
                        <br>
                        <table class='table table-light table-striped table-bordered nowrap' id='coins-table'>${result}</tbody>
                        </table>
                    </div>`;
}

// drawing of a chart with our filtered data
function displayChart() {
    if (myChart!==null) {
        myChart.destroy();
    }
    let exchange = document.getElementById('exchange').value;
    const ctx = document.getElementById('chart').getContext('2d');
    const xlabels = filtered.flatMap(x=>x.base);
    const ylabels = filtered.flatMap(x=>x.last);

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: xlabels,
            datasets: [{
                label: `Price of Crypto Currencies on ${exchange}`,
                data: ylabels,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
    
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
    
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    suggestedMax: 1
                }
            }
        }
    });
};
//xlabels.push(coins['exch'].base)


function displayPieChart() {
    if (pieChart!==null) {
        pieChart.destroy();
    }
    let exchange = document.getElementById('exchange').value;
    const ctx = document.getElementById('pieChart').getContext('2d');

    const cryptoNames = []; // coins[exchange].map(x=>x.base.toLowerCase());
    const marketCaps = [];
    for (const i in moreCoinsData) {
        let code = moreCoinsData[i].symbol.toUpperCase();
        let foundForExch = coins[exchange].find(x=>x.base === code);
        if ( foundForExch !== undefined) {
            cryptoNames.push(code);
            marketCaps.push( moreCoinsData[i].market_cap);
        }
    }


    const data = {
        labels: cryptoNames,
        datasets: [{
            label: 'Marketcaps on ' + exchange,
            data: marketCaps,
            backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

    pieChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            plugins: {
                title: { text: 'Marketcaps on ' + exchange},
                legend: { display: false }
            }
        }
    });
};

