const HostelModel = require("../models/hostelmodel");
const addHostel = async (req, res) => {
    try {
        const { hostel_name, hostel_no, address, total_rooms, student_capacity, warden, contact_number, email } = req.body;
        const { fans, refrigerators, waterCoolers, beds, chairs } = req.body.materialistic_assets;

        const newHostel = new HostelModel({
            hostel_name,
            hostel_no,
            address,
            total_rooms,
            student_capacity,
            materialistic_assets: {
                fans,
                refrigerators,
                waterCoolers,
                beds,
                chairs
            },
            warden,
            contact_number,
            email
        });

        const savedHostel = await newHostel.save();
        res.status(201).json(savedHostel); // Respond with the saved hostel
    } catch (error) {
        console.error("Error adding hostel:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getallhostels = async (req, res) => {
  try {

    const allHostels = await HostelModel.find();

    // If hostels are found, send them in the response
    if (allHostels.length > 0) {
      res.status(200).json(allHostels);
    } else {
      // If no hostels are found, send an appropriate message
      res.status(404).json({ message: 'No hostels found' });
    }
  } catch (error) {
    // If an error occurs, send an error response
    console.error('Error fetching hostels:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const gethostel = async (req, res) => {
  try {
    // Extract the hostel_no from the request body
    const { hostel_no } = req.body;
    console.log(hostel_no);

    // Use Mongoose to find the hostel in the database
    const Hostels = await HostelModel.findOne({ hostel_no: hostel_no });

    // If a hostel is found, send it in the response
    if (Hostels) {
      res.status(200).json(Hostels);
    } else {
      // If no hostel is found, send an appropriate message
      res.status(404).json({ message: 'No hostel found' });
    }
  } catch (error) {
    // If an error occurs, send an error response
    console.error('Error fetching hostel:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = { getallhostels ,addHostel,gethostel};
