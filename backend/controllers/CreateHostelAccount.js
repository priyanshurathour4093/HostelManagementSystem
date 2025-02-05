const hostelaccounts = require("../models/HostelAccount");



const createhostelAccount = async(req,res) =>{
    try{
        const {hostel_no,no_of_students} = req.body;
        const hostelaccount = new hostelaccounts({
            hostel_no,
            no_of_students
        });
        await hostelaccount.save();
        res.status(202).json("Account created ")
    }
    catch (error){
        console.log(error);
        return res.status(404).json("error in Group creation ");
    }
    
}
module.exports = createhostelAccount;