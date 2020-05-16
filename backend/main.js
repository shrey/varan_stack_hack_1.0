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
var admin_login = require('./routes/admin_login');
var add_event = require('./routes/add_event');
var registration = require('./routes/event_registration');
var home = require('./routes/home')

//Routes
app.use('/home', home)
app.use('/admin/login', admin_login)
app.use('/event/new', add_event)
app.use('/event/', registration)


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
