// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'fitbitAuth' : {
        'clientID'      : '227XHX', // your App ID
        'clientSecret'  : 'e6cd00b32b5570a445dd9a7048e05bfe', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/fitbit/callback'
    }
};