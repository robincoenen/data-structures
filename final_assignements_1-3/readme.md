#Final Assignments 1–3
==========================

## This is the documentation of the Final Assignements of Data Structures

It consists out of 3 Final Projects:

a) A nosql process Blog as an Annotated Bibliography
b) A Graph visualizing a temperature measured by an IOT Device
c) A Map with geocoded elements and contextual information which was scraped 



### a) Annotated Bibliography 
![alt text](./a_finalblog.png)

Visit here: http://18.218.104.82:8080/a_blog.html



The Processblog shows all interesting sources which may or may not be interesting for my 2019 Master thesis, which crossed my way in November and December. 
 

The data of the annotated bibliography is stored in a no-sql Database (Dynamo DB in Amazon AWS). 
In the previous weeks I re-did the structure of this database several times, in order to achieve a most effective structure of elements.
Even after redoing the structure several times, after working with the final product I always find ways to improve the structure. 
For example should the URL of my source be a own column in the table, so that its more accessible.

The data is queried in the app.js file. By default all entries are shown via the scan function of dynamo db. 
However when the user decides to filter all entries by a certain category via the Frontend, the query in the background filters the output accordingly. 
A pipeline between the app.js, an ajax and jquery javascript, an html file as well as a css file accomplish the final product of the processblog.

The filter button as well as the blogdescription is always visible, as it is sticky. That allows the user to always understand the context of the webpage.







### b) The Temperature in my living room
![alt text](./b_finaltempsens.png)

Visit here: http://18.218.104.82:8080/b_sensor.html

Using a particle temperature sensor equipped with an internet access allowed to measure the temperature of my living room every two minutes. 
The measured data was then stored in a sql database. A pm2 instance was used as a process manager to make sure the data was stored automatically.
Unfortanately I wasnt aware that my data wasnt stored between the 10 November and Beginning of December. I uncounsciously stopped the pm2 process 
and just realized it at the beginning of december.\
In order to create a line graph out of the recorded data it was  queried out of the sql database.
This query was then inserted into as data (temperature and time) into an d.3 linegraph.




### c) Anonymous Alcoholics: Emergency Map
![alt text](./c_finalmap.png)

The visualization of my room temperature is a linegraph. It shows the average temperature of the day of one month. It is an almost static graph. A tooltip allows the user to get the exact average temperature.