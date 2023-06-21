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

      fetch(`${API_URL}/geojson/${metric}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          $("#timestamp").text(
            moment(data.properties.TimeOfObservation).format("MMMM D YYYY H:mm")
          );

          // const layer = interpolateHeatmapLayer.create({ points: data });
          // console.log(layer);

          map.addSource("data", {
            type: "geojson",
            data: data, // Your GeoJSON data
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
          map.addLayer(
            {
              id: "heatmap",
              type: "heatmap",
              source: "data",
              paint: {
                // "heatmap-weight": ["get", metric],
                "heatmap-radius": [
                  "interpolate",
                  ["exponential", 2],
                  ["zoom"],
                  0,
                  1,
                  9,
                  100,
                ],
              },
            },
            "labels"
          );
          // map.addLayer(layer, "labels");

          first = false;
        });
    }
  });
});
