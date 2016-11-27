// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our restaurent model
var cuisineSchema = mongoose.Schema({

    cuisine         : {
        name         : String,
        description  : String

    }

});

var restaurentSchema = mongoose.Schema({

    restaurent         : {
        name         : String,
        location     : String,
        cusine    : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cuisine' }],

    }

});

var menuSchema = mongoose.Schema({

    menu        : {
        restaurent   : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurent' }],
        item         : String,
        calories     : Number,
        veg          : Boolean

    }

});

// methods ======================


// create the model for users and expose it to our app

var Cuisine = mongoose.model('Cuisine', cuisineSchema);
var Restaurent = mongoose.model('Restaurent', restaurentSchema);
var Menu = mongoose.model('Menu', menuSchema);

module.exports = {
    Restaurent: Restaurent,
    Menu: Menu,
    Cuisine: Cuisine
};
console.log("Created Restuarent model");