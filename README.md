<h1><img align="left" width="50" height="50" src="../main/static/IMG/logo/logo128x128.png" >NotMiss</h1>
<img align="left" src="../main/static/IMG/logo/logo256x256.png" width="164" height="164"> <h3>TW6 university project: NotMiss</h3>
NotMiss is a <strong>PWA (Progressive Web App)</strong> conceived by <b>Renato Esposito</b> and <b>Luca Rubino</b> for a university project of <a href="https://www.uniparthenope.it/ugov/degreecourse/43358"><i><b>Web Technologies</i>(TW6)</b></a> of the <b><i><a href="https://www.uniparthenope.it/">Parthenope University of Naples</a></i><b>.
  
<br><br>
<h3><i>Goals</i></h3>

◉ The idea is to offer a platform for the management and organization of events.

◉ Currently some social networks offer the functionality of creating events, but it is in fact a basic secondary functionality.

◉ We also want to respect the privacy of those who use NotMiss by giving users the possibility of not necessarily sharing personal information on the platform (this is not currently possible with social networks).

◉ NotMiss aims to be a PWA entirely dedicated to the concept of a 360 ° event.


<h3><i>Functionality</i></h3>

<h4>The NotMiss PWA offers the possibily:</h4>

◉ to create events with extensive customization.
  
◉ to make the events private in a bulletin board visible to all NotMiss users.

◉ to make the events public in a bulletin board visible to all.
  <br>
  
  
  
  <h2> How to set up </h2>
  <ol> 
    <li> Create virtual environment folder (by terminal): <code>python3 -m venv venv</code></li>
    <!-- <li> if you don't have pip, install pip: <code> sudo apt install python3-pip </code> -->
    <li> activate the corresponding environment: <code> . venv/bin/activate</code>
    <li> Go to project folder and install requirements by requirements.txt file: <code> pip install -r  requirements.txt </code> 
    <li> Now configure the python interpreter from your ide. </li>
    <li> If you don't have mongoDB, follow <a href="https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/"> this guide</a> to install it.</li>
    <br>
    </ol> 
      <h2> How to use</h2>
  <ol> 
    <li> The flask command is installed by Flask, not your application; it must be told where to find your application in order to use it. The FLASK_APP environment variable is used to specify how to load the application: <code> $ export FLASK_APP=hello</code></li>
    <li> Run flask: <code> $ flask run</code> </li>
    <li> Now configure the python interpreter from your ide. </li>
    <li> run mongodb (it depends by your OS). </li>
     
