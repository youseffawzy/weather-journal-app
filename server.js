
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// Initialize the port
const port  = 5000;
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server 
app.listen(port , ()=>{
    console.log(`Weather App server is running at http://localhost:${port}`)               //to test the server when running in terminal
});

// the app need data from the server  
app.get('/getAllData',(req, res)=> {
    res.send(projectData).status(200).end();     //return project Data with response status ok then end the response process.
  });


// the app send or add data to the server 
  app.post('/postData' , (req, res)=>{
      sendData ={
          temp:req.body.temp,
          date:req.body.date,
          feeling:req.body.feeling
      };
      projectData = sendData  ; // save the send data in project data
      res.send(projectData).status(200).end();
  });

 