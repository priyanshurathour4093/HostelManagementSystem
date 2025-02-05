const mongoose = require("mongoose");


const complaintSchema = new mongoose.Schema({
   user_name:{
    type:String,
    required:true
   },
   roll_no: {
        type: Number,
        required: true,
    },
    complaint_type:
    {
        type:String,
        required:true,

    },
    complaint_id:{
        type:Number,
        required:true,
    },
    complaint_message: 
    {
        type: String,
        required:true,
        minLength:8
    },
    complaint_status:
    {
        type:Boolean,
        default:false
    },
    hostel_no:
   {
    type:String,
    default:""
   }
},{ timestamps: true });

const Complaints = mongoose.model("Complaints", complaintSchema);

module.exports = Complaints;
