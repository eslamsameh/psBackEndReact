var mongoose = require('mongoose');
var schema = mongoose.Schema;
var deviceSchema = schema({
    deviceName: String ,
    statues: Number,
    
});
var deviceModel = mongoose.model('deviceModel',deviceSchema);
module.exports = deviceModel;