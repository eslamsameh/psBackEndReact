var mongoose = require("mongoose");
var paymentModel = require("./model");

const paymentHandlar = {
  OpenPayment: (req, resp) => {
    var InsertedPayment = new paymentModel({
      _id: mongoose.Types.ObjectId(),
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      amount: req.body.amount,
      payed: req.body.payed,
      remeningAmount: req.body.remeningAmount,
      date: req.body.date,
      finshed: req.body.finshed,
      singleOrMulti: req.body.singleOrMulti,
      admin: req.body.admin,
      customer: req.body.customer,
      device: req.body.device,
      game: req.body.game
    });
    console.log(req.body.startTime);
    InsertedPayment.save(err => {
      !err
        ? resp.json({ status: "success", InsertedPayment: InsertedPayment })
        : resp.json({ status: "Failure" });
    });
  },
  currentPayemt: (req, resp) => {
    paymentModel
      .find({ finshed: 0 })
      .populate("admin", { name: 1 })
      .populate("customer", { customerName: 1 })
      .populate("device")
      .populate("game")
      .lean()
      .exec((err, data) => {
        if (!err) {
          resp.json({ status: "Success", payments: data });
        } else {
          resp.json({ status: "Failure" });
        }
      });
  },
  editPayment: (req, resp) => {
    var UpdatedPayment = {
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      amount: req.body.amount,
      payed: req.body.payed,
      remeningAmount: req.body.remeningAmount,
      date: req.body.date,
      finshed: req.body.finshed,
      singleOrMulti: req.body.singleOrMulti,
      admin: req.body.admin,
      customer: req.body.customer,
      device: req.body.device,
      game: req.body.game
    };
    console.log(UpdatedPayment);
    paymentModel.update(
      { _id: req.body.paymentId },
      { $set: UpdatedPayment },
      { upsert: true },
      err => {
        console.log(err);
        !err
          ? resp.json({ status: "success" })
          : resp.json({ status: "Failure" });
      }
    );
  },
  findPayment: (req, resp) => {
    paymentModel
      .findOne({ _id: req.body.paymentId })
      .populate("admin", { name: 1 })
      .populate("customer", { customerName: 1 })
      .populate("device", { deviceName: 1 })
      .populate("game", { gameName: 1 })
      .lean()
      .exec((err, data) => {
        if (!err) {
          resp.json({ status: "Success", payments: data });
        } else {
          resp.json({ status: "Failure" });
        }
      });
  },
  findPaymentAmountsByDate: (req, resp) => {
    const dataArray = [];
    paymentModel.find(
      {
        date: { $gte: new Date(req.body.from), $lte: new Date(req.body.to) },
        finshed: 1
      },
      {
        amount: 1,
        payed: 1,
        remeningAmount: 1,
        _id: 0
      },

      (err, data) => {
        if (!err) {
          resp.json({ status: "Success", payments: data });
        } else {
          resp.json({ status: "Failure" });
        }
      }
    );
  },

  deletePayment: (req, resp) => {
    paymentModel.remove({ _id: req.body.paymentId }, err => {
      !err
        ? resp.json({ status: "Success" })
        : resp.json({ status: "Failure" });
    });
  },
  TopCustomer: async (req, resp) => {
    var customer = await paymentModel
      .find({}, { customer: 1 })
      .sort({ customer: -1 })
      .limit(1)
      .populate("customer");
    if (customer.length > 0) {
      resp.json({ status: "success", customer: customer });
    } else {
      resp.json({ status: "Failure" });
    }
  },
  EditCustomerNameInPayementOpened: (req, resp) => {
    var UpdatedPayment = {
      customer: req.body.customer
    };
    paymentModel.update(
      { _id: req.body.paymentId },
      { $set: UpdatedPayment },
      { upsert: true },
      err => {
        !err
          ? resp.json({ status: "success" })
          : resp.json({ status: "Failure" });
      }
    );
  },
  getTotalRemening: (req, resp) => {
    console.log(req.body.customer);
    paymentModel
      .find({ customer: req.body.customer })
      .lean()
      .exec((err, data) => {
        if (!err) {
          resp.json({ status: "Success", TotalRemening: data });
        } else {
          resp.json({ status: "Failure" });
        }
      });
  }
};
module.exports = paymentHandlar;
