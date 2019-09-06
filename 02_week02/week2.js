//strategy 1 : target always the first td of a tr
//strategy 2: target the horizontal line and select elements from there


var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
var content = fs.readFileSync('/home/ec2-user/environment/data-structures/01_week01/data/06.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);


// print (to the console) adresses
    $('tr tr tr').each(function(i, elem) {
                 console.log($(elem).children().first().text().trim());
});

// write the adresses to a text file
var result = ''; // this variable will hold the lines of text

$('tr tr tr').each(function(i, elem) {
    result += ($(elem).children().first().text().trim()) + '\n';
});

fs.writeFileSync('new.txt', result);
