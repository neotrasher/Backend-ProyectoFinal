import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: { type: Number },
    password: {
        type: String,
        required: true
    },
    cart: { type: mongoose.Types.ObjectId, ref: 'Carts' },
    role: {
        type: String,
        enum: ['admin', 'usuario']
    },
    githubId: {
        type: String,
        unique: true,
        sparse: true
    },
    username: String,
});

const userModel = mongoose.model('User', userSchema);

export default userModel;

