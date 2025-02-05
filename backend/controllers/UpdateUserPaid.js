const accountSchema = require("../models/Accounts");

const updateUserPaid = async (req, res) => {
  try {
    const { roll_no, amount } = req.body;

    // Check if roll_no and amount are provided
    if (!roll_no || !amount) {
      return res.status(400).json({ error: 'Roll number or amount is missing from the request' });
    }

    // Find the account by roll number
    const account = await accountSchema.findOne({ roll_no });

    // Check if the account exists
    if (!account) {
      return res.status(404).json({ error: 'No account found for the specified roll number' });
    }

    // Update user paid dues
    const updatedPaid = account.user_paid + amount;

    // Update the user paid dues in the database
    await accountSchema.findByIdAndUpdate(account._id, { user_paid: updatedPaid });

    console.log(`${roll_no} ${amount} User Paid updated successfully`);
    return res.status(200).json({ message: 'User Paid updated successfully' });
  } catch (error) {
    console.error('Error updating user Paid:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = updateUserPaid
