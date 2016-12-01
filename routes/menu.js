module.exports =function(app, menu) {

    var Models = require('../app/model/restaurent.js');

    app.get('/menu', function(req, res) {

    Models.Menu.find({},{_id:0}).lean().exec(function (err, menu) {
        if (err) return console.log(err)
        	res.send(menu)
    });
});
}