// MODELS IMPORTS
var express = require("express");
var body = require("body-parser");
var fileUpload = require("express-fileupload");
var cors = require('cors');
var fileStram= require('fs')
// Connection WITH DATABASE
var connection = require("./connectionString");
// ROUTES
var adminRoutes = require("./APIS/admins/routes.js");
var drinkRoute = require("./APIS/drink/routes.js");
var GameRoute = require("./APIS/game/routes");
var customerRoute = require("./APIS/customer/routes");
var deviceRoute = require("./APIS/device/routes");
var paymentRoute = require("./APIS/payment/routes.js");
var playHourPrice = require("./APIS/play-hour-price/routes");
var drinkName = require("./APIS/drinksNames/routes");
var profile = require("./APIS/profile/routes");
var app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, '/build')));
app.use(body.urlencoded({ extended: true }));
app.use(cors({
  origin:"http://localhost:3000"
}));

app.use(body.json());
app.use(fileUpload());
connection();
adminRoutes(app);
drinkRoute(app);
GameRoute(app);
customerRoute(app);
deviceRoute(app);
paymentRoute(app);
playHourPrice(app);
drinkName(app);
profile(app);
// default options

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname+'/build/index.html'));
});
app.use(express.static(__dirname));
var server = app.listen(8000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at ", host, port);
});

