module.exports =function(app, restaurent) {

    var Model = require('../app/model/restaurent.js');

    app.get('/restaurant', function(req, res) {

        Model.Restaurent.find({},{_id:0}).lean().exec(function (err, restaurent) {
         if (err) return console.log(err)
            res.send(restaurent);
         })
    });

    app.get('/cuisine', function(req, res) {

         Model.Cuisine.find({},{_id:0}).lean().exec(function (err, cuisine) {
            if (err) return console.log(err)
                res.send(cuisine)
         });
    });

    app.get('/getsuggestion', function(req, res) {

        //Get Cuisine type from API url
        var cuisine_param = req.param('cuisine');
    
        //Get Cuisine type from API url
        var restaurant_param =req.param('restaurant');
        if (restaurant_param == undefined || restaurant_param == null) {
            res.send("Parameter is missing. Please send restaurant parameter. Eg. /getsuggestion?restaurant=Subways ")
        }

        // Fetch Max Calories
        Model.Calorie.find({},{ _id:0}).lean().exec(function (err, cal_required) {
            if (err) return console.log(err)
            var threshold =cal_required[0].max_calories

        // Fetch Restaurent on the basis on cuisine type
        

        Model.Restaurent.find({'cuisines':cuisine_param},{_id:0}).lean().exec(function (err, rest) {
        if (err) return console.log(err)
            var res_list=[]
            j = rest
            for (var i=0; i<j.length; i++){

                res_list.push(j[i].name)
            }

            // Fetch menu and suggest the food
            // Model.Menu.find({'restaurent':{"$in": res_list}}).lean().exec(function (err, menu) {

            Model.Menu.find({"restaurant":restaurant_param},{"restaurent":1, "item":1, food_type:1,"calories":1, _id:0}).lean().exec(function (err, menu) {
                if (err) return console.log(err)
                    console.log(menu)
                    m = menu
                    var r_list=[]
                    var sum=0;
                    for (var i=0; i<m.length; i++){
                        if (sum < threshold) {
                         sum += m[i].calories
                        r_list.push(m[i])
                        }
                        console.log(r_list)
                    }
                    res.send(r_list)
            });
        });  
    });
});
}