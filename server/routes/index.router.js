const express = require('express');
const router = express.Router();
 
const ctrlUser = require('../controllers/user.controller');
const verifyUser = require('../utils/verifyUser').verifyUser

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile', verifyUser, ctrlUser.userProfile);
 
module.exports = router
