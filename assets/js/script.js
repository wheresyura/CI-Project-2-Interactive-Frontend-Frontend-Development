var apikey = {
    key:'5dff8033-57d4-4bb9-9ae9-e11b219d9217'
}

/*
const xhr = new XMLHttpRequest();
const url = 'https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest?CMC_PRO_API_KEY=' + apikey.key;

function someHandler(data) {
    console.log(data);
}

xhr.open('GET', url);
xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
xhr.setRequestHeader('Content-Type', 'text/plain')
xhr.onreadystatechange = someHandler;
xhr.send();
*/



fetch('https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest?CMC_PRO_API_KEY=' + apikey.key, { 
        method: 'GET',
        mode: 'no-cors',
        credentials: 'omit',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'text/plain',
            //'Accept': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then(data => console.log(data))
    .catch(err => console.log(err));



/*
async function asyncCall() {

    let response = await fetch('https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest?CMC_PRO_API_KEY=' + apikey.key, { 
        method: 'GET',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': 'https://pro-api.coinmarketcap.com'
        }
    });
    console.log(response);

    //console.log(JSON.stringify(response));
    //let x1 = JSON.parse(response.target.responseText);
   // console.log(x1.data.quote.USD.total_market_cap);
};

asyncCall();
*/

/*
request('GET','https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest?CMC_PRO_API_KEY=' + apikey.key)
.then((r1) => {
    var x1 = JSON.parse(r1.target.responseText);
    console.log(x1.data.quote.USD.total_market_cap);
    document.getElementById('test').innerText = x1.data.quote.USD.total_market_cap;
}).catch(err => {
    console.log('err');
})  
*/ 

function request(method, url) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onload = resolve;
            xhr.onerror = reject;
            xhr.send();
        });
}
