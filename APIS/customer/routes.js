var customerController = require('./controller');
var jwtVerfication = require('../../jwtVerfication');

function customerRoutes(app) {
app.get('/customer/getAllCustomer', jwtVerfication, customerController.getAllCustomer);
app.post('/customer/insert', jwtVerfication, customerController.insertCustomer);
app.post('/customer/delete', jwtVerfication, customerController.deleteCustomer);
app.post('/customer/update', jwtVerfication, customerController.updateCustomer);
app.post("/customer/searchByCustomer",jwtVerfication,customerController.searchByCustomerName);

} 

module.exports = customerRoutes;