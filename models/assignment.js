const mongoose = require("mongoose");
// const validator = require("validator");

const assignmentSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    // studentlist: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'User'
    //     }
    // ],
    publishedat: {
        type: Date,
        required: true
    },
    deadlinedate: {
        type: Date,
        required: true
    },
    assignedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String
    }
});

const Assignment = new mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;