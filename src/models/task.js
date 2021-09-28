const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
        trim: true,
    },
    id: {
        type: Number,
        trim: true,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        trim: true,
        required: true,
    },
    body: {
        type: String,
        trim: true,
        required: true,
    },
    status: {
        type: String,
        trim: true,
        enum: ["ACTIVE", "INACTIVE"],
        default: "ACTIVE"
    }
}, {
    timestamps: true
});
const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;