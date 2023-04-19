$(document).ready(function () {
  // Create a function to initialize the DataTable
  function initDataTable() {
    $("#apn-live-plc").DataTable().clear().destroy(); // Destroy any existing DataTable instance

    $("#apn-live-plc").DataTable({
      ajax: { url: "https://atticadt.uwmh.eu/api/nursery/plc", dataSrc: "" },
      columns: [
        {
          data: "ts",
          render: function (data, type, row) {
            return moment(data).format("DD/MM/YYYY H:mm");
          },
        },
        { data: "col3" },
        { data: "col4" },
        { data: "col5" },
        { data: "col6" },
        { data: "col7" },
        { data: "col8" },
        { data: "col9" },
        { data: "col10" },
        { data: "col11" },
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
