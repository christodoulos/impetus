---
title: Early Plant Stress Detection
layout: default
mapbox: true
apex: true
mapbox_case: kokkotou
options:
  - value: C.S. WINERY
    text: C.S. Winery
  - value: chardonay oinodiadromes
    text: Chardonay Oinodiadromes
layers:
  - value: ai
    text: Stress Boxes
  - value: dsm
    text: Digital Surface Map
  - value: beta
    text: Classification of Stress Factor
  - value: no_pseu
    text: Stress Bounding Boxes (no pseudo-coloring)
  - value: comb
    text: Leaf Chlorophyll Content
---


<img src="/assets/images/farmAIr.png" style="float:right;width:100px;">

Unlike what is currently available in the market, farmAIr technology (patented) uses thermal images and Artificial Intelligence to reveal Plant Stress before the onset of any symptom. farmAIr helps farmers and agronomists spot what they can't see with the naked eye, be aware, and take all necessary precautions to help prevent any spread. farmAIr technology is currently available for vineyards, planning to gradually expand to virtually any plant with leaves.


<p>
    <a href="https://farmair.io/">farmAIr</a> and Kokkotou Vineyards have kindly granted permission to use the
    present data.
</p>
<div class="row">
    <div class="col-md-3">
        <div class="form-group"><label>Vineyard</label></div>
        {% include select_widget.html label="Select a vineyard" name="vineyard" options=page.options %}
    </div>
    <div class="col-md-3">
        <div class="form-group"><label>Scan Date</label></div>
        {% include select_widget.html label="Select a Scan Date" name="scanDate" %}
    </div>
    <div class="col-md-3">
        <div class="form-group"><label>Analysis Layer</label></div>
        {% include select_widget.html label="Select an analysis Layer" name="layer" options=page.layers %}
    </div>
    <div class="col-md-3 d-flex align-items-end mt-2">
    <button
        class="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
        id="weather_button"
    >
        Weather Data
    </button>
    </div>
</div>

<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header">
    <h5 id="offcanvasRightLabel">Weather Data</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
    <div id="temp"></div>
    <div id="pressure"></div>
    <div id="humidity"></div>
    <div id="wind_speed"></div>
    <div id="clouds"></div>
    </div>
</div>

<div id="mapp" style="height: 800px; margin-top:1em"></div>

  