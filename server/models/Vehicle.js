const mongoose = require('mongoose');
var uuid = require('uuid');

const VehiclesSchema = new mongoose.Schema({
  Vehicle_ID: {
    type: String,
    default: uuid.v1
  },
  name: {
    type: String,
    default: 'roeee'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  Car_type: {
    type: String,
    enum: ['SUV', 'Truck', 'Hybrid'],
    default: 'SUV'
  },
  Last_Successful_Connection: {
    type: Date,
    default: Date.now
    }
});

module.exports = mongoose.model('Vehicle', VehiclesSchema);
