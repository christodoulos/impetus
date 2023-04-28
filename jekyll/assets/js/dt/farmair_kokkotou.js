$(document).ready(() => {
  mapboxgl.accessToken = mapbox_token;
  const map = new mapboxgl.Map({
    container: "mapp",
    style: "mapbox://styles/mapbox/satellite-v9",
    antialias: true,
    center: [23.891555378807737, 38.125076233863496],
  });

  map.on("load", () => {
    map.addSource("cswinery", {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [23.89221379277396, 38.125901760561476],
              [23.89141985888287, 38.12523500516667],
              [23.890861959408483, 38.12499868533541],
              [23.890861959408483, 38.124745484667045],
              [23.890658111523067, 38.124635764104966],
              [23.890454263637707, 38.12456824367689],
              [23.89108726496511, 38.1244416427065],
              [23.891913385342207, 38.12488052513291],
              [23.892074317882617, 38.12514216532412],
              [23.892063589046955, 38.125353164795456],
              [23.892439098308444, 38.125749842150725],
              [23.892235250424278, 38.12584268122049],
              [23.89221379277396, 38.125901760561476],
            ],
          ],
        },
      },
    });
    // Add a new layer to visualize the polygon.
    // map.addLayer({
    //   id: "cswinery",
    //   type: "fill",
    //   source: "cswinery", // reference the data source
    //   layout: {},
    //   paint: {
    //     "fill-color": "#0080ff", // blue color fill
    //     "fill-opacity": 0.5,
    //   },
    // });
    // Add a black outline around the polygon.
    map.addLayer({
      id: "cswinery-outline",
      type: "line",
      source: "cswinery",
      layout: {},
      paint: {
        "line-color": "#000",
        "line-width": 3,
        // "line-color": "#000",
        // "line-opacity": 0.7,
        // "line-width": 3,
        // "line-gap-width": 2,
        // "line-dasharray": [2, 4],
      },
    });
    map.addSource("kokotou-dsm-source", {
      type: "raster",
      tiles: [
        "https://atticadt.uwmh.eu/tiles/cswinery/D9EXPIZJE6BOI136/beta/{z}/{x}/{y}.png",
      ],
      bounds: [
        23.890454263637707, 38.1244416427065, 23.892439098308444,
        38.125901760561476,
      ],
    });
    map.addLayer(
      {
        id: "kokotou-dsm",
        type: "raster",
        source: "kokotou-dsm-source",
        minzoom: 5,
        maxzoom: 22,
      }
      // "waterway-label"
    );
  });

  map.flyTo({
    center: [23.891555378807737, 38.125076233863496],
    zoom: 17,
    bearing: 45,
    pitch: 75,
    duration: 5000,
    essential: true,
  });
});
