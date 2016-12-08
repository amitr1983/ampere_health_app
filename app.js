// set up ======================================================================

var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var path = require('path')

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

var Auth0Strategy = require('passport-auth0');


// configuration ===============================================================
mongoose.connect(configDB.url); // connect to db

require('./config/passport')(passport); 

// set up our express application
app.use(morgan('dev')); 
app.use(cookieParser()); 
app.use(bodyParser()); 
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs'); // set up ejs 

// required for passport
app.use(session({ secret: 'ampere' })); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); 

// routes ======================================================================
require('./routes/users.js')(app, passport); 
require('./routes/restaurent.js')(app, express);
require('./routes/menu.js')(app, express);
require('./routes/calories')(app, express);

// launch ======================================================================
app.listen(3000,function(){
  console.log("Live at Port 3000");
});
