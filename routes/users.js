module.exports = function(app, passport) {


    // Home Page ========

    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // Login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });


    // Signup form
    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // profile page

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
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
        passport.authenticate('fitbit', { scope: ['activity','heartrate', 'weight','location','profile'] }
    ));

    // Call back redirect for Fitbit authorization
    app.get( '/auth/fitbit/callback', passport.authenticate( 'fitbit', { 
        successRedirect: '/profile',
        failureRedirect: '/login'
    }));

};

// route middleware to make sure that user is logged in
function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}