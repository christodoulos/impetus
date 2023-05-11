const fs = require("fs");
const path = require("path");
const axios = require("axios");

const args = process.argv.slice(2);
const fpath = args[0];
const dname = path.basename(fpath);
const geojsonFile = `${fpath}${dname}.geojson`;
const scansFile = `${fpath}scans.json`;

const geojson = fs.readFileSync(geojsonFile, "utf-8");
const geojsonObj = JSON.parse(geojson);
console.log(geojsonObj);

const scans = fs.readFileSync(scansFile, "utf-8");
const scansObj = JSON.parse(scans);

const vineyard = {
  name: dname,
  geojson: geojsonObj,
  scans: scansObj,
};

axios
  .post("http://localhost:3333/api/farmair", vineyard)
  .then((response) => {
    console.log("Response:", response.data);
  })
  .catch((error) => {
    console.log("Error:", error);
  });
