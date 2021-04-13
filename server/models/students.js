const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const subjectSchema = new Schema({
    _id:false,
    subject_name:{
        type:String,
        required:true
    }
})


const studentSchema = new Schema({
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
    },
    course:{
        type:String,
        required:true,
    },
    branch:{
        type: String,
        required: true
    },
    std_no:{
        type: Number,
        required: true,
        unique: true
    },
    dob:{
        type:Date,
        required: true
    },
    gender:{
        type:String,
        required: true
    },
    year:{
        type:Number,
        required:true
    },
    semester:{
        type:Number,
        required:true
    },    
    core_subjects:[subjectSchema],
    optional_subjects:[subjectSchema],
    address:{
        type:String,
        required: true
    },
    city:{
        type:String,
        required: true
    },    
    fatherName:{
        type:String,
        required: true,
    },
    motherName:{
        type:String,
        required: true,
    },
    fatherOccupation:{
        type:String,
        required: true,
    },
    motherOccupation:{
        type:String,
        required: true,
    },
    hostler:{
        type:String,
        required: true,        
    },
    feeStatus:{
        type:String,
        required:true,
        default: 'Not Paid'
    },
    image:{
        type:String
    }
}, {
    timestamps:true
})

var Students = mongoose.model('Students',studentSchema,'studentList');
module.exports= Students;