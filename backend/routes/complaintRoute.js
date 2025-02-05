const Complaints = require('../models/complaintmodel.js');
const User = require('../models/usermodel.js');
const {Counter,getNextSequenceValue} = require('../models/counterModel.js');

const Complaint = async (req, res) => {
    console.log("Complaint received");
    try {
        const { user_name, roll_no, complaint_type, complaint_message, hostel_no } = req.body;
        console.log(roll_no);
        const user = await User.findOne({ roll_no: roll_no });
        console.log(user);
        if (!user) {
            return res.status(404).json({ error: "User does not exist" });
        }
        const nextId = await getNextSequenceValue('id');

        const newComplaint = new Complaints({
            user_name,
            roll_no,
            complaint_type,
            complaint_id: nextId,
            complaint_message,
            hostel_no,
        });
        await newComplaint.save();

        return res.status(201).json({
            id: newComplaint.complaint_id
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error in Complaints" });
    }
};
module.exports=Complaint;