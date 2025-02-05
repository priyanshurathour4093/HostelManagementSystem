
const mongoose = require("mongoose");


const hostelaccountSchema = new mongoose.Schema({
    hostel_dues:{
        type:Number,
        default:0,
    },
    hostel_paid:{
        type:Number,
        default:0,
    },
    hostel_no:
   {
    type:String,
    default:""
   },
   no_of_student:
   {
    type:Number,
    default:1
   }
   
});

const hostelaccounts = mongoose.model("Hostel Accounts", hostelaccountSchema);

module.exports = hostelaccounts;
