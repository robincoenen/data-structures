Week 4 — Creating a Database
==========================

![alt text](./illustrative_image_4.png)


## A postgressql database was created in the AWS Environment.The pg module allows to interact with the database, e.g., deleting tables, creating tables, inserting data, selecting tables/rows.

The interaction with a database is processed in different steps. First and most important step is to find a good concept for a working database.
Then the database needs to be initialised, the tables need to be created and then the respective data needs to be inserted.
After that one can fetch ("select") the needed data from table.


```
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



////CREATE
////Creating the different tables. Due to problems with the writing of data into the table I created a shorter interim table, until I solve the problem. -> CREATE TABLE ""
//var queryTemp = "CREATE TABLE temploc (adressline varchar(500), city varchar(150), state varchar(10), lat double precision, long double precision);";
//var queryLocations = "CREATE TABLE locations (adressline varchar(500), lat double precision, long double precision, city varchar(150), state varchar(10), zipcode varchar(5), adress_description varchar(500), location_name varchar(500),location_id serial primary key);";
//var querySpecifics = "CREATE TABLE group_specifics (group_id serial primary key, meeting_type varchar(500), wheelchair_access BOOL, special_interest varchar(500), additional_description varchar(500));";
//var queryTime = "CREATE TABLE time (day varchar(75), time_start varchar(150), time_end varchar(500));";

////These lines create the different tables
// client.query(queryTemp, (err, res) => {
//     console.log(err, res);
//     client.end();
// });


// client.query(queryLocations, (err, res) => {
//     console.log(err, res);
//     client.end();
// });

// client.query(querySpecifics, (err, res) => {
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
//var thisQuery = "DROP TABLE Locationsshorts;";
//var thisQuery = "DROP TABLE group_specifics;";
//var thisQuery = "DROP TABLE time;";
// var thisQuery = "DROP TABLE temploc;";

// client.query(thisQuery, (err, res) => {
//     console.log(err, res);
//     client.end();
// });



////INSERT
////These lines fetch the data from the .json and then inserts them into the rows of the respective tables. -> INSERT INTO "" VALUES

// var addressesForDb = fs.readFileSync("geo_06.json");
// addressesForDb = JSON.parse(addressesForDb);

// async.eachSeries(addressesForDb, function(value, callback) {
//     const client = new Client(db_credentials);
//     client.connect();
    
    
//     var thisQuery = "INSERT INTO temploc VALUES (E'" + value.streetaddress.StreetAddress + "','" + value.streetaddress.City + "', '" + value.streetaddress.State + "'," + value.latitude + ", " + value.longitude + ");";

//     client.query(thisQuery, (err, res) => {
//         console.log(err, res);
//         client.end();
//     });
//     setTimeout(callback, 1000); 
// });








//CHECK

//CHECK

// Sample SQL statement to query the entire contents of a table -> SELECT * FROM
var thisQuery = "SELECT * FROM temploc;";

client.query(thisQuery, (err, res) => {
    console.log(err, res.rows);
    client.end();
});
```

––––––––––––––––––––––––––

**time spent**
ca. 1 day à 4 hours 
**learnings**
Its interesting to think "in" relational databases, how to structure/organise data.  -> Learning
Hypothesis: Every classification needs a place(row) to put the "garbage", which cannot be classified -> Learning
I had severals problems to insert data into the table/rows. How to skip a row for example? -> Follow up
**illustrative image**
original image by: unspecified, 
used for BYTE magazine, 
november 1981, volume 8, number 11, 
found here: https://archive.org/details/byte-magazine-1981-11

 
