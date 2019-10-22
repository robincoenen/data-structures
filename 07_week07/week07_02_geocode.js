// dependencies
var request = require('request'); // npm install request
var async = require('async'); // npm install async
var fs = require('fs');
const dotenv = require('dotenv'); // npm install dotenv

// TAMU api key
dotenv.config({path: 'home/ec2-user/environment/.env'});
const apiKey = process.env.TAMU_KEY;

// geocode addresses temp
var source = fs.readFileSync('adresses_06.json');
source = JSON.parse(source);


// geocode addresses final
var allData = [];
let addresses = [];

for(var i = 0; i < source.length; i++) {
    
    addresses.push(source[i].locationMeeting);
} 
//console.log(addresses);

var cleanedAddresses = addresses.filter(value => JSON.stringify(value) !== undefined);
console.log(cleanedAddresses);



// async.eachSeries(addresses, function(value, callback) {
//     var apiRequest = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?';
//     apiRequest += 'streetAddress=' + value.split(' ').join('%20');
//     apiRequest += '&city=New%20York&state=NY&apikey=' + apiKey;
//     apiRequest += '&format=json&version=4.01';
    
//     request(apiRequest, function(err, resp, body) {
//         if (err) {throw err;}
//         else {
//             var tamuGeo = JSON.parse(body);
//             console.log(tamuGeo['FeatureMatchingResultType']);
            
            
//             var reduction = {
//                 streetaddress: tamuGeo['InputAddress'],
//                 latitude: tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Latitude'],
//                 longitude: tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Longitude'],
//             };
            
//             allData.push(reduction);
//         }
//     });
    
     
            
//     setTimeout(callback, 2000);
// }, function() {
//     fs.writeFileSync('geo_06.json', JSON.stringify(allData));
//     console.log('*** *** *** *** ***');
//     console.log('Number of meetings in this zone: ');
//     console.log(allData.length);
// });