const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Feature"],
    required: true,
  },
  properties: {
    name: String,
  },
  geometry: {
    type: {
      type: String,
      enum: ["Polygon"],
      required: true,
    },
    coordinates: {
      type: [[[Number]]],
      required: true,
    },
  },
});

const featureCollectionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["FeatureCollection"],
    required: true,
  },
  features: [featureSchema],
});

const polygonData = mongoose.model("GeoJSON", featureCollectionSchema);

module.exports = polygonData;
