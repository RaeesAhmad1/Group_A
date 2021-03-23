var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
Authentication = require('./models/authentication.js');
Multiplication = require('./models/multiplication.js');
userRegister = require('./models/userRegistration.js');
StudentRegister = require('./models/studentRegistration.js');
EmployeeRegister = require('./models/employeeRegistration.js');
Attendance = require('./models/attendance.js');
Fees = require('./models/fees.js');
Salary = require('./models/salary.js');
//cors XML used to resolve the errors and main purpose of cors to connect frontend to backend
var cors = require('cors');
const userRegistration = require('./models/userRegistration.js');
cors({ credentials: true, origin: true })
app.use(cors())
// Parsers for POST data
app.use(bodyParser.json(), function (err, req, res, next) {
    if (err) {
        return res.status(500).json({ error: err });
    }
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
// .................................................................
//    DATABASE CONNECTION MONGODB
//..................................................................
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/college_db', {
    useMongoClient: true
    /* other options */
});
//Login post request to mlab from server
app.post('/api/login', function (request, response) {
    if (request.body.type == "superAdmin") {
        Authentication.find(request.body, function (err, get) {
            if (err) {
                console.log("get", err)
                return response.status(500).send(err)
            }
            if (!get) {
                return response.status(404).send()
            }
            console.log("Login Succcessfully!!! Welcome ", get)
            return response.status(200).send(get)
        })
    }
    else if (request.body.type == "admin") {
        userRegistration.find(request.body, function (err, get) {
            if (err) {
                console.log("get", err)
                return response.status(500).send(err)
            }
            if (!get) {
                return response.status(404).send()
            }
            console.log("Login Succcessfully!!! Welcome ", get.name)
            return response.status(200).send(get)
        })
    }
    else if (request.body.type == "manager") {
        userRegistration.find(request.body, function (err, get) {
            if (err) {
                console.log("get", err)
                return response.status(500).send(err)
            }
            if (!get) {
                return response.status(404).send()
            }
            console.log("Login Succcessfully!!! Welcome ", get.name)
            return response.status(200).send(get)
        })
    }
    else {
        EmployeeRegister.find(request.body, function (err, get) {
            if (err) {
                console.log("get", err)
                return response.status(500).send(err)
            }
            if (!get) {
                return response.status(404).send()
            }
            console.log("Login Succcessfully!!! Welcome ", get.name)
            return response.status(200).send(get)
        })
    }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Multiplication API
app.post('/api/multiplication', function (request, response) {
    response.header('Access-Control-Allow-Origin', "*");
    num1 = request.body.num1
    num2 = request.body.num2
    console.log("Hello your answer is ", num1 * num2)
    // return response.send("Helloyour answer is ", num1*num2);
})
// //register user post request to mlab from server
app.post('/api/userRegistration', function (request, response) {
    response.header('Access-Control-Allow-Origin', "*");
    var data = {
        email: request.body.email,
        password: request.body.password,
        amount: request.body.amount,
        location: request.body.location,
        registrationDate: request.body.registrationDate,
        type: request.body.type
    };
    var UserData = new userRegister(data);
    UserData.save(function (err, getData) {
        if (!err) {
            console.log("data", getData)
            return response.status(200).send(getData);
        } else {
            console.log("Err", err)
            return response.status(500).send(err);
        }
    })
})
// //register employee (teachers) post request to mlab from server
app.post('/api/employeeRegistration', function (request, response) {
    response.header('Access-Control-Allow-Origin', "*");
    var data = {
        email: request.body.email,
        password: request.body.password,
        employeeName: request.body.employeeName,
        fatherName: request.body.fatherName,
        registrationDate: request.body.registrationDate,
        employeeType: request.body.employeeType,
        employeeID: request.body.employeeID,
        salary: request.body.salary,
        type: "teacher"
    };
    var EmployeeData = new EmployeeRegister(data);
    EmployeeData.save(function (err, getData) {
        if (!err) {
            console.log("data", getData)
            return response.status(200).send(getData);
        } else {
            console.log("Err", err)
            return response.status(500).send(err);
        }
    })
})
// //register student post request to mlab from server
app.post('/api/studentRegistration', function (request, response) {
    response.header('Access-Control-Allow-Origin', "*");
    var data = {
        email: request.body.email,
        studentName: request.body.studentName,
        fatherName: request.body.fatherName,
        registrationDate: request.body.registrationDate,
        class: request.body.class,
        QRno: request.body.QRno,
        studentFees: request.body.studentFees,
        type: "student"
    };
    var StudentData = new StudentRegister(data);
    StudentData.save(function (err, getData) {
        if (!err) {
            console.log("data", getData)
            return response.status(200).send(getData);
        } else {
            console.log("Err", err)
            return response.status(500).send(err);
        }
    })
})
//View college request to mlab from server
app.get('/api/viewUser', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    userRegister.find(function (err, data) {
        if (!err) {
            console.log("data", data)
            res.send(data)
        } else {
            console.log("Err", err)
            res.send(err)
        }
    });
})
app.post('/api/userDelete', function (req, res) {
    var _id = req.body.id;
    console.log("recieved ", _id);
    userRegister.findByIdAndRemove(_id, function (err, data) {
        if (!err) {
            // console.log("data", data)
            res.send(data)
        } else {
            console.log("Err", err)
            res.send(err)
        }
    }).exec();
});
//Employee Details request to mlab from server
app.post('/api/employeeDetail', function (req, res) {
    EmployeeRegister.find(req.body, function (err, data) {
        if (!err) {
            console.log("data", data)
            res.send(data)
        } else {
            console.log("Err", err)
            res.send(err)
        }
    });
})
app.post('/api/employeeDelete', function (req, res) {
    var _id = req.body.id;
    console.log("recieved ", _id);
    EmployeeRegister.findByIdAndRemove(_id, function (err, data) {
        if (!err) {
            // console.log("data", data)
            res.send(data)
            // EmployeeRegister.find(function (err, data) {
            //     if (!err) {
            //         console.log("data", data)
            //         res.send(data)
            //     } else {
            //         console.log("Err", err)
            //         res.send(err)
            //     }
            // });
        } else {
            console.log("Err", err)
            res.send(err)
        }
    }).exec();
});
//Student Details request to mlab from server
app.post('/api/studentDetail', function (req, res) {
    // var _id = req.body.id;
    console.log("recieved ", req.body);
    StudentRegister.find(req.body, function (err, data) {
        if (!err) {
            console.log("data", data)
            res.send(data)
        } else {
            console.log("Err", err)
            res.send(err)
        }
    });
})
app.post('/api/studentDelete', function (req, res) {
    var _id = req.body.id;
    console.log("recieved ", _id);
    StudentRegister.findByIdAndRemove(_id, function (err, data) {
        if (!err) {
            // console.log("data", data)
            // res.send(data)
            StudentRegister.find(function (err, data) {
                if (!err) {
                    console.log("data", data)
                    res.send(data)
                } else {
                    console.log("Err", err)
                    res.send(err)
                }
            });
        } else {
            console.log("Err", err)
            res.send(err)
        }
    }).exec();
});
//Attendance Submit
app.post('/api/attendanceSubmit', function (request, response) {
    var AttendanceData = new Attendance(request.body);
    AttendanceData.save(function (err, getData) {
        if (!err) {
            console.log("data", getData)
            return response.status(200).send(getData);
        } else {
            console.log("Err", err)
            return response.status(500).send(err);
        }
    })
})
//Attendance Record
app.post('/api/attendanceRecord', function (req, res) {
    // data={
    //  attendanceDate : req.body.attendanceDate,
    //  schoolID : req.body.schoolID,
    // }
    Attendance.find(req.body, function (err, data) {
        if (!err) {
            console.log("data", data)
            res.send(data)
        } else {
            console.log("Err", err)
            res.send(err)
        }
    });
})
//Fees Submit
app.post('/api/feesSubmit', function (request, response) {
    var FeesData = new Fees(request.body);
    FeesData.save(function (err, getData) {
        if (!err) {
            console.log("data", getData)
            return response.status(200).send(getData);
        } else {
            console.log("Err", err)
            return response.status(500).send(err);
        }
    })
})
//Attendance Record
app.post('/api/feesRecord', function (req, res) {
    console.log(req.body)
    Fees.find(req.body, function (err, data) {
        if (!err) {
            console.log("data", data)
            res.send(data)
        } else {
            console.log("Err", err)
            res.send(err)
        }
    });
})
//Salary Submit
app.post('/api/salarySubmit', function (request, response) {
    var SalaryData = new Salary(request.body);
    SalaryData.save(function (err, getData) {
        if (!err) {
            console.log("data", getData)
            return response.status(200).send(getData);
        } else {
            console.log("Err", err)
            return response.status(500).send(err);
        }
    })
})
//Attendance Record
app.post('/api/salaryRecord', function (req, res) {
    Salary.find(req.body, function (err, data) {
        if (!err) {
            console.log("data", data)
            res.send(data)
        } else {
            console.log("Err", err)
            res.send(err)
        }
    });
})
// When successfully connected
mongoose.connection.on('connected to mongodb', function () {
    console.log('Mongoose default connection open to ');
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server run on port " + port)
});