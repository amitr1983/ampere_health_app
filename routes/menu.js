// Module for Restaurent Menu
module.exports =function(app, menu) {

    var Models = require('../app/model/restaurent.js');

    app.get('/menu', function(req, res) {

    Models.Menu.find().lean().exec(function (err, menu) {
        if (err) return console.log(err)


    r=JSON.stringify({ toJSON: function () { return menu } })
         res.render('menu.ejs', {menu: r});
         console.log(r);
         })
    });
}