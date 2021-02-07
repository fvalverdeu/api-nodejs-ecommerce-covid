const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const userRoutes = require('./api/routes/user');
const categoryRoutes = require('./api/routes/category');
const productRoutes = require('./api/routes/product');

const url = process.env.MONGODB || 'mongodb+srv://newUser:bz2vLGB3ZSJdWAJB@cluster0.yg0rr.mongodb.net/e-commerce-covid?retryWrites=true&w=majority'

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

app.use('/uploads', express.static('uploads'));
app.use(express.json());

app.use('/user', userRoutes);
app.use('/category', categoryRoutes);
app.use('/product', productRoutes)

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