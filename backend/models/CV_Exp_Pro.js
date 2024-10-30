const mongoose = require('mongoose');

const CVExpProSchema = new mongoose.Schema({
    cv_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CV', required: true },
    nom_entreprise: { type: String, required: true },
    poste_occupe: { type: String, required: true },
    date: { type: Date, required: true },
    commentaire: { type: String }
});

const CVExpPro = mongoose.model('CV_Exp_Pro', CVExpProSchema);

module.exports = CVExpPro