// dependencies
var request = require('request'); // npm install request
var async = require('async'); // npm install async
var fs = require('fs');
const dotenv = require('dotenv'); // npm install dotenv
var cheerio = require('cheerio');

// TAMU api key
dotenv.config();
const apiKey = process.env.TAMU_KEY;

// geocode addresses final
var allData = [];

// geocode addresses temp
var addresses = [];

//pull adress out of file, just the street

let content_f = fs.readFileSync('/home/ec2-user/environment/data-structures/01_week01/data/06.txt');

const $ = cheerio.load(content_f);

var meetingData = [];



 $('td').each(function(i, elem) {
     if($(elem).attr("style")=="border-bottom:1px solid #e3e3e3; width:260px"){
         
         var thisMeeting = {};
         thisMeeting.streetAdress = $(elem).html().split('<br>')[2].trim().split(',')[0];
         thisMeeting.city = "NewYork";
         thisMeeting.state = "NY";
         meetingData.push(thisMeeting);
         
         var zwischenlager = $(elem).html().split('<br>')[2].trim().split(',')[0];
         addresses.push(zwischenlager);
        // console.log(zwischenlager);

     }
 });
 
        console.log(addresses);
// console.log(meetingData);

// var zwischenlager = $(elem).html().split('<br>')[2].trim().split(',')[0];

// console.log(zwischenlager);





fs.writeFileSync('adresses_06.json', JSON.stringify(meetingData));


// eachSeries in the async module iterates over an array and operates on each item in the array in series
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
    fs.writeFileSync('data/first.json', JSON.stringify(allData));
    console.log('*** *** *** *** ***');
    console.log('Number of meetings in this zone: ');
    console.log(meetingsData.length);
});























// var request = require('request'); // npm install request
// var async = require('async'); // npm install async
// var fs = require('fs');
// const dotenv = require('dotenv'); // npm install dotenv


// var content = fs.readFileSync('adresses_06.json');

// console.log(content);

// // TAMU api key
// dotenv.config();
// const apiKey = process.env.TAMU_KEY;

// // geocode addresses
// var meetingsData = [];
// var addresses = ["63 Fifth Ave", "16 E 16th St", "2 W 13th St"];

// // eachSeries in the async module iterates over an array and operates on each item in the array in series
// async.eachSeries(content, function(value, callback) {
//     var apiRequest = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?';
//     apiRequest += 'streetAddress=' + value;
//     apiRequest += '&city=New%20York&state=NY&apikey=' + apiKey;
//     apiRequest += '&format=json&version=4.01';
    
//     request(apiRequest, function(err, resp, body) {
//         if (err) {throw err;}
//         else {
//             var tamuGeo = JSON.parse(body);
//             console.log(tamuGeo['FeatureMatchingResultType']);
//             meetingsData.push(tamuGeo);
//         }
//     });
    
//     console.log(meetingsData);
    
    
    
//     setTimeout(callback, 2000);
// }, function() {
//     fs.writeFileSync('first.json', JSON.stringify(meetingsData));
//     console.log('*** *** *** *** ***');
//     console.log('Number of meetings in this zone: ');
//     console.log(meetingsData.length);
// });



















// // dependencies
// var request = require('request'); // npm install request
// var async = require('async'); // npm install async
// var fs = require('fs');
// const dotenv = require('dotenv'); // npm install dotenv
// var cheerio = require('cheerio');

// // TAMU api key
// dotenv.config();
// const apiKey = process.env.TAMU_KEY;

// let content_f = fs.readFileSync('/home/ec2-user/environment/data-structures/01_week01/data/06.txt');
// const $ = cheerio.load(content_f);

// var meetingData = [];

//  $('td').each(function(i, elem) {
//      if($(elem).attr("style")=="border-bottom:1px solid #e3e3e3; width:260px"){
         
//          var thisMeeting = {};
//          thisMeeting.streetAdress = $(elem).html().split('<br>')[2].trim().split(',')[0];
//          thisMeeting.city = "NewYork";
//          thisMeeting.state = "NY";
//          meetingData.push(thisMeeting);
//      }
     
//      var newData = meetingData.txt.split(',')[0];
     
//      console.log(newData);

//  });



// // geocode addresses
// var meetingsData = [];

// // var addresses = JSON.parse(fs.readFileSync('adresses_06.json'));
// var addresses = meetingData;

// // var addresses = ["63 Fifth Ave", "16 E 16th St", "2 W 13th St"];

// // eachSeries in the async module iterates over an array and operates on each item in the array in series
// async.eachSeries(addresses, function(value, callback) {
//     var apiRequest = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?';
//     apiRequest += 'streetAddress='+value;
//     apiRequest += '&city=New%20York&state=NY&apikey=' + apiKey;
//     apiRequest += '&format=json&version=4.01';
    
//     request(apiRequest, function(err, resp, body) {
//         if (err) {throw err;}
//         else {
//             var tamuGeo = JSON.parse(body);
//             console.log(tamuGeo['FeatureMatchingResultType']);
//             meetingsData.push(tamuGeo);
//         }
//     });
//     setTimeout(callback, 2000);
//     console.log(meetingsData);
//     console.log('*** *** *** *** ***');
//     console.log('Number of meetings in this zone: ');
//     console.log(meetingsData.length);
// });
// // }, function() {
// //     fs.writeFileSync('geo_06.json', JSON.stringify(meetingsData));
// //     console.log('*** *** *** *** ***');
// //     console.log('Number of meetings in this zone: ');
// //     console.log(meetingsData.length);
// // });