var express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser')
var logger = require('morgan')
var path = require('path')


//Initialise App
var app = express()

app.use(bodyParser.urlencoded({extended: true}));
// some extra setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'helloforum', resave: true, saveUninitialized: true}));


//Routes Files Import
var addEventRoute = require('./routes/add_event');
var registrationRoute = require('./routes/event_registration');
var homeRoute = require('./routes/home')
var profileRoute = require('./routes/user_profile')
var eventRoute = require('./routes/event')
var deleteEventRoute = require('./routes/delete_event')


//Routes
app.use('/home', homeRoute)
app.use('/event/new', addEventRoute)
app.use('/event/register/', registrationRoute)
app.use('/event/delete/', deleteEventRoute);
app.use('/event/', eventRoute)
app.use('/user/', profileRoute)


//Start Server
app.listen(3000, ()=>{
	console.log("Server Listening at http://localhost:3000");
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log("Message: ",err.message);
  console.log("ERROR: ",res.locals.error);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
