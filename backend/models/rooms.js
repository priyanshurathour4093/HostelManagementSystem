const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    number : {type: Number , required : true},
    status:{type : String ,enum :['vacant','occupied'],default:'vacant'},
    occupants :[{type : mongoose.Schema.Types.ObjectId ,ref:'Occupant'}]
})
module.exports = mongoose.model('Room',roomSchema);