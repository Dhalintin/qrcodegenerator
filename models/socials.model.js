const mongoose = require('mongoose');

const socialSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    facebook: {
        type: String,
        required: false,
    },
    linkedin: {
        type: String,
        required: false,  
    },
    instagram: {
        type: String,
        required: false,
    },
    whatsapp: {
        type: String,
        required: false,
    },
    telegram: {
        type: String,
        required: false,
    },
    twitter: {
        type: String,
        required: false,
    },
})

module.exports = mongoose.model('Social', socialSchema);