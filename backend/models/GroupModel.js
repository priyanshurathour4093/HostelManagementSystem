const mongoose = require("mongoose");
const groupSchema = new mongoose.Schema({
   group_id:{
    type:Number,
    required:true,
   },
   group_name:
   {
      type:String,
      required:true
   },
   participants:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    default:[]
   }],
   messages:[
   {
    type:mongoose.Schema.Types.ObjectId,
    ref:'MessageModel',
    default:[]
   }]
   
},{timestamps:true});

const GroupModel = mongoose.model("GroupModel", groupSchema);

module.exports = GroupModel;
