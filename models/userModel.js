const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name !']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email !'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password !'],
        validate: {
            // This only works on create and save
            validator: function (el) {
                return el === this.password;
            }
        },
        message: 'Password are not the same'
    },
    passwordChangedAt: Date
});

userSchema.pre('save', async function (next) {
    // Only run this function if password was actually modified 
    if (!this.isModified('password')) return next();

    // Hash password
    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;
    next();

});

// Return true or false
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

        return JWTTimestamp < changedTimestamp;
    }

    return false;
}
const User = mongoose.model('User', userSchema);

module.exports = User;