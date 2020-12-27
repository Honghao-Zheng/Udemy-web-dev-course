//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const date=require(__dirname+"/date.js");
const mongoose=require("mongoose");
const _=require("lodash");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser: true ,useUnifiedTopology: true });
const itemsSchema={
  name:String
};

const Item= mongoose.model("Item",itemsSchema);
const item1=new Item({
  name:"welcome to your todolist!"
});

const item2=new Item({
  name:"hit the + button to add a new item"
});

const item3=new Item({
  name:"<-- Hit this to deletean item"
});

const defaultItems=[item1,item2,item3];

const listSchema={
  name:String,
  items:[itemsSchema]
};

const List=mongoose.model("List",listSchema);



app.get("/", function(req, res){
  Item.find({},function(err,foundItems){
    if (foundItems.length===0){
      Item.insertMany(defaultItems,function(err){
        if (err){
          console.log(err);
        }else{
          console.log("Successfully saved default to DB");
        }
      });
      res.redirect("/");
    } else {
      res.render('list', {ofDay: "Today", event:foundItems
    });
    }
  });
});



app.post("/",function(req,res){
  const itemName=req.body.thing;
  const listName=req.body.list;
  const item=new Item({
    name:itemName
  });
  if (listName==="Today"){


  item.save();
  res.redirect("/");
} else {
  List.findOne({name:listName},function(err,foundList){
    console.log(foundList);
    foundList.items.push(item);
    console.log(foundList);
    foundList.save();
    res.redirect("/"+listName);
  });
}
});

app.post("/delete",function(req,res){
  const removeItemId=req.body.checkbox;
  const listName=req.body.listName;

  if (listName==="Today"){
  Item.findByIdAndRemove(removeItemId,function(err){
    if (!err){
      console.log("Successfully removed");
      res.redirect("/");
    }
  });
} else {
  List.findOneAndUpdate({name:listName},{$pull:{items:{_id:removeItemId}}},function(err, foundList){
    if (!err){
      res.redirect("/"+listName);
    }
  });
}
});

app.get("/:customListName",function(req,res){
  const customListName=_.capitalize(req.params.customListName);
  List.findOne({name:customListName},function(err,foundList){
    if (!err){
      if(!foundList){
        const list =new List({
          name:customListName,
          items:defaultItems
        });
        list.save();
        res.redirect("/"+customListName);
      }else{
        res.render("list",{ofDay: foundList.name, event:foundList.items});
      }
    }
  });
});

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
