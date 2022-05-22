require('./config/config');
require('./models/db');
require('./config/passportConfig')

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport')
const rtsIndex = require('./routes/index.router');

var app = express();


// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api', rtsIndex);

// errors handler
app.use((err, rea, res, next) => {
    if (err.name === 'ValidationError'){
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message))
        res.status(422).send(valErrors)
    }   
})
//start server
app.listen('3000', () => console.log(`server started at port : 3000`))