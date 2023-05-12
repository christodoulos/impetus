function tilesSubpath(name) {
  switch (name) {
    case "C.S. WINERY":
      return "cswinery";
    case "chardonay oinodiadromes":
      return "chardonayoinodiadromes";
  }
}

function buildTilesURL() {
  const tilesRootURL = "https://atticadt.uwmh.eu/tiles";
  const vineyard = $("#vineyard").val();
  if (vineyard) {
    const subPath = tilesSubpath(vineyard);
    const date = $("#scanDate").val();
    if (date) {
      const layer = $("#layer").val();
      if (layer)
        return `${tilesRootURL}/${subPath}/${date}/${layer}/{z}/{x}/{y}.png`;
    }
  }
  return "";
}

function vineyardBoundary(map, name, geojson) {
  map.addSource(`${name}-source`, { type: "geojson", data: geojson });
  map.addLayer({
    id: `${name}-boundary-layer`,
    type: "line",
    source: `${name}-source`,
    layout: {},
    paint: {
      "line-color": "#000",
      "line-width": 3,
    },
  });
  map.fitBounds(geojson.properties.bbox);
  return [`${name}-source`, `${name}-boundary-layer`];
}

function farmairAnalysisLayer(map, name, geojson, tilesURL) {
  map.addSource(`${name}-farmair-source`, {
    type: "raster",
    tiles: [tilesURL],
    bounds: geojson.properties.bbox,
  });
  map.addLayer({
    id: `${name}-farmair-layer`,
    type: "raster",
    source: `${name}-farmair-source`,
    minzoom: 5,
    maxzoom: 22,
  });
  return [`${name}-farmair-source`, `${name}-farmair-layer`];
}

$(document).ready(() => {
  mapboxgl.accessToken = mapbox_token;
  const map = new mapboxgl.Map({
    container: "mapp",
    style: "mapbox://styles/mapbox/satellite-v9",
    antialias: true,
    center: [23.891555378807737, 38.125076233863496],
  });

  map.on("load", () => {
    let tilesURL = buildTilesURL();

    $("#scanDate").prop("disabled", true);
    $("#layer").prop("disabled", true);

    let source = "";
    let boundaryLayer = "";
    let farmairSource = "";
    let farmairLayer = "";

    $("#vineyard").change(function () {
      const vineyard = $(this).val();

      if (farmairLayer) {
        map.removeLayer(farmairLayer);
        farmairLayer = "";
      }
      if (boundaryLayer) {
        map.removeLayer(boundaryLayer);
        boundaryLayer = "";
      }
      if (farmairSource) {
        map.removeSource(farmairSource);
        farmairSource = "";
      }
      if (source) {
        map.removeSource(source);
        source = "";
      }

      if (vineyard) {
        $("#scanDate").find("option:first").prop("selected", true);
        $("#layer").find("option:first").prop("selected", true);

        fetch(`http://localhost:3333/api/farmair/vineyard/${vineyard}`)
          .then((response) => response.json())
          .then((data) => {
            const { name, geojson, scans } = data;
            const { bbox, centroid } = geojson.properties;
            console.log(bbox, centroid);

            [source, boundaryLayer] = vineyardBoundary(map, name, geojson);

            const dates = scans
              .map((obj) => {
                return { uuid: obj.uuid, date: obj.weather_data[0].dt };
              })
              .sort((a, b) => a.date - b.date)
              .map((obj) => {
                const date = new Date(obj.date * 1000);
                return {
                  uuid: obj.uuid,
                  date: date.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }),
                };
              });

            $("#scanDate").prop("disabled", false);
            $("#layer").prop("disabled", false);

            const datesSelect = $("#scanDate");
            datesSelect.find("option:not(:first)").remove();
            dates.forEach((obj) => {
              const optionElement = $("<option>")
                .attr("value", obj.uuid)
                .text(obj.date);
              datesSelect.append(optionElement);
            });

            $("#scanDate").change(function () {
              if (farmairLayer) map.removeLayer(farmairLayer);
              if (farmairSource) map.removeSource(farmairSource);
              farmairSource = "";
              farmairLayer = "";
              tilesURL = buildTilesURL();
              if (tilesURL) {
                [farmairSource, farmairLayer] = farmairAnalysisLayer(
                  map,
                  name,
                  geojson,
                  tilesURL
                );
              }
            });

            $("#layer").change(function () {
              if (farmairLayer) map.removeLayer(farmairLayer);
              if (farmairSource) map.removeSource(farmairSource);
              farmairSource = "";
              farmairLayer = "";
              tilesURL = buildTilesURL();
              if (tilesURL) {
                [farmairSource, farmairLayer] = farmairAnalysisLayer(
                  map,
                  name,
                  geojson,
                  tilesURL
                );
              }
            });
          });
      } else {
        $("#scanDate").prop("disabled", true);
        $("#layer").find("option:first").prop("selected", true);
        $("#layer").prop("disabled", true);
        $("#scanDate").find("option:not(:first)").remove(); // Clear all datesSelect options except the first label
      }
    });
  });

  map.flyTo({
    center: [23.89076532854162, 38.12430221183547],
    zoom: 18,
    bearing: 90,
    pitch: 50,
    duration: 5000,
    essential: true,
  });
});
