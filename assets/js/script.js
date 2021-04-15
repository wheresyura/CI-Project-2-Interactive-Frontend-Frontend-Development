//this is the start of the function when onload event happens, other functions are called
window.onload = function(e) {
    let saved = sessionStorage.getItem('coins');
    // refresh tickers if not saved
    if (saved == null) {
        refreshTickers();
    }
    // or parse the saved and console log that using saved
    else {
        console.log('using saved data');
        coins = JSON.parse(saved);
    }
    // run filterd data functio
    filterData();
};