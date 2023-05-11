const fs = require("fs").promises;
const path = require("path");
const toGeoJSON = require("togeojson");
const { DOMParser } = require("xmldom");
const turf = require("@turf/turf");

async function convertKMLToGeoJSON(inputFile, outputFile) {
  try {
    // Read the KML file
    const kmlData = await fs.readFile(inputFile, "utf8");

    // Parse the KML data to DOM
    const parser = new DOMParser();
    const kmlDOM = parser.parseFromString(kmlData, "application/xml");

    // Convert DOM to GeoJSON
    const geoJSON = toGeoJSON.kml(kmlDOM);

    const centroid = turf.centroid(geoJSON);
    const bbox = turf.bbox(geoJSON);
    geoJSON.properties = {
      centroid: centroid.geometry.coordinates,
      bbox: bbox,
    };

    // Write the GeoJSON to a file
    await fs.writeFile(outputFile, JSON.stringify(geoJSON, null, 2), "utf8");
    console.log(`KML file converted to GeoJSON and saved as ${outputFile}`);
  } catch (error) {
    console.error(`Error converting KML to GeoJSON: ${error}`);
  }
}

(async () => {
  const args = process.argv.slice(2);
  const kmlFile = args[0];
  const fpath = path.dirname(kmlFile);
  const fname = path.basename(kmlFile, ".kml");
  const output = `${fpath}/${fname}.geojson`;
  await convertKMLToGeoJSON(kmlFile, output);
})();
