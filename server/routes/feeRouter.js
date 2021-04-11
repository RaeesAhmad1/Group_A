var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var express = require('express');
var Fees = require('../models/fee');
const config = require('../config');
const { options } = require('./userRouter');
const feeRouter = express.Router();
feeRouter.use(bodyParser.json());


feeRouter.route('/get-all').get((req,res,next)=>{
    Fees.find({})
    .then((fee)=>{
        res.status(200).json(fee);
    },(err)=>next(err))
    .catch((err)=>next(err))
})

feeRouter.route('/get-filter').get((req,res,next)=>{
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
    Fees.find(option)
    .then((fee)=>{
        res.status(200).json(fee);
    },(err)=>next(err))
    .catch((err)=>next(err))
})

feeRouter.route('/create').post((req,res,next)=>{
    Fees.findOne({year:req.body.year, course:req.body.course, branch:req.body.branch})
    .then((fee)=>{
        if(fee!=''&&fee!=null){
            console.log('1');
            Fees.findByIdAndUpdate(fee._id,{
                course: req.body.course,
                year: req.body.year,
                branch: req.body.branch,
                tutionfee: req.body.tutionfee,
                bookfees: req.body.bookfees,
                hostelfee: req.body.hostelfee,
                otherfee: req.body.otherfee,
                totalfee: req.body.tutionfee+req.body.hostelfee+req.body.bookfees+req.body.otherfee
            })
            .then((f)=>{
                res.status(200).json({"status":"Update Successfull"});
            },(err)=>next(err))
        }
        else{
            Fees.create({
                course: req.body.course,
                year: req.body.year,
                branch: req.body.branch,
                tutionfee: req.body.tutionfee,
                bookfees: req.body.bookfees,
                hostelfee: req.body.hostelfee,
                otherfee: req.body.otherfee,
                totalfee: req.body.tutionfee+req.body.hostelfee+req.body.bookfees+req.body.otherfee
            })
            .then((f)=>{
                res.status(200).json(f);
            },(err)=>next(err))
        }
    },(err)=>next(err))
    .catch((err)=>next(err))
})

feeRouter.route('/delete').delete((req,res,next)=>{
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
    Fees.deleteMany(option)
    .then((x)=>{
        res.status(200).send('Deletion successfull!');
    },(err)=>next(err))
    .catch((err)=>next(err));
})

module.exports= feeRouter;