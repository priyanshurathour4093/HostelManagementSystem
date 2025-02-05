const accounts = require("../models/Accounts");


const createAccount= async (req, res) => {
  try {
    const { user_id } = req.body;

    const existingAccount = await accounts.findOne({ user_id });
    if (existingAccount) {
      return res.status(400).json({ error: 'An account with this roll number already exists' });
    }
    console.log(user_id);
    // Create a new account
    const newAccount = new accounts({
      user_id,
      // Add other fields here if needed
    });

    // Save the new account to the database
    await newAccount.save();

    return res.status(201).json(newAccount);
  } catch (error) {
    console.error('Error creating account:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = createAccount;
