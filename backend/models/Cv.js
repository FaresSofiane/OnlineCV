const mongoose = require('mongoose');

const CVSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    private: { type: Boolean, default: true }
});

module.exports = mongoose.model('CV', CVSchema);