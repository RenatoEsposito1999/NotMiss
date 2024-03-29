<h1><img align="left" width="32" height="32" src="../main/static/IMG/favicons/safari-pinned-tab.svg" >NotMiss</h1>
<img align="left" src="../main/static/IMG/logo/logo256x256.png" width="164" height="164"> <h3>~What is NotMiss?</h3>
NotMiss is a <strong><a href=""https://en.wikipedia.org/wiki/Progressive_web_application> PWA(Progressive Web App)</a></strong> conceived by <b>Renato Esposito</b> and <b>Luca Rubino</b>. 
<br>It is a project of <a href="https://www.uniparthenope.it/ugov/degreecourse/43358"><i><b>Web Technologies</i>(TW6)</b></a> (course of the <b><i><a href="https://www.uniparthenope.it/">Parthenope University of Naples</a></i></strong>).

<br><br>
### Idea
- **The idea is to create a platform that allows the management and organization of user events**.

### features implemented

<h4>The NotMiss PWA offers the possibily:</h4>

-  to create events with customizations.
  
- to make the events private in a bulletin board visible to all NotMiss users.

- to make the events public in a bulletin board visible to all.

### PWA home page in desktop frame and in smartphone frame
<img align="left" src="desktopmode.png"> <img align="center" src="phonemode.jpg">



https://user-images.githubusercontent.com/31493347/205743862-e8c57ffa-cd3c-43e2-a83e-903ad69d181f.mp4



<h1> Guide </h1>
  <h2> ~How to set up NotMiss?</h2>
  <ol> 
    <li> Create virtual environment folder(by terminal): <code>$ python3 -m venv venv</code></li>
    <!-- <li> if you don't have pip, install pip: <code> sudo apt install python3-pip </code> -->
    <li> activate the corresponding environment: <code>$ . venv/bin/activate</code>
    <li> Go to project folder and install requirements by requirements.txt file: <code>$ pip install -r  requirements.txt </code> 
    <li> Make sure the python interpreter is configured correctly. </li>
    <li> If you don't have mongoDB, follow <a href="https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/"> this guide</a> to install it.</li>
  <li>(linux only) you can start mongoDB with the command: <code>$ sudo systemctl start mongod</code>
    <br> If that doesn't work, run the following commands: 
    <ol>
      <li> <code>$ sudo chown mongodb:mongodb /tmp/mongodb-27017.sock</code></li>
      <li> <code>$ sudo systemctl restart mongod</code></li>
  </ol>
    <br>
    </ol> 
      <h2> ~How to run NotMiss?</h2>
  <ol> 
    <li> run mongoDB(the instructions depend on your OS). </li>
    <li> In the project folder there is the "NotMissDB" folder. if you want to have a ready NotMissDB, then execute the procedure "how to import the testing db?" </li>
    <li> N.B: The flask command is installed by Flask, not your application; it must be told where to find your application in order to use it. The FLASK_APP environment variable is used to specify how to load the application so export your FLASK_APP environment variable: <code> $ export FLASK_APP=app</code></li>
    <li> Run flask: <code>$ flask run</code> (you can use command <code>$ flask run -h 0.0.0.0</code> to make NotMiss accessible to everyone).</li>
    <li> If you want and if you already want a populated database, you can follow the procedure <i>"how to import the testing DB".</i>
  </ol>
  <br>
    <h2> ~How to import the testing DB? (Linux only)</h2>
    <ol> 
    <li>If your operating system is not linux, search on google "how to import a db in mongodb in X" (X = your OS)</li>
    <li>Else: run the command: <code>$ sudo mongorestore -d NotMissDB < NotmissDB_path ></code></li>
    <li> Now you can test NotMiss with sample data. </li>
    <li> (If you need to export NotMissDB (for some reason): <code>$ sudo mongodump --host localhost --port 27017 --db NotMissDB</code>)</li>
  </ol>
  <br>
        <h2> ~How to use NotMiss?</h2>
  <ol> 
   <li> <code>$ flask run</code> and <code> $ flask run -h 0.0.0.0</code> commands return the IP address and port to connect to access the PWA.</li>
    <li> From the main interface you can access the login / registration page. </li>
  <li> Once you have registered and logged in, you will be redirected to the main page where you can create your own events, attend other users' events and view event information.</li>
     </ol>
     </br>
     </br>
     <h2> Google Drive link of the project presentation [Italian versions]:</h2> 
     <ul> 
    <li>  <a href="https://studentiuniparthenope-my.sharepoint.com/:p:/g/personal/luca_rubino001_studenti_uniparthenope_it/ETFZzIFPZ_FGgHYJqviHdpgBLRSeSpzQpdWdr-VPYR7FEQ?e=AsBrQA"> [PowerPoint] NotMiss Presentation</li></a>
    <li>  <a href="https://drive.google.com/file/d/1_el__Wl7glptTIJAdWotckHus3mX1XGR/view?usp=sharing"> [GOOGLE DRIVE] NotMiss Presentation</a></li>
    <li>N.B: animations don't work with Google Drive!</li>
    
<h2>Collaborator</h2>
<a href="https://github.com/Luruu">Luca Rubino</a>
