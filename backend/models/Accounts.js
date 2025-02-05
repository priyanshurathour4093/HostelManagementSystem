
const mongoose = require("mongoose");


const accountSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    user_dues:{
        type:Number,
        default:0,
    },
    user_paid:{
        type:Number,
        default:0,
    },
    hostel_no:
   {
    type:String,
    default:""
   }
   
});

const accounts = mongoose.model("Accounts", accountSchema);

module.exports = accounts;
