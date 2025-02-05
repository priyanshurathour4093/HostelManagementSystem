
const hostelaccounts = require("../models/HostelAccount");

const getHostelAccount = async (req, res) => {
  try {
    const { hostel_no } = req.params;

    // Find the hostel account based on the hostel number
    const hostelAccount = await hostelaccounts.findOne({ hostel_no });

    if (!hostelAccount) {
      return res.status(404).json({ error: 'Hostel account not found' });
    }

    return res.status(200).json(hostelAccount);
  } catch (error) {
    console.error('Error fetching hostel account:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports =  getHostelAccount ;
