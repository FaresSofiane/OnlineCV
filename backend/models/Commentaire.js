const mongoose = require('mongoose');

const CommentaireSchema = new mongoose.Schema({
    cv_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CV', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now }  // Date d'ajout du commentaire
});

const Commentaire = mongoose.model('Commentaire', CommentaireSchema);

module.exports = Commentaire