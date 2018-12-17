var mongoose = require('mongoose');
var schema = mongoose.Schema;
var ProfileSchema = schema({
    img: { data: Buffer, contentType: String },
    admin  : { type: schema.Types.ObjectId, ref: 'AdminModel' },
})
var ProfileModel = mongoose.model('profileModel',ProfileSchema);

module.exports = ProfileModel