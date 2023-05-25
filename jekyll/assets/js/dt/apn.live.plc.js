// $(document).ready(function () {
let num = 144;

function setNum(value) {
  num = value;
  initDataTable(num);
}
// Create a function to initialize the DataTable
function initDataTable(num) {
  $("#apn-live-plc").DataTable().clear().destroy(); // Destroy any existing DataTable instance

  function formatDecimal(data, type, row) {
    return data.toFixed(2);
  }

  $("#apn-live-plc").DataTable({
    // ajax: { url: "https://atticadt.uwmh.eu/api/nursery/plc", dataSrc: "" },
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

// Call the function to initialize the DataTable
initDataTable(num);

// Refresh the DataTable every minute (60000 milliseconds)
setInterval(function () {
  initDataTable(num);
}, 600000);
// });
