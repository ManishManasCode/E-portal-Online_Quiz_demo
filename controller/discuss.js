const Discuss = require("../model/discuss-model");
const { validationResult } = require("express-validator");
const User=require("../model/user-model");

const create=async(req,res,next)=>{
    // console.log("called");   
    const { userId,subject,question } = req.body; 
    let user= await User.findById(userId)
    // console.log(user.name);
    const createdDis=new Discuss({
        username:user.name,
        userId,
        subject,
        question,
    });
    try {
        await createdDis.save();
    } catch (err) {
        console.log(err);
        res.json({message: "Not Found"});
    }
    res.status(200);
}


const getdis = async (req, res, next) => {
    let discuss;
    try {
      discuss = await Discuss.find({});
    } catch (err) {
        res.json({message: "Not Found"});
    }
    res.json({ dis: discuss.map((u) => u.toObject({ getters: true })) });
  };


const reply=async(req,res,next)=>{
    const {id,userId,message}=req.body;
    let user= await User.findById(userId);
    let dis=await Discuss.findById(id);
    dis.reply.push(message);
    dis.name.push(user.name);
    try {
        await dis.save();
    } catch (err) {
        console.log(err);
        res.json({message: "Not Found"});
    }
    res.status(200);
}


exports.create=create;
exports.getdis=getdis;
exports.reply=reply;