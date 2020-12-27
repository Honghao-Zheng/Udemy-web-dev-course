//jshint esversion:6
const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");
const secret=require(__dirname+"/secret.js");
app.use(bodyParser.urlencoded({extended:true}));



app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const city=req.body.cityName;
  const apikey=secret.getApi();
  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey;
  https.get(url,function(response){
    console.log(response.status);
    response.on("data",function(data){
      const weatherData=JSON.parse(data);
      const temp=weatherData.main.temp;
      const weatherDescription= weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<p>the weather is currently "+weatherDescription+"</p>");
      res.write("<h1>The temperature at London is "+temp+" degrees Celcius.</h1>");
      res.write("<img src="+imageURL+">");
      res.send();
    });
  });

});


app.listen(3000,function(req,res){
  console.log("Server is running on port 3000");
});
