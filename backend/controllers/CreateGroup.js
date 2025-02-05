const GroupModel = require("../models/GroupModel");


const createGroup = async(req,res) =>{
    try{
        const {group_id,group_name} = req.body;
        const Group = new GroupModel({
            group_id,
            group_name
        });
        await Group.save();
        res.status(202).json("Group created ")
    }
    catch (error){
        console.log(error);
        return res.status(404).json("error in Group creation ");
    }
    
}
module.exports = createGroup;