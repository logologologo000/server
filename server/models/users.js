
const mongoose = require('mongoose');



const Schema = mongoose.Schema
const userSchema = new Schema({
    name: {
        type: 'string',
        required: true, 
    },
    email: {
        type: 'string',
        unique: true,
        required: true
    },
    password: {
        type: 'string',
        required: true
    }
}, {
    collection: 'users',
})

//check unique email
const unique = require('mongoose-unique-validator')
userSchema.plugin(unique, {message: 'Email already exit'})

const User = mongoose.model("users", userSchema)
module.exports = User