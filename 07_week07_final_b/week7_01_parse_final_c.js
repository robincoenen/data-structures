var fs = require('fs');
var cheerio = require('cheerio');

//let content_f = fs.readFileSync('/home/ec2-user/environment/data-structures/01_week01/data/01.txt');

//const $ = cheerio.load(content_f);

var meetingData = [];

var filePath = 'data/';
var fileNumber = [
    '01',  
    '02',  
    '03',  
    '04',  
    '05',  
    '06',  
    '07',  
    '08',  
    '09',  
    '10'
    ];
    
    
    fileNumber.forEach(file => {

//4. Load the meetings text file into a variable content
     var content = fs.readFileSync('data/' + file + '.txt');
    //console.log(content);
          
//5. Load `content` into cheerio object
    var $ = cheerio.load(content);
    
const zoneId = "z01";
//var combinedData ={};

 $('tr').each(function(j, trElem) {
  
  var combinedData = {};
  ///singleMeeting.id = zoneId + j;

  var thisMeeting = {};
                   
   $(trElem).children().each(function(i,elem) {
    
    

     if($(elem).attr("style")== "border-bottom:1px solid #e3e3e3; width:260px"){

         thisMeeting.id = zoneId + j;

         
         thisMeeting.buildingName = ($(elem).find('h4').text().trim());

         thisMeeting.streetAdress = $(elem).html().split('<br>')[2].trim().split(',')[0];
         thisMeeting.city = "NewYork";
         thisMeeting.state = "NY";

         ///meetingData.push(thisMeeting);

         var zipCode = $(elem).text().match(/\d{5}/);
              if (zipCode != null && zipCode != undefined){
                 thisMeeting.zipCode = zipCode[0];

            }
            thisMeeting.access = false;
                          var src = ($(elem).find('img').attr('src'));
                          if (src != null && src != undefined) {
                          thisMeeting.access = true;
                        }
        //  meetingDetails.push(thisMeeting);
         combinedData.locationMeeting = thisMeeting;
         // console.log(combinedData);

       }

       else if ($(elem).attr("style") == "border-bottom:1px solid #e3e3e3;width:350px;"){


          
         var thisTime = $(elem).text().trim();
         
         thisTime = thisTime.replace(/[ \t]+/g, " ").trim();
         thisTime = thisTime.replace(/[\r\n|\n]/g, " ").trim();
         thisTime = thisTime.split("        ");

          //scheduleData.push(thisTime);
          var singleMeeting = [];  

          for (var i=0; i<thisTime.length; i++){
           var scheduleSingle = {};
           scheduleSingle.day = thisTime[i].trim().split(' ')[0];
           scheduleSingle.startTime = thisTime[i].trim().split(' ')[2];
           scheduleSingle.endTime = thisTime[i].trim().split(' ')[5];
           scheduleSingle.time = thisTime[i].trim().split(' ')[3];
           scheduleSingle.type = thisTime[i].trim().split(' ')[9];
           scheduleSingle.id =  zoneId + j;
           singleMeeting.push(scheduleSingle);

          }
          combinedData.scheduleTime = singleMeeting;
          
     }
     

  });
  // console.log(combinedsData);
  meetingData.push(combinedData);
 });

var newArray = meetingData.filter(value => value.locationMeeting);
console.log(newArray);
// console.log(meetingData[9]);

fs.writeFileSync('adresses_01_b.json', JSON.stringify(newArray));
});