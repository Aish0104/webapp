const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    //username: { type: String, required: true },
    email: { type: String, required: true },
   password:{ type: String, required: true },
   //college: {type: String, required: true},
   //role: {type: String, enum: ['student', 'lecturer']}
})

//const User = mongoose.model('User', userSchema)

module.exports = User = mongoose.model('users', userSchema);
