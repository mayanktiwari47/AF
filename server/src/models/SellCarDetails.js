const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

connection = mongoose.createConnection('mongodb://localhost:27017/AFDB', { useNewUrlParser: true });

autoIncrement.initialize(connection);

var SellCarDetailsSchema = new Schema({

  id: {
    type: String,
    required: true
  },

  rto: {
    type: String,
    required: true
  },

  maker: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  ownership: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    required: true,
  },

 
  year: {
    type: String,
    required: true,
  },
 
  kms: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  images: [{
    data:Buffer,
    contentType: String,
  
  }],
 

}, { collection: 'SellCarDetails' });

SellCarDetailsSchema.index({ id: 1 }, { unique: true });

SellCarDetailsSchema.plugin(autoIncrement.plugin, {
  model: 'SellCarDetails',
  field: 'id',
  startAt: 100001,
  incrementBy: 1
});

module.exports = SellCar = mongoose.model("SellCarDetails", SellCarDetailsSchema);