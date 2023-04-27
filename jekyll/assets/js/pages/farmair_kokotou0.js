$(document).ready(() => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiY2hyaXN0b2RvdWxvcyIsImEiOiJja3lvdzVhb2MwNGJoMnVwN2ptd2tna2Y1In0.jiaYFXf01T5_R73Tf6T4jA";
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    antialias: true,
    center: [23.891555378807737, 38.125076233863496],
  });

  map.on("load", () => {
    map.addSource("kokotou-dsm-source", {
      type: "raster",
      tiles: [
        "https://atticadt.uwmh.eu/tiles/cswinery/D9EXPIZJE6BOI136/dsm/{z}/{x}/{y}.png",
      ],
    });
    map.addLayer({
      id: "kokotou-dsm",
      type: "raster",
      source: "kokotou-dsm-source",
      minzoom: 0,
      maxzoom: 22,
    });
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
