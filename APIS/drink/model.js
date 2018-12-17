var mongoose = require('mongoose');
var schema = mongoose.Schema;
var drinkSchema = schema({
    payment:{type:schema.Types.ObjectId, ref:"paymentModel"},
    drinkName:{type:schema.Types.ObjectId, ref:"drinkNameModel"}

});
var drinkModel = mongoose.model('drinkModel',drinkSchema);
module.exports = drinkModel;