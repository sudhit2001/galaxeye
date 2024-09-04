const mongoose = require("mongoose");
const tilesSchema = require("./tilesSchema");
const dataset = require("./karnataka.json");

const mongodbUrl = "mongodb+srv://21sudhit:sudhit@cluster0.2ohea.mongodb.net/";
mongoose.connect(mongodbUrl);
const database = mongoose.connection;

database.on("error", (error) => {
  console.error(error);
});

database.once("open", () => {
  console.log("mongodb connecting");
  tilesSchema
    .findOne({})
    .then((result) => {
      if (result === null) {
        console.log("empty");
        const newTilesSchema = new tilesSchema(dataset);
        newTilesSchema
          .save()
          .then((e) => {
            console.log("Done");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("not empty");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

module.exports = { mongoose, tilesSchema };
