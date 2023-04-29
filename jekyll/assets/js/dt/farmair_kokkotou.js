const tilesRootURL = "https://atticadt.uwmh.eu/tiles";

const vineyards = {
  cswinery: {
    centroid: [23.891576664952165, 38.12518436349262],
    bbox: [
      23.890454263637707, 38.1244416427065, 23.892439098308444,
      38.125901760561476,
    ],
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
    tilesID: "cswinery",
    experiments: ["D9EXPIZJE6BOI136", "DFO2PL11DZ83GPEQ", "P0MTZ3PJXDJ8EGEZ"],
    layers: ["ai", "beta", "comb", "dsm", "no_pseu"],
  },
  chardonay: {
    centroid: [23.890727700735837, 38.12361197854006],
    bbox: [
      23.890257555693722, 38.123188741862975, 23.89111586257772,
      38.12409559892771,
    ],
    coordinates: [
      [
        [23.89084050175819, 38.12409559892771],
        [23.890568691938967, 38.123855515950936],
        [23.890450674742226, 38.12387239622882],
        [23.890289742201816, 38.123551670286076],
        [23.890257555693722, 38.12339130678683],
        [23.89069743797137, 38.123188741862975],
        [23.890804726332448, 38.12332378520787],
        [23.890965658872886, 38.1233069048036],
        [23.89111586257772, 38.123408187171606],
        [23.890869099348635, 38.12351790957899],
        [23.890783268660016, 38.12356855063422],
        [23.890976387709713, 38.12377955465348],
        [23.89084050175819, 38.12409559892771],
      ],
    ],
    tilesID: "chardonayoinodiadromes",
    experiments: ["3RKRVMV5TEE45O1D", "6P7LZSYJOMR9I2CX", "L3A0H0HU7UOJDHFA"],
    layers: ["ai", "beta", "comb", "dsm", "no_pseu"],
  },
};

$(document).ready(() => {
  mapboxgl.accessToken = mapbox_token;
  const map = new mapboxgl.Map({
    container: "mapp",
    style: "mapbox://styles/mapbox/satellite-v9",
    antialias: true,
    center: [23.891555378807737, 38.125076233863496],
  });

  map.on("load", () => {
    $("#form").change(function () {
      // remove all DT layers and sources
      const style = map.getStyle();
      style.layers.forEach((layer) => {
        if (layer.id.startsWith("atticadt")) {
          map.removeLayer(layer.id);
        }
      });
      for (const sourceId in style.sources) {
        if (sourceId.startsWith("atticadt")) {
          map.removeSource(sourceId);
          // style.layers.forEach((layer) => {
          //   if (layer.source === sourceId) {
          //     map.removeLayer(layer.id);
          //   }
          // });
        }
      }
      // respond to form data changes
      var formData = $(this)
        .serializeArray()
        .reduce(function (obj, item) {
          obj[item.name] = item.value;
          return obj;
        }, {});
      const {
        cswinery,
        "cswinery-experiment": cswineryExperiment,
        "cswinery-layer": cswineryLayer,
        chardonay,
        "chardonay-experiment": chardonayExperiment,
        "chardonay-layer": chardonayLayer,
      } = formData;
      console.log(
        cswinery,
        cswineryExperiment,
        cswineryLayer,
        chardonay,
        chardonayExperiment,
        chardonayLayer
      );
      let cswineryTilesURL = "";
      let chardonayTilesURL = "";
      // cswinery polygon and farmair layers ///////////////////////////////////////////////////////////////////
      if (cswinery) {
        map.addSource("atticadt-cswinery-source", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: vineyards.cswinery.coordinates,
            },
          },
        });
        map.addLayer({
          id: "atticadt-cswinery-outline-layer",
          type: "line",
          source: "atticadt-cswinery-source",
          layout: {},
          paint: {
            "line-color": "#000",
            "line-width": 3,
          },
        });
        if (cswineryExperiment && cswineryLayer) {
          cswineryTilesURL = `${tilesRootURL}/cswinery/${cswineryExperiment}/${cswineryLayer}/{z}/{x}/{y}.png`;
          map.addSource("atticadt-cswinery-farmair-source", {
            type: "raster",
            tiles: [cswineryTilesURL],
            bounds: vineyards.cswinery.bbox,
          });
          map.addLayer({
            id: "atticadt-cswinery-farmair-layer",
            type: "raster",
            source: "atticadt-cswinery-farmair-source",
            minzoom: 5,
            maxzoom: 22,
          });
        }
      }
      // chardonay polygon and farmair layers ///////////////////////////////////////////////////////////////////
      if (chardonay) {
        map.addSource("atticadt-chardonay-source", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: vineyards.chardonay.coordinates,
            },
          },
        });
        map.addLayer({
          id: "atticadt-chardonay-outline-layer",
          type: "line",
          source: "atticadt-chardonay-source",
          layout: {},
          paint: {
            "line-color": "#000",
            "line-width": 3,
          },
        });
        if (chardonayExperiment && chardonayLayer) {
          chardonayTilesURL = `${tilesRootURL}/chardonayoinodiadromes/${chardonayExperiment}/${chardonayLayer}/{z}/{x}/{y}.png`;
          map.addSource("atticadt-chardonay-farmair-source", {
            type: "raster",
            tiles: [chardonayTilesURL],
            bounds: vineyards.chardonay.bbox,
          });
          map.addLayer({
            id: "atticadt-chardonay-farmair-layer",
            type: "raster",
            source: "atticadt-chardonay-farmair-source",
            minzoom: 5,
            maxzoom: 22,
          });
        }
      }
    });
    setTimeout(() => {
      $("#cswinery_switch").prop("checked", true).trigger("change");
      $("#chardonay_switch").prop("checked", true).trigger("change");
    }, 500);
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
