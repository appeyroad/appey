const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: {type:String, required:true, unique:true, lowercase:true},
    password: {type:String, required:true, trim:true},
    name:String,
    grade:Number
});

userSchema.index({email:1, name:1});

userSchema.statics.addUser = function(
    email,
    password,
    name
) {
    return new Promise((resolve, reject) => {
        var newUser = new this();
        newUser.email = email;
        newUser.password = password;
        newUser.name = name;
        newUser.grade = 1; 
        newUser.save((err, user) => {
            if(err){reject(err);}
            resolve(user);
        })
    })
}

module.exports = mongoose.model('User', userSchema);