const mongoose = require('mongoose');

const occupantSchema = new mongoose.Schema({
    name :{ type:String ,required : true},
    rollno : { type: Number ,required:true},
    contact :{ type: String,required :true }
});
module.exports = mongoose.model('Occupant',occupantSchema);