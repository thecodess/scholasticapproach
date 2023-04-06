const express = require('express')
const path = require('path')
const app = express()
var cors = require('cors');
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
const session = require('express-session');
let mysql = require('mysql');
let config = require('./config.js');
let connection = mysql.createConnection(config);
var uniqid = require('uniqid'); 
const bcrypt = require('bcrypt');
let PayStack = require('paystack-node')
const axios = require('axios');

let APIKEY = 'sk_test_4879b2964fb1dbc917990db635da0e117c9591cb'
const environment = process.env.NODE_ENV

const paystack = new PayStack(APIKEY, environment)

const mysqlStore = require('express-mysql-session')(session);
const options ={
    host: 'localhost',
    user: 'root',
    password: 'platinum123',
    database: 'scholastic',
    createDatabaseTable: true
    
}
const  sessionStore = new mysqlStore(options);
app.use(session({
    name: "scholastic",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    secret: "scholastic123",
    cookie: {
        httpOnly: true,
        maxAge: 60*60*24*365,
        sameSite: true
    }
}))
connection.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    let createTo = `create table if not exists Admin(
        id int primary key auto_increment,
        adminId varchar(255)not null,
        username varchar(255)not null,
        password varchar(255)not null,
        hashpassword varchar(255)not null
    )`;
