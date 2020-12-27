//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const date=require(__dirname+"/date.js");


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let items=["milk","egg"];
let workitems=[];
app.get('/', function(req, res){

  let day=date.getDate();
  res.render('list', {ofDay: day, event:items
  });
});

app.post("/",function(req,res){
  let item=req.body.thing;
  if (req.body.list==="work"){
    workitems.push(item);
    res.redirect("/work");
  }
  else{

    items.push(item);
    res.redirect("/");
  }

});

app.get("/work",function(req,res){
  res.render("list",{ofDay:"work list",event:workitems});
});



app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
