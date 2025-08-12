const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    ki: {
        type: String,
        required: true
    },
    race: {
        type: String,
        required: true
    },
    affiliation: {
        type: String,
        required: true
    }
    }, {
    timestamps: true
    });

module.exports = mongoose.model('Character', characterSchema);