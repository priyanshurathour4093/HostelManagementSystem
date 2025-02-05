const Complaints = require("../models/complaintmodel");

const getComplaint = async (req, res) => {
    try {
        const { hostel_no } = req.body;
        console.log(hostel_no);

        let complaints;
        if (hostel_no != 0) {
            complaints = await Complaints.find({hostel_no });
        } else {
            complaints = await Complaints.find();
        }

        // Assuming createdAt is a field in the Complaints schema
        complaints.sort((a, b) => a.createdAt - b.createdAt);

        // console.log(complaints);
        res.json(complaints);
    } catch (error) {
        console.error("Error in getComplaint:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
const getAllComplaint = async (req, res) => {
    try {
        const { hostel_no } = req.body;
        console.log(hostel_no);
        let complaints;
        if(hostel_no){
            complaints = await Complaints.findOne({hostel_no:hostel_no});
        }else{
            complaints = await Complaints.find();
        }
        // Assuming createdAt is a field in the Complaints schema
        complaints.sort((a, b) => a.createdAt - b.createdAt);

        console.log(complaints);
        res.json(complaints);
    } catch (error) {
        console.error("Error in getComplaint:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {getComplaint,getAllComplaint};
