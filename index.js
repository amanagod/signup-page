
const express =require("express");
const bodyParser = require("body-parser");
const https= require("https");
const request = require('request');
const dotenv= require("dotenv");
dotenv.config();

const { response } = require("express");

const app= express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req,res){
 res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.mail;

    request({
      method: 'POST',
      url: `https://api.moosend.com/v3/subscribers/${process.env.LIST_ID}/subscribe.json?apikey=${process.env.API_KEY}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: "{  \"Name\": \""+firstname+"\",  \"Email\": \""+email+"\",  \"HasExternalDoubleOptIn\": false,  \"CustomFields\": [  \"LNAME="+lastname+"\"    ]}"
    
    }, function (error, response, body) {
      console.log('Status:', response.statusCode);
      console.log('Headers:', JSON.stringify(response.headers));
      console.log('Response:', body);
    });
     if(response.statusCode===200){
       res.sendFile(__dirname+"/sucess.html");
     }
     else{
       res.sendFile(__dirname+"/failure.html");
     }

    });
   
  
app.post("/failure",function(req,res){
      res.redirect("/");
    });

app.listen(process.env.PORT||3000, function(req,res){
    console.log('Server is working on port 3000');
});
