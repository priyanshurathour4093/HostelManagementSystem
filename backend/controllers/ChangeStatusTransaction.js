const accounts = require('../models/Accounts');
const hostelaccounts = require('../models/HostelAccount');
const Payments = require('../models/Paymentsmodel');
// const Transaction = require('../models/Transaction');

const updateTransactionStatus = async (req, res) => {
  try {
    const { T_id, status } = req.body;
    //console.log(T_id+" "+status);
    // Find the transaction by T_id and update its status
    const transaction=await Payments.findOne({T_id});
    const currentAmount=transaction.amount;
    const hostel_no=transaction.hostel_no;
    const prev_status=transaction.status;
    const user_id=transaction.user_id;
    // console.log(transaction);
    let updatedTransaction;
    if(prev_status=='Not Verified'|| prev_status=='Verified')
    {
    if(status=='Failed')
    {
        
        const hostelAccount = await hostelaccounts.findOne({hostel_no});

        if (!hostelAccount) {
          return res.status(404).json({ message: 'Hostel account not found' });
        }
    
        // Update the account with the current amount
        hostelAccount.hostel_paid -= currentAmount;
        console.log(hostelAccount.hostel_paid);
        const userAccount=await accounts.findOne({user_id});
        userAccount.user_paid-=currentAmount;
        userAccount.user_dues+=currentAmount;
        await userAccount.save();
        await hostelAccount.save();


    }
     updatedTransaction = await Payments.findOneAndUpdate(
      { T_id },
      { status },
      { new: true } // Return the updated transaction
    );
     }
     else 
     {
        if(status=='Verified')
    {
        const hostelAccount = await hostelaccounts.findOne({hostel_no});

        if (!hostelAccount) {
          return res.status(404).json({ message: 'Hostel account not found' });
        }
    
        // Update the account with the current amount
        hostelAccount.hostel_paid += currentAmount;
        console.log(hostelAccount.hostel_paid);
        const userAccount=await accounts.findOne({user_id});
        userAccount.user_paid+=currentAmount;
        userAccount.user_dues-=currentAmount;
        await userAccount.save();
        await hostelAccount.save();


    }
     updatedTransaction = await Payments.findOneAndUpdate(
      { T_id },
      { status },
      { new: true } // Return the updated transaction
    );
     }
    
    if (!updatedTransaction) {
      // If the transaction with the provided T_id does not exist
      return res.status(404).json({ error: 'Transaction not found' });
    }


    // Send the updated transaction in the response
    res.json(updatedTransaction);
  } catch (error) {
    console.error('Error updating transaction status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = updateTransactionStatus;
