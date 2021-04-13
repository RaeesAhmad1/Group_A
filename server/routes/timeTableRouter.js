var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var express = require('express');
var Tables = require('../models/timeTable');
const config = require('../config');
const timeTableRouter = express.Router();
timeTableRouter.use(bodyParser.json());
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

timeTableRouter.route('/get-image').get((req,res,next)=>{
    Tables.findOne({_id:req.query.id})
    .then((std)=>{
        res.status(200).sendFile(path.join(__dirname, "../public/images/"+std.image));
    },(err)=>next(err))
    .catch((err)=>next(err))
})

timeTableRouter.route('/add-timeTable').post(upload.single('image'),(req,res,next)=>{
    req.body.image=req.file.filename;
    Tables.create(req.body).then(
        (std)=>{
            res.status(200).json(std);
        },(err)=>next(err))
        .catch((err)=>next(err))
})

timeTableRouter.route('/get-filter').get((req,res,next)=>{
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
    Tables.find(option).then((std)=>{
        res.status(200).json(std)
    },(err)=>next(err))
    .catch((err)=>next(err))
})

timeTableRouter.route('/get-count').get((req,res,next)=>{
    Tables.countDocuments({}).then((c)=>{
        res.status(200).json(c);
    },(err)=>next(err))
    .catch((err)=>next(err))
})

module.exports = timeTableRouter;