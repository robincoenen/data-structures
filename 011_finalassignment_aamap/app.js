const dotenv = require('dotenv'); 
dotenv.config();

var express = require('express'), // npm install express
    app = express();

const { Pool } = require('pg');
var AWS = require('aws-sdk');
const moment = require('moment-timezone');

const { Client } = require('pg');

const handlebars = require('handlebars');
const fs = require('fs');

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'robincoenen';
db_credentials.host = 'database-structures.coqr4cljipbf.us-east-2.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;       
db_credentials.port = 5432;
//dotenv.config({path: '/home/ec2-user/environment/.env'});

app.get('/', function(req, res) {
   res.send(`<h1>Data Structures</h1>
            <ul>
            <li> <a href= /aaData> Aa Data </a></li>
            <li> <a href= /processblog> Process Blog </a></li>
            <li> <a href= /sensordata> Sensor Data </a></li>
            </ul>`);
});



var hx = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AA Meetings</title>
  <meta name="description" content="Meetings of AA in Manhattan">
  <meta name="author" content="AA">
  <link rel="stylesheet" href="css/styles.css?v=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
       integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
       crossorigin=""/>
</head>
<body>
<div id="mapid"><div id="headline"> <h1>Anonymous alcoholics in New York: Show me Meetings on <u> Weekday </u> at <u> this time </u> </h1></div></div>

<script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
   integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
   crossorigin=""></script>
  <script>
  var data = 
  `;
  
var jx = `;
    var mymap = L.map('mapid').setView([40.734636,-73.994997], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoidmlzLWludCIsImEiOiJjanI2NWppYTIwNGR2NDRwaGI1N2xzZXBxIn0.dmZ6dkYdM95wixqH0mQb_w'
    }).addTo(mymap);
L.control.zoom   ({
     position:'topright'
}).addTo(mymap);

for (var i=0; i<data.length; i++) {
        L.marker( [data[i].lat, data[i].long] ).bindPopup(JSON.stringify(data[i].meetings)).addTo(mymap);
    }
    </script>
    </body>
    </html>`;

app.get('/', function(req, res) {
    res.send(`<h3>Code demo site</h3>`);
}); 

// respond to requests for /aa
app.get('/aaData', function(req, res) {

    //var now = moment.tz(Date.now(), "America/New_York"); 
    //var dayy = now.day().toString(); 
    //var hourr = now.hour().toString(); 

    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);
    
    // SQL query 
    var thisQuery = `SELECT lat, long, json_agg(json_build_object('buildingName', buildingName, 'zipCode', zipCode)) as meetings 
    FROM meetData GROUP BY lat,long;`;
    console.log(thisQuery);

    // var thisQuery = `SELECT lat, lon, json_agg(json_build_object('loc', mtglocation, 'address', mtgaddress, 'time', tim, 'name', mtgname, 'day', day, 'types', types, 'shour', shour)) as meetings
    //              FROM meetData 
    //              WHERE day = ` + dayy + 'and shour >= ' + hourr + 
    //              `GROUP BY lat, lon
    //              ;`;



    client.query(thisQuery, (qerr, qres) => {
        if (qerr) { throw qerr }
        
        else {
            var resp = hx + JSON.stringify(qres.rows) + jx;
            res.send(resp);
            client.end();
            console.log('AA) responded to request for aa meeting data');
        }
    });
});

// app.get('/temperature', function(req, res) {
//     res.send(`<h3>Code demo Wednesday, December 4</h3>
//     <h4>Sample SQL Query:</h4>
//     <p>SELECT EXTRACT(DAY FROM sensorTime) as sensorday, <br>
//              AVG(sensorValue::int) as num_obs <br>
//              FROM sensorData <br>
//              GROUP BY sensorday <br>
//              ORDER BY sensorday;</p>`);
// }); 

// app.get('/processblog', function(req, res) {
//     res.send('<h3>Code demo Wednesday, December 11</h3>');
// }); 

// serve static files in /public
app.use(express.static('public'));




// NOSQL BLOG
AWS.config = new AWS.Config();
AWS.config.region = "us-east-2";

app.get('/processblog', function(req, res1) {
    var blogbars = {};
    var dynamodb = new AWS.DynamoDB();


var gets = {
    TableName : "robin",

    KeyConditionExpression: "category = :topicName and #dt between :minDate and :maxDate", // the query expression
    ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
        "#dt" : "date"
    },
    ExpressionAttributeValues: { // the query values
        ":topicName": {S: "Search Engines"},
        ":minDate": {S: new Date("2019-01-01").toISOString()},
        ":maxDate": {S: new Date("2019-12-30").toISOString()}
    }
};

dynamodb.query(gets, function(err, data2) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        
        
         fs.readFile('./pbl.hbs', 'utf8', (error, data) => {
                var handlezz = handlebars.compile(data)
                //console.log(templateVariables)
                blogbars.blogPost = data2.Items
                console.log(data)
                var html = handlezz(blogbars)
                res1.send(html)
        
        
       })
         
        // console.log("Query succeeded.");
        // res1.send(JSON.stringify(data.Items, null, 4));
        // .forEach(function(item) {
        //   console.log("***** ***** ***** ***** ***** \n", item);
        // });
      }
    });

});

const client = new Client(db_credentials);
client.connect();
let sensorcontent = [];

var thistempQuery = "SELECT * FROM tempsensor;"; // print all values

client.query(thistempQuery, (err, res) => {
    console.log(err);
    sensorcontent.push(res.rows);
    client.end();

///console.log(sensorcontent);


});

app.get('/sensordata', function(req, res) {
    res.send(sensorcontent);    
});


app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

// listen on port 8080
app.listen(8080, function() {
    console.log('Server listening...');
});