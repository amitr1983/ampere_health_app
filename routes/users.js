module.exports = function(app, passport) {

    var Model = require('../app/model/restaurent.js');

    var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

    var request = require('request');

    // Home Page ========

    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // Login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    app.get('/recommandation', isLoggedIn, function(req, res) {
        res.render('recommandation.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });



    // Signup form
    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // profile page

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('my_profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/dashboard', isLoggedIn, function(req, res) {
        console.log(req.user)
        res.render('dashboard.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // Logout Page
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // Sign up for local user
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // Login for Local User
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    //Authorization for Fitbit User
    app.get('/auth/fitbit',
        passport.authenticate('fitbit', { scope: ['activity','heartrate', 'weight','location','profile', 'social'] }
    ));

    // Call back redirect for Fitbit authorization
    app.get( '/auth/fitbit/callback', passport.authenticate( 'fitbit', { 
        successRedirect: '/dashboard',
        failureRedirect: '/login'
    }));

    app.get('/auth/callback',
        passport.authenticate('auth0', { failureRedirect: '/login' }),
        function(req, res) {
        res.redirect(req.session.returnTo || '/user');
    });

    // Get the user profile
    app.get('/user', ensureLoggedIn, function(req, res, next) {
        console.log(req.user )
        res.render('welcome.ejs', { user: req.user });
    });

    app.get('/report', ensureLoggedIn, function(req, res, next) {
        res.render('tableau.ejs');
    });

    app.get('/friend', isLoggedIn, function(req, res) {

        var accessToken =req.user.fitbit.token
    
        var options = {
        url: 'https://api.fitbit.com/1/user/-/friends.json',
        headers: {'Authorization': 'Bearer '+accessToken 
        }};

        function callback(error, response, body,done) {
            if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
    
            f = info.friends
            var f_list=[]
            for (var i=0; i<f.length; i++){
                f_list.push(f[i])
             }
             res.send(f_list)
        }}
        request(options, callback);
    });

    app.get('/leaderboard', ensureLoggedIn, function(req, res, next) {
        res.render('leaderboard.ejs');
    });


};

// route middleware to make sure that user is logged in
function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}