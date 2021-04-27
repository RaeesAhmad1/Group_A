const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const timeTableSchema = new Schema({
    course:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})

var Tables = mongoose.model('Tables',timeTableSchema,'tableList');
module.exports= Tables;