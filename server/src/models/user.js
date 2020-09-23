const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: function(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email address');
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate: function(value) {
            if (value.length < 8) {
                throw new Error('Password must contains at least 8 characters');
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
})

userSchema.set('toObject', {virtuals: true})

userSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.password;
    delete obj.tokens;
    return obj
}

userSchema.methods.addToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
    this.tokens.push({token});
    return token;
}

userSchema.virtual('tasks', {
    ref: 'Task',
    foreignField: 'owner',
    localField: '_id'
})

userSchema.pre('save', async function() {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
        this.tokens = [];
    }
});

userSchema.pre('remove', async function() {
    await Task.deleteMany({owner: this._id});
})

const User = mongoose.model('User', userSchema);

module.exports = User;