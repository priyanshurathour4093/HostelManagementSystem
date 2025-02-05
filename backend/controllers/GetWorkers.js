const Workers = require("../models/workersmodel");


const getWorker = async (req, res) => {
    try {
        const { hostel_no } = req.body;
        console.log(hostel_no);

        let workers;
        if (hostel_no != 0) {
            workers = await Workers.find({hostel_no });
        } else {
            workers = await Workers.find();
        }

        // Assuming createdAt is a field in the Complaints schema
        

        console.log(workers);
        res.json(workers);
    } catch (error) {
        console.error("Error in getWorker:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = getWorker;
