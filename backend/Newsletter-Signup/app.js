//jshint esversion:6
const express=require("express");

const request=require("request");
const bodyParser=require("body-parser");



app.get("/",function(res,rep){
  rep.sendFile(__dirname+"/signup.html");
});

app.use(express.static("statics"));
app.use(bodyParser.urlencoded({extended:true}));

app.post("/",function(res,rep){
  const firstName=res.body.Fname;
  const surname=res.body.Lname;
  const email=res.body.email;
  const data={
    members:[
      {email_address: email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName,
        }

      }
    ]
  };
  const jasonData=JSON.stringify(data);
  console.log(firstName,surname,email);
  rep.send("thanks !");
});

app.listen(3000,function(){
  console.log("server is running on port 3000");
});
//need API key
