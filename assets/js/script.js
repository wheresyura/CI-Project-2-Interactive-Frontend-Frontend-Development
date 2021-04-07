//used from code institute's example from online vidoes
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