connection.query(createTo, function (err, results, fields) {
if (err) {
console.log(err.message);
}
if (results.warningCount==0){
    let data = `INSERT INTO Admin(adminId, username, password, hashpassword) VALUES (?,?,?,?)`;
    const saltRounds = 10;
const myPlaintextPassword = 'scholasticpassword';
const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync(myPlaintextPassword, salt);
const adminId=uniqid('scholastic-','-admin')
          var values=[adminId,'Scholastic Admin',myPlaintextPassword,hash];
        connection.query(data, values, function (err, results) {
            if (err) {
                console.log(err.message);
            }else{
            console.log("done")
                
            }
        });
}});
    let createTodos = `create table if not exists Questions(
                          id int primary key auto_increment,
                          question varchar(1000)not null default 0,
                          A varchar(255)not null,
                          B varchar(255)not null,
                          C varchar(255)not null,
                          D varchar(255)not null,
                          correctoption varchar(255) not null,
                          subject varchar(255)not null
                      )`;
                      
    connection.query(createTodos, function (err, results, fields) {
        if (err) {
            console.log(err.message);
        }
        let createTodo = `create table if not exists Users(
            id int primary key auto_increment,
            userId varchar(255)not null,
            firstName varchar(255)not null,
            lastName varchar(255)not null,
            phone varchar(255)not null,
            email varchar(255)not null,
            password varchar(255) not null,
            customerCode varchar(255),
            customerId int,
            transactionReference varchar(255)
        )`;
connection.query(createTodo, function (err, results, fields) {
if (err) {
console.log(err.message);
}
});
        let createTodos = `create table if not exists Results(
            id int primary key auto_increment,
            timespent varchar(255)not null,
            userId varchar(255)not null,
            correctlyanswered varchar(255)not null,
            skippedquestions varchar(255)not null,
            attemptedquestions varchar(255)not null,
            totalquestions varchar(255) not null,
            subject varchar(255)not null,
            percentage varchar(255)not null
        )`;
connection.query(createTodos, function (err, results, fields) {
if (err) {
console.log(err.message);
}
let createTodos = `create table if not exists Subjects(
            id int primary key auto_increment,
            subject varchar(255)not null,
            hour varchar(255)not null,
            minute varchar(255)not null,
            second varchar(255)not null
        )`;
connection.query(createTodos, function (err, results, fields) {
if (err) {
console.log(err.message);
}
if (results.warningCount==0){
    let data = `INSERT INTO Subjects (subject, hour, minute, second) VALUES ?`;
          var values=[
              ['Mathematics','02','00','00'],
              ['English Language','02','00','00'],
              ['Physics','02','00','00'],
              ['Chemistry','02','00','00'],
              ['Biology','02','00','00'],
              ['General Knowledge','02','00','00'],
              ];
        connection.query(data, [values], function (err, results) {
            if (err) {
                console.log(err.message);
            }else{
            console.log("done")
                
            }
        });
}
        });    
    });
});
});
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.json());
app.use(
    cors({
      origin: ["http://localhost:3000","http://localhost:3001"],
      methods: ["GET", "POST","OPTIONS"],
      credentials: true,
    })
  );
  app.post("/question-length", (req, res) => {
    var { subject }= req.body;
    let query=`SELECT * FROM Questions WHERE subject=?`

    connection.query(query, subject, (err, results, fields) => {
                
        if (err) {
            res.status(500).json(err)
            return ;
        }
        res.send({ number: results.length })
    });
});
app.post("/question-timelimit", (req, res) => {
    var { subject }= req.body;
    let query=`SELECT * FROM Subjects WHERE subject=?`

    connection.query(query, subject, (err, results, fields) => {
                
        if (err) {
            res.status(500).json(err)
            return ;
        }
        if(results[0]){res.send({ time: `${results[0].hour}:${results[0].minute}:${results[0].second}`,
    hour: results[0].hour,
minute:results[0].minute})}
        
    });
});
app.post("/post-exam-answer", (req, res) => {
    var { subject, time, questions }= req.body;
    
    var correct=0;
    var skipped=0;
    var attempted=0;
    var total=0;
  
        for(var x in questions){
            total++; 
           
            if(x){
                 const id=questions[x].id;
            const ids=x;
            let query=`SELECT * FROM Questions WHERE subject="${subject}" AND id=${id}`;
            const startTime=time;
            const subjects=subject;
            connection.query(query, (err, results, fields) => {
            
                if (err) {
                   // res.status(500).json(err)
                    return ;
                }
                
                if(questions[ids].answer==results[0][results[0].correctoption]){
                    correct++;
                }
                
                if(questions.length-1==ids){
                   const endTime = Date.now();
                   
    totalSeconds = (endTime -startTime)/1000;
    hours = Math.floor(totalSeconds/3600);
    minutes = Math.floor((totalSeconds%3600)/60);
    seconds = Math.floor((totalSeconds%3600)%60);
    var time=`${hours}h : ${minutes}m : ${seconds}s`;
    var percentage=(correct/total)*100
    const {userId} =req.session
    let query=`INSERT INTO Results (timespent,correctlyanswered,skippedquestions,attemptedquestions,totalquestions,subject,percentage,userId) VALUES (?,?,?,?,?,?,?,?)`
    let values=[time,correct,skipped,attempted,total,subjects,percentage,userId];
    connection.query(query, values, (err, results, fields) => {
                
        if (err) {
            res.status(500).json(err)
            return ;
        }
        res.send({time,correct,skipped,attempted,total,percentage})
    });
                }
            });
        }
            if(questions[x].answer){
                attempted++;
            }else{
                skipped++;
            }
            
        }
    
});
app.post("/exam-questions", (req, res) => {
    var { subject }= req.body;
    let query=`SELECT id, question, A ,B,C,D FROM Questions WHERE subject=?`

    connection.query(query, subject, (err, results, fields) => {
                
        if (err) {
            res.status(500).json(err)
            return ;
        }
        let query=`SELECT * FROM Subjects WHERE subject=?`

    connection.query(query, subject, (error, result, fields) => {
                
        if (error) {
            res.status(500).json(error)
            return ;
        }
        
        res.send({question:results,hour: result[0].hour,
minute:result[0].minute,second:result[0].second})
    });
    });
});
  app.post("/add-a-question", (req, res) => {
    var { question,optiona,optionb,optionc,optiond,correctoption,subject }= req.body;
    let query=`INSERT INTO Questions (question,A,B,C,D,correctoption,subject) VALUES (?,?,?,?,?,?,?)`
    let values=[question,optiona,optionb,optionc,optiond,correctoption,subject];
    connection.query(query, values, (err, results, fields) => {
                
        if (err) {
            res.status(500).json(err)
            return ;
        }
        res.send({ message: "Done" })
    });
});
app.post("/update-question-timelimit", (req, res) => {
    var { hour,minute,subject }= req.body;
    let query=`UPDATE Subjects 
    SET 
        hour = ?,
        minute = ?
    WHERE
        subject = ?;`
    let values=[hour,minute,subject];
    connection.query(query, values, (err, results, fields) => {
                
        if (err) {
            res.status(500).json(err)
            return ;
        }
        res.send({ message: "Done" })
    });
});
app.post("/exam-questions-admin", (req, res) => {
    var { subject }= req.body;
    let query=`SELECT * FROM Questions WHERE subject=?`

    connection.query(query, subject, (err, results, fields) => {
                
        if (err) {
            res.status(500).json(err)
            return ;
        }
        res.send(results)
    });
});
app.post("/delete-exam-question-admin", (req, res) => {
    var { id,subject }= req.body;
    let query=`DELETE FROM Questions WHERE id=?`

    connection.query(query, id, (err, results, fields) => {
                
        if (err) {
            res.status(500).json(err)
            return ;
        }
        let query=`SELECT * FROM Questions WHERE subject=?`

    connection.query(query, subject, (err, results, fields) => {
                
        if (err) {
            res.status(500).json(err)
            return ;
        }
        res.send(results)
    });
    });
});
app.post("/edit-exam-question-admin", (req, res) => {
    var { id,question,optiona,optionb,optionc,optiond,correctoption,subject }= req.body;
    let query=`UPDATE Questions 
    SET 
    question = ?,
        A = ?,
        B=?,
        C=?,
        D=?,
        correctoption=?
    WHERE
        id=? AND subject = ?;`

    connection.query(query, [question,optiona,optionb,optionc,optiond,correctoption,id,subject], (err, results, fields) => {
                
        if (err) {
            res.status(500).json(err)
            return ;
        }
        let query=`SELECT * FROM Questions WHERE subject=?`

    connection.query(query, subject, (err, results, fields) => {
                
        if (err) {
            res.status(500).json(err)
            return ;
        }
        res.send(results)
    });
    });
});
app.post("/status", (req, res) => {
const {userId} =req.session
if(userId){
    let query=`SELECT * FROM Users WHERE userId=?`

    connection.query(query, [userId], (err, results, fields) => {
        const {firstName,lastName}=results[0];
        if (err) {
            res.status(500).json({message:err.sqlMessage})
            return ;
        }
    res.send({status:true,name:`${firstName} ${lastName}`})
    })
}else{
    res.send({status:false})
}
})
app.post("/user-profile", (req, res) => {
    const {userId} =req.session
    if(userId){
        let query=`SELECT * FROM Users WHERE userId=?`
    
        connection.query(query, [userId], (err, results, fields) => {
            const {userId,customerId,firstName,lastName,phone,email}=results[0];
            if (err) {
                res.status(500).json({message:err.sqlMessage})
                return ;
            }
            let query=`SELECT timespent,correctlyanswered,skippedquestions,attemptedquestions,totalquestions,subject,percentage FROM Results WHERE userId=?`

    connection.query(query, userId, (err, resultss, fields) => {
                
        if (err) {
            res.status(500).json(err)
            return ;
        }
        if(customerId){
            const promise4 = paystack.listTransaction({
                perPage:1000,
                customer:customerId
              })
              
              promise4.then(function (response){
                 var datas=response.body.data;
                 var data=[];
                 for(var x in datas){
                    const {status,reference,paid_at,created_at,channel}=response.body.data[x]
                    var expired;
                    if(paid_at){
                    var datenow=new Date()

                    var paidat=new Date(paid_at)
                    paidat.setDate(paidat.getDate() + 3)
                    if(datenow>=paidat){
                        expired=true;
                    }else{
                        expired=false;
                    }
                }else{
                        expired=true;
                }
                    data.push({
                        status,reference,paid_at,created_at,channel,expired
                    })
                 }
                 res.send({status:true,name:`${results[0].firstName} ${results[0].lastName}`,userId,firstName,lastName,phone,email,data,results:resultss})
              }).catch(function (error){
                // deal with error
               res.status(500).json({message:error})
              })
            }else{
                res.send({status:true,name:`${results[0].firstName} ${results[0].lastName}`,userId,firstName,lastName,phone,email,results:resultss})
            }
    });
        })
    }else{
        res.send({status:false})
    }
    })
