module.exports =function(app, restaurent) {

    var Model = require('../app/model/restaurent.js');

    app.get('/restaurent', function(req, res) {

    Model.Restaurent.find().lean().exec(function (err, restaurent) {
        if (err) return console.log(err)


    console.log(restaurent.ObjectID);

    r=JSON.stringify({ toJSON: function () { return restaurent } })
         res.render('restaurent.ejs', {restaurent: r});
         console.log(r['name']);
         console.log(r.id_str);
         console.log(r.name);
         console.log(r);
         })
    });
}