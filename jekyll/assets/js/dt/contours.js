$(document).ready(() => {
  mapboxgl.accessToken = mapbox_token;
  const map = new mapboxgl.Map({
    container: "mapp",
    style: "mapbox://styles/mapbox/satellite-v9",
    antialias: true,
  });
  map.fitBounds([
    [24.1028392959052, 38.40303239502197],
    [23.30886905192861, 37.62646012564626],
  ]);
  fetch(`${API_URL}/geojson/temperature`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      map.addSource("temperature-data", {
        type: "geojson",
        data: data, // Your GeoJSON data
      });
      map.addLayer({
        id: "temperature-heatmap",
        type: "heatmap",
        source: "temperature-data",
        // paint: {
        //   // Customize your heatmap here
        //   "heatmap-intensity": [
        //     "interpolate",
        //     ["linear"],
        //     ["zoom"],
        //     0,
        //     1,
        //     9,
        //     3,
        //   ],

        //   "heatmap-color": [
        //     "interpolate",
        //     ["linear"],
        //     ["heatmap-density"],
        //     0,
        //     "blue",
        //     0.5,
        //     "green",
        //     1,
        //     "red",
        //   ],
        // },
      });
    });
});
