
var blogEntries = [];

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

//console.log(blogEntries);

var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-2";

var dynamodb = new AWS.DynamoDB();

var params = {};
params.Item = blogEntries[0]; 
params.TableName = "process";


dynamodb.putItem(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});