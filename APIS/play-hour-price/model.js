var mongoose = require('mongoose');
var schema = mongoose.Schema;
var playHourPriceSchema = schema({
   single: Number,
   multi: Number
    
});
var playHourPriceModel = mongoose.model('playHourPriceModel',playHourPriceSchema);
module.exports = playHourPriceModel;