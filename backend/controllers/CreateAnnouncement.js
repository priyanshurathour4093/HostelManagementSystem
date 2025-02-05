const Announcement = require("../models/Announcementsmodel");
const {Counter,getNextSequenceValue} = require('../models/counterModel.js');
const createAnnouncement = async (req, res) => {
    try {
        const { announcement_id,user_name,title,announcement_message,hostel_no} = req.body;
        if(announcement_id==0) 
        {
            const nextId = await getNextSequenceValue('announcement_id');
            const newAnnouncement= new Announcement({
                announcement_id:nextId,
                user_name,
                title,
                announcement_message,
                hostel_no
              });
              await newAnnouncement.save();
              res.json("Announcement created");

        }
        else{
            const updatedAnnouncement = await Announcement.findOneAndUpdate(
                {announcement_id:announcement_id },
                {
                  $set: {
                    announcement_id,
                    user_name,
                    title,
                    announcement_message,
                    hostel_no
                    
                  },
                },
                { new: true, upsert: true }
              );
              await updatedAnnouncement.save();
              res.json("Announcement updated");

        }
        
    
      
    } catch (error) {
        console.error("Error in Announcement", error);
        return res.status(500).json({ err: "Error in Announcement" });
    }   
};
module.exports=createAnnouncement;