var mongoose = require("mongoose");
var adminModel = require("./model");
var Token = require("jsonwebtoken");
var ProileModel = require("../profile/model");
var convert = require("string_decoder")
const AdminHandlar = {

  login: (req, resp) => {
    var user = {
      name: req.body.name,
      password: req.body.password
    };
    adminModel.find({name:req.body.name,password:req.body.password},(err,doc)=>{
      if (doc.length > 0) {
        Token.sign({ user: user }, "secretkey", (err, token) => {
          var decoded = Token.verify(token, "secretkey");
          var name = decoded.user.name;
          adminModel.findOne({ name: new RegExp("^" + name + "$", "i") }, function(err,doc) {
            !err ? resp.json({ token: token, adminId: doc.id, name:doc.name, role:doc.role })
              : resp.json({ status: "forbidden" });
          });
        });
      } else {
       
        resp.sendStatus(403)
      }
    })
    

  },

  registerAdmin: (request, resp) => {
    const AdminInsertation = new adminModel({
      _id: mongoose.Types.ObjectId(),
      name: request.body.name,
      age: request.body.age,
      role: request.body.role,
      password: request.body.password,
      phone: request.body.phone,
      address: request.body.address,
      email: request.body.email
    });
    AdminInsertation.save((err, data) => {
      !err
        ? resp.json({
            status: "sucess",
            message: "Admin Inserted Successfully",
            newAdmin: AdminInsertation
          })
        : resp.json({ status: "failuer", message: "Name Must Be Uniqe" });
    });
  },
  
  getAllUser:async(req,resp)=>{
    var admins =await adminModel.find().lean();
    admins.length > 0 ? resp.json({status:"success",admins:admins}) : 
    resp.json({status:"failure"});
  },

  deleteAdmin:(req, resp)=>{
    adminModel.remove({ _id: req.body.id }, function(err) {
      if (!err) {
             resp.json({status:"success"})
      }
      else {
        resp.json({status:"Failure"})
      }
  });
  },

  updateAdmin:(request, response)=>{
    var updatedValues = {
    name: request.body.name,
    age: request.body.age,
    role: request.body.role,
    password: request.body.password,
    phone: request.body.phone,
    address: request.body.address,
    email: request.body.email
  }
    adminModel.update({_id:request.body.id}, {$set:  updatedValues }, {upsert: true}, function(err){
      !err ? response.json({status:"success"}): response.json({status:"Failure"})
    });
  },
  getSingleAdmin:(req, resp)=>{
    adminModel.findOne({_id:req.body.adminId},(err, doc)=>{
      
        !err > 0 ? resp.json({status:"success",admin:doc}):
        resp.json({status:"failure"})
      
     
    })
  },
  myProfile: async (req, resp)=>{

    var profile = await  ProileModel.findOne({admin:req.body.adminId}).populate("admin").exec();
     if (profile !== null ) {
       console.log(profile._doc.img.data);
      resp.json({status:"success",admin:profile})

     } else {
      adminModel.findOne({_id:req.body.adminId},(err, data)=>{
   
        !err ? resp.json({status:"success",admin:data}): resp.json({status:"failure"})
      })
     }

  
   
  }
  // 5bfb23391bcbda73c051aa3f
};
module.exports = AdminHandlar;
