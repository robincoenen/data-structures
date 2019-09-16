Week 3 — Get Geocodes
==========================

![alt text](./illustrative_image_3.png)


## Given is an api, which can provide the respective geocodes (latitude, longitude) of adresses.

This code fetches street adresses from a json fiile and provides it to an api. The api reads the adresses and gives the geocodes (among other data) back in return. 
The use of an environment variable makes it possible to "hide" private information, like API keys. The async function and timeout makes sure that the requests are not messed by the asynchronous nature of javascript/node.

```
// dependencies
var request = require('request'); // npm install request
var async = require('async'); // npm install async
var fs = require('fs');
const dotenv = require('dotenv'); // npm install dotenv

// TAMU api key
dotenv.config();
const apiKey = process.env.TAMU_KEY;

// geocode addresses temp
//fetching the adresses from the code
var source = fs.readFileSync('adresses_06.json');
source = JSON.parse(source);

// geocode addresses final
//iterating over all objects of the array
var allData = [];
let addresses = [];
for(var i = 0; i < source.length; i++) {
    addresses.push(source[i].streetAdress);
}   

// testing if array is correct
console.log(addresses);

// providing the adresses to the api and asking the api for the geocodes
async.eachSeries(addresses, function(value, callback) {
    var apiRequest = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?';
    apiRequest += 'streetAddress=' + value.split(' ').join('%20');
    apiRequest += '&city=New%20York&state=NY&apikey=' + apiKey;
    apiRequest += '&format=json&version=4.01';
    
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        else {
            var tamuGeo = JSON.parse(body);
            console.log(tamuGeo['FeatureMatchingResultType']);
            allData.push(tamuGeo);
        }
    });
    setTimeout(callback, 2000);
}, function() {
    fs.writeFileSync('geo_06.json', JSON.stringify(allData));
    console.log('*** *** *** *** ***');
    console.log('Number of meetings in this zone: ');
    console.log(allData.length);
});
```

––––––––––––––––––––––––––

**time spent**
ca. 4 days à 5 hours. 
**learnings**
Assumed an error, but actually did not run the code until end -> Learning
Still need to delete unneeded metadata provided in addition to the geocodes by the API -> Follow Up
Crucial to hide private information via environment variables and .gitignore
**illustrative image**
collage, original image made by ken lodding, 
used for BYTE magazine, 
november 1978, volume 3, number 11, 
found here: https://archive.org/details/byte-magazine-1978-11-rescan