var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var express = require('express');
var Users = require('../models/users');
const config = require('../config');
const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.route("/register").post((req, res, next) => {
    password= req.body.pswd;
    bcrypt.hash(password, 10, (err, hash) => {
      Users
      .create({
        username:req.body.name.toLowerCase().slice(0, 4).trim() + req.body.mobile.toString().slice(0, 4),
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        privilege: req.body.privilege,
        dept: req.body.dept,
        pswd: hash,
      }).then((user) => {
        res.status(200).json({ status: "Registration Successful!"});
      }).catch((err) => {
        if (err.code === 11000)
          res.status(409).json({ status: "Duplicate Entry Found" });
        else res.status(500).json({ status: "Internal Server" });
      });
    },(err)=>next(err)) 
  
  });

  userRouter.route("/login").post((req,res,next)=>{
    Users.findOne({username: req.body.username})
    .then((user)=>{
      if(!user){
        res.status(401).end('User Not Found')
      }
      else{
        bcrypt.compare(req.body.pswd,user.pswd,(err, result)=>{
          if(result == true){
            let token= jwt.sign({id:user._id},config.secretKey,{expiresIn:'2h'});
            res.status(200).json({"Login":"True","token":token,"_id":user._id,"privilege":user.privilege});
          }
          else{
            res.status(403).send('Incorrect Password');
          }
        })
      }
    },((err)=>next(err))
    ).catch((err)=>next(err));
  });

  userRouter.route("/getAll").get((req,res,next)=>{
    Users.find({})
    .then((user)=>{
      res.status(200).json(user);
    },((err)=>next(err))
    ).catch((err)=>next(err));
  });

  userRouter.route("/getuser/:id").get((req,res,next)=>{
    Users.findOne({_id:req.params.id})
    .then((user)=>{
      res.status(200).json(user);
    },((err)=>next(err))
    ).catch((err)=>next(err));
  });

  userRouter.route("/delete/:id").delete((req,res,next)=>{
    Users.deleteOne({_id:req.params.id})
    .then((user)=>{
      res.status(200).send("Deletion Successfull");
    },((err)=>next(err))
    ).catch((err)=>next(err));
  })

  userRouter.route("/update/:id").patch((req,res,next)=>{
    Users.findByIdAndUpdate(req.params.id,req.body)
    .then((user)=>{
      res.status(200).json(user);
    },((err)=>next(err))
    ).catch((err)=>next(err));
  })

  userRouter.route('/get-count').get((req,res,next)=>{
    Users.countDocuments({}).then((c)=>{
        res.status(200).json(c);
    },(err)=>next(err))
    .catch((err)=>next(err))
})

  module.exports=userRouter;