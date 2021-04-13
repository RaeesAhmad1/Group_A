var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var express = require('express');
var Students = require('../models/students');
const config = require('../config');
const { options } = require('./courseRouter');
const studentRouter = express.Router();
studentRouter.use(bodyParser.json());
const multer = require('multer');
const path = require('path');


const filestorage = multer.diskStorage({
    destination: "./public/images",
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: filestorage, fileFilter: imageFileFilter});

studentRouter.route('/get-all').get((req,res,next)=>{
    Students.find({})
    .then((std)=>{
        res.status(200).json(std);
    },(err)=>next(err))
    .catch((err)=>next(err))
})

studentRouter.route('/get-one').get((req,res,next)=>{
    Students.findOne({_id:req.query.id})
    .then((std)=>{
        res.status(200).json(std)
    },(err)=>next(err))
    .catch((err)=>next(err))
})

studentRouter.route('/get-image').get((req,res,next)=>{
    Students.findOne({_id:req.query.id})
    .then((std)=>{
        res.status(200).sendFile(path.join(__dirname, "../public/images/"+std.image));
    },(err)=>next(err))
    .catch((err)=>next(err))
})

studentRouter.route('/get-filter').get((req,res,next)=>{
    const option={};
    if(req.query.year && req.query.year != ''){
        option.year=req.query.year;
    }
    if(req.query.branch && req.query.branch != ''){
        option.branch=req.query.branch;
    }
    if(req.query.course && req.query.course != ''){
        option.course=req.query.course;
    }
    Students.find(option).then((std)=>{
        res.status(200).json(std)
    },(err)=>next(err))
    .catch((err)=>next(err))
})

studentRouter.route('/get-searched').get((req,res,next)=>{
    Students.findOne({std_no: req.query.std_no})
    .then((std)=>{
        if(std!=null){
            res.status(200).json(std);
        }
        else{
            res.status(404).send('Student Not Found!')
        }
    },(err)=>next(err))
    .catch((err)=>next(err))
})

studentRouter.route('/add-student').post(upload.single('image'),(req,res,next)=>{
    req.body.image=req.file.filename;
    Students.create(req.body).then(
        (std)=>{
            res.status(200).json(std);
        },(err)=>next(err))
        .catch((err)=>next(err))
})
studentRouter.route('/add-subjects').post((req,res,next)=>{
    Students.findByIdAndUpdate(req.query.id,req.body).then(
        (std)=>{
            res.status(200).json(std);
        },(err)=>next(err)
    ).catch((err)=>next(err))
})

studentRouter.route('/del-student').delete((req,res,next)=>{
    Students.deleteOne({_id:req.query.id})
    .then((std)=>{
        res.status(200).send('Deletion Successfull');
    },(err)=>next(err))
    .catch((err)=>next(err))
})

studentRouter.route('/update-student').patch((req,res,next)=>{
    Students.findOneAndUpdate({_id:req.query.id},req.body).then(
        (std)=>{
            res.status(200).json(std);
        },(err)=>next(err))
        .catch((err)=>next(err))
})

studentRouter.route('/get-count').get((req,res,next)=>{
    Students.countDocuments({}).then((c)=>{
        res.status(200).json(c);
    },(err)=>next(err))
    .catch((err)=>next(err))
})

module.exports= studentRouter;