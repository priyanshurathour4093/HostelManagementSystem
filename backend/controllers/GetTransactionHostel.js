const Payments = require("../models/Paymentsmodel");
const User = require("../models/usermodel");

// GET method to retrieve transactions by hostel_no sorted in latest-first order
const getTransactionshostel = async (req, res) => {
  try {
    const { hostel_no } = req.params;
    console.log(hostel_no);
    
    // Assuming you have a Payments model and want to retrieve payments by hostel_no
    const transactions = await Payments.find({ hostel_no }).sort({ date: -1 });

    // Fetch user details associated with each transaction
    const users = [];
    
    // Iterate over each transaction to fetch user details
    for (const transaction of transactions) {
      const user = await User.findOne({ _id: transaction.user_id });
      if (user) {
        users.push(user);
      }
    }

    res.json({ transactions, users });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const getTransactionscfhostel = async (req, res) => {
  try {

    // Assuming you have a Payments model and want to retrieve payments by hostel_no
    const transactions = await Payments.find().sort({ date: -1 });

    // Fetch user details associated with each transaction
    const users = [];
    
    // Iterate over each transaction to fetch user details
    for (const transaction of transactions) {
      const user = await User.findOne({ _id: transaction.user_id });
      if (user) {
        users.push(user);
      }
    }

    res.json({ transactions, users });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getTransactionscfhostel, getTransactionshostel };
