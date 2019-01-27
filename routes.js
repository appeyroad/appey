const express = require('express');
const router = express.Router();
const User = require('./user.js');

router.get('/', (req, res) => {
    console.log('GET \'/\' url!!')
    res.send('Hello World!');
})
router.get('/:name', (req,res) => {

    User.find({name:req.params.name}, (err,user)=>{
        res.send({user: user});
    })
})
module.exports = router;