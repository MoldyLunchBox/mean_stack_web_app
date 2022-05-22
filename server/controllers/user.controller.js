const mongoose = require('mongoose');
//const { Passport } = require('passport/lib');
const  passport  = require('passport');
const _ = require('lodash')
const User = mongoose.model('User');


module.exports.register = (req, res, next) => {
    console.log ("inside register");
    var user = new User();
    user.userName = req.body.userName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) =>{
        if (!err)
            res.send(doc);
        else
        {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email address.'])
            else
                return next(err);
        }
    })
    

}

module.exports.authenticate = (req, res, next) => {
    console.log ("inside authenticate");
 
    console.log('----------');
    console.log(req.body);
    console.log('----------');
    console.log('----------');
    console.log('----------');
    console.log('----------');
    console.log('----------');
    console.log('----------');

    passport.authenticate('local', (err, user, info)=> {
        console.log('printf("user is");');
        console.log(user);

		if (err){
            console.log('error  1 auth func');
            return res.status(400).json(err);
        }
		else if (user) return res.status(200).json({"token": user.generateJwt()})
		else{
            console.log('error 2 auth func');
            return res.status(404).json(info);
        } 
	})(req, res)
}
module.exports.userProfile = (req, res) =>{
    User.findOne({ _id: req._id }, (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email']) });
        }
    );
}

module.exports.userProfile = (req, res, next) =>{
	
}