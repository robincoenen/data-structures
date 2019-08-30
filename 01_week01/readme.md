Week 1 — Request and Write
==========================

![alt text](./illustrative_image.png)


## Given are 10 html adresses/files, which needed to be 'accessed' through node.js with a request module. After requesting and accessing the (content of the) html files the content was written with a writeFileSync module in 10 new .txt files.


The developed solutions takes advantage of the naming of the 10 given different html files (numbered consecutively) and creates variables accordingly.
A loop iterates through the different numbers when executing the request and write module of the function. Using a let variable (and its local nature) inside the loop prevents a bug which normally occurs due to the asynchronous nature of javascript.
Step by step comments in code:

```
var request = require('request');
var fs = require('fs');
```

_//* adress from where to take_ 
```
var take = 'https://parsons.nyc/aa/m'
```

_//* adress where to make_ 
```
var make = '/home/ec2-user/environment/01_week01/data/'
```

_//* quantity/number suffix of takes and makes_
```
var it =['01','02','03','04','05','06','07','08','09','10'];
```

_//* loop_
```
for  (var i=0; i<10; i++)  {
```
    
    _//* creating new variables with keywords var and let; using let prevents the bug in the loop_
    _//* (source:_ 
    _//* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures_ 
    _//* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let )_
    _//* adding quantity and file suffix_
    ```
    var first = take + it[i] + '.html';
    let then = make + it[i] + '.txt';
    ```
    
    _//* using new variables in request_
   ``` request(first, function(error, response, body){
        if (!error && response.statusCode == 200) {
             fs.writeFileSync(then, body);
        }
        else {console.log("Request failed!")}
});

}
```

––––––––––––––––––––––––––

**time spent**
ca. 3 days à 4 hours. 
**learnings**
extensive google research (some finding help, some confuses even more), 
logical thinking simplifies code and helps, 
nature of let and var keywords, 
general structure of functions.
tried to use async/await but were not able to work it out -> follow-up
**illustrative image**
Extract, original made by robert tinney, 
used for BYTE magazine, 
october 1980, volume 5, number 10, 
found here: https://archive.org/details/byte-magazine-1980-10