const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskId: { type: String, required: true, unique: true },
    taskDetails: { type: String, required: true },
    status: { type: String, default: 'pending' },
    pingUrl: { type: String, required: true }, // task will ping this url
    lastPing: { type: Date, default: Date.now } // Time of the last ping
});

module.exports = mongoose.model('Task', taskSchema);
