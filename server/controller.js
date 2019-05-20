//MODULARIZATION WITH MODELS:
    const Cake = require("./models")

//EXPORT OUR CONTROLLERS SO OUR ROUTES CAN ACCESS IT
module.exports = {

    getAllCakes:function(req, res){
        console.log(req.body, req.params);
        Cake.find({}, function(err, cakes) {
            console.log(err, cakes);
            res.json({data: cakes});
        })
    },

    getCake:function(req, res) {
        console.log(req.body, req.params);
        Cake.findById(req.params.id, function(err, cake) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(cake);
            }
        })
    },

    addCake:function(req, res){
        console.log(req.body, req.params);
        Cake.create(req.body, function(err, cake) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(cake);
            }
        })
    },

    addRating: function(req, res){
        Cake.findById(req.params.id, function(err, data) {
            if (err) {
                res.json(err);
            }
            else {
                //data contains a Cake object
                console.log('Data:', data);
                data.ratings.push(req.body);
                data.save();
                // msg.comments.push(req.body);
                // msg.save();
                res.json(data);
            }
        });
    },

    updCake:function(req, res) {
        console.log("Reached updCake", req.body, req.params);
        Cake.findByIdAndUpdate(req.params.id, req.body, 
            function(err, cake) {
                if (err) {
                    res.json(err);
                }
                else {
                    res.json(cake);
                }
            })
    },

    remCake:function(req, res) {
        console.log(req.body, req.params);
        Cake.findByIdAndDelete(req.params.id, function(err, cake) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(cake);
            }
        })
    }
}
