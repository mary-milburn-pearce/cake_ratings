//REQUIRE STATMENTS
const express = require("express");
const app = express();
const bodyParser = require('body-parser');

//APP CONFIGURATION
app.use(bodyParser.json());

//HOOK UP TO ANGULAR
app.use(express.static(__dirname + '/public/dist/public'));

//ROUTES
require('./server/routes')(app)

//SERVER LISTEN
app.listen(8000, function(){
    console.log("Listening on post 8000")
});