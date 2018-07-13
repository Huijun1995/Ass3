var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

// connect database
var sequelize = require('./Model/Connect')

var User = require('./Model/User')
var Product = require('./Model/Product')
var Purchased = require('./Model/Purchased');
var productPairs = require('./Model/productPairs');

var session = require('express-session');
var FileStore = require('session-file-store')(session);
app.use(session({
    name: 'skey',
    secret: 'chyingp',
    store: new FileStore(),
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 900000
    }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use router
var router = require('./router');
router(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


sequelize.sync();
//     .then(() => {
//     // Table created
//     return User.create({
//         fname: 'Jenny',
//         lname: 'Admin',
//         address: '5213 Powhattan st',
//         city: 'Pittsburgh',
//         state: 'PA',
//         zip: '15224',
//         email: 'huijunf@andrew.cmu.edu',
//         username: 'jadmin',
//         password: 'admin'
//     });
// });


module.exports = app;
app.listen(3000);