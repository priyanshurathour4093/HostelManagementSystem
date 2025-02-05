const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema({
    hostel_name: {
        type: String,
        required: true
    },
    hostel_no: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    total_rooms: {
        type: Number,
        required: true
    },
    occupied_rooms: {
        type: Number,
        default: 0
    },
    student_capacity: {
        type: Number,
        required: true
    },
    students_present: {
        type: Number,
        default: 0
    },
    materialistic_assets: {
        fans: {
            type: Number,
            default: 0
        },
        refrigerators: {
            type: Number,
            default: 0
        },
        waterCoolers: {
            type: Number,
            default: 0
        },
        beds: {
            type: Number,
            default: 0
        },
        chairs: {
            type: Number,
            default: 0
        },
        // Add more materialistic assets as needed
    },
    warden: {
        type: String,
        required: true
    },
    contact_number: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    // Add more properties as needed
});

// Create the Hostel model
const Hostel = mongoose.model("Hostel", hostelSchema);

module.exports = Hostel;
