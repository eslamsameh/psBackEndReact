var mongoose = require('mongoose');
var schema = mongoose.Schema;
var paymentSchema = schema({
    startTime: Date,
    endTime:  Date,
    amount: Number,
    payed: Number,
    remeningAmount: Number,
    date: Date,
    finshed: Number,
    singleOrMulti: Number,
    admin  : { type: schema.Types.ObjectId, ref: 'AdminModel' },
    customer:{type: schema.Types.ObjectId, ref: 'CustomerModel'},
    device:{type: schema.Types.ObjectId, ref: 'deviceModel'},
    game:{type: schema.Types.ObjectId, ref:"gameModel"}
});
var paymentModel = mongoose.model('paymentModel',paymentSchema);
module.exports = paymentModel;