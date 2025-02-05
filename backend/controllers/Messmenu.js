const MessModel = require("../models/MessModel");

const menu = async (req, res) => {
  try {
    const {
      day,
      breakfast,
      breakfast_extra,
      lunch,
      lunch_extra,
      snacks,
      dinner,
      dinner_extra,
      hostel_no,
    } = req.body;
    const menu1 = await MessModel.findOne({ day: day, hostel_no: hostel_no });
    // Find the menu for the specified day and update it if it exists, otherwise create a new one
    if (menu1) {
      const updatedMenu = await MessModel.findOneAndUpdate(
        { day: day, hostel_no: hostel_no },
        {
          $set: {
            day,
            breakfast,
            breakfast_extra,
            lunch,
            lunch_extra,
            snacks,
            dinner,
            dinner_extra,
            hostel_no,
          },
        },
        { new: true, upsert: true }
      );

      if (updatedMenu) {
        return res.status(200).json("menu-updated");
      } else {
        return res.status(202).json("Menu Not Updated");
      }
    } else {
      const newmenu = new MessModel({
        day,
        breakfast,
        breakfast_extra,
        lunch,
        lunch_extra,
        snacks,
        dinner,
        dinner_extra,
        hostel_no,
      });
      await newmenu.save();
      res.json("Menu created");
    }
  } catch (error) {
    console.error("Error in creating", error);
    return res.status(500).json({ err: "Error in creating menu" });
  }
};
module.exports = menu;
