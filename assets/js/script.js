//used from code institute's example from online vidoes
const baseURL = "https://api.coingecko.com/api/v3/exchanges/binance/tickers";




//how we are getting the API data 
function getData(cb) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", baseURL);
    xhr.send();
}

//creating a table?
function getTableHeaders(obj) {
    let tableHeaders = [];

     Object.keys(obj).forEach(function(key){
        tableHeaders.push(`<td> ${key} </td>`);
     });
    return `<tr>${tableHeaders}</tr>`;
};

// function generatePaginationButtons(next, previous) {
//     if (next && prev) {
//         return `<button onclick="writeToDocument(${prev})">Previous</button>`
//                `<button onclick="writeToDocument(${next})">Next</button>`
//     } else if (next && !prev) {
//         `<button onclick="writeToDocument(${next})">Next</button>`
//     } else if (!next && prev) {
//         `<button onclick="writeToDocument(${prev})">Previous</button>`
//     }
// }

//or is this creating a table?
function writeToDocument() {
    let tableRows = [];

    //clears the text
    let el = document.getElementById('test');
    el.innerHTML = "";
    
// anonymous function (the function in the paramater)
    getData(function(data) {
        // let pagination;
        // if (data.next || data.previous) {
        //     pagination = generatePaginationButtons(data.next, data.previous)
        // }

        data = data.tickers;
        let tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item) {
            let dataRow = [];

            Object.keys(item).forEach(function(key){
                dataRow.push(`<td>${item[key]}</td>`)
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
        });
        el.innerHTML = `<table> ${tableHeaders}${tableRows} </table>`
    });
}

//Filter ATTEMPT 3
function filterUSDT(obj) {
    let USDTCoins = obj.tickers.filter( item => item.target === 'USDT'  );
    return USDTCoins;
};

function printUSDT(exch) {
    console.log( filterUSDT(coins[exch]) );
}

//console.log(USDTCoins);


//Filter ATTEMPT 2
// Object.filter = function( coins, USDT) {
//     let USDTCoins = {}, key;

//     for (key in obj) {
//         if (obj.hasOwnProperty(key) && !USDT(obj[key])) {
//             USDTCoins[key] = obj[key];
//         }
//     }

//     console.log(USDTCoins);
// };

//filter ATEMPT 1
// let USDTCoins = coins.binance.filter(coin => coin === 'USDT');
// console.log(USDTCoins);



//d
const exchURL = "https://api.coingecko.com/api/v3/exchanges/";
let coins = { binance: [], gdax: [] };

function getData2(exch) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            coins[exch] = JSON.parse(this.responseText);
            arrivedData();
            printUSDT(exch);
        }
    };

    xhr.open("GET", exchURL + exch + '/tickers');
    xhr.send();
}

// let arrivedData = function () {} // same as below
function arrivedData() {
    let result = '';

    for (const exch in coins) {
        // if (!exch.hasOwnProperty('tickers')) {
        //     continue;
        // }

        let tickers = coins[exch].tickers;

        for (let i in tickers) {
            result += `<tr><td>${exch}</td> <td>${tickers[i].base}</td> <td>${tickers[i].last}</td></tr>`;
            //result = result +  // the same
        }
    }
    //console.log(result); 

    let el = document.getElementById('test');
    el.innerHTML = `<table>${result}</table>`;

}



/*  
//3. WORKING DISPLAYING THE DATA CORRECTLY IN A TABLE
const baseURL = "https://api.coingecko.com/api/v3/exchanges/binance/tickers";

function getData(cb) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", baseURL);
    xhr.send();
}

function getTableHeaders(obj) {
    let tableHeaders = [];

     Object.keys(obj).forEach(function(key){
        tableHeaders.push(`<td> ${key} </td>`);
     });
    return `<tr>${tableHeaders}</tr>`;
};



function writeToDocument() {
    let tableRows = [];

    //clears the text
    let el = document.getElementById('test');
    el.innerHTML = "";
    

    getData(function(data) {
        data = data.tickers;
        let tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item) {
            let dataRow = [];

            Object.keys(item).forEach(function(key){
                dataRow.push(`<td>${item[key]}</td>`)
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
        });
        el.innerHTML = `<table> ${tableHeaders}${tableRows} </table>`
    });
}
*/

/* 
//2. WORKING CODE DISPLAYS THE KEYS OF EACH OF OBJECT FROM JSON
const baseURL = "https://api.coingecko.com/api/v3/exchanges/binance/tickers";

function getData(cb) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", baseURL);
    xhr.send();
}

function getTableHeaders(obj) {
    let tableHeaders = [];

     Object.keys(obj).forEach(function(key){
        tableHeaders.push(`<td> ${key} </td>`);
     });
    return `<tr>${tableHeaders}</tr>`;
};



function writeToDocument() {
    //clears the text
    let el = document.getElementById('test');
    el.innerHTML = "";
    

    getData(function(data) {
        data = data.tickers;
        let tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item) {
            //el.innerHTML += "<p>" + item.base + "<p>";
        })
        el.innerHTML = `<table> ${tableHeaders} </table>`
    });
}
*/


/*
//1. WORKING CODE - PRINTS TO CONSOLE (OUR JSON DATA AS AN OBJECT)
function getData(cb) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://api.coingecko.com/api/v3/exchanges/binance/tickers");
    xhr.send();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}

function printDataToConsole(data) {
    console.log(data);
}

getData(printDataToConsole);

*/


/*
const baseURL = "https://api.coingecko.com/api/v3/exchanges/binance/tickers";

function getData(type, cb) {
    //what does the new mean and XMLH...request?
    let xhr = new XMLHttpRequest();

    xhr.open("GET", baseURL  + "/" + type + "/");
    xhr.send();

//this in this instance mean?
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}

*/