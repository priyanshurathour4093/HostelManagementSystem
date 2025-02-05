const User = require("../models/usermodel");

const getStudentroom = async (req, res) => {
    try {
        const { room_number, hostel_no } = req.body; // Use req.query to access URL parameters
        //  console.log(room_number+" "+hostel_no);
        // Check if hostel_no is 0
        if (hostel_no === "0") {
            // If hostel_no is 0, return an empty array since no hostel is specified
            return res.json([]);
        }

        // Query database for students based on both room number and hostel number
        const students = await User.find({ hostel_no, room_number });

        // console.log(students);
        res.json(students);
    } catch (error) {
        console.error("Error in getStudent", error);
        return res.status(500).json({ err: "Error in getStudent" });
    }
};

module.exports = getStudentroom;
