const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        min: 2,
        required: true
    },

    body: {
        type: String,
        min: 3,
        required: true
    },

    data: {
        type: Date,
        default: Date.now
    }

}, { versionKey: false });

module.exports = mongoose.model('Topshiriqlar', postSchema);