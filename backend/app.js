const express = require("express");
const app = express();
const port = 8000;

const turf = require("@turf/turf");
const cors = require("cors");

app.use(express.json());
app.use(cors());

const { mongoose, tilesSchema } = require("./db/db");

app.listen(port, () => {
  console.log(`Server start:${port}`);
});

app.get("/", (req, res) => {
  res.send("Galaxeye-AOI-Tile-Intersection-App");
});

app.post("/", async (req, res) => {
  console.log("post request");
  const selectedAOI = req.body.selectedAOI;
  const karnatakaGeoJson = await tilesSchema.find({});
  const intersectedTiles = findIntersection(selectedAOI, karnatakaGeoJson[0]);
  console.log(intersectedTiles);
  res.json({ intersectedTiles });
});

const findIntersection = (selectedAOI, geojsonData) => {
  const intersectedTiles = geojsonData.features.filter((tile) => {
    let intersect = turf.intersect(tile, selectedAOI);
    if (intersect != null) {
      return tile;
    }
  });
  return intersectedTiles;
};
