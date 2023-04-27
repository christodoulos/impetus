$(document).ready(() => {
  $.ajax({
    url: "https://atticadt.uwmh.eu/api/nursery/plc",
    method: "GET",
    success: (allData) => {
      const data = _.orderBy(allData, ["ts"], ["asc"]).slice(-1008);
      console.log(data);
      const attrData = _.map(data, (item) => {
        return {
          x: item.ts,
          y0: item.col3,
          y1: item.col4,
          y2: item.col5,
          y3: item.col6,
          y4: item.col7,
          y5: item.col8,
          y6: item.col9,
          y7: item.col10,
          y8: item.col11,
          y9: item.col12,
          y10: item.col13,
          y11: item.col14,
        };
      });
      const series = [
        {
          name: "Temperature membrane tank 5",
          data: _.map(attrData, (item) => ({
            x: item.x,
            y: item.y0.toFixed(2),
          })),
        },
        {
          name: "pH membrane tank 5",
          data: _.map(attrData, (item) => ({
            x: item.x,
            y: item.y1.toFixed(2),
          })),
        },
        {
          name: "DO ppm LDO aeriation tank 4A",
          data: _.map(attrData, (item) => ({
            x: item.x,
            y: item.y2.toFixed(2),
          })),
        },
        {
          name: "DO ppm anoxic tank3",
          data: _.map(attrData, (item) => ({
            x: item.x,
            y: item.y3.toFixed(2),
          })),
        },
        {
          name: "MLSS SOLID mg/l membrane tank 5",
          data: _.map(attrData, (item) => ({
            x: item.x,
            y: item.y4.toFixed(2),
          })),
        },
        {
          name: "MLSS SOLID mg/l membrane tank 4A",
          data: _.map(attrData, (item) => ({
            x: item.x,
            y: item.y5.toFixed(2),
          })),
        },
        {
          name: "LDO DO ppm anoxic",
          data: _.map(attrData, (item) => ({
            x: item.x,
            y: item.y6.toFixed(2),
          })),
        },
        {
          name: "Temperature anoxic tank",
          data: _.map(attrData, (item) => ({
            x: item.x,
            y: item.y7.toFixed(2),
          })),
        },
        {
          name: "Turbidity NTU tank 10",
          data: _.map(attrData, (item) => ({
            x: item.x,
            y: item.y8.toFixed(2),
          })),
        },
        {
          name: "LT1",
          data: _.map(attrData, (item) => ({
            x: item.x,
            y: item.y9.toFixed(2),
          })),
        },
        {
          name: "LT2",
          data: _.map(attrData, (item) => ({
            x: item.x,
            y: item.y10.toFixed(2),
          })),
        },
        {
          name: "LT3",
          data: _.map(attrData, (item) => ({
            x: item.x,
            y: item.y11.toFixed(2),
          })),
        },
      ];
      console.log(series[0]);

      const createOptions = (seriesData) => {
        return {
          chart: {
            type: "line",
            height: 350,
            zoom: {
              enabled: false,
            },
          },
          title: { text: seriesData.name, align: "left" },
          series: [seriesData],
          xaxis: {
            type: "datetime",
          },
          noData: {
            text: "Loading...",
            align: "center",
            verticalAlign: "middle",
            offsetX: 0,
            offsetY: 0,
            // style: {
            //   color: "#000000",
            //   fontSize: '14px',
            //   fontFamily: "Helvetica"
            // }
          },
        };
      };

      const optionsArray = series.map((seriesData) =>
        createOptions(seriesData)
      );

      console.log(optionsArray);

      const chartDIVs = [
        "M1",
        "M2",
        "M3",
        "M4",
        "M5",
        "M6",
        "M7",
        "M8",
        "M9",
        "M10",
        "M11",
        "M12",
      ];

      optionsArray.forEach((options, index) => {
        const chart = new ApexCharts(
          document.querySelector(`#${chartDIVs[index]}`),
          options
        );
        chart.render();
      });
    },
  });
});
