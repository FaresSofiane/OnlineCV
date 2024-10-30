import mongoose from 'mongoose';

const CVSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    private_cv: { type: Boolean, default: true }
});

const CV = mongoose.model('CV', CVSchema);

export default CV;