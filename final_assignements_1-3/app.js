
// Preliminary elements for different libraries and approaches
//dotenv for hiding crucial information
//handlebars for trasnforming data into html content
//moment.js for time transformation


const dotenv = require('dotenv'); 
dotenv.config();

var htmlStringify = require('html-stringify');

var express = require('express'), // npm install express
    app = express();

const { Pool } = require('pg');
var AWS = require('aws-sdk');
const moment = require('moment-timezone');

const { Client } = require('pg');

const handlebars = require('handlebars');
const fs = require('fs');

AWS.config = new AWS.Config();
AWS.config.region = "us-east-2";

var dynamodb = new AWS.DynamoDB();

//Using moment js to create a framework of time on the map. Only the meetings in the next 12 hours will be shown 

var now = moment.tz(Date.now(), "America/New_York");
var dayy = now.day();
var today_1 = now.format('dddd');
var today = today_1 + 's';


    var hourr = now.hour().toString();
    var min = now.minute().toString();
    
    var ampm = 'AM';
    if (hourr > 12) {
        hourr = hourr - 12;
        ampm = 'PM'
    }

    var current_time = hourr + ':' + min  
    

console.log(today);
console.log(current_time)

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
            <li> <a href= /a_blog.html> Process Blog </a></li>
            <li> <a href= /b_sensor.html> Sensor Data </a></li>
            </ul>`);
});

//AA MAP
//Loading content into Maps

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
<div id="mapid"><div id="headline"> <h1>Anonymous alcoholics Emergency Map: All meetings of today </h1></div></div>

<script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
   integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
   crossorigin=""></script>
  <script>
  var data = 
  `;
  
