var ProfileController = require("./controller");
var jwtVerfication = require("../../jwtVerfication");

function ProfileRoutes(app) {
  app.post("/profile/add", jwtVerfication, ProfileController.uploadPhoto);

}

module.exports = ProfileRoutes;
