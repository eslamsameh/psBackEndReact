var mongoose = require("mongoose");
var drinkNamesModel = require("./model");

const DrinkNamesHandlar = {
  addDrinkName: (req, resp) => {
    var insertedDrinksName = new drinkNamesModel({
      _id: mongoose.Types.ObjectId(),
      drinkName: req.body.drinkName,
      price: req.body.price
    });
    insertedDrinksName.save(err => {
      !err
        ? resp.json({ status: "success" })
        : resp.json({ status: "Failure" });
    });
  },
  
  getAllDrinksNames: async (req, resp) => {
    var DrinksNames = await drinkNamesModel.find().lean();
    DrinksNames.length > 0
      ? resp.json({ status: "success", DrinksNames: DrinksNames })
      : resp.json({ status: "Failure" });
  },

  deleteDrinkName: (req, resp) => {
    drinkNamesModel.remove({ _id: req.body.drinkID }, err => {
      !err
        ? resp.json({ status: "success" })
        : resp.json({ status: "Failure" });
    });
  },

  UpdateDrinkName: (req, resp) => {
    var UpdatedDrinkName = {
      drinkName: req.body.drinkName,
      price: req.body.price
    };
    drinkNamesModel.update(
      { _id: req.body.drinkID },
      { $set: UpdatedDrinkName },
      { upsert: true },
      err => {
        !err
          ? resp.json({ status: "success" })
          : resp.json({ status: "Failure" });
      }
    );
  }
};
module.exports = DrinkNamesHandlar;
