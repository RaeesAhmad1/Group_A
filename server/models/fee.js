const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feeSchema = new Schema({
    course:{
        type:String,
        required: true
    },
    year:{
        type:Number,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    tutionfee:{
        type: Number,
        required: true
    },
    bookfees:{
        type: Number,
        required: true
    },
    hostelfee:{
        type: Number,
        required:true       
    },
    otherfee:{
        type:Number,
        required:true
    },
    totalfee:{
        type: Number,
        required: true
    }
})

var Fees = mongoose.model('Fee',feeSchema,'feeStructure');
module.exports= Fees;