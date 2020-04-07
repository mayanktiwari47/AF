const mongoose = require("mongoose");
const Schema = mongoose.Schema;

connection = mongoose.createConnection('mongodb://localhost:27017/AFDB', { useNewUrlParser: true });

var CarDetailsSchema = new Schema({

  id: { 
    type: String, 
    required: true 
  },

  city:{ 
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
  price: {
    type: Number,
    required: true,
  },
  manufactureDate: {
    type: Date,
    required: true,
  },
  firstOwnerPurchaseYear: {
    type: Date,
    required: true,
  },
  carAge: {
    type: Number,
    required: true,
  },
  distanceCovered: {
    type: Number,
    required: true,
  },
  gearbox: {
    type: String,
    required: true,
  },
  engineSizeInL: {
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
  fuelConsumptionInKMPL: {
    type: Number,
    required: true,
  },
  bodyType: {
    type: String,
    required: true,
  },
  driveType: {
    type: String,
    required: true,
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
  previousOwners: {

    type: Array,

    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    contactNumber: {
      type: [Number],
      required: true
    }
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
  imageAvailable: {
    type: Boolean,
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

module.exports = Class = mongoose.model("Class", CarDetailsSchema);