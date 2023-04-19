$.ajax({
  url: "https://atticadt.uwmh.eu/api/nursery/latest",
  method: "GET",
  success: function (data) {
    console.log(data.weather);
    // Update the HTML content using the object's properties
    $("#city_name").text(data.city_name);
    $("#wheather_description").text(data.weather.description);
  },
});
