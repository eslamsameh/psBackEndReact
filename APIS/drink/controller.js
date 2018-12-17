var mongoose = require("mongoose");
var drinkModel = require("./model");

const DrinkHandlar = {
  addDrink: (req, resp) => {
    var insertedDrink = new drinkModel({
      _id: mongoose.Types.ObjectId(),
      payment: req.body.payment,
      drinkName: req.body.drinkName
    });
    insertedDrink.save(err => {
      !err
        ? resp.json({ status: "success"  })
        : resp.json({ status: "failure" });
    });
  },
  deleteDrink: (req, resp) => {
    drinkModel.remove({ _id: req.body.drinkId }, err => {
      !err
        ? resp.json({ status: "success" })
        : resp.json({ status: "failure" });
    });
  },
  getSingleDrink: (req, resp) => {
    drinkModel
      .find({ payment: req.body.paymentId },{payment:0})
      .populate("drinkName")
      .lean()
      .exec((err, data) => {
        !err
          ? resp.json({ status: "success", drinks: data })
          : resp.json({ status: "failure" });
      });
  }
};
module.exports = DrinkHandlar;
