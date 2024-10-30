const mongoose = require('mongoose');

const CVSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    private: { type: Boolean, default: true }
});


const CV = mongoose.model('CV', CVSchema);
module.exports = CV