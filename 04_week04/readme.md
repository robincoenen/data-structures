Week 4 — Create Database
==========================

![alt text](./illustrative_image_4.png)


## Update to Week 03

As the code in week_03 generally worked, this update deletes all metadata which provides the API in addition to the geocodes.
The following lines will just push selected contents (the streetadress input, the latitude and the longitude) to the variable.


```
 var reduction = {
                streetaddress: tamuGeo['InputAddress'],
                latitude: tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Latitude'],
                longitude: tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Longitude'],
            };
            
            allData.push(reduction);
```

––––––––––––––––––––––––––

**time spent**
ca. 1 days à 1 hour. 
**illustrative image**
original image by: unspecified, 
used for BYTE magazine, 
november 1981, volume 8, number 11, 
found here: https://archive.org/details/byte-magazine-1981-11