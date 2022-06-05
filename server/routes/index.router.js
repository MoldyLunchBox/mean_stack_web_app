const express = require('express');
const router = express.Router();
 
const ctrlUser = require('../controllers/user.controller');

function verifyUser  (req, res, next)  {
    var token;
    console.log('hey hey hey hey');
    console.log(req.headers);
    if ('authorization' in req.headers)
        token = req.headers['authorization'].split(' ')[1];
    if (!token)
        return res.status(403).send({auth: false, message: 'no token provided'})
    else
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
            if (err)
                return res.status(500).send({ auth: false, message: 'Token authentication failed'})
            else{
                req._id = decoded._id;
                next()
            }
        })

}
router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userprofile', verifyUser, ctrlUser.userProfile);
 
module.exports = router
