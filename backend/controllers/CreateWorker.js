const Workers = require("../models/workersmodel");

const createWorker = async(req,res) =>{
    try{
        const {w_name,w_email,contact_no,w_post,hostel_no} = req.body;
        const Worker = new Workers({
            w_name,
            w_email,
            contact_no,
            w_post,
            hostel_no
        });
        await Worker.save();
        res.status(202).json("worker created ")
    }
    catch (error){
        console.log(error);
        return res.status(404).json("error in workers ");
    }
    
}
module.exports = createWorker;