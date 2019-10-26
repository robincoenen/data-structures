// dependencies
var request = require('request'); // npm install request
var async = require('async'); // npm install async
var fs = require('fs');
const dotenv = require('dotenv'); // npm install dotenv

// TAMU api key
dotenv.config({path: 'home/ec2-user/environment/.env'});
const apiKey = process.env.TAMU_KEY;

// geocode addresses temp
var source = fs.readFileSync('adresses_01.json');
source = JSON.parse(source);

var finalD =[];

// geocode addresses final
var allData = [];
let addresses = [];

// for(var i = 0; i < source.length; i++) {

//     addresses.push(source[i]value.locationMeeting.streetAdress);
// } 
// console.log(addresses);


async.eachSeries(source, function(value, callback) {
    var address = value.locationMeeting.streetAdress;
 console.log(address);

//     var apiRequest = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?';
//     apiRequest += 'streetAdress=' + address.split(' ').join('%20');
//     apiRequest += '&city=New%20York&state=NY&apikey=' + apiKey;
//     apiRequest += '&format=json&version=4.01';
    
//     request(apiRequest, function(err, resp, body) {
//         if (err) {throw err;}
//         else {
//             var tamuGeo = JSON.parse(body);
//             //console.log(tamuGeo['FeatureMatchingResultType']);
//             finalD.push(tamuGeo);
//         }
//     });
//     setTimeout(callback, 2000);
// }, function() {
//     fs.writeFileSync('geo_06.json', JSON.stringify(finalD));
//     console.log('*** *** *** *** ***');
//     console.log('Number of meetings in this zone: ');
//     console.log(finalD.length);
});