const mongoose = require('mongoose');

const CVExpPedagoSchema = new mongoose.Schema({
    cv_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CV', required: true },
    nom_diplome: { type: String, required: true },
    certificateur: { type: String, required: true },
    date: { type: Date, required: true },
    commentaire: { type: String }
});

const CVExpPedago = mongoose.model('CV_Exp_Pedago', CVExpPedagoSchema);

module.exports = CVExpPedago