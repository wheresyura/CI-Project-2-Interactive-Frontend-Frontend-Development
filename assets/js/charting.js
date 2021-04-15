// the function for displaying our data in a html table
// let displayFilteredData = function () {} // same as below
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

// drawing of a chart with our filtered data
function displayChart() {
    console.log(filtered.length);
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
                    max: 3000
                }
            }
        }
    });
};
//xlabels.push(coins['exch'].base)