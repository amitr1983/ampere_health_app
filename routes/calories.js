// Module for food suggestion
module.exports =function(app, calories) {

  var User = require('../app/model/user.js');

  var request = require('request');

  app.get('/calories', function(req, res) {

    var threshold_value = 2200;
    
    User.find( {'fitbit.token' : /a/}, {'fitbit.token' : 1}, function(err, user) {

      var date = new Date();
      date.setUTCDate(15)
      var today = date.toISOString().slice(0,10);
      var accessToken = user[0].fitbit.token
      var options = {
      url: 'https://api.fitbit.com/1/user/-/activities/date/'+today+'.json',
      headers: {'Authorization': 'Bearer '+new Buffer(accessToken)
      }};

    function callback(error, response, body,done) {

      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        calories=info.summary.caloriesOut

        res.send('Calories are '+calories)
      }}
    
    request(options, callback);

    });
  });   
}