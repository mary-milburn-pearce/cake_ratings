//REQUIRE CONTROLLER TO HAVE ACCESS TO ROUTE LOGIC
const controller = require("./controller")

//EXPORT ROUTES SO OUR SERVER.JS CAN ACCESS IT
module.exports = function(app){
    app.get('/cakes', controller.getAllCakes)  
    app.get('/cakes/:id', controller.getCake)
    app.post('/cakes', controller.addCake) 
    app.post('/cakes/:id/rate', controller.addRating)
}
