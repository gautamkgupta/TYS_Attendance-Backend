const mongoose = require('mongoose');

const RegularizationSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,

    email: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    updated_date: {
        type: Date,
        default: Date.now
    },
    deleted_date: {
        type: Date,
        default: Date.now
    },
});

const RegularizationModel = mongoose.model('Regularization', RegularizationSchema);

module.exports = RegularizationModel;
