const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const fileSchema = new Schema({
  filename:{type:String},
  filepath:{type:String},
});

fileSchema.plugin(uniqueValidator);

module.exports = mongoose.model('File', fileSchema);
