const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
    },
    Email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    Password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
        select: false, // DO NOT RETURN PASSWORD BY DEFAULT.
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'author'],
        default: 'user',
    },
},{timestamps: true});

//pre-hook to hash password before saving
userSchema.pre('save', async function () {
    if (!this.isModified('Password')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
});

//method to compare a password to a hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.Password);
};

module.exports = mongoose.model('User', userSchema);