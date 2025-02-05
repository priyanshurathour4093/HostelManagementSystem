const GroupModel = require("../models/GroupModel");
const User = require("../models/usermodel");


const getGroups = async (req, res) => {
    try {
        // Fetch all groups with only the "_id" field included
        const groups = await GroupModel.find();

        // Extract _id values from the documents and store them in a single array
        // const groupIds = groups.map(group => group._id);

        // Send the array of group IDs as response
        res.status(200).json(groups);
    } catch (error) {
        console.error("Error in retrieving group chat", error);
        res.status(500).json({ error: "Error in retrieving group chat" });
    }
};

const getusergroup = async (req, res) => {
    try {
        const {user_id}=req.params;

        
        // Fetch the latest 10 announcements for the given hostel
        const userGroups=await User.findOne({_id:user_id}).populate('groups');
        // console.log(userGroups.groups);
        
        res.status(202).json(userGroups.groups);
    } catch (error) {
        console.error("Error in retreiving group chat", error);
        return res.status(500).json({ err: "Error in retreiving group chat" });
    }
};

module.exports = {getGroups,getusergroup};
