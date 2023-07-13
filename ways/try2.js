// this method is not working 

const express =require("express");
const bodyParser = require("body-parser");
const https= require("https");

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
    const data={
     
      body: "{  \"Name\": \""+firstname+"\",  \"Email\": \""+email+"\",  \"HasExternalDoubleOptIn\": false,  \"CustomFields\": [  \"LNAME="+lastname+"\"    ]}"
      
    };

    const jsondata = JSON.stringify(data);
    
    const url= 'https://api.moosend.com/v3/lists/b9102d01-b70d-4644-bb99-296cef42bf88';
    const options={
      method:"POST",
      auth:"Nishant:285eed1a-ed7d-4e1f-8f9d-f18c9ac3db42"
    };

    const send= https.request(url,options,function (response){
    
      response.on("data",function(data){
      console.log(JSON.parse(data)); 
      });
      send.write(jsondata);
      send.end();

    });
   
  });

app.listen(3000, function(req,res){
    console.log('Server is working on port 3000');
});