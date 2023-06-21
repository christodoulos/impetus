function redraw(num, update) {
  $.ajax({
    url: `${API_URL}/apn-nursery/metrics/${num}`,
    method: "GET",
    success: (data) => {
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

      const createOptions = (seriesData) => {
        return {
          chart: {
            id: seriesData.name,
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
          yaxis: {
            min: function (min) {
              return min * 0.9;
            },
            max: function (max) {
              return max * 1.1;
            },
          },
          noData: {
            text: "Loading...",
            align: "center",
            verticalAlign: "middle",
            offsetX: 0,
            offsetY: 0,
          },
        };
      };

      const optionsArray = series.map((seriesData) =>
        createOptions(seriesData)
      );

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
        if (!update) {
          const chart = new ApexCharts(
            document.querySelector(`#${chartDIVs[index]}`),
            options
          );
          chart.render();
        } else {
          ApexCharts.exec(options.chart.id, "updateSeries", options.series);
        }
      });
    },
  });
}

// Create a function to initialize the DataTable
function initDataTable(num) {
  $("#apn-live-plc").DataTable().clear().destroy(); // Destroy any existing DataTable instance

  function formatDecimal(data, type, row) {
    return data.toFixed(2);
  }

  $("#apn-live-plc").DataTable({
    ajax: { url: `${API_URL}/apn-nursery/metrics/${num}`, dataSrc: "" },
    order: [[0, "desc"]],
    dom: "<'wrapperr'lfB>rtip",
    buttons: [
      {
        extend: "excelHtml5",
        text: "<i class='ri-file-excel-2-line'></i>",
        exportOptions: {
          columns: ":visible",
        },
      },
      {
        extend: "pdfHtml5",
        text: "<i class='ri-file-pdf-line'></i>",
        exportOptions: {
          columns: ":visible",
        },
      },
    ],
    columns: [
      { data: "ts" },
      { data: "col3", render: formatDecimal },
      { data: "col4", render: formatDecimal },
      { data: "col5", render: formatDecimal },
      { data: "col6", render: formatDecimal },
      { data: "col7", render: formatDecimal },
      { data: "col8", render: formatDecimal },
      { data: "col9", render: formatDecimal },
      { data: "col10", render: formatDecimal },
      { data: "col11", render: formatDecimal },
      { data: "col12", defaultContent: "<i>N/A</i>" },
      { data: "col13", defaultContent: "<i>N/A</i>" },
      { data: "col14", defaultContent: "<i>N/A</i>" },
    ],
    columnDefs: [
      {
        targets: 0,
        render: function (data, type, row) {
          if (type === "display" || type === "filter") {
            return moment.utc(data).format("DD/MM/YYYY HH:mm");
          }
          return data;
        },
        type: "date",
      },
    ],
  });
}

let num = 144;

function setNum(value) {
  num = value;
  initDataTable(num);
  if (value) redraw(num, true);
}

// Call the function to initialize the DataTable
initDataTable(num);
redraw(num, false);

// Refresh the DataTable every ten minutes (10 x 60000 milliseconds)
setInterval(function () {
  initDataTable(num);
  redraw(num);
}, 600000);
