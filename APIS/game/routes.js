var gameController = require("./controller");
var jwtVerfication = require("../../jwtVerfication");

function GameRoutes(app) {
  app.post("/game/insert", jwtVerfication, gameController.insertGame);
  app.get("/game/getAllGames", jwtVerfication, gameController.getAllGames);
  app.post("/game/delete", jwtVerfication, gameController.deleteGame);
  app.post("/game/update", jwtVerfication, gameController.updateGame);
}

module.exports = GameRoutes;
