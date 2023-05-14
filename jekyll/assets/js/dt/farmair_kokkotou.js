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

function removeLayers(map, source, boundaryLayer, farmairSource, farmairLayer) {
  if (farmairLayer) map.removeLayer(farmairLayer);
  if (boundaryLayer) map.removeLayer(boundaryLayer);
  if (farmairSource) map.removeSource(farmairSource);
  if (source) map.removeSource(source);
  return ["", "", "", ""];
}

function removeFarmairLayers(map, farmairSource, farmairLayer) {
  if (farmairLayer) map.removeLayer(farmairLayer);
  if (farmairSource) map.removeSource(farmairSource);
  return ["", ""];
}

function stats(data) {
  const yValues = data.map((point) => point.y);
  return [
    ss.min(yValues).toFixed(1),
    ss.mean(yValues).toFixed(1),
    ss.max(yValues).toFixed(1),
  ];
}

function weather_pre(weather) {
  weather = _.orderBy(weather, ["td"], ["asc"]);

  const attrData = _.map(weather, (item) => {
    return {
      x: item.dt * 1000,
      temp: item.main.temp,
      pressure: item.main.pressure,
      humidity: item.main.humidity,
      wind_speed: item.wind.speed,
      clouds: item.clouds.all,
    };
  });

  const series = [
    {
      id: "temp",
      name: "Temperature",
      symbol: "°C",
      data: _.map(attrData, (item) => ({
        x: item.x,
        y: item.temp - 273.2,
      })),
    },
    {
      id: "pressure",
      name: "Pressure",
      symbol: "hPa",
      data: _.map(attrData, (item) => ({ x: item.x, y: item.pressure })),
    },
    {
      id: "humidity",
      name: "Humidity",
      symbol: "%",
      data: _.map(attrData, (item) => ({ x: item.x, y: item.humidity })),
    },
    {
      id: "wind_speed",
      name: "Wind Speed",
      symbol: "m/s",
      data: _.map(attrData, (item) => ({ x: item.x, y: item.wind_speed })),
    },
    {
      id: "clouds",
      name: "Clouds",
      symbol: "%",
      data: _.map(attrData, (item) => ({ x: item.x, y: item.clouds })),
    },
  ];

  const chartOptions = (seriesData) => {
    const [min, mean, max] = stats(seriesData.data);
    return {
      chart: {
        id: seriesData.id,
        fontFamily: "Nunito Regular",
        type: "line",
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      title: { text: seriesData.name, align: "left" },
      subtitle: {
        text: `min: ${min}${seriesData.symbol}, mean: ${mean}${seriesData.symbol}, max: ${max}${seriesData.symbol}`,
        style: {
          fontSize: "10px",
        },
      },
      series: [seriesData],
      xaxis: {
        type: "datetime",
        labels: {
          formatter: function (value) {
            const date = new Date(value);
            const year = date.getFullYear();
            const month = date.toLocaleString("default", {
              month: "short",
            });
            const day = date.getDate();
            return `${day} ${month} ${year}`;
          },
        },
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return value.toFixed(1) + seriesData.symbol;
          },
        },
      },
    };
  };

  const optionsArray = series.map((seriesData) => chartOptions(seriesData));

  return optionsArray;
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
    $("#weather_button").prop("disabled", true);

    let source = "";
    let boundaryLayer = "";
    let farmairSource = "";
    let farmairLayer = "";

    const charts = [];

    $("#vineyard").change(function () {
      const vineyard = $(this).val();

      [source, boundaryLayer, farmairSource, farmairLayer] = removeLayers(
        map,
        source,
        boundaryLayer,
        farmairSource,
        farmairLayer
      );
      let scanData = {};

      if (vineyard) {
        $("#scanDate").find("option:first").prop("selected", true);
        $("#layer").find("option:first").prop("selected", true);

        fetch(`http://localhost:3333/api/farmair/vineyard/${vineyard}`)
          .then((response) => response.json())
          .then((data) => {
            const { name, geojson, scans } = data;

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

            $("#scanDate")
              .off("change") // This works but seems a terrible hack.
              .change(function () {
                [farmairSource, farmairLayer] = removeFarmairLayers(
                  map,
                  farmairSource,
                  farmairLayer
                );
                const uuid = $("#scanDate").val();
                if (uuid) {
                  charts.forEach((chart) => chart.destroy());

                  $("#weather_button").prop("disabled", false);
                  scanData = scans.find((scan) => scan.uuid === uuid);
                  tilesURL = buildTilesURL();
                  if (tilesURL) {
                    [farmairSource, farmairLayer] = farmairAnalysisLayer(
                      map,
                      name,
                      geojson,
                      tilesURL
                    );
                  }

                  const optionsArray = weather_pre(scanData.weather_data);
                  optionsArray.forEach((options) => {
                    const chart = new ApexCharts(
                      document.querySelector(`#${options.chart.id}`),
                      options
                    );
                    charts.push(chart);
                    chart.render();
                  });
                } else {
                  $("#weather_button").prop("disabled", true);
                }
              });

            $("#layer")
              .off("change") // This works but seems a terrible hack.
              .change(function () {
                [farmairSource, farmairLayer] = removeFarmairLayers(
                  map,
                  farmairSource,
                  farmairLayer
                );
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
        $("#weather_button").prop("disabled", true);
        $("#layer").find("option:first").prop("selected", true);
        $("#layer").prop("disabled", true);
        $("#scanDate").find("option:not(:first)").remove(); // Clear all datesSelect options except the first label
        map.flyTo({
          center: [23.89076532854162, 38.12430221183547],
          zoom: 17,
          bearing: 90,
          pitch: 50,
          duration: 1000,
          essential: true,
        });
      }
    });
  });

  map.flyTo({
    center: [23.89076532854162, 38.12430221183547],
    zoom: 17,
    bearing: 90,
    pitch: 50,
    duration: 5000,
    essential: true,
  });
});
