/*this is the start of the website logic when onload event happens, other functions are called
*/
window.onload = function(e) {
  let saved = sessionStorage.getItem('coins');
  // refresh tickers (download to a session storage) if not saved
  if (saved == null) {
    refreshTickers();
  }
  // or parse the saved and console log that using saved
  else {
    console.log('using saved data');
    coins = JSON.parse(saved);
    moreCoinsData = JSON.parse(sessionStorage.getItem('moreCoinsData'));
  }
  // run filterd data function (displays coins based on choosen filters)
  filterData();
};