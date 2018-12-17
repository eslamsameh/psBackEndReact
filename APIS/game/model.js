var mongoose = require('mongoose');
var schema = mongoose.Schema;
var gameSchema = schema({
    gameName: String,
    
});
var gameModel = mongoose.model('gameModel',gameSchema);
module.exports = gameModel;