var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
   username: String,
   email: String,
   password: String,
   password2: String
}, {timestamps: true} , {collections: 'user'})

module.exports = mongoose.model('User' , userSchema)