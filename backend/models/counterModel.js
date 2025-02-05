const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);
async function getNextSequenceValue(counterName) {
    const counter = await Counter.findByIdAndUpdate(counterName, { $inc: { seq: 1 } }, { new: true, upsert: true });
    return counter.seq;
}
module.exports = {Counter,getNextSequenceValue};
