const GroupModel = require("../models/GroupModel");
const MessageModel = require("../models/MessageModel");


const getGroupMessage = async (req, res) => {
    try {
        console.log("React")
        const { group_id } = req.params;
        console.log(group_id)
        // Fetch the latest 10 announcements for the given hostel
        const GroupChat=await GroupModel.find({group_id:group_id}).populate("messages"); 
        // console.log(GroupChat)\\

    const populatedMessages = await MessageModel.find( {group_id} ).populate('user_id' , 'full_name profile_pic');
        // console.log(GroupChat);
         //const populatedMessages = await MessageModel.populate(GroupChat.messages, { path: 'user_id' });
        GroupChat[0].messages=populatedMessages;
        //console.log()
    //    console.log(GroupChat[0].messages[2].user_id.full_name)
        // console.log(GroupChat[0].messages);
        
        res.status(202).json(GroupChat);
    } catch (error) {
        console.error("Error in retreiving group chat", error);
        return res.status(500).json({ err: "Error in retreiving group chat" });
    }
};

module.exports = getGroupMessage;
