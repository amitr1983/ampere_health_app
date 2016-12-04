// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

var favoriteSchema = mongoose.Schema({

        cuisine      : String,
        restaurant   : String,
        items         : String,
        calories     : Number,
        veg          : Boolean

});

module.exports = mongoose.model('Favorite', favoriteSchema);