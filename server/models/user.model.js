const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var userSchema = new mongoose.Schema({
    userName : {type: String, required: 'username cant be empty', minlength: [5, 'username length must be atleast 5 characters long'], unique : true},
    email : {type: String, required: 'email cant be empty', unique : true},
    password : {type: String,  required: 'username cant be empty', minlength: [4, 'password must be atleast 4 characters long']},
    saltSecret: String
})

// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
  }, 'Invalid e-mail.');

userSchema.pre('save', function (next){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) =>{
            this.password = hash;
            this.saltSecret = salt;
            next();
        })
    })
})

mongoose.model("User", userSchema)