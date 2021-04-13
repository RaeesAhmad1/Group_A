var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var express = require('express');
var Notices = require('../models/notice');
const config = require('../config');
const noticeRouter = express.Router();
noticeRouter.use(bodyParser.json());
const multer = require('multer');
const path = require('path');


const filestorage = multer.diskStorage({
    destination: "./public/images",
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const pdfFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(pdf)$/)) {
        return cb(new Error('You can upload only pdf files!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: filestorage, fileFilter: pdfFileFilter});

noticeRouter.route('/get-pdf').get((req,res,next)=>{
    Notices.findOne({_id:req.query.id})
    .then((std)=>{
        res.status(200).sendFile(path.join(__dirname, "../public/images/"+std.docLink));
    },(err)=>next(err))
    .catch((err)=>next(err))
})

noticeRouter.route('/add-notice').post(upload.single('docLink'),(req,res,next)=>{
    req.body.docLink=req.file.filename;
    Notices.create(req.body).then(
        (std)=>{
            res.status(200).json(std);
        },(err)=>next(err))
        .catch((err)=>next(err))
})

noticeRouter.route('/get-notices').get((req,res,next)=>{
    Notices.find({}).sort({createdAt: -1}).then((std)=>{
        res.status(200).json(std)
    },(err)=>next(err))
    .catch((err)=>next(err))
})


module.exports = noticeRouter;