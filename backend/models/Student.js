const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number'],
    },
    course: {
        type: String,
        required: [true, 'Please add a course'],
    },
    status: {
        type: String,
        enum: ['Active', 'Pending', 'Completed', 'Dropped'],
        default: 'Pending',
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Student', studentSchema);
