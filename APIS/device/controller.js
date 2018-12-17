var mongoose = require("mongoose");
var deviceModel = require("./model");

const deviceHandlar = {
    Adddevice:(req , resp)=>{
        var insertedDevice = new deviceModel({
            _id:mongoose.Types.ObjectId(),
            deviceName:req.body.deviceName,
            statues: 0,
        })
        insertedDevice.save((err)=>{
            !err ? resp.json({status:"sucess"}):resp.json({status:"Failure"})
        })
    },
    getAllDevice: async (req, resp)=>{
        var devices = await deviceModel.find().lean();
        devices.length > 0 ? resp.json({status:"success", devices:devices}):
        resp.json({status:"Failure"})
    },
    deleteDevice:(req, resp)=>{
        deviceModel.remove({_id:req.body.deviceId},(err)=>{
            !err ? resp.json({status:"suceess"}):resp.json({status:"Failure"})
        })

    },
    UpdateDevice:(req, resp)=>{
        var UpdatedDevice={
            deviceName:req.body.deviceName,
            statues:req.body.status
        }
        deviceModel.update({_id:req.body.deviceId},{$set:UpdatedDevice},{upsert:true},(err, data)=>{
            !err ? resp.json({status:"success"}):resp.json({status:"success"})
        })
    }, 
    getActiveDevices:(req, resp)=>{
        deviceModel.find({statues:0},(err, data)=>{
            !err ? resp.json({status:"success",device:data}):
            resp.json({status:"Failure"})
        })
    }
};
module.exports = deviceHandlar;
