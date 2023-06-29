const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const discussSchema = new Schema({
  username: { type: String},
  userId:{type:String},
  subject:{type:String},
  question:{type:String},
  reply:[{type:String}],
  name:[{type:String}]
});

discussSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Discuss', discussSchema);
