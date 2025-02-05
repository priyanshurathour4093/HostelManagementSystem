const GroupModel = require("../models/GroupModel");
const MessageModel = require("../models/MessageModel");

const createMessage = async (req, res) => {
    try {
        const { user_id, message, group_id } = req.body;
        console.log(req.body);
        // Find the group based on group_id
        const group = await GroupModel.findOne({group_id:group_id});
        console.log(group);
        // If group is not found, return an error
        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }
        

        // Create a new message
        const messageDoc = new MessageModel({
            user_id,
            message,
            group_id
        });
        console.log(messageDoc._id);
        // Push the message reference into the group's messages array
        group.messages.push(messageDoc._id);

        // Save the message and the updated group
        await Promise.all([messageDoc.save(), group.save()]);

        // Respond with success
        res.status(202).json("Message created");
    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: "Error in message creation" });
    }
};

module.exports = createMessage;
