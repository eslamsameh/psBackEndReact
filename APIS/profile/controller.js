var mongoose = require("mongoose");
var ProileModel = require("./model");
var fs = require("fs");
var multer = require("multer");
var upload = multer({ dest: "../../uploads" });
var type = upload.single("recfile");

const profileHandlar = {
  uploadPhoto: async (req, resp) => {
    var data = await ProileModel.find({ admin: req.body.admin });
    if (data.length > 0) {
      ProileModel.remove({ admin: req.body.admin }, err => {
        if (!err) {
          var insertedProfile = new ProileModel({
            _id: mongoose.Types.ObjectId(),
            admin: req.body.admin,
            img: req.files.userPhoto
          });
          var image = req.files.userPhoto;
          insertedProfile.img.contentType = "image/png";
          var uploadPath = __dirname + "/uploads/" + image.name;
          image.mv(uploadPath, err => {
            if (err) {
              return resp.status(500).send(err);
            } else {
              insertedProfile.save((err, data) => {
                if (!err) {
                  resp.json({ status: "success", data: uploadPath });
                } else {
                  resp.json({ status: "failure" });
                }
              });
            }
          });
        } else {
          resp.json({ status: "failure" });
        }
      });
    } else {
      var insertedProfile = new ProileModel({
        _id: mongoose.Types.ObjectId(),
        admin: req.body.admin,
        img: req.files.userPhoto
      });
      var image = req.files.userPhoto;
      insertedProfile.img.contentType = "image/png";
      var uploadPath = __dirname + "/uploads/" + image.name;
      image.mv(uploadPath, err => {
        if (err) {
          return resp.status(500).send(err);
        } else {
          insertedProfile.save((err, data) => {
            if (!err) {
              resp.json({ status: "success", data: uploadPath });
            } else {
              resp.json({ status: "failure" });
            }
          });
        }
      });
    }
  }

};
module.exports = profileHandlar;
