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
          console.log("GEOJSON:", data);

          $("#timestamp").text(
            moment(data.properties.TimeOfObservation).format("MMMM D YYYY H:mm")
          );

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

          console.log("POINTS:", points);

          const minValue = points.reduce(
            (min, current) => (current.val < min ? current.val : min),
            points[0].val
          );
          const maxValue = points.reduce(
            (max, current) => (current.val > max ? current.val : max),
            points[0].val
          );
          console.log("MIN MAX:", minValue, maxValue);

          const roi = [
            [24.15781263864656, 37.61135274561016],
            [24.15781263864656, 38.35802345661327],
            [23.07083065217489, 38.35802345661327],
            [23.07083065217489, 37.61135274561016],
            [24.15781263864656, 37.61135274561016],
          ];

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
    }
  });
});
