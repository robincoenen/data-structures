const async  = require('async')

var a = [{"name": "a", "values": [[1,2,3]]}, {"name": "b" , "values": [[4,5,6]]}, {"name": "c", "values":[[7, 8, 9]]}];

async.eachSeries(a, function(value1, callback1){
    async.eachSeries(value1["values"][0], function(value2, callback2){
        console.log(value1["name"]);
        console.log(value2);
        callback2();
    });
callback1;
    
})

///console.log(a);
