const mongoose = require('mongoose');

const CVPersoContentSchema = new mongoose.Schema({
    cv_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CV', required: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    date_naissance: { type: Date, required: true },
    mail: { type: String, required: true }
});

module.exports = mongoose.model('CV_Perso_Content', CVPersoContentSchema);