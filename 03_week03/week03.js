// dependencies
var request = require('request'); // npm install request
var async = require('async'); // npm install async
var fs = require('fs');
const dotenv = require('dotenv'); // npm install dotenv

// TAMU api key
dotenv.config({path: '/home/ec2-user/environment/.env'});
const apiKey = process.env.TAMU_KEY;


// geocode addresses temp
var source = fs.readFileSync('adresses_06.json');
source = JSON.parse(source);

// geocode addresses final
var allData = [];
let addresses = [];
for(var i = 0; i < source.length; i++) {
    addresses.push(source[i].streetAdress);
}   

console.log(addresses);

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


// // dependencies
// var request = require('request'); // npm install request
// var async = require('async'); // npm install async
// var fs = require('fs');
// const dotenv = require('dotenv'); // npm install dotenv
// var cheerio = require('cheerio');

// // TAMU api key
// dotenv.config();
// const apiKey = process.env.TAMU_KEY;

// // geocode addresses final
// var allData = [];

// // geocode addresses temp
// var addresses = [];

// //pull adress out of file, just the street

// let content_f = fs.readFileSync('/home/ec2-user/environment/data-structures/01_week01/data/06.txt');
// const $ = cheerio.load(content_f);
// var meetingData = [];


//  $('td').each(function(i, elem) {
//      if($(elem).attr("style")=="border-bottom:1px solid #e3e3e3; width:260px"){
         
//         //  var thisMeeting = {};
//         //  thisMeeting.streetAdress = $(elem).html().split('<br>')[2].trim().split(',')[0];
//         //  thisMeeting.city = "NewYork";
//         //  thisMeeting.state = "NY";
//         //  meetingData.push(thisMeeting);
         
//          var parsed = $(elem).html().split('<br>')[2].trim().split(',')[0];
//          JSON.stringify(parsed);
//          addresses.push(parsed);
//         // console.log(zwischenlager);
//      }
//  });
//         console.log(addresses);

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
//             allData.push(tamuGeo);
//         }
//     });
//     setTimeout(callback, 2000);
// }, function() {
//     fs.writeFileSync('geo_06.json', JSON.stringify(allData));
//     console.log('*** *** *** *** ***');
//     console.log('Number of meetings in this zone: ');
//     console.log(allData.length);
// });