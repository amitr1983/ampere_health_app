// config/passport.js

var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../app/model/user');
var FitbitStrategy = require( 'passport-fitbit-oauth2' ).FitbitOAuth2Strategy;
var configAuth = require('./auth');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // passport session setup 

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // Locan Sign up
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) {

        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

                // if there is no user with that email
                // create the user
                var newUser            = new User();

                // set the user's local credentials
                newUser.local.email    = email;
                newUser.local.password = newUser.generateHash(password);
                // newUser.local.name        = profile.displayName;
                // newUser.local.gender      = profile._json.user.gender;
                // newUser.local.weight      = profile._json.user.weight;
                // newUser.local.dateofbirth = profile._json.user.dateOfBirth;
                // newUser.local.height      = profile._json.user.height;
                // newUser.local.country = profile._json.user.country;
                // newUser.local.age         = profile._json.user.age;

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });    

        });

    }));

    // Local Login
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, user);
        });

    }));

    passport.use(new FitbitStrategy({
        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.fitbitAuth.clientID,
        clientSecret    : configAuth.fitbitAuth.clientSecret,
        callbackURL     : configAuth.fitbitAuth.callbackURL

    },
  function(accessToken, refreshToken, profile, done) {

        process.nextTick(function() {

            User.findOne({ 'fitbit.id' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user, create them
                    var newUser                 = new User();

                    // set all of the user data that we need
                    newUser.fitbit.id          = profile.id;
                    newUser.fitbit.token       = accessToken;
                    newUser.fitbit.refreshtoken= refreshToken;
                    newUser.fitbit.name        = profile.displayName;
                    newUser.fitbit.gender      = profile._json.user.gender;
                    newUser.fitbit.weight      = profile._json.user.weight;
                    newUser.fitbit.dateofbirth = profile._json.user.dateOfBirth;
                    newUser.fitbit.height      = profile._json.user.height;
                    newUser.fitbit.country = profile._json.user.country;
                    newUser.fitbit.age         = profile._json.user.age;

                    console.log('Creating user account for ' + profile._json.user.weight);

                    // save our user into the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });

    });

    }));


};