var mongoose = require("mongoose");
var customerModel = require("./model");

const customerHandlar = {
    getAllCustomer: async (req, resp)=>{
        var customers = await customerModel.find().lean();
        !customers.lengt > 0 ? resp.json({status: "success", customers: customers}):
        resp.json({status: "Failure"})
    },
    insertCustomer:(req, resp)=>{
        var insertedCutsomer = new customerModel({
            _id: mongoose.Types.ObjectId(),
            customerName:req.body.customerName,
        })
        insertedCutsomer.save((err, data)=>{
            !err ? resp.json({status:"success",data:data}):resp.json({status:"Failure"})
        })
    },
    deleteCustomer:(req, resp)=>{
        customerModel.remove({_id:req.body.Cusmoterid},(err )=>{
            !err ? resp.json({status:"success"}): resp.json({status:"Failure"})
        })
    },
    updateCustomer:(req, resp)=>{
        customerModel.update({_id: req.body.Cusmoterid}, {$set: {customerName: req.body.customerName}}, {upsert: true}, function(err){
            !err ? resp.json({status:"success"}): resp.json({status:"Failure"})
          });
    },
    searchByCustomerName:(req, resp)=>{
        var name = req.body.customerName;
        customerModel.find({ "customerName": { "$regex": name, "$options": "i" } },(err, data)=>{
          !err? resp.json({status:"success",customer:data}):
          resp.json({status:"Failure"});
        });
      }
};
module.exports = customerHandlar;
