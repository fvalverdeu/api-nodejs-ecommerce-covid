const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const url = 'mongodb+srv://newUser:bz2vLGB3ZSJdWAJB@cluster0.yg0rr.mongodb.net/e-commerce-covid?retryWrites=true&w=majority'

mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;

app.use(morgan('dev'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).json({})
    }
    next();
}); 

app.use(express.json());

let user = {
    name: '',
    lastname: ''
};

let result = {
    error: false,
    code: 200,
    message: ''
};

app.get('/', function(req, res) {
    result = {
        error: true,
        code: 200,
        message: 'start'
    };
    res.send(result);
});

app.get('/user', function(req, res) {
    result = {
        error: false,
        code: 200,
        message: ''
    };
    if (user.name === '' || user.lastname === '') {
        result = {
            error: true,
            code: 501,
            message: 'User that not exists!!'
        };
    } else {
        result = {
            error: false,
            code: 200,
            message: 'User exists. This is user-data: ',
            response: user
        };
    }
    res.send(result);
});

app.post('/user', function(req, res) {
    if (!req.body.name || !req.body.lastname) {
        result ={
            error: true,
            code: 502,
            message: 'Name and lastname are required!!'
        };
    } else {
        if (user.name !== '' || user.lastname !== '') {
            result ={
                error: true,
                code: 503,
                message: 'User are exists!!'
            };
        } else {
            user = {
                name: req.body.name,
                lastname: req.body.lastname
            };
            result = {
                error: false,
                code: 200,
                message: 'User created!!',
                response: user
            };
        }
    }
    res.send(result);
})


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});


module.exports = app;