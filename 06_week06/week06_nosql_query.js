
var blogEntries = [];
var async = require('async');


class BlogEntry {
  constructor(primaryKey, date, title, image, subtitle, text, timespent, learning, credits, annotations) {
    this.pk = {};
    this.pk.S = primaryKey;
    this.date = {}; 
    this.date.S = date;
    this.title = {};
    this.title.S = title;
    this.image = {};
    this.image.S = image;
    this.subtitle = {};
    this.subtitle.S = subtitle;
    this.text = {};
    this.text.S = text;
    this.timespent = {};
    this.timespent.S = timespent;
    this.learning = {};
    this.learning.S = learning;
    this.credits = {};
    this.credits.S = credits;
     this.annotations = {};
    this.annotations.S = annotations;
    }
   
}

blogEntries.push(new BlogEntry("0", 'August 28 2019', 
'HELLO WORLD TITLE', 'https://github.com/robincoenen/data-structures/blob/master/01_week01/illustrative_image.png', 'Hello Subtitle',
'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua',
'Timespent around 5h',
'five learnings',
'this is a credit',
'look this annotation up'));

blogEntries.push(new BlogEntry("1", 'August 29 2019', 
'HELLO WORLD TITLE', 'https://github.com/robincoenen/data-structures/blob/master/01_week01/illustrative_image.png', 'Hello Subtitle 2',
'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua',
'Timespent around 5h',
'five learnings',
'this is a credit',
'look this annotation up'));

blogEntries.push(new BlogEntry("2", 'August 30 2019', 
'HELLO WORLD TITLE', 'https://github.com/robincoenen/data-structures/blob/master/01_week01/illustrative_image.png', 'Hello Subtitle 3',
'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua',
'Timespent around 5h',
'five learnings',
'this is a credit',
'look this annotation up'));

//console.log(blogEntries);

var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-2";

var dynamodb = new AWS.DynamoDB();

var params = {};
// params.Item = blogEntries[0]; 


var i = 0 ;
    for (i=0; i < blogEntries.length; i++){
        params.Item += blogEntries[i];  
        }
params.TableName = "process";



async.eachSeries(blogEntries, function(value, callback) {
    params.Item = value;
    dynamodb.putItem(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data); // successful response
    });
    
setTimeout(callback, 2000);
}); 


var gets = {
    TableName : "process",
    KeyConditionExpression: "pk and #dt = :dateName between :minDate and :maxDate", // the query expression
    ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
        "#dt" : "date"
    },
    ExpressionAttributeValues: { // the query values
        ":pkName": {N: "1"},
        ":minDate": {S: "August 29, 2019"},
        ":maxDate": {S: "August 31, 2019"}
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