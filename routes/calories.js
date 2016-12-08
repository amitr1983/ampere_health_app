// Module for food suggestion
module.exports =function(app, calories) {

  var User = require('../app/model/user.js');

  var request = require('request');

  app.get('/calories', function(req, res) {

    var threshold_value = 2200;
    

    User.find({},{ _id:0}).lean().exec(function (err, user) {
      if (err) return console.log(err)
      console.log(user[0].fitbit.calories_burned)
      calories_burned=user[0].fitbit.calories_burned
      res.send("Calories burned is " + calories_burned)
    });   
  }); 
}
