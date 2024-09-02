const mongoose = require("mongoose");
const tilesSchema = require("./tilesSchema");
const dataset = require("./karnataka.json");

const mongodbUrl = "mongodb://mongo:27017/MapSelector";
mongoose.connect(mongodbUrl);
const database = mongoose.connection;

database.on("error", (error) => {
  console.error(error);
});

database.once("open", () => {
  console.log("mongodb connecting!");
  tilesSchema
    .findOne({})
    .then((result) => {
      if (result === null) {
        console.log("The data collection is empty");
        const newTilesSchema = new tilesSchema(dataset);
        newTilesSchema
          .save()
          .then((e) => {
            console.log("Seeded");
          })
          .catch((error) => {
            console.log(error);
            console.log("Could not seed DB.");
          });
      } else {
        console.log("The data collection is not empty.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

module.exports = { mongoose, tilesSchema };
