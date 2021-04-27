var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var express = require('express');
var Courses = require('../models/course');
const config = require('../config');
const courseRouter = express.Router();
courseRouter.use(bodyParser.json());

courseRouter.route('/get-all').get((req,res,next)=>{
    Courses.find({})
    .then((course)=>{
        res.status(200).json(course);
    },(err)=>next(err))
    .catch((err)=>next(err))
})

courseRouter.route('/get-courses').get((req,res,next)=>{
    Courses.find({})
    .then((course)=>{
        let l= course.length;
        let i=0;
        name=[];
        for(i=0;i<l;i++){
            name[i]=course[i].name;
        }
        res.status(200).json(name);
    },(err)=>next(err))
    .catch((err)=>next(err))
})

courseRouter.route('/get-branches/:name').get((req,res,next)=>{
    Courses.findOne({name:req.params.name})
    .then((course)=>{
        let l= course.branches.length;
        let i=0;
        name=[];
        for(i=0;i<l;i++){
            name[i]=course.branches[i].branch_name;
        }
        res.status(200).json(name);
    },(err)=>next(err))
    .catch((err)=>next(err))
})

courseRouter.route('/del-branch/:name&:b_name').delete((req,res,next)=>{
    Courses.findOne({name:req.params.name})
    .then((course)=>{
        if(course!=null){
            course.branches.pull({branch_name:req.params.b_name});    
            course.subjects.pull({subject_branch:req.params.b_name}); 
            course.save()
            .then((user)=>{
                res.status(200).json(user);
              },(err)=>next(err));
        }
        else{
            err = new Error('Course ' + req.params.Id + ' not found');
            err.status = 404;
            return next(err);
          }
    }, (err) => next(err))
    .catch((err) => next(err)
    );
})


courseRouter.route('/create').post((req,res,next)=>{
    Courses.findOne({code:req.body.code})
    .then((course)=>{
        if(course!=null){
            res.status(409).send('Course already exists!')
        }
        else{
            Courses.create({
                code: req.body.code,
                name: req.body.name,
                duration: req.body.duration,
                semesters: req.body.semesters,                 
            }).then((course)=>{
                res.status(200).json(course);
            },(err)=>next(err))
        }
    },(err)=>next(err))
    .catch((err)=>{
        if (err.code === 11000)
        res.status(409).json({ status: "Duplicate Entry Found" });
      else res.status(500).json({ status: "Internal Server" });
    })
})

courseRouter.route('/add-branches/:name').post((req,res,next)=>{
    Courses.findOne({name:req.params.name})
    .then((course)=>{
        if(course!=null){
            for(let i=0;i<req.body.length;i++){
                course.branches.push(req.body[i]);
              }
              course.save()
              .then((user)=>{
                res.status(200).json(user);
              },(err)=>next(err));
        }
        else{
            res.status(405).send('Error');
        }
    },(err)=>next(err))
    .catch((err)=>next(err))
})

courseRouter.route('/add-subject/:id').post((req,res,next)=>{
    Courses.findOne({_id:req.params.id})
    .then((course)=>{
        if(course!=null){
            course.subjects.push(req.body);
            course.save()
            .then((user)=>{
                res.status(200).json(user);
              },(err)=>next(err));
        }
        else{
            err = new Error('Course ' + req.params.Id + ' not found');
            err.status = 404;
            return next(err);
          }
    }, (err) => next(err))
    .catch((err) => next(err)
    );
})

courseRouter.route('/get-years').get((req,res,next)=>{
    Courses.findOne({name:req.query.name})
    .then((course)=>{
        if(course!=null){
            res.status(200).json(course.duration);
        }
        else{
            err = new Error('Course ' + req.params.Id + ' not found');
            err.status = 404;
            return next(err);
          }
    }, (err) => next(err))
    .catch((err) => next(err)
    );
})

courseRouter.route('/get-subjects/:id').get((req,res,next)=>{
    Courses.findOne({_id:req.params.id})
    .then((course)=>{
        if(course!=null){
            res.status(200).json(course.subjects);
        }
        else{
            err = new Error('Course ' + req.params.Id + ' not found');
            err.status = 404;
            return next(err);
          }
    }, (err) => next(err))
    .catch((err) => next(err))
})

courseRouter.route('/delete-course/:name').delete((req,res,next)=>{
    Courses.deleteOne({name: req.params.name})
    .then((cr)=>{
        res.status(200).send('Deletion Successfull!');
    }, (err) => next(err))
    .catch((err) => next(err))
})

courseRouter.route('/find-course/:name').get((req,res,next)=>{
    Courses.findOne({name: req.params.name})
    .then((cr)=>{
        res.status(200).json(cr);
    }, (err) => next(err))
    .catch((err) => next(err))
})

courseRouter.route('/update-course/:name').post((req,res,next)=>{
    Courses.findOneAndUpdate({name: req.params.name},{
        code: req.body.code,
        name: req.body.name,
        duration: req.body.duration,
        semesters: req.body.semesters, 
    })
    .then((cr)=>{
        res.status(200).send('Course Updated');
    }, (err) => next(err))
    .catch((err) => next(err))
})

courseRouter.route('/del-subject/:id&:c_name&:b_name').delete((req,res,next)=>{
    Courses.findOne({_id:req.params.id})
    .then((course)=>{
        if(course!=null){
            course.subjects.pull({subject_code:req.params.c_name});
            course.save()
            .then((user)=>{
                res.status(200).json(user);
              },(err)=>next(err));
        }
        else{
            err = new Error('Course ' + req.params.Id + ' not found');
            err.status = 404;
            return next(err);
          }
    }, (err) => next(err))
    .catch((err) => next(err)
    );
})

courseRouter.route('/get-core-subjects/:name&:b_name&:s_no').get((req,res,next)=>{
    Courses.findOne({name:req.params.name})
    .then((course)=>{
        let l= course.subjects.length;
        let i=0;
        name=[];
        for(i=0;i<l;i++){
            if(course.subjects[i].subject_type=='Core' && course.subjects[i].subject_branch==req.params.b_name && course.subjects[i].subject_semester==req.params.s_no){
                name.push({subject_name:course.subjects[i].subject_name});
                
            }
            
        }
        res.status(200).json(name);
    },(err)=>next(err))
    .catch((err)=>next(err))
})

courseRouter.route('/get-optional-subjects/:name&:b_name&:s_no').get((req,res,next)=>{
    Courses.findOne({name:req.params.name})
    .then((course)=>{
        let l= course.subjects.length;
        let i=0;
        name=[];
        for(i=0;i<l;i++){
            if(course.subjects[i].subject_type=='Optional' && course.subjects[i].subject_branch==req.params.b_name && course.subjects[i].subject_semester==req.params.s_no){
                name.push({subject_name:course.subjects[i].subject_name});
            }
            
        }
        res.status(200).json(name);
    },(err)=>next(err))
    .catch((err)=>next(err))
})


courseRouter.route('/get-count-all').get((req,res,next)=>{
    Courses.find({}).then((courses)=>{
        let x = courses.length;
        let i=0;
        let y=0;
        let z=0;
        for(i=0;i<x;i++){
            y=y+courses[i].branches.length;
            z=z+courses[i].subjects.length;
        }
        res.status(200).json({course:x,branch:y,subject:z});
    },(err)=>next(err))
    .catch((err)=>next(err))
})

module.exports= courseRouter;