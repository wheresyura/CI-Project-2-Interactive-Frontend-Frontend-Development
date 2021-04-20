/* the function for displaying our data in a html table*/
function displayFilteredData(exch) {
  let result = '<thead><tr><th>Exchange</th><th>Base</th><th>Target</th><th>Last Price</th><th>Volume</th><th>Volume*Price</th><th>Market Cap</th></tr></thead><tbody>';
  for (const i in filtered) {
    // we match moreCoinsData to specific coins in our filtered data
    let coinInfo = moreCoinsData.find(item => item.symbol.toUpperCase() === filtered[i].base);
    let market_cap = coinInfo === undefined ? 0 : coinInfo.market_cap;
    // adding to this result through a loop to display as html table
    result += `<tr>
                            <td>${exch}</td> 
                            <td>${filtered[i].base}</td> 
                            <td>${filtered[i].target}</td>
                            <td>${filtered[i].last}</td>
                            <td>${filtered[i].volume}</td>
                            <td>${filtered[i].volume*filtered[i].last}</td>
                            <td>${market_cap}</td>
                        </tr>`;
  }
  let el = document.getElementById('data-table');
  el.innerHTML = `<div class="container"> 
                        <button type="button" id="refresh" class="btn btn-light" onclick="refreshTickers()">Refresh <i class="fas fa-redo"></i></button>
                        <br>
                        <table class='table table-light table-striped table-bordered nowrap' id='coins-table'>${result}</tbody>
                        </table>
                    </div>`;
}

/* displaying a chart with our filtered data*/
function displayChart() {
  if (myChart !== null) {
      // destroying so can use again for new request
    myChart.destroy();
  }
  let exchange = document.getElementById('exchange').value;
  const ctx = document.getElementById('chart').getContext('2d');
  // new arrays of just bases (x), and last(prices)(y)
  const xlabels = filtered.flatMap(x => x.base);
  const ylabels = filtered.flatMap(x => x.last);

  // followed chart.js example
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

/*displaying a chart with our filtered data*/
function displayPieChart() {
  if (pieChart !== null) {
    pieChart.destroy();
  }
  let exchange = document.getElementById('exchange').value;
  const ctx = document.getElementById('pieChart').getContext('2d');

  const cryptoNames = []; 
  const marketCaps = [];
  for (const i in moreCoinsData) {
      // generating the x and y values for pie chart
    let code = moreCoinsData[i].symbol.toUpperCase();
    let foundForExch = coins[exchange].find(x => x.base === code);
    if (foundForExch !== undefined) {
      cryptoNames.push(code);
      marketCaps.push(moreCoinsData[i].market_cap);
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
        title: {
          text: 'Marketcaps on ' + exchange
        },
        legend: {
          display: false
        }
      }
    }
  });
};