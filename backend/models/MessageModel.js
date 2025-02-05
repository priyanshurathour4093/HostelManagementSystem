const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
   user_id:{
      type:mongoose.Schema.ObjectId,
      ref:'User',
      required:true,
   },
   message:{
    type:String,
    required:true,
   },
   group_id:
   {
    type:Number,
    required:true
   }
   
},{timestamps:true});

const MessageModel = mongoose.model("MessageModel", messageSchema);

module.exports = MessageModel;
