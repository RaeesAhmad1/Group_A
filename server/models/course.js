const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    _id:false,
    subject_code:{
        type:String,
        required: true,
        unique: true
    },
    subject_name:{
        type:String,
        required: true
    },
    subject_type:{
        type:String,
        required:true
    },
    subject_branch:{
        type:String,
        required:true
    },
    theory_marks:{
        type:Number,
        required:true
    },
    practical_marks:{
        type:Number,
        required: true
    },
    subject_semester:{
        type:Number,
        required: true
    }
})

const branchSchema = new Schema({
    _id:false,
    branch_name:{
        type:String,
        required:true
    }
})

const courseSchema = new Schema({
    code:{
        type:String,
        required: true,
        unique:true
    },
    name:{
        type:String,
        required: true,
        unique:true
    },
    duration:{
        type:Number,
        required:true
    },
    semesters:{
        type:Number,
        required:true
    },
    subjects:[subjectSchema],
    branches:[branchSchema]
},{
    timestamps:true
})

var Courses = mongoose.model('Course',courseSchema,'courseList');
module.exports= Courses;