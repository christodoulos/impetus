---
title: Live Meteorological Heatmaps
title_url: /meteorological/heatmaps
mapbox: true
mapbox_case: contours
layout: meteorological
metrics:
  - value: temperature
    text: Temperature
  - value: windSpeed
    text: Wind Speed (km/h)
  - value: beaufort
    text: Wind Speed (beaufort)
  - value: humidity
    text: Humidity
  - value: atmosphericPressure
    text: Atmospheric Pressure
  - value: highestDailyTemperature
    text: Highest Daily Temperature
  - value: lowestDailyTemperature
    text: Lowest Daily Temperature
  - value: precipitation
    text: Precipitation
  - value: highestDailyGust
    text: Highest Daily Gust
---

We demonstrate the digital twin notion of consolidating several online metrics into a "live heatmap." Our "sensors" are practically scrapped data from many web pages that display these metrics in isolation.

<div class="row align-items-center">
<div class="col">
{% include select_widget.html label="Select a meteorological metric" name="metrics" options=page.metrics %}
</div>
<div class="col">
<span id="timestamp"></span>
</div>
</div>
