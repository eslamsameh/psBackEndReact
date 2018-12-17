var drinkController = require("./controller");
var jwtVerfication = require("../../jwtVerfication");
function DrinkRoutes(app) {
  app.post("/drink/insert", jwtVerfication, drinkController.addDrink);
  app.post("/drink/delete", jwtVerfication, drinkController.deleteDrink);
  app.post("/drink/singlePaymentDrink", jwtVerfication, drinkController.getSingleDrink);
}

module.exports = DrinkRoutes;
