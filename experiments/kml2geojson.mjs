import { promises as fs } from "fs";
import { kml } from "togeojson";
import { DOMParser } from "xmldom";

async function convertKMLToGeoJSON(inputFile, outputFile) {
  try {
    // Read the KML file
    const kmlData = await fs.readFile(inputFile, "utf8");

    // Parse the KML data to DOM
    const parser = new DOMParser();
    const kmlDOM = parser.parseFromString(kmlData, "application/xml");

    // Convert DOM to GeoJSON
    const geoJSON = kml(kmlDOM);

    // Write the GeoJSON to a file
    await fs.writeFile(outputFile, JSON.stringify(geoJSON, null, 2), "utf8");
    console.log(`KML file converted to GeoJSON and saved as ${outputFile}`);
  } catch (error) {
    console.error(`Error converting KML to GeoJSON: ${error}`);
  }
}

// Usage example
(async () => {
  await convertKMLToGeoJSON(
    "data/chardonay oinodiadromes/chardonay oinodiadromes.kml",
    "output.geojson"
  );
})();
