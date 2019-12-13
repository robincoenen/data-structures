var AWS = require("aws-sdk");
AWS.config = new AWS.Config();
AWS.config.region = "us-east-2";

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "robin",
    ProjectionExpression: "title, annotations",

};

console.log("Scanning Movies table.");
docClient.scan(params, onScan);

function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        // print all the movies
        console.log("Scan succeeded.");
        data.Items.forEach(function(movie) {
           console.log(
                movie.annotations + ": ",
                movie.title, "- rating:");
        });

        // continue scanning if we have more movies, because
        // scan can retrieve a maximum of 1MB of data
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }
    }
}



// <div id="sec">
//     <h5><b>{{category.S}}</b>
//     {{date.S}}</h5>
// </div>

// <div id="third"><h1>{{title.S}}</h1></div>
// <div id="fourth"><h2>{{annotations.S}}</h2></div>
// <div id="fifth"><img src="{{image.S}}"/></div>
// <br>




// AWS.config = new AWS.Config();
// AWS.config.region = "us-east-2";

// app.get('/processblog', function(req, res1) {
//     var blogbars = {};
//     var dynamodb = new AWS.DynamoDB();


// var gets = {
//     TableName : "robin",

//     KeyConditionExpression: "category = :topicName and #dt between :minDate and :maxDate", // the query expression
//     ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
//         "#dt" : "date"
//     },
//     ExpressionAttributeValues: { // the query values
//         ":topicName": {S: "Search Engines"},
//         ":minDate": {S: new Date("2019-01-01").toISOString()},
//         ":maxDate": {S: new Date("2019-12-30").toISOString()}
//     }
// };