var paymentController = require("./controller");
var jwtVerfication = require("../../jwtVerfication");
var checkingkeys = require('./foundedForignKey');
var PaymentPagination = require('./pagination');


function paymentRoutes(app) {
  app.post("/payment/openTime", jwtVerfication,checkingkeys, paymentController.OpenPayment);
  app.get("/payment/currentPayment", jwtVerfication, paymentController.currentPayemt);
  app.post("/payment/editPayment", jwtVerfication,checkingkeys, paymentController.editPayment);
  app.post("/payment/findPayment", jwtVerfication, paymentController.findPayment);
  app.post("/payment/PaymentAmountByDate", jwtVerfication, paymentController.findPaymentAmountsByDate);
  app.post("/payment/delete", jwtVerfication, paymentController.deletePayment);
  app.post("/payment/pages", jwtVerfication, PaymentPagination.pages);
  app.post("/payment/report",jwtVerfication, PaymentPagination.reportByDate);
  app.get("/payment/topCustomer",jwtVerfication,paymentController.TopCustomer);
  app.post("/payment/changeCustomer",jwtVerfication,paymentController.EditCustomerNameInPayementOpened);
  app.post("/payment/getRemaningOnCustomer",jwtVerfication, paymentController.getTotalRemening);
}

module.exports = paymentRoutes;
