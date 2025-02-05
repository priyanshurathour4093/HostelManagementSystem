const GroupModel = require("../models/GroupModel");
const User = require("../models/usermodel");

const joinGroup = async (req, res) => {
    try {
        const { user_id, group_id } = req.body;

        // Find the user by user_id
        const user = await User.findOne({ _id: user_id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the group by group_id
        const group = await GroupModel.findOne({ group_id: group_id });
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        // Add the group_id to the user's groups array
        user.groups.push(group._id);
        await user.save();

        // Add the user_id to the group's participants array
        group.participants.push(user_id);
        await group.save();

        return res.status(200).json({ message: "User joined the group successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = joinGroup;
