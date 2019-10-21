var fs = require('fs');
var cheerio = require('cheerio');

let content_f = fs.readFileSync('/home/ec2-user/environment/data-structures/01_week01/data/06.txt');

const $ = cheerio.load(content_f);

var meetingData = [];
var scheduleData =[];

 $('td').each(function(i, elem) {
  
     if($(elem).attr("style")== "border-bottom:1px solid #e3e3e3; width:260px"){
         
         var thisMeeting = {};
         thisMeeting.buildingName = ($(elem).find('h4').text().trim());

         thisMeeting.streetAdress = $(elem).html().split('<br>')[2].trim().split(',')[0];
         thisMeeting.streetAdress = $(elem).html().split('<br>')[2].trim().split(',')[0];
         thisMeeting.city = "NewYork";
         thisMeeting.state = "NY";
         meetingData.push(thisMeeting);

         var zipCode = $(elem).text().match(/\d{5}/);
              if (zipCode != null && zipCode != undefined){
                 thisMeeting.zipCode = zipCode[0];

            }
            thisMeeting.access = false;
                          var src = ($(elem).find('img').attr('src'));
                          if (src != null && src != undefined) {
                          thisMeeting.access = true;
                        }
            
}

       else if ($(elem).attr("style") == "border-bottom:1px solid #e3e3e3;width:350px;"){
         //text within each meeting info td (contains multiple meeting times)
         
          var thisTime = {};
          
          thisTime.time = $(elem).html().split('<br>')[2].trim();
          scheduleData.push(thisTime);
     }
 });

//fs.writeFileSync('adresses_06.json', JSON.stringify(meetingData));

function printIt(){   
console.log(scheduleData,meetingData);
}

setTimeout(printIt,2000);


// var meetingData = [];

//  $('td').each(function(i, elem) {
//      if($(elem).attr("style")=="border-bottom:1px solid #e3e3e3; width:260px"){
         
//          var thisMeeting = {};
//          thisMeeting.streetAdress = $(elem).html().split('<br>')[2].trim().split(',')[0];
//          thisMeeting.city = "NewYork";
//          thisMeeting.state = "NY";
//          meetingData.push(thisMeeting);
//      }
//  });

// console.log(meetingData);