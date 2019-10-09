
var blogEntries = [];
var async = require('async');


class BlogEntry {
  constructor(category, date, title, image, annotations) {
    this.category = {};
    this.category.S = category;
    this.date = {}; 
    this.date.S = new Date(date).toISOString();
    this.title = {};
    this.title.S = title;
    this.image = {};
    this.image.S = image;
    this.annotations = {};
    this.annotations.S = annotations;
        this.month = {};
        this.month.N = new Date(date).getMonth().toString();
}}

blogEntries.push(new BlogEntry( 'structures', 'August 28 2019', 
'HELLO WORLD TITLE', 'https://github.com/robincoenen/data-structures/blob/master/01_week01/illustrative_image.png', 
'look this annotation up'));

blogEntries.push(new BlogEntry('media', 'August 29 2019', 
'HELLO WORLD TITLE', 'https://github.com/robincoenen/data-structures/blob/master/01_week01/illustrative_image.png',
'look this annotation up'));

blogEntries.push(new BlogEntry('cultural', 'August 30 2019', 
'HELLO WORLD TITLE', 'https://github.com/robincoenen/data-structures/blob/master/01_week01/illustrative_image.png', 'Hello Subtitle 3',
'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua',
'Timespent around 5h',
'five learnings',
'this is a credit',
'look this annotation up'));

// console.log(blogEntries);

// var AWS = require('aws-sdk');
// AWS.config = new AWS.Config();
// AWS.config.region = "us-east-2";

// var dynamodb = new AWS.DynamoDB();

// var params = {};


// var i = 0 ;
//     for (i=0; i < blogEntries.length; i++){
//         params.Item += blogEntries[i];  
//         }
// params.TableName = "robin";



// async.eachSeries(blogEntries, function(value, callback) {
//     params.Item = value;
//     dynamodb.putItem(params, function (err, data) {
//         if (err) console.log(err, err.stack); // an error occurred
//         else console.log(data); // successful response
//     });
    
// setTimeout(callback, 2000);
// }); 

var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-2";

var dynamodb = new AWS.DynamoDB();

var gets = {
    TableName : "robin",
    KeyConditionExpression: "category = :topicName and #dt between :minDate and :maxDate", // the query expression
    ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
        "#dt" : "date"
    },
    ExpressionAttributeValues: { // the query values
        ":topicName": {S: "structures"},
        ":minDate": {S: new Date("2019-08-25").toISOString()},
        ":maxDate": {S: new Date("2019-08-30").toISOString()}
    }
};

dynamodb.query(gets, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log("***** ***** ***** ***** ***** \n", item);
        });
    }
});