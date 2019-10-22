var fs = require('fs');
var cheerio = require('cheerio');

let content_f = fs.readFileSync('/home/ec2-user/environment/data-structures/01_week01/data/05.txt');

const $ = cheerio.load(content_f);

var meetingData = [];

 $('td').each(function(i, elem) {
          var combinedData ={};
var meetingDetails =[];
  
     if($(elem).attr("style")== "border-bottom:1px solid #e3e3e3; width:260px"){
         
         var thisMeeting = {};
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
         meetingDetails.push(thisMeeting);
         combinedData.locationMeeting = meetingDetails;
         //console.log(combinedData);

}

       else if ($(elem).attr("style") == "border-bottom:1px solid #e3e3e3;width:350px;"){

          ///var thisTime = {};
          //var thisTime = $(elem).html().trim();
          //thisTime.time = $(elem).html().split('<br>')[0].trim();
          //thisTime.day = ($(elem).split('b').eq(0).text().trim());
          //thisTime.time = ($(elem).find('b').nextUntil('text','b').text().trim());
          
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
                    singleMeeting.push(scheduleSingle);
                    //console.log(scheduleSingle);
                    //console.log(singleMeeting);
                    //meetingData.time = scheduleData;
                    combinedData.scheduleTime = singleMeeting;
                    //console.log(combinedData);
                    }
     }
     
      meetingData.push(combinedData);
      
                var newArray = meetingData.filter(value => JSON.stringify(value) !== '{}');

//                 var myArrayNew = meetingData.filter(function (el) {
//     return el != undefined && el != null;
//   });
                  //console.log(myArrayNew);

fs.writeFileSync('adresses_05.json', JSON.stringify(newArray));

 });
 