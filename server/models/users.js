const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    mobile:{
        type: Number,
        required: true,
        unique: true
    },
    privilege:{
        type: Number,
        required: true
    },
    dept:{
        type: String,
        required: true
    },
    pswd:{
        type: String,
        required: true
    },

}, {
    timestamps:true
})

var Users = mongoose.model('Users',userSchema,'userList');
module.exports= Users;