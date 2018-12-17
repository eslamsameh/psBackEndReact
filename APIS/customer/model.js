var mongoose = require('mongoose');
var schema = mongoose.Schema;
var customerSchema = schema({
    customerName: String ,
    
});
var CustomerModel = mongoose.model('CustomerModel',customerSchema);
module.exports = CustomerModel;