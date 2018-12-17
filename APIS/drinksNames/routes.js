var drinkNameController = require('./controller');
var jwtVerfication = require('../../jwtVerfication');

function DrinkNameRoutes(app) {
app.post('/drinkName/add',jwtVerfication,drinkNameController.addDrinkName);
app.get('/drinkName/getAllDrinksNames',jwtVerfication,drinkNameController.getAllDrinksNames);
app.post('/drinkName/delete',jwtVerfication,drinkNameController.deleteDrinkName);
app.post('/drinkName/update',jwtVerfication,drinkNameController.UpdateDrinkName);
} 

module.exports = DrinkNameRoutes;