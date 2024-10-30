import mongoose from 'mongoose';
import AutoIncrement from 'mongoose-sequence';

const UserSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.plugin(AutoIncrement(mongoose), { inc_field: 'id' });

const User = mongoose.model('User', UserSchema);

export default User;