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
        restaurant   : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurent' }],
        item         : String,
        calories     : Number,
        veg          : Boolean

    }

});

var calorieSchema = mongoose.Schema({

    calorie        : {
        max_calories         : Number
    }

});
// methods ======================


// create the model for users and expose it to our app

var Cuisine = mongoose.model('Cuisine', cuisineSchema);
var Restaurent = mongoose.model('Restaurent', restaurentSchema);
var Menu = mongoose.model('Menu', menuSchema);
var Calorie = mongoose.model('Calorie', calorieSchema);

module.exports = {
    Restaurent: Restaurent,
    Menu: Menu,
    Cuisine: Cuisine,
    Calorie,Calorie,
};

console.log("Created Restuarent model");