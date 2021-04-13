
const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    department: {
        type: [String],
        required: true
    },
    year: {
        type: [Number],
        required: true
    },
    docLink: {
        type: String
    }
}, { timestamps: true });


const Notice = mongoose.model('Notice', NoticeSchema);
module.exports = Notice;