const mongoose = require("mongoose");


const announcementSchema = new mongoose.Schema({
    announcement_id:{
        type:Number,
        default:0
    },
    user_name:{
    type:String,
    required:true
   },
    announcement_message: 
    {
        type: String,
        required:true,
        minLength:8
    },
    editing_status:
    {
        type:Boolean,
        default:false
    },
    title: 
    {
        type: String,
        required:true,
    },
    hostel_no:
   {
    type:String,
    default:""
   }
},{ timestamps: true });

const Announcement = mongoose.model("Announcments", announcementSchema );

module.exports = Announcement;
