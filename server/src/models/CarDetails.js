const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

connection = mongoose.createConnection('mongodb://localhost:27017/AFDB', { useNewUrlParser: true });

autoIncrement.initialize(connection);

var CarDetailsSchema = new Schema({

  id: {
    type: String,
    required: true
  },

  city: {
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
  modelType: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  yearOfReg: {
    type: Date,
    required: true,
  },
 
  distanceCovered: {
    type: Number,
    required: true,
  },
  transmission: {
    type: String,
    required: true,
  },
  engineSize: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  fuelType: {
    type: String,
    required: true,
  },
  fuelConsumption: {
    type: Number,
    required: true,
  },
  bodyType: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnail: {
    data: Buffer,
    contentType: String,
  },
  weightAndDimension: {
    length: {
      type: Number,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    fuelTankCapacity: {
      type: Number,
      required: true,
    },
    bootSpace: {
      type: Number,
      required: true,
    },
    doors: {
      type: Number,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    }
  },
  ownership: {
    type: String,
    required: true,
  },
  lastMOT: {
    type: Date
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true
  },
  warrantyExpiryDate: {
    type: Date,
    required: true,
  },
  performance: {
    // in kmph
    topSpeed: {
      type: Number,
    },
    // in seconds (0-62 mph)
    acceleration: {
      type: Number,
    }
  },
  features: {
    activeCruiseControl: {
      type: Boolean,
    },
    airCon: {
      type: Boolean,
    },
    alloys: {
      type: Boolean,
    },
    bluetooth: {
      type: Boolean,
    },
    cdPlayer: {
      type: Boolean,
    },
    cruiseControl: {
      type: Boolean,
    },
    DAB: {
      type: Boolean,
    },
    dvdPlayer: {
      type: Boolean,
    },
    headUpDisplay: {
      type: Boolean,
    },
    heatedSeats: {
      type: Boolean,
    },
    heatedWindscreen: {
      type: Boolean,
    },
    keylessEntry: {
      type: Boolean,
    },
    leatherSeats: {
      type: Boolean,
    },
    metallicPaint: {
      type: Boolean,
    },
    paddleShift: {
      type: Boolean,
    },
    parkingCamera: {
      type: Boolean,
    },
    parkingSensors: {
      type: Boolean,
    },
    premiumSoundSystem: {
      type: Boolean,
    },
    privacyGlass: {
      type: Boolean,
    },
    satNavDisplay: {
      type: Boolean,
    },
    selfParking: {
      type: Boolean,
    },
    startSoptTechnology: {
      type: Boolean,
    },
    sunroof: {
      type: Boolean,
    },
    Towbar: {
      type: Boolean,
    },
    smartCar: {
      type: Boolean,
    }
  },
  // in g/km (band G)
  co2EmmissionValue: {
    type: Number,
  },
  ulezCompliant: {
    type: Boolean,
  }

}, { collection: 'CarDetails' });

CarDetailsSchema.index({ id: 1 }, { unique: true });

CarDetailsSchema.plugin(autoIncrement.plugin, {
  model: 'CarDetails',
  field: 'id',
  startAt: 100001,
  incrementBy: 1
});

module.exports = Car = mongoose.model("CarDetails", CarDetailsSchema);