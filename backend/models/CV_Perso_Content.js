import mongoose, {Model, Schema} from "mongoose";

const CVPersoContentSchema = new Schema({
    cv_id: { type: Schema.Types.ObjectId, ref: 'CV', required: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    date_naissance: { type: Date, required: true },
    mail: { type: String, required: true }
});

const CVPersoContent = mongoose.model('CV_Perso_Content', CVPersoContentSchema);

export default CVPersoContent;