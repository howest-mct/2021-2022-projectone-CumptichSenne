# Project One - Smart pool

Zoals je kan zien is er geen "vaste" structuur voor zo'n document. Je bepaalt zelf hoe je het bestand via markdown structureert. Zorg ervoor dat het document minimaal op volgende vragen een antwoord biedt.

The program is built in 4 different languages. The frontend uses HTML, CSS and Javascript. The bakend Uses Python

To install the database you have to download MySQL Workbench (link: https://dev.mysql.com/downloads/windows/installer/8.0.html). Choose the bottom one of the two. After you have succesfully installed Workbench you can download the Database file (CumptichSenne_Database.sql). Open this file in Workbench and run it. The database will be installed with a bunch of test data to make sure that it works.

To start the program you have to download Visual Studio Code and you have to open a remote connection. Make sure your Raspberry Pi is plugged in with a Ethernet cable. After you openend the connection, you have to enter a password that is (W8w00rd) after you entered the password you have to open a terminal and type the following command: sudo systemctl start mijnproject.service. This will start the program.

To make sure that you have access to the database is it necesarry that you open the config.py file and change the settings to your personal settings of your new MySQL account.

After starting the program will the sensors automaticaly start measuring values and put them in your database.
  
## Instructables
https://www.instructables.com/Smart-Pool/
