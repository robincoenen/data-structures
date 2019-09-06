
var fs = require('fs');
var cheerio = require('cheerio');

// load the searched content file into a variable, `content`
// this is the file that we created in the starter code from last week
var content = fs.readFileSync('/home/ec2-user/environment/data-structures/01_week01/data/06.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);


// print (to the console) adresses
 $('tr tr tr').each(function(i, elem) {
            $(this).find('div').remove().html();
            $(this).find('br').remove().html();
            $(this).find('span').remove().html();
                 console.log($(elem).children().first().text().trim());
});




// write the adresses to a text file
var result = ''; // this variable will hold the lines of text

$('tr tr tr').each(function(i, elem) {
    result += ($(elem).children().first().text().trim()) + '\n';
});

fs.writeFileSync('new.txt', result);
