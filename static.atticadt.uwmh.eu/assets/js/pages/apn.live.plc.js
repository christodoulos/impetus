$(document).ready(function () {
  // Create a function to initialize the DataTable
  function initDataTable() {
    $("#apn-live-plc").DataTable().clear().destroy(); // Destroy any existing DataTable instance

    function formatDate(data, type, row) {
      return moment(data).format("DD/MM/YY H:mm");
    }

    function formatDecimal(data, type, row) {
      return data.toFixed(2);
    }

    $("#apn-live-plc").DataTable({
      ajax: { url: "https://atticadt.uwmh.eu/api/nursery/plc", dataSrc: "" },
      columns: [
        {
          data: "ts",
          render: formatDate,
        },
        { data: "col3", render: formatDecimal },
        { data: "col4", render: formatDecimal },
        { data: "col5", render: formatDecimal },
        { data: "col6", render: formatDecimal },
        { data: "col7", render: formatDecimal },
        { data: "col8", render: formatDecimal },
        { data: "col9", render: formatDecimal },
        { data: "col10", render: formatDecimal },
        { data: "col11", render: formatDecimal },
      ],
    });
  }

  // Call the function to initialize the DataTable
  initDataTable();

  // Refresh the DataTable every minute (60000 milliseconds)
  setInterval(function () {
    initDataTable();
  }, 60000);
});
