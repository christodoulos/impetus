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

// Loop through each vineyard
for (const vineyardKey in vineyards) {
  if (vineyards.hasOwnProperty(vineyardKey)) {
    const vineyard = vineyards[vineyardKey];
    const { bbox, experiments, layers, tilesID } = vineyard;
    // Create an empty array for the sources and layers property
    const map_sources = [];
    const map_layers = [];

    // Loop through all possible combinations of experiments and layers
    for (const experiment of experiments) {
      for (const layer of layers) {
        const tilesUrl = `https://atticadt.uwmh.eu/tiles/${tilesID}/${experiment}/${layer}/{z}/{x}/{y}.png`;
        const map_source = {
          sourceID: `source-${tilesID}-${experiment}-${layer}`,
          type: "raster",
          tiles: [tilesUrl],
          bounds: bbox,
        };
        const map_layer = {
          id: `layer-${tilesID}-${experiment}-${layer}`,
          type: "raster",
          source: `source-${tilesID}-${experiment}-${layer}`,
          minzoom: 5,
          maxzoom: 22,
        };
        map_sources.push(map_source);
        map_layers.push(map_layer);
      }
    }

    // Add the tiles property to the vineyard object
    vineyard.map_sources = map_sources;
    vineyard.map_layers = map_layers;
  }
}

console.log(vineyards);
