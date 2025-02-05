const mongoose = require("mongoose");
const workersSchema = new mongoose.Schema({
   w_name:{
    type:String,
    required:true,
   },
   w_email:{
    type:String,
    required:true,
   },
   contact_no:{
    type:String,
    required:true
   },
   w_post:{
    type:String,
    required:true
   },
   hostel_no:{
      type:String,
      required:true
   }
});

const Workers = mongoose.model("Workers", workersSchema);

module.exports = Workers;
