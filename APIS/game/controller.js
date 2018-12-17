var mongoose = require("mongoose");
var gameModel = require("./model");

const gameHandlar = {
  insertGame: (req, resp) => {
    var insertedGame = new gameModel({
      _id: mongoose.Types.ObjectId(),
      gameName: req.body.gameName
    });
    insertedGame.save(err => {
      !err
        ? resp.json({ status: "success" })
        : resp.json({ status: "Failure" });
    });
  },

  getAllGames: async (req, resp) => {
    var games = await gameModel.find().lean();
    games.length > 0
      ? resp.json({ status: "success", games: games })
      : resp.json({ status: "Failure" });
  },

  deleteGame: (req, resp) => {
    gameModel.remove({ _id: req.body.gameId }, err => {
      !err
        ? resp.json({ status: "success" })
        : resp.json({ status: "Failure" });
    });
  },

  updateGame: (req, resp) => {
    var UpdatedGame = {
      gameName: req.body.gameName
    };
    gameModel.update(
      { _id: req.body.gameId },
      { $set: UpdatedGame },
      { upsert: true },
      err => {
        !err
          ? resp.json({ status: "success" })
          : resp.json({ status: "Failure" });
      }
    );
  }

};
module.exports = gameHandlar;
