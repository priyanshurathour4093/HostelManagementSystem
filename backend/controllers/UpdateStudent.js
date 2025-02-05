const Hostel = require("../models/hostelmodel");
const User = require("../models/usermodel");


const updateStudent = async (req, res) => {
    try {
        const { name, Roll, email, Room, hostel_no, userId } = req.body;
        console.log("Updating student with ID:", userId);
  
        // Find the student document by ID
        const student = await User.findOne({ _id: userId });
  
        if (!student) {
            console.log("Student not found");
            return res.status(404).json({ error: "Student not found" });
        }
  
        // Find the old hostel if the student has one
        let oldHostel;
        if (student.hostel_no) {
            oldHostel = await Hostel.findOne({ hostel_no: student.hostel_no }); // Find the old hostel
        }
  
        // Find the new hostel
        const newHostel = await Hostel.findOne({ hostel_no });
  
        // Update the relevant fields
        student.full_name = name;
        student.roll_no = Roll;
        student.email = email;
        student.room_number = Room;
        student.hostel_no = hostel_no;
  
        // Save the updated student document
        const updatedStudent = await student.save();
        console.log("Updated student:", updatedStudent);
  
        // Update student_present counts for old and new hostels
        if (oldHostel && newHostel) {
            oldHostel.students_present -= 1; // Decrement student_present count for old hostel
            newHostel.students_present += 1; // Increment student_present count for new hostel
  
            // Save the updated hostel documents
            await oldHostel.save();
            await newHostel.save();
        } else if (newHostel) {
            // Increment student_present count for new hostel if no old hostel is found
            newHostel.students_present += 1;
            await newHostel.save();
        }
  
        res.json("Student updated");
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email === 1) {
            // Duplicate email error
            return res.status(400).json({ error: "Email address already in use." });
        }
        console.error("Error in Student Updatation", error);
        return res.status(500).json({ error: "Error in Student Updatation" });
    }
  };
  
  


module.exports=updateStudent;