const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const { categoryRoutes, productRoutes, userRoutes, authRoutes, makerRoutes } = require('./api/routes');

const url = 'mongodb+srv://newUser:' + process.env.MONGO_ATLAS_PW + '@cluster0.yg0rr.mongodb.net/e-commerce-covid?retryWrites=true&w=majority'

mongoose.connect(url, {
    useNewUrlParser: true,
    // To remove the following warning:
    // "DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor."
    useUnifiedTopology: true,
    // To remove the following warning:
    // "DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#findandmodify"
    useFindAndModify: false,
    // To remove the following warning:
    // "DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead." See https://stackoverflow.com/a/51962721
    useCreateIndex: true,
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

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/category', categoryRoutes);
app.use('/product', productRoutes);
app.use('/maker', makerRoutes);

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