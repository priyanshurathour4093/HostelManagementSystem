const MessModel = require("../models/MessModel");
const Hostel = require("../models/hostelmodel");
const User = require("../models/usermodel");
const handletRebate = async (req, res) => {
    try {
        const { hostel_no, userId, isOnLeave } = req.body;

        // Find the hostel and user
        const hostel = await Hostel.findOne({ hostel_no });
        const user = await User.findOne({ _id: userId });

        // If user and hostel exist
        if (user && hostel) {
            console.log("isOnLeave", isOnLeave);
            // Update user's currently_present status based on isOnLeave
            user.currently_present = isOnLeave; // Set user's currently_present status to isOnLeave

            // Update hostel's students_present count based on isOnLeave
            if (isOnLeave) {
                hostel.students_present = hostel.students_present + 1; // If on leave, increment students_present
            } else {
                hostel.students_present = Math.max(hostel.students_present - 1, 0); // If not on leave, decrement students_present (ensuring it doesn't go negative)
            }

            // Save the updated user and hostel
            const updatedUser = await user.save();
            const updatedHostel = await hostel.save();

            // Respond with the updated user
            res.status(200).json(updatedHostel);
        } else {
            res.status(404).json({ error: "Hostel or User not found" });
        }
    } catch (error) {
        console.error("Error processing rebate:", error);
        res.status(500).json({ error: "Error processing rebate" });
    }
}


const getMenu = async (req, res) => {
    try {
        const {hostel_no}=req.body;
        console.log(req.body);
        // Fetch all menu items from the database
        const menuItems = await MessModel.find({hostel_no: hostel_no });

        console.log(menuItems)

        // Check if menu items exist
        if (!menuItems) {
            return res.status(404).json({ message: "Menu not found" });
        }
        console.log(menuItems);
        // Return the menu items
        return res.status(200).json(menuItems);
    } catch (error) {
        console.error("Error fetching menu:", error);
        return res.status(500).json({ error: "Error fetching menu" });
    }
};

module.exports = {handletRebate, getMenu };
