const accounts = require("../models/Accounts");
const hostelaccounts = require("../models/HostelAccount");
// const accountSchema = require("../models/Accounts");

const updateUserDues=async(req, res) =>{
  try {
    const { hostel_no, amount } = req.body; // Assuming hostelId and amount are passed in the request body
console.log(req.body.hostel_no)
console.log(req.body.amount)
    // Check if hostelId and amount are provided
    if (!hostel_no || !amount) {
      return res.status(400).json({ error: 'Hostel mame or amount is missing from the request' });
    }
    

    // Find all user accounts belonging to the specified hostel
    const account = await accounts.find({ hostel_no });

    if (!account || account.length === 0) {
      return res.status(404).json({ error: 'No accounts found for the specified hostel' });
    }
    let hostelAccount = await hostelaccounts.findOne({ hostel_no });

    // If HostelAccount doesn't exist, create a new one
    if (!hostelAccount) {
      hostelAccount = new hostelaccounts({
        hostel_no,
        hostel_dues:amount
      });
    } else {
      // If HostelAccount exists, update its dues
      hostelAccount.hostel_dues += hostelAccount.no_of_student*amount;
    }

    // Save the updated or new HostelAccount
    await hostelAccount.save();

    // Update user dues for each account
    await Promise.all(account.map(async (account1) => {
      // Add the current amount to the previous user dues value
      const updatedDues = account1.user_dues + amount;

      // Update the user dues in the database
      await accounts.findByIdAndUpdate(account1._id, { user_dues: updatedDues });
    }));

    return res.status(200).json({ message: 'User dues updated successfully' });
  } catch (error) {
    console.error('Error updating user dues:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports=updateUserDues;
