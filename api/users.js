var express = require("express");
var app = express.Router();
var User = require('./../user');

app.get('/', (req,res) => {
    
    User.find({}, (err,users)=>{
        if(err){console.log(err)}
        console.log(users);
        res.json({result:true, users: users});
    })
})
app.put('/isuser', (req,res) => {
    console.log(req.body)
    User.find({email:req.body.id, pw:req.body.pw}, (err, user) => {
        if(err){console.log(err)}
        console.log('user: ', user);
        if(user.length != 0) {
            res.json({result:true, user: user});
        } else {
            res.json({result:false, err:'no_user'})
        }
    })
})
app.get(`/getuser/:id`, (req,res) => {
    console.log(req.params);
    User.find({_id:req.params.id}, (err, user) => {
        if(err){console.log(err)}
        console.log('user: ', user);
        if(user.length != 0) {
            res.json({result:true, user: user});
        } else {
            res.json({result:false, err:'no_user'})
        }
    })
})
app.post(`/adduser`, (req,res) => {
    console.log(req.body);
    User.find({id:req.body.id}, (err,user) => {
        if(err){console.log(err)}
        if(user.length == 0) {
            User.addUser(req.body.id, req.body.pw, req.body.name, 1).then(user => {
                res.json({result:true, user:user})
            })
            .catch(err => {
                console.log(err)
            })
        } else {
            res.json({result:false, err:'duplicate_user'})
        }
    })
})

module.exports = app;