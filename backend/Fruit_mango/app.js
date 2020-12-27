//jshint esversion:6
const  mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/peopleBD",{useNewUrlParser:true,useUnifiedTopology: true });

const peopleSchema= new mongoose.Schema({
  name:String,
  age:Number,
});

const People=mongoose.model("People",peopleSchema);
const person=new People({
  name:"John",
  age:17
});

person.save();
