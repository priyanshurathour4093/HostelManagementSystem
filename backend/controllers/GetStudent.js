const User = require("../models/usermodel");

const getStudent = async (req, res) => {
    try {
        const { hostel_no } = req.params;
        console.log("hostel_no");
        // Fetch the latest 10 announcements for the given hostel
        var students;
         students = await User.find();
        students.sort((a, b) => {
            
            return a.roll_no - b.roll_no;
        });

            
           
        console.log(students);
        res.json(students);
    } catch (error) {
        console.error("Error in getStudent", error);
        return res.status(500).json({ err: "Error in getStudent" });
    }
};

module.exports = getStudent;
