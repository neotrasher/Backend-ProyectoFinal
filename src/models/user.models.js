import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },  // nuevo
  age: { type: Number, required: true },       // nuevo
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'usuario'],
    default: function () {
      return this.email === 'adminCoder@coder.com' ? 'admin' : 'usuario';
    }
  }
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
