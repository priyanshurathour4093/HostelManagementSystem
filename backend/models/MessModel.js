const mongoose = require("mongoose");
const messSchema = new mongoose.Schema({
   day:{
    type:String,
    required:true,
   },
   breakfast:{
    type:String,
    required:true,
   },
   breakfast_extra:{
    type:String,
    required:true,
   },
   lunch:{
    type:String,
    required:true
   },
   lunch_extra:{
    type:String,
    required:true,
   },
   snacks:
   {
    type:String,
    required:true
   },
    
   dinner:{
    type:String,
    required:true
   },
   dinner_extra:{
    type:String,
    required:true
   },
   hostel_no:
   {
    type:String,
    default:""
   }
});

const MessModel = mongoose.model("MessModel", messSchema);

module.exports = MessModel;
