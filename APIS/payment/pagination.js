var mongoose = require("mongoose");
var paymentModel = require("./model");
const PaymentPagination = {
  pages: (req, resp) => {
    paymentModel.find(
      {
        date: { $gte: new Date(req.body.from), $lt: new Date(req.body.to) },
        finshed: 1
      },
      {
        _id: 1
      },
      (err, data) => {
        if (!err) {
          var count = data.length - 1;
          if (count > 10) {
            var result = count / 10;
            if (result % 1 == 0) {
              resp.json({ status: "Success", count: result });
            } else {
              result = parseInt(result);
              result += 1;
              resp.json({ status: "Success", count: result });
            }
          } else {
            resp.json({ status: "Success", count: 1 });
          }
        } else {
          resp.json({ status: "Failure" });
        }
      }
    );
  },
  reportByDate: (req, resp) => {
    paymentModel
      .find({
        date: { $gte: new Date(req.body.from), $lte: new Date(req.body.to) },
        finshed: 1
      })
      .populate("admin")
      .populate("customer")
      .populate("device")
      .populate("game")
      .skip(req.body.page * 10)
      .limit(10)
      .lean()
      .exec((err, data) => {
        if (!err) {
          resp.json({ status: "Success", payments: data });
        } else {
          resp.json({ status: "Failure" });
        }
      });
  }
};
module.exports = PaymentPagination;
