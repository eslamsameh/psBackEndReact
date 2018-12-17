var adminModel = require("../admins/model");
var customerModel = require("../customer/model");
var deviceModel = require("../device/model");
var gameModel = require("../game/model");
var objectID = require("mongodb").ObjectID;

async function checkForginKey(req, resp, next) {
  if (objectID.isValid(req.body.admin)) {
    var admins = await adminModel.findOne({ _id: req.body.admin });
  } else {
    resp.sendStatus(403);
  }
  if (objectID.isValid(req.body.customer)) {
    var customers = await customerModel.findOne({ _id: req.body.customer });
  } else {
    resp.sendStatus(403);
  }
  if (objectID.isValid(req.body.device)) {
    var devices = await deviceModel.findOne({ _id: req.body.device });
  } else {
    resp.sendStatus(403);
  }
  if (objectID.isValid(req.body.game)) {
    var games = await gameModel.findOne({ _id: req.body.game });
  } else {
    resp.sendStatus(403);
  }

  if (admins && customers && devices && games) {
    next();
  } else {
    resp.sendStatus(403);
  }
}
module.exports = checkForginKey;
