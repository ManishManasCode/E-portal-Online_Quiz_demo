const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  sid:{type:String,required:true},
  phone:{type:Number,required:true,minlength:10},
  age:{type:Number,required:true},
  branch:{type:String,required:true},
  skill:[{type:String}],
  gender:{type:String,required:true},
  scores:[{type:Number}],
  times:[{type:String}]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
