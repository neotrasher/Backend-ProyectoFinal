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
        enum: ['admin', 'usuario', 'premium']
    },
    githubId: {
        type: String,
        unique: true,
        sparse: true
    },
    username: String,
    passwordResetToken: String, 
    passwordResetExpires: Date, 
});

const userModel = mongoose.model('User', userSchema);

export default userModel;

