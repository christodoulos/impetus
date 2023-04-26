$.ajax({
  url: "https://atticadt.uwmh.eu/api/nursery/latest",
  method: "GET",
  success: function (data) {
    console.log(data);
    // Update the HTML content using the object's properties
    $("#city_name").text(data.city_name);
    $("#wheather_description").text(data.weather.description);
    $("#app_temp").text(data.app_temp);
    $("#pres").text(data.pres);
    $("#gust").text(data.gust);
    $("#rh").text(data.rh);
    $("#dewpt").text(data.dewpt);
    $("#uv").text(data.uv);
    $("#aqi").text(data.aqi);
    $("#dhi").text(data.dhi);
    $("#dni").text(data.dni);
    $("#ghi").text(data.ghi);
    $("#solar_rad").text(data.solar_rad);
    $("#elev_angle").text(data.elev_angle);
  },
});
