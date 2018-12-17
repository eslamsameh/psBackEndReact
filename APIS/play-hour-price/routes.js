var playHourPriceController = require('./controller');
var jwtVerfication = require('../../jwtVerfication');
function playHourPriceRoutes(app) {
app.post('/playHour/insert',jwtVerfication,playHourPriceController.insertPlayHour);
app.post('/playHour/update',jwtVerfication,playHourPriceController.updatePlayHour);
app.get('/playHour/getPlayHour',jwtVerfication,playHourPriceController.getPlayHour);
} 

module.exports = playHourPriceRoutes;