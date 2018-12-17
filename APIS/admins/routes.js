var adminController = require("./controller");
var jwtVerfication = require("../../jwtVerfication");

function AdminRoutes(app) {
  app.post("/admin/login", adminController.login);
  app.post("/admin/insert", adminController.registerAdmin);
  app.get("/admin/getAllUsers", jwtVerfication, adminController.getAllUser);
  app.post("/admin/delete", jwtVerfication, adminController.deleteAdmin);
  app.post("/admin/Update", jwtVerfication, adminController.updateAdmin);
  app.post("/admin/GetSingleAdmin", jwtVerfication, adminController.getSingleAdmin);
  app.post("/profile/me", jwtVerfication, adminController.myProfile);

}

module.exports = AdminRoutes;
