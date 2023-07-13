//mailchimp method

const express =require("express");
const bodyParser = require("body-parser");
const https= require("https");
const dotenv=require("dotenv");
dotenv.config();

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
      members:[
        {
          email_address:email,
          status:"subscribed",
          merge_fields:{
            FNAME:firstname,
            LNAME:lastname
          }

        }
      ]
    };

    const jsondata = JSON.stringify(data);
    
    const url= `https://us21.api.mailchimp.com/3.0/lists/0777dc6554`;
    const options={
      method:"POST",
      auth:"Nishant:11d88286283880af4572682d8045db29-us21"
    }

    const send= https.request(url,options,function (response){
    
      response.on("data",function(data){
      console.log(JSON.parse(data)); 
      });
      send.write(json.data);
      send.end();

    });
   
  });

app.listen(3000, function(req,res){
    console.log('Server is working on port 3000');
});