var jx = `;
    var mymap = L.map('mapid').setView([40.734636,-73.994997], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/vis-int/ck3z5aemt04tu1cp7rxqee0mx/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoidmlzLWludCIsImEiOiJjanI2NWppYTIwNGR2NDRwaGI1N2xzZXBxIn0.dmZ6dkYdM95wixqH0mQb_w'
    }).addTo(mymap);
L.control.zoom   ({
     position:'topright'
}).addTo(mymap);

    for (var i=0; i<data.length; i++) {
    
    
            var test = JSON.stringify(data[i].meetings).replace('[{"', "");
            console.log(test);
    
        L.circle( [data[i].lat, data[i].long], {radius: 50} ).bindPopup(JSON.stringify(data[i].meetings)
        .replace('[{"', "<h1><em>")
        .replace('":"', "</em> ")
        .replace('","a":"', ", ")
        .replace('","b":"', ", ")
        .replace('","c":"', ", ")
        .replace('","Ti', "<br><em>Ti")
        .replace('me":"', "</em>me ")
        .replace('","fr', ", fr")
        .replace('om":"', "om ")
        .replace('","t', ", t")
        .replace('o":"', "o ")
        .replace('","":"', "")
        .replace('"},', "<br>")
        .replace('{"Ad', "<em>Ad")
        
        .replace('":"', "</em> ")
        .replace('","a":"', ", ")
        .replace('","b":"', ", ")
        .replace('","c":"', ", ")
        .replace('","Ti', "<br><em>Ti")
        .replace('me":"', "</em>me ")
        .replace('","fr', ", fr")
        .replace('om":"', "om ")
        .replace('","t', ", t")
        .replace('o":"', "o ")
        .replace('","":"', "")
        .replace('"},', "<br>")
        .replace('{"Ad', "<em>Ad")
        
        .replace('":"', "</em> ")
        .replace('","a":"', ", ")
        .replace('","b":"', ", ")
        .replace('","c":"', ", ")
        .replace('","Ti', "<br><em>Ti")
        .replace('me":"', "</em>me ")
        .replace('","fr', ", fr")
        .replace('om":"', "om ")
        .replace('","t', ", t")
        .replace('o":"', "o ")
        .replace('","":"', "")
        .replace('"},', "<br>")
        .replace('{"Ad', "<em>Ad")
        
        .replace('":"', "</em> ")
        .replace('","a":"', ", ")
        .replace('","b":"', ", ")
        .replace('","c":"', ", ")
        .replace('","Ti', "<br><em>Ti")
        .replace('me":"', "</em>me ")
        .replace('","fr', ", fr")
        .replace('om":"', "om ")
        .replace('","t', ", t")
        .replace('o":"', "o ")
        .replace('","":"', "")
        .replace('"},', "<br>")
        .replace('{"Ad', "<em>Ad")
        
        .replace('":"', "</em> ")
        .replace('","a":"', ", ")
        .replace('","b":"', ", ")
        .replace('","c":"', ", ")
        .replace('","Ti', "<br><em>Ti")
        .replace('me":"', "</em>me ")
        .replace('","fr', ", fr")
        .replace('om":"', "om ")
        .replace('","t', ", t")
        .replace('o":"', "o ")
        .replace('","":"', "")
        .replace('"},', "<br>")
        .replace('{"Ad', "<em>Ad")
        
        .replace('":"', "</em> ")
        .replace('","a":"', ", ")
        .replace('","b":"', ", ")
        .replace('","c":"', ", ")
        .replace('","Ti', "<br><em>Ti")
        .replace('me":"', "</em>me ")
        .replace('","fr', ", fr")
        .replace('om":"', "om ")
        .replace('","t', ", t")
        .replace('o":"', "o ")
        .replace('","":"', "")
        .replace('"},', "<br>")
        .replace('{"Ad', "<em>Ad")
        
        .replace('":"', "</em> ")
        .replace('","a":"', ", ")
        .replace('","b":"', ", ")
        .replace('","c":"', ", ")
        .replace('","Ti', "<br><em>Ti")
        .replace('me":"', "</em>me ")
        .replace('","fr', ", fr")
        .replace('om":"', "om ")
        .replace('","t', ", t")
        .replace('o":"', "o ")
        .replace('","":"', "")
        .replace('"},', "<br>")
        .replace('{"Ad', "<em>Ad")
        
        .replace('":"', "</em> ")
        .replace('","a":"', ", ")
        .replace('","b":"', ", ")
        .replace('","c":"', ", ")
        .replace('","Ti', "<br><em>Ti")
        .replace('me":"', "</em>me ")
        .replace('","fr', ", fr")
        .replace('om":"', "om ")
        .replace('","t', ", t")
        .replace('o":"', "o ")
        .replace('","":"', "")
        .replace('"},', "<br>")
        .replace('{"Ad', "<em>Ad")
        
        .replace('":"', "</em> ")
        .replace('","a":"', ", ")
        .replace('","b":"', ", ")
        .replace('","c":"', ", ")
        .replace('","Ti', "<br><em>Ti")
        .replace('me":"', "</em>me ")
        .replace('","fr', ", fr")
        .replace('om":"', "om ")
        .replace('","t', ", t")
        .replace('o":"', "o ")
        .replace('","":"', "")
        .replace('"},', "<br>")
        .replace('{"Ad', "<em>Ad")
        
                .replace('":"', "</em> ")
        .replace('","a":"', ", ")
        .replace('","b":"', ", ")
        .replace('","c":"', ", ")
        .replace('","Ti', "<br><em>Ti")
        .replace('me":"', "</em>me ")
        .replace('","fr', ", fr")
        .replace('om":"', "om ")
        .replace('","t', ", t")
        .replace('o":"', "o ")
        .replace('","":"', "")
        .replace('"},', "<br>")
        .replace('{"Ad', "<em>Ad")
        
                .replace('":"', "</em> ")
        .replace('","a":"', ", ")
        .replace('","b":"', ", ")
        .replace('","c":"', ", ")
        .replace('","Ti', "<br><em>Ti")
        .replace('me":"', "</em>me ")
        .replace('","fr', ", fr")
        .replace('om":"', "om ")
        .replace('","t', ", t")
        .replace('o":"', "o ")
        .replace('","":"', "")
        .replace('"},', "<br>")
        .replace('{"Ad', "<em>Ad")
        
                .replace('":"', "</em> ")
        .replace('","a":"', ", ")
        .replace('","b":"', ", ")
        .replace('","c":"', ", ")
        .replace('","Ti', "<br><em>Ti")
        .replace('me":"', "</em>me ")
        .replace('","fr', ", fr")
        .replace('om":"', "om ")
        .replace('","t', ", t")
        .replace('o":"', "o ")
        .replace('","":"', "")
        .replace('"},', "<br>")
        .replace('{"Ad', "<em>Ad")
        
                .replace('":"', "</em> ")
        .replace('","a":"', ", ")
        .replace('","b":"', ", ")
        .replace('","c":"', ", ")
        .replace('","Ti', "<br><em>Ti")
        .replace('me":"', "</em>me ")
        .replace('","fr', ", fr")
        .replace('om":"', "om ")
        .replace('","t', ", t")
        .replace('o":"', "o ")
        .replace('","":"', "")
        .replace('"},', "<br>")
        .replace('{"Ad', "<em>Ad")
        
                .replace('":"', "</em> ")
        .replace('","a":"', ", ")
        .replace('","b":"', ", ")
        .replace('","c":"', ", ")
        .replace('","Ti', "<br><em>Ti")
        .replace('me":"', "</em>me ")
        .replace('","fr', ", fr")
        .replace('om":"', "om ")
        .replace('","t', ", t")
        .replace('o":"', "o ")
        .replace('","":"', "")
        .replace('"},', "<br>")
        .replace('{"Ad', "<em>Ad")
        
                        .replace('":"', "</em> ")
        .replace('","a":"', ", ")
        .replace('","b":"', ", ")
        .replace('","c":"', ", ")
        .replace('","Ti', "<br><em>Ti")
        .replace('me":"', "</em>me ")
        .replace('","fr', ", fr")
        .replace('om":"', "om ")
        .replace('","t', ", t")
        .replace('o":"', "o ")
        .replace('","":"', "")
        .replace('"},', "<br>")
        .replace('{"Ad', "<em>Ad")
        
                        .replace('":"', "</em> ")
        .replace('","a":"', ", ")
        .replace('","b":"', ", ")
        .replace('","c":"', ", ")
        .replace('","Ti', "<br><em>Ti")
        .replace('me":"', "</em>me ")
        .replace('","fr', ", fr")
        .replace('om":"', "om ")
        .replace('","t', ", t")
        .replace('o":"', "o ")
        .replace('","":"', "")
        .replace('"},', "<br>")
        .replace('{"Ad', "<em>Ad")
        
                        .replace('":"', "</em> ")
        .replace('","a":"', ", ")
        .replace('","b":"', ", ")
        .replace('","c":"', ", ")
        .replace('","Ti', "<br><em>Ti")
        .replace('me":"', "</em>me ")
        .replace('","fr', ", fr")
        .replace('om":"', "om ")
        .replace('","t', ", t")
        .replace('o":"', "o ")
        .replace('","":"', "")
        .replace('"},', "<br>")
        .replace('{"Ad', "<em>Ad")
        
                        .replace('":"', "</em> ")
        .replace('","a":"', ", ")
        .replace('","b":"', ", ")
        .replace('","c":"', ", ")
        .replace('","Ti', "<br><em>Ti")
        .replace('me":"', "</em>me ")
        .replace('","fr', ", fr")
        .replace('om":"', "om ")
        .replace('","t', ", t")
        .replace('o":"', "o ")
        .replace('","":"', "")
        .replace('"},', "<br>")
        .replace('{"Ad', "<em>Ad")
        
                        .replace('":"', "</em> ")
        .replace('","a":"', ", ")
        .replace('","b":"', ", ")
        .replace('","c":"', ", ")
        .replace('","Ti', "<br><em>Ti")
        .replace('me":"', "</em>me ")
        .replace('","fr', ", fr")
        .replace('om":"', "om ")
        .replace('","t', ", t")
        .replace('o":"', "o ")
        .replace('","":"', "")
        .replace('"},', "<br>")
        .replace('{"Ad', "<em>Ad")
        
                        .replace('":"', "</em> ")
        .replace('","a":"', ", ")
        .replace('","b":"', ", ")
        .replace('","c":"', ", ")
        .replace('","Ti', "<br><em>Ti")
        .replace('me":"', "</em>me ")
        .replace('","fr', ", fr")
        .replace('om":"', "om ")
        .replace('","t', ", t")
        .replace('o":"', "o ")
        .replace('","":"', "")
        .replace('"},', "<br>")
        .replace('{"Ad', "<em>Ad")
        
                                .replace('":"', "</em> ")
        .replace('","a":"', ", ")
        .replace('","b":"', ", ")
        .replace('","c":"', ", ")
        .replace('","Ti', "<br><em>Ti")
        .replace('me":"', "</em>me ")
        .replace('","fr', ", fr")
        .replace('om":"', "om ")
        .replace('","t', ", t")
        .replace('o":"', "o ")
        .replace('","":"', "")
        .replace('"},', "<br>")
        .replace('{"Ad', "<em>Ad")
        
        
                                .replace('":"', "</em> ")
        .replace('","a":"', ", ")
        .replace('","b":"', ", ")
        .replace('","c":"', ", ")
        .replace('","Ti', "<br><em>Ti")
        .replace('me":"', "</em>me ")
        .replace('","fr', ", fr")
        .replace('om":"', "om ")
        .replace('","t', ", t")
        .replace('o":"', "o ")
        .replace('","":"', "")
        .replace('"},', "<br>")
        .replace('{"Ad', "<em>Ad")
        
        
                                .replace('":"', "</em> ")
        .replace('","a":"', ", ")
        .replace('","b":"', ", ")
        .replace('","c":"', ", ")
        .replace('","Ti', "<br><em>Ti")
        .replace('me":"', "</em>me ")
        .replace('","fr', ", fr")
        .replace('om":"', "om ")
        .replace('","t', ", t")
        .replace('o":"', "o ")
        .replace('","":"', "")
        .replace('"},', "<br>")
        .replace('{"Ad', "<em>Ad")
        
        
                                .replace('":"', "</em> ")
        .replace('","a":"', ", ")
        .replace('","b":"', ", ")
        .replace('","c":"', ", ")
        .replace('","Ti', "<br><em>Ti")
        .replace('me":"', "</em>me ")
        .replace('","fr', ", fr")
        .replace('om":"', "om ")
        .replace('","t', ", t")
        .replace('o":"', "o ")
        .replace('","":"', "")
        .replace('"},', "<br>")
        .replace('{"Ad', "<em>Ad")
        
        
        .replace('"}]', "</h1>")
        
        )
        .addTo(mymap);
    }
    </script>
    </body>
    </html>`;

