var mongoose = require("mongoose");
var playHourPriceModel = require("./model");

const playHourPriceHandlar = {
  insertPlayHour: (req, resp) => {
    var insertedPlayHour = new playHourPriceModel({
      _id: mongoose.Types.ObjectId(),
      single: req.body.single,
      multi: req.body.multi
    });
    insertedPlayHour.save(err => {
      !err
        ? resp.json({ status: "success" })
        : resp.json({ status: "Failure" });
    });
  },

  getPlayHour: async (req, resp) => {
    var playHour = await playHourPriceModel.find().lean();
    playHour.length > 0
      ? resp.json({ status: "success", playHour: playHour })
      : resp.json({ status: "Failure" });
  },

  updatePlayHour: (req, resp) => {
    var updatedPlayHour = {
      single: req.body.single,
      multi: req.body.multi
    };
    playHourPriceModel.update(
      { _id: req.body.playHourId },
      { $set: updatedPlayHour },
      { upsert: true },
      err => {
        !err
          ? resp.json({ status: "success" })
          : resp.json({ status: "Failure" });
      }
    );
  }
};
module.exports = playHourPriceHandlar;
