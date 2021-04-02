var mongoose = require('mongoose');

//Create user Registration Schema using mongoose
var userRegisterSchema = mongoose.Schema({
    email: { type: String, unique: true },
    password: { type: String,unique: false },
    Name: { type: String,unique: false },
    registrationDate: { type: String,unique: false },
    location: { type: String,unique: false },
    type: { type: String,unique: false },
    userID: { type: String,unique: false }
}, { collection: 'user-register' });
var userRegister =module.exports= mongoose.model('userRegister', userRegisterSchema);