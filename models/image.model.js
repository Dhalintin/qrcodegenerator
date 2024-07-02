const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    imageData: {
        type: String,
        required: true
    },
    format: {
        type: String,
        required: true
    },
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;