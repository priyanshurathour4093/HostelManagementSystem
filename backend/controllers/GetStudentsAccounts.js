const accounts = require("../models/Accounts");
const User = require("../models/usermodel");

const getStudentsAccounts = async (req, res) => {
  try {
    const { hostel_no } = req.params;
    console.log(hostel_no);

    // Fetch student accounts based on hostel number
    let studentAccounts = await accounts.find({ hostel_no });
    let Student = []; // Initialize the array

    // Iterate through each student account and add user's full name
    for (let i = 0; i < studentAccounts.length; i++) {
      const user = await User.findOne({ _id: studentAccounts[i].user_id });
      Student.push({ full_name: user.full_name, user_dues:studentAccounts[i].user_dues,user_paid:studentAccounts[i].user_paid }); // Push individual student account with full name
    }
      
    console.log(Student[0]);
    
    res.json(Student); // Return the Student array
  } catch (error) {
    console.error('Error fetching student accounts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = getStudentsAccounts;
