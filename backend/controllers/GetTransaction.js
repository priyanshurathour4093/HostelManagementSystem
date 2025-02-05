const Payments = require("../models/Paymentsmodel");
const User = require("../models/usermodel");

// GET method to retrieve transactions by user_id sorted in latest-first order
const getTransactions = async (req, res) => {
  try {
    const { user_id } = req.params;
    // Assuming you have a Transaction model and want to retrieve transactions by user_id
    const transactions = await Payments.find({ user_id }).sort({ date: -1 });
    const user=await User.findById(user_id);
    res.json({transactions,user});
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = getTransactions;
