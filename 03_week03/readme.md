Week 3 — Get Geocodes
==========================

![alt text](./illustrative_image_3.png)


## Given are .txt files containing geographical adresses (among other information) marked up in html. The files need to be accessed and parsed with a cheerio module, in order to extract only the adresses. As the html structure is somewhat chaotic, key challenge is to target the adresses as "close" as possible and then delete not needed data. 


First important step before parsing is the use of the "inspect" mode through a browser. It is an immense help to gain knowledge about the structure of the html. 
This knowledge helps in the second step, when targeting the needed data as close as possible and removing needless data as much as possible. 
The last steps deals with "cleaning" the details of the extracted data by using javascript string methods. 
Step by step comments in code: 

```
var fs = require('fs');
var cheerio = require('cheerio');


// WRITING TO CONSOLE

// load the searched content file into a variable, `content`
var content = fs.readFileSync('/home/ec2-user/environment/data-structures/01_week01/data/06.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

// using the inspector shows the nested structure of file;"tr tr tr" is targeting the closest possible 
// inspector also shows that each "tr" contains three "td" elements. the first "td" element is always the one with the wanted data 
 $('tr tr tr').each(function(i, elem) {
// "remove" removes elements which are targeted through its html attributes/classes etc.  
            $(this).find('div').remove().html();
            $(this).find('br').remove().html();
            $(this).find('b').remove().html();
            $(this).find('span').remove().html();
// keyword "children" and "first" targets only the first "td" element of all three nested inside "tr"
            console.log($(elem).children().first().text().trim()
// these lines clean the code, the order of the lines is important,
//https://regexr.com helps for targeting/regular expressions
//the aim is that each logical element of the adress is seperated by a comma. that will probably help later to target all elements of each adress
            .replace(/\s\s\s\s\s\s\s\s\s\s\s\s/g,'')
            .replace(/\s\s\s\s/g,',')
            .replace(/\,\s+\s+/g,',')
            .replace(/\,\,\,/g,',')
            .replace(/\,/g,', ')
            .replace(/\,\s\s/g,', ')
            .replace(/\s\N\Y/g,', NY ')
            .replace(/\N\Y\s\s/g,'NY ')
            .replace(/\,\,\s\N\Y/g,', NY'));
});



// WRITING TO A .TXT FILE (same approach as above)

// write the adresses to a text file
var result = ''; // this variable will hold the lines of text

$('tr tr tr').each(function(i, elem) {
          $(this).find('div').remove().html();
            $(this).find('br').remove().html();
            $(this).find('b').remove().html();
            $(this).find('span').remove().html();
    result += ($(elem).children().first().text().trim()
            .replace(/\s\s\s\s\s\s\s\s\s\s\s\s/g,'')
            .replace(/\s\s\s\s/g,',')
            .replace(/\,\s+\s+/g,',')
            .replace(/\,\,\,/g,',')
            .replace(/\,/g,', ')
            .replace(/\,\s\s/g,', ')
            .replace(/\s\N\Y/g,', NY ')
            .replace(/\N\Y\s\s/g,'NY ')
            .replace(/\,\,\s\N\Y/g,', NY'))+ '\n';
});

fs.writeFileSync('adresses_06.txt', result);
```

––––––––––––––––––––––––––

**time spent**
ca. 3 days à 3 hours. 
**learnings**
inspector is an immense help to understand html structure of given fiiles, 
javascript string methods to work with text, 
still need to insert some missing data to achieve consistent structure of adresses (e.g not all zip codes have prefix NY) -> follow-up, 
instead of building a long trial/error ".replace" string, there might be a cleaner solution -> follow-up.
**illustrative image**
collage, original image made by ken lodding, 
used for BYTE magazine, 
november 1978, volume 3, number 11, 
found here: https://archive.org/details/byte-magazine-1978-11-rescan