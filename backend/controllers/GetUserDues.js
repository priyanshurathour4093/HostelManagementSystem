const accounts = require("../models/Accounts");
const User = require("../models/usermodel");

const getUserDues=async(req, res) =>{
  try {
    const {user_id}=req.params;
    // Check if the roll number is provided
    
    if (!user_id) {
      throw new Error('User_id is missing from URL parameters');
    }
    // console.log(user_id);
    // Query the database to get user dues and paid information based on roll number
    const account = await accounts.findOne({user_id} ); // Assuming roll number is a unique identifier
    // console.log(account);

    if (!account) {
      const user=User.findOne({_id:user_id});

      const newAccount =await accounts({
        user_id,
        hostel_no:user.hostel_no,
      })
      newAccount.save();
      res.json({user_dues:0,user_paid:0});
    }

    // Extract user dues and paid information from the account object
    const { user_dues, user_paid } = account;
    // console.log(user_dues);
    res.json({user_dues, user_paid });
  } catch (error) {
    console.error('Error fetching user dues:', error.message);
    throw error;
  }
}

module.exports=getUserDues;