app.get('/', function(req, res) {
    res.send(`<h3>Code demo site</h3>`);
}); 

// respond to requests for /aaData
app.get('/aaData', function(req, res) {

    //var now = moment.tz(Date.now(), "America/New_York"); 
    //var dayy = now.day().toString(); 
    //var hourr = now.hour().toString(); 

    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);
    
    // SQL query 
    
                    
        var thisQuery = `WITH myFinal AS (
                        SELECT *
                        FROM timeDates
                        INNER JOIN meetData
                        ON timeDates.id = meetData.id)
                        

                        SELECT lat, long, json_agg(json_build_object(  'Adress', streetAddress, 'a', buildingName, 'b', city, 'c', zipCode,  'Time', day, 'from', startTime, 'to', endTime, '', time)) as meetings FROM myFinal
                       WHERE day = '`+ today + "' and startTime >= '" + current_time +
                                "' and time = '" + ampm +
                        `'
                        GROUP BY lat, long;`;
                        
                        
    console.log(thisQuery);
    

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


// serve static files in /public
app.use(express.static('public'));




// NOSQL BLOG
//Query process blog by Connect to dynamodb
app.get('/processblog', async function (req, res) {
    if (req.query == {}){
        res.send(await processBlog());
    } else {
         res.send(await processBlog(req.query.start,req.query.end,req.query.category));
    }
});

// Create a function to query data by categories 

 function processBlog(minDate, maxDate, category){
    return new Promise(resolve => {
        var output = {};
        
        minDate = minDate || "November 30, 2019"
        maxDate = maxDate || "August 2, 2019"; 
        category = category || 'all';

        output.blogpost = [];
        
        if (category != 'all'){
            var params = {
                TableName : "robin",
                KeyConditionExpression: "category = :categoryName and #dt between :minDate and :maxDate",
                ExpressionAttributeNames: {
                    "#dt" : "date"
                 },
                 
                ExpressionAttributeValues: { // the query values
                    ":categoryName": {S: category},
                    ":minDate": {S: new Date(minDate).toLocaleString()},
                    ":maxDate": {S: new Date(maxDate).toLocaleString()},
                }
            };
            
            dynamodb.query(params, onScan)

        } else {
            var params = {
                TableName: "robin",
                ProjectionExpression: "annotations, category, image, title",
                FilterExpression: "#dt between :minDate and :maxDate",
                ExpressionAttributeNames: {
                    "#dt" : "date"
                 },
                 ExpressionAttributeValues: { // the query values
                    ":minDate": {S: new Date(minDate).toLocaleString()},
                    ":maxDate": {S: new Date(maxDate).toLocaleString()}
                }
            };
            
            dynamodb.scan(params, onScan)

        }
        
        function onScan(err, data) {
            if (err) {
                console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                throw (err);
            } else {

                console.log("Scan succeeded.");
                data.Items.forEach(function(item) {
                    console.log(item)
                    console.log("***** ***** ***** ***** ***** \n", item);

                    output.blogpost.push({'title':item.title.S, 'annotations':item.annotations.S, 'category':item.category.S,'image':item.image.S});
                });
                console.log(output.blogpost);
    
                fs.readFile('a_blog-handlebars.html', 'utf8', (error, data) => {
                    var template = handlebars.compile(data);
                    var html = template(output);
                    resolve(html);
                });
            }
        };
    });
 }
 
    



///SENSORBLOG
const client = new Client(db_credentials);
client.connect();


//sensor data page
app.get('/b_sensor', function (req, res1) {


    // Connect to the AWS RDS Postgres database
    const client = new Client(db_credentials);
    client.connect();

    // Sample SQL statement to query the entire contents of a table:
    var secondQuery = "SELECT * FROM tempsensor;";

    console.log('test');

    client.query(secondQuery, (err, res) => {
        if (err) { throw err }
        else {
            //console.table(res.rows);

            var data = JSON.stringify(res.rows)

            res1.send(res.rows)


        }
    });

});


// listen on port 8080
app.listen(8080, function() {
    console.log('Server listening...');
});