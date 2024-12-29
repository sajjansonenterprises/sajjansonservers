require("./routes/connection/connection")
require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors=require("cors")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const Signup = require("./routes/Signup");
const Login = require("./routes/Login");
const ContactUs = require("./routes/ContactUs");
const Enquiry = require("./routes/Enquiry");
const GetAddMillCardData = require("./routes/AdminServer/GetAddMillCardData");
const GetGallery = require("./routes/AdminServer/GetGallery");
const GetTestimonials = require("./routes/AdminServer/GetTestimonials");
const SendAllData = require("./routes/SendAllData");
const GetCarousalData = require("./routes/AdminServer/GetCarousalData");


var app = express();

// view engine setup

var corsOptions = {
  origin: 'http://1j2.530.mytemp.website',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/galleryupload', express.static(path.join(__dirname, 'galleryupload')));
app.use('/carousal', express.static(path.join(__dirname, 'carousal')));

app.use('/signup', Signup);
app.use('/login', Login);
app.use('/users', usersRouter);
app.use('/contactus', ContactUs);
app.use('/api/addmillcardform', GetAddMillCardData);
app.use('/galleryupload', GetGallery);
app.use('/sendtestimonial', GetTestimonials);
app.use('/api/fetchalldata', SendAllData);
app.use('/api/carousalformdata', GetCarousalData);
app.use('/api/enquiry', Enquiry);
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

module.exports = app;
