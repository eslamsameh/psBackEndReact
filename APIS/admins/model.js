var mongoose = require('mongoose');
var schema = mongoose.Schema;
var adminSchema = schema({
    name: { type : String , unique : true, required : true },
    age: Number,
    role: String,
    password: { type : String , required : true},
    phone: Number,
    address: String,
    email:String,
    profile  : { type: schema.Types.ObjectId, ref: 'profileModel' },
});
var AdminModel = mongoose.model('AdminModel',adminSchema);
module.exports = AdminModel;