////MODULARIZATION WITH MODELS:
    ////the models file will contain all of the mongoose connection and schema definitions

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/cakes_db');

    const RatingSchema = new mongoose.Schema({
        points: {type: Number, required: [true, "Rating must include point value"]},
        comment: {type: String, required: [false]},
    }, {timestamps: true})
    var CakeSchema = new mongoose.Schema({
        baker: {type: String, required: true, minlength: 3},
        imageURL: {type: String, required: true, minlength: 20},
        ratings: [RatingSchema]
    }, {timestamps: true});
    mongoose.model('Cake', CakeSchema); // We are setting this Schema in our Models as 'Cake'
    var Cake = mongoose.model('Cake');

    ////Export Cake so Controllers has access to it
    module.exports = Cake;