var deviceController = require('./controller');
var jwtVerfication = require('../../jwtVerfication')

function deviceRoutes(app) {
app.post('/device/insert', jwtVerfication, deviceController.Adddevice);
app.get('/device/getAllDevices', jwtVerfication, deviceController.getAllDevice);
app.get('/device/getActiveDevice', jwtVerfication, deviceController.getActiveDevices);
app.post('/device/delete', jwtVerfication, deviceController.deleteDevice);
app.post('/device/Update', jwtVerfication, deviceController.UpdateDevice);
} 

module.exports = deviceRoutes;