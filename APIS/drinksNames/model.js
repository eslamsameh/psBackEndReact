var mongoose = require('mongoose');
var schema = mongoose.Schema;
var drinkNameSchema = schema({
    drinkName: String,
    price: Number,
});
var drinkNameModel = mongoose.model('drinkNameModel',drinkNameSchema);
module.exports = drinkNameModel;