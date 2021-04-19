/* this refreshes the data in the session storage*/
function refreshTickers() {
  console.log('requesting data');
  // gets the key of the coins dictionary
  for (const exch in coins) {
    getSingleExchangeData(exch);
  }
  processRequestSecondEndPoint();
}

/*filters the data based on conditions of selection of the user*/
function filterData() {
  let exchange = document.getElementById('exchange').value;
  let currency = document.getElementById('currency').value;
  //gives us a new array 
  let priceRange = document.getElementById('price').value.split('-');
  // first part after question is true condition (to execute) and after : is the false part to (execute if is not undefined) this turns our array into min and max numbers
  let minPrice = priceRange[0] === "" ? 0 : Number(priceRange[0]);
  let maxPrice = priceRange[1] === "" ? Number.MAX_VALUE : Number(priceRange[1]);

  // volume
  let volumeByPriceRange = document.getElementById('volumeByPrice').value.split('-');
  // loops through tickers to return a new array of volume by last(price) if conditions are true
  let arrVolume = coins[exchange].map(x => x.target === currency ? x.volume * x.last : 0);
  // ... to open the array for the max function 
  let maxVolumeAllCoins = Math.max(...arrVolume) + 1;

  let minVolume = Number(volumeByPriceRange[0]) / 100 * maxVolumeAllCoins;
  let maxVolume = Number(volumeByPriceRange[1]) / 100 * maxVolumeAllCoins;

  // final filter data to display
  filtered = coins[exchange].filter(
    ticker =>
    ticker.target === currency &&
    ticker.last >= minPrice &&
    ticker.last <= maxPrice &&
    ticker.volume * ticker.last >= minVolume &&
    ticker.volume * ticker.last <= maxVolume
  );
  displayFilteredData(exchange);
  $('#coins-table').DataTable({
    responsive: true
  });
  displayChart();
  displayPieChart();
};