const { validationResult } = require("express-validator");
const User = require("../model/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login=async(req,res,next)=>{
    const { email, password } = req.body;
    let existingUser;
    try {
      existingUser = await User.findOne({ email: email });
    } catch (err) {
      return res.json({message: "Not Found"});
    }
    if (!existingUser) {
      return res.json({message: "Not Found"});
    }
    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        res.json({message: "Not Found"});
    }
    if (!isValidPassword) {
      return res.json({message: "Not Found"});
    }
    let token;
    try {
      token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        "secret_string",
        { expiresIn: "1h" }
      );
    } catch (err) {
      return res.json({message: "Not Found"});
    }
  
    res.json({
      userId:existingUser.id,
      email:existingUser.email,
      name:existingUser.name,
      token:token
    });
  };
const signup = async (req, res, next) => {
const error = validationResult(req);
if (!error.isEmpty()) {
  return res.json({message: "Not Found"});
}
const { name, sid , email, password,phone,age,branch,skill,gender } = req.body;

let existingUser;
try {
    existingUser = await User.findOne({ email: email });
} catch (err) {
    return res.json({message: "Not Found"});
}
if (existingUser) {
    return res.json({message: "Not Found"});
}

let hashedPassword;
try {
    hashedPassword = await bcrypt.hash(password, 12);
} catch (err) {
    res.json({message: "Not Found"});
}
const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    sid,
    phone,
    age,
    branch,
    skill,
    gender
});
try {
    await createdUser.save();
} catch (err) {
    res.json({message: "Not Found"});
}
let token;
try {
    token = jwt.sign(
    { userId: createdUser.id, email: createdUser.email },
    "secret_string",
    { expiresIn: "1h" }
    );
} catch (err) {
    res.json({message: "Not Found"});
}

res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
};

const getUserById = async (req, res, next) => {
  const userId = req.body.userId;
  // console.log(userId);
  let user;
  try {
    user = await User.findById(userId,"-password");
  } catch (err) {
    res.json({message: "Not Found"});
  }

  if (!user) {
    res.json({message: "Not Found"});
  }

  res.json({ user: user.toObject({ getters: true }) });
};


const updateScore = async (req, res, next) => {
  // console.log("called");
  const {userId ,score, time } = req.body;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    res.json({message: "Not Found"});
  }

  user.scores.push(score);
  user.times.push(time);
  try {
    await user.save();
  } catch (err) {
    res.json({message: "Not Found"});
  }
  // console.log(user.times);
  res.status(200);
};

const edit=async(req,res,next)=>{
  const { userId,name, sid , email,phone,age,branch,skill,gender } = req.body;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    res.json({message: "Not Found"});
  }

  user.name=name;
  user.sid=sid;
  user.email=email;
  user.phone=phone;
  user.age=age;
  user.branch=branch;
  user.skill=skill;
  user.gender=gender;
  try {
    await user.save();
  } catch (err) {
    res.json({message: "Not Found"});
  }
  res.status(200);
}


exports.signup = signup;
exports.login = login;
exports.getUserById = getUserById;
exports.updateScore=updateScore;
exports.edit=edit;