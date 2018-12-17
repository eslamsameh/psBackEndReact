var mongoose = require('mongoose');
function openDbConnection (){
    mongoose.connect('mongodb://Eslam:Asd95123654@ds149732.mlab.com:49732/psbackend',{ useNewUrlParser: true })
}
module.exports  = openDbConnection;