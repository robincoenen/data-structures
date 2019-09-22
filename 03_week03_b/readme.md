Week 3 — Get Geocodes
==========================

![alt text](./illustrative_image_3.png)


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
collage, original image made by ken lodding, 
used for BYTE magazine, 
november 1978, volume 3, number 11, 
found here: https://archive.org/details/byte-magazine-1978-11-rescan