app.post("/signup-user", (req, res) => {
    var {email,password,firstName,lastName,phone}=req.body;
    let query=`SELECT * FROM Users WHERE email=? OR phone=?`

    connection.query(query, [email,phone], (err, results, fields) => {
                
        if (err) {
            res.status(500).json({message:err.sqlMessage})
            return ;
        }
        if(results.length==0){
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync(password, salt);
const userId=uniqid('scholastic-','-user')
const promise3 = paystack.createCustomer({
    email,
    first_name:firstName,
    last_name:lastName,
    phone
  })
  
  promise3.then(function(response){
    const {customer_code,id}=response.body.data;
    let query=`INSERT INTO Users (userId,customerCode,customerId,firstName,lastName,phone,email,password) VALUES (?,?,?,?,?,?,?,?)`
    let values=[userId,customer_code,id,firstName,lastName,phone,email,hash];
    connection.query(query, values, (err, results, fields) => {
                
        if (err) {
            res.status(500).json(err)
            return ;
        }
        req.session.userId = userId
        res.send({ message: "User has been registered successfully." })
        
                });
  }).catch(function (error){
      res.status(500).json({message:error})
  })

        }else{
            res.status(500).json({message:"A User with the same Email or Phone Number already exists."})
        }
    });
    })
app.post("/signin-user", (req, res) => {
        var {email,password}=req.body;
        let query=`SELECT * FROM Users WHERE email=?`
    
        connection.query(query, [email], (err, results, fields) => {
                    
            if (err) {
                res.status(500).json({message:err.sqlMessage})
                return ;
            }
            if(results.length==0){
                res.status(500).json({message:"No User with this Email exist."})
            }else{
            if(bcrypt.compareSync(password, results[0].password)){
                req.session.userId = results[0].userId
                res.send({ message: "User has been logged in successfully." })
            }else{
                res.status(500).json({message:"Incorrect Password."})
            }
            
            }
        });
})
app.post("/logout-user", (req, res) => {
    req.session.destroy()
            res.send({ message: "User has been logged out successfully." })
})
app.post("/user-payment", (req, res) => {
    const {userId} =req.session
    if(userId){
        let query=`SELECT * FROM Users WHERE userId=?`
    
        connection.query(query, [userId], (err, results, fields) => {
            const {transactionReference}=results[0];
            if (err) {
                res.status(500).json({message:err.sqlMessage})
                return ;
            }
            if(transactionReference){
                const promise7 = paystack.verifyTransaction({
                    reference:transactionReference
                  })
                  
                  promise7.then(function (response){
                    const {paid_at}=response.body.data
                    var datenow=new Date()
                    var paidat=new Date(paid_at)
                    paidat.setDate(paidat.getDate() + 3)
                    if(datenow>=paidat){
                        res.send({status:false})
                    }else{
                        res.send({status:true})
                    }
                  }).catch(function (error){
                     res.status(500).json({message:error})
                  })
            }else{
                res.send({status:false})
            }
        
        })
    }else{
        res.send({status:false})
    }
})
app.post("/user-payment-details", (req, res) => {
    const {userId} =req.session
    if(userId){
        let query=`SELECT * FROM Users WHERE userId=?`
    
        connection.query(query, [userId], (err, results, fields) => {
            const {phone,email,transactionReference}=results[0];
            if (err) {
                res.status(500).json({message:err.sqlMessage})
                return ;
            }
            if(transactionReference){
                const promise7 = paystack.verifyTransaction({
                    reference:transactionReference
                  })
                  
                  promise7.then(function (response){
                    const {paid_at}=response.body.data
                    var datenow=new Date()
                    var paidat=new Date(paid_at)
                    paidat.setDate(paidat.getDate() + 3)
                    if(datenow>=paidat){
                        res.send({status:false,phone,email,pastpayment:true})
                    }else{
                        res.send({status:true})
                    }
                  }).catch(function (error){
                     res.status(500).json({message:error})
                  })
            }else{
                res.send({status:false,phone,email,pastpayment:false})
            }
        
        })
    }else{
        res.send({status:false})
    }
})
app.post("/confirm-payment", (req, res) => {
    const {reference}=req.body;
    const {userId} =req.session
    let query=`SELECT * FROM Users WHERE userId=?`
    
    connection.query(query, [userId], (err, results, fields) => {
        const {userId,firstName,lastName,email,phone}=results[0];
        if (err) {
            res.status(500).json({message:err.sqlMessage})
            return ;
        }
        let query=`UPDATE Users
        SET 
                transactionReference =?
        WHERE
            userId = ?;`
        let values=[reference,userId];
        connection.query(query, values, (err, results, fields) => {
                    
            if (err) {
                res.status(500).json(err)
                return ;
            }
            const promise7 = paystack.verifyTransaction({
                reference
              })
              
              promise7.then(function (response){
               const promise3 = paystack.updateCustomer({
                first_name:firstName,
                last_name:lastName,
                email,
                phone,
                customer_id:response.body.data.customer.customer_code
              })
              
              promise3.then(function(response){
                let query=`UPDATE Users
        SET 
            customerCode =?,
                customerId =?
        WHERE
            userId = ?;`
            const {customer_code,id}=response.body.data
        let values=[customer_code,id,userId];
        connection.query(query, values, (err, results, fields) => {
                    
            if (err) {
                res.status(500).json(err)
                return ;
            }
            res.send({ message: "Payment verified successfully.",status:true })
        });
              }).catch(function (error){
                 res.status(500).json({message:error})
              })
              }).catch(function (error){
                 res.status(500).json({message:error})
              })
        });
    })
   
})
app.post("/scores-admin", (req, res) => {
    let query=`SELECT * FROM Results`

    connection.query(query, (err, results, fields) => {
                
        if (err) {
            res.status(500).json(err)
            return ;
        }
        
        var data=[];
        var x
        for(x in results){
            let query=`SELECT firstName,lastName,email FROM Users WHERE userId=?`
const n=Number(x);
const l=results.length-1
            connection.query(query, [results[n].userId], (err, result, fields) => {
                if (err) {
                    res.status(500).json({message:err.sqlMessage})
                    return ;
                }
                const {firstName,lastName,email}=result[0];
                const {timespent,correctlyanswered,skippedquestions,attemptedquestions,totalquestions,subject,percentage}=results[n]
                data.push({timespent,correctlyanswered,skippedquestions,attemptedquestions,totalquestions,subject,percentage,name:`${firstName} ${lastName} (${email})`,email})
                if(n===l){
                    res.send({data})
                }
            });
        }
    });
});
app.post("/users-admin", (req, res) => {
    let query=`SELECT customerCode,customerId,email,firstName,lastName,phone,transactionReference,userId FROM Users`

    connection.query(query, (err, results, fields) => {
                
        if (err) {
            res.status(500).json(err)
            return ;
        }
        res.send({data:results})
    })
})
app.post("/payments-admin", (req, res) => {
const promise4 = paystack.listTransaction({
    perPage:10000,
  })
  
  promise4.then(function (response){
     var datas=response.body.data;
     var data=[];
     for(var x in datas){
        const {status,reference,paid_at,created_at,channel}=response.body.data[x]
        const {first_name,last_name,email,customer_code}=response.body.data[x].customer
        var expired;
        if(paid_at){
        var datenow=new Date()

        var paidat=new Date(paid_at)
        paidat.setDate(paidat.getDate() + 3)
        if(datenow>=paidat){
            expired=true;
        }else{
            expired=false;
        }
    }else{
            expired=true;
    }
        data.push({
            status,reference,paid_at,created_at,channel,expired,customer_code,name:`${first_name?first_name:email[0]} ${last_name?last_name:email[1]} (${email})`
        })
     }
     res.send({data})
  }).catch(function (error){
    // deal with error
   res.status(500).json({message:error})
  })
})
app.post("/admin-status", (req, res) => {
    const {adminId} =req.session
    if(adminId){
        let query=`SELECT * FROM Admin WHERE adminId=?`
    
        connection.query(query, [adminId], (err, results, fields) => {
            const {firstName,lastName}=results[0];
            if (err) {
                res.status(500).json({message:err.sqlMessage})
                return ;
            }
        res.send({status:true,name:`${firstName} ${lastName}`})
        })
    }else{
        res.send({status:false})
    }
})
app.post("/signin-admin", (req, res) => {
    var {username,password}=req.body;
    let query=`SELECT * FROM Admin WHERE username=?`

    connection.query(query, [username], (err, results, fields) => {
                
        if (err) {
            res.status(500).json({message:err.sqlMessage})
            return ;
        }
        if(results.length==0){
            res.status(500).json({message:"No User with this User Name exist."})
        }else{
        if(bcrypt.compareSync(password, results[0].hashpassword)){
            req.session.adminId = results[0].adminId
            res.send({ message: "User has been logged in successfully." })
        }else{
            res.status(500).json({message:"Incorrect Password."})
        }
        
        }
    });
})
app.post("/logout-admin", (req, res) => {
    req.session.destroy()
            res.send({ message: "Admin has been logged out successfully." })
})
app.post("/change-admin-password", (req, res) => {
    const {adminId} =req.session
    const {oldpassword,newpassword}=req.body;
    let query=`SELECT * FROM Admin WHERE adminId=?`
if(adminId){
    connection.query(query, [adminId], (err, results, fields) => {
                
        if (err) {
            res.status(500).json({message:err.sqlMessage})
            return ;
        }
        if(bcrypt.compareSync(oldpassword, results[0].hashpassword)){
            req.session.adminId = results[0].adminId
            let query=`UPDATE admin
    SET 
        password = ?,
        hashpassword = ?
    WHERE
    adminId = ?;`
    const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync(newpassword, salt);
    let values=[newpassword,hash,adminId];
    connection.query(query, values, (err, results, fields) => {
                
        if (err) {
            res.status(500).json(err)
            return ;
        }
        res.send({ message: "Your Password has been changed successfully." })
    });
        }else{
            res.status(500).json({message:"Your Old Password Is Incorrect."})
        }
    });
}else{
    res.status(500).json({message:"You Are Not Logged In."})
}
})
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,"build", "index.html"));
})
  app.listen(PORT, () => {
    console.log("server started on port 5000");
});

module.exports = app;
