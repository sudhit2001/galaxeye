import "./App.css";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, FeatureGroup, GeoJSON } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";
import axios from "axios";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function App() {
  const [tiles, settiles] = useState([]);
  const location = [11.4716, 80.1946];
  const zoom = 7;

  useEffect(() => {
    console.log("tiles", tiles);
  }, [tiles]);

  const findIntersectedTiles = async (selectedAOI) => {
    const intersectedTiles = await axios.post(`http://localhost:8000`, {
      selectedAOI: selectedAOI,
    });
    return intersectedTiles;
  };

  const onCreated = async (e) => {
    let tileLayer = e.layer;
    const selectedAOI = tileLayer.toGeoJSON();
    const intersectedTiles = await findIntersectedTiles(selectedAOI);
    settiles(intersectedTiles.data.intersectedTiles);
  };

  return (
    <div className="App">
      <MapContainer zoom={zoom} center={location} scrollWheelZoom={false}>
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={onCreated}
            draw={{
              rectangle: {
                shapeOptions: {
                  color: "blue",
                },
              },
              polyline: false,
              polygon: false,
              circle: false,
              circlemarker: false,
              marker: false,
            }}
          />
        </FeatureGroup>

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {tiles.map((tile) => {
          const tileStyle = {
            color: "#ff2c2c",
            fillOpacity: 0.2,
            stroke: "#ff2c2c",
            strokeWidth: 0.5,
          };

          return (
            <GeoJSON
              data={{ type: "FeatureCollection", features: [tile] }}
              style={tileStyle}
            />
          );
        })}
      </MapContainer>
    </div>
  );
}

export default App;
