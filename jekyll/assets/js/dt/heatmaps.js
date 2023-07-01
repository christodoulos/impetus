function projectToRange(value, min, max) {
  return (value - min) / (max - min);
}

function valueToColor(value) {
  return [
    Math.max((value - 0.5) * 2.0, 0.0),
    1.0 - 2.0 * Math.abs(value - 0.5),
    Math.max((0.5 - value) * 2.0, 0.0),
  ];
}

function rgbToHex(rgb) {
  let r = rgb[0];
  let g = rgb[1];
  let b = rgb[2];
  let hex =
    "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1, 7);
  return hex;
}

function longestSubarray(arrays) {
  let longest = [];
  for (const array of arrays) {
    for (const subarray of array) {
      if (subarray.length > longest.length) {
        longest = subarray;
      }
    }
  }
  return longest;
}

async function attica_roi() {
  try {
    const response = await fetch(`${API_URL}/geojson/nuts/EL30`);
    const data = await response.json();
    const coordinates = data.geometry.coordinates;
    return longestSubarray(coordinates);
  } catch (error) {
    console.log(error);
  }
}

$(document).ready(() => {
  mapboxgl.accessToken = mapbox_token;
  const map = new mapboxgl.Map({
    container: "mapp",
    style: "mapbox://styles/mapbox/satellite-v9",
    antialias: true,
    // scrollZoom: false,
  });
  map.fitBounds([
    [24.1028392959052, 38.40303239502197],
    [23.30886905192861, 37.62646012564626],
  ]);
  let first = true;
  $("#metrics").change(function () {
    const metric = $(this).val();

    if (metric) {
      if (!first) {
        map.removeLayer("heatmap");
        map.removeLayer("labels");
        map.removeSource("data");
      }

      fetch(`${API_URL}/geojson/featurecollection/${metric}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("GEOJSON:", data);

          $("#legend").show();

          $("#timestamp").text(
            moment(data.properties.TimeOfObservation).format("MMMM D YYYY H:mm")
          );

          $("#legend-unit").text(data.properties.FeatureUnit);

          const points = [];

          for (let index = 0; index < data.features.length; index++) {
            const element = data.features[index];
            const point = {
              lon: element.geometry.coordinates[0],
              lat: element.geometry.coordinates[1],
              val: element.properties[metric],
            };
            points.push(point);
          }

          minValue = _.minBy(data.features, (obj) => obj.properties[metric]);
          maxValue = _.maxBy(data.features, (obj) => obj.properties[metric]);
          $("#min").text(minValue.properties[metric]);
          $("#max").text(maxValue.properties[metric]);

          attica_roi().then((roi) => {
            console.log("ROI:", roi);
            const layer = interpolateHeatmapLayer.create({
              layerId: "heatmap",
              opacity: 0.8,
              points,
              roi,
            });

            map.addSource("data", {
              type: "geojson",
              data: data,
            });
            map.addLayer({
              id: "labels",
              type: "symbol",
              source: "data",
              layout: {
                "text-field": ["get", metric],
                "text-size": 12,
              },
            });

            map.addLayer(layer, "labels");

            first = false;
          });
        });
    }
  });
});
