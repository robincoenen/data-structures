const { Client } = require('pg');
var fs = require('fs');
var async = require('async');

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'robincoenen';
db_credentials.host = 'database-structures.coqr4cljipbf.us-east-2.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.PW;       
db_credentials.port = 5432;

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

///// Spreading the TIME of the data (days, starttime, endttime etc) into an array

// let meetings = JSON.parse(fs.readFileSync("geo_all_cleaned_b.json"));
// let firstInputs =   [];
// for ( let i = 0; i < meetings.length; i++){
//     let input = meetings[i].scheduleTime;
//     firstInputs.push(...input);
// }
// console.log(firstInputs);




////CREATE
////Creating the tables for time -> CREATE TABLE ""
///var timeTable = "CREATE TABLE timeDates (day varchar(500), starttime varchar(500), endtime varchar(500), time varchar(500), type varchar(500), id varchar(50));";

///var meetData = "CREATE TABLE meetData (id varchar(100), buildingname varchar(500), streetaddress varchar(500), city varchar(500), state varchar(500), zipcode varchar(50), access boolean, geoadress varchar(50), lat double precision, long double precision, matchscore varchar(800));";





////These lines create the different tables
// client.query(meetData, (err, res) => {
//     console.log(err, res);
//     client.end();
// });

// client.query(queryTime, (err, res) => {
//     console.log(err, res);
//     client.end();
// });


////DELETE
////These lines delete respective tables -> DROP TABLE

// Sample SQL statement to delete a table: 

//var thisQuery = "DROP TABLE time;";
// var thisQuery = "DROP TABLE timeDates;";

// client.query(thisQuery, (err, res) => {
//     console.log(err, res);
//     client.end();
// });


//INSERT
//WRITING THE MEETING DATA INTO TABLE -> INSERT INTO "" VALUES

// var addressesForDb = fs.readFileSync("geo_all_cleaned.json");
// addressesForDb = JSON.parse(addressesForDb);

// async.eachSeries(addressesForDb, function(value, callback) {
//     const client = new Client(db_credentials);
//     client.connect();
    
    
//      var thisQuery = "INSERT INTO meetData VALUES (E'" + value.id + "','" + value.locationMeeting.buildingName + "','" + value.locationMeeting.streetAdress + "', '" + value.locationMeeting.city + "', '" + value.locationMeeting.state + "', '" + value.locationMeeting.zipCode + "', '" + value.locationMeeting.access + "', '" + value.geocodeInfo.geoAddress + "', '" + value.geocodeInfo.lat + "', '" + value.geocodeInfo.long + "', '" + value.geocodeInfo.matchScore + "');";

//     client.query(thisQuery, (err, res) => {
//         console.log(err, res);
//         client.end();
//     });
//     setTimeout(callback, 1000); 
// });




//// WRITING THE TIME INTO A TABLE 

// var addressesForDb = fs.readFileSync("geo_all_cleaned.json");
// addressesForDb = JSON.parse(addressesForDb);

// async.eachSeries(firstInputs, function(value, callback) {
//     const client = new Client(db_credentials);
//     client.connect();
    
    
//  var thisQuery = "INSERT INTO timeDates VALUES (E'" + value.day + "', '" + value.startTime + "', '" + value.endTime + "', '" + value.time + "', '" + value.type + "', '" + value.id + "');";

//     client.query(thisQuery, (err, res) => {
//         console.log(err, res);
//         client.end();
//     });
//     setTimeout(callback, 1000); 
// });





///CHECK
///Sample SQL statement to query the entire contents of a table -> SELECT * FROM
// var thisQuery = "SELECT * FROM timeDates;";

// client.query(thisQuery, (err, res) => {
//     console.log(err, res.rows);
//     client.end();
// });



////CHECK
///Sample SQL statement to query the entire contents of a table -> SELECT * FROM
var thisQuery = "SELECT * FROM timeDates;";

client.query(thisQuery, (err, res) => {
    console.log(err, res.rows);
    client.end();
});