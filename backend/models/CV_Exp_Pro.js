import mongoose, {Model, Schema} from "mongoose";

const CVExpProSchema = new Schema({
    cv_id: { type: Schema.Types.ObjectId, ref: 'CV', required: true },
    nom_entreprise: { type: String, required: true },
    poste_occupe: { type: String, required: true },
    date: { type: Date, required: true },
    commentaire: { type: String }
});

const CVExpPro = mongoose.model('CV_Exp_Pro', CVExpProSchema);

export default CVExpPro;