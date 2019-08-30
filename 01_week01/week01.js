var request = require('request');
var fs = require('fs');

//* adress from where to take 
var take = 'https://parsons.nyc/aa/m'

//* adress where to make 
var make = '/home/ec2-user/environment/01_week01/data/'

//* quantity of takes and makes
var it =['01','02','03','04','05','06','07','08','09','10'];

//* loop
for  (var i=0; i<10; i++)  {
    
    //* creating new variables with keywords var and let; using let prevents the bug in the loop 
    //* (source: 
    //*https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures  
    //* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let )
    //* adding quantity and file suffix
    var first = take + it[i] + '.html';
    let then = make + it[i] + '.txt';
     //* using new variables in request
    request(first, function(error, response, body){
        if (!error && response.statusCode == 200) {
             fs.writeFileSync(then, body);
        }
        else {console.log("Request failed!")}
});

}