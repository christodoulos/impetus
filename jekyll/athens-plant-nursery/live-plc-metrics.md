---
title: Athens Plant Nursery
title_url: /athens-plant-nursery
layout: apn
datatable: true
datatable_case: apn
---

### Live PLC Metrics

Our facility pushes metrics automatically every ten minutes. Hover over the `#x` title to see the metric description or
see the legend.

<div class="d-flex justify-content-between mb-2">
  <div class="d-flex gap-2">
      <button class="btn btn-primary text-nowrap" type="button" onClick="setNum(144)">Last Day</button>
      <button class="btn btn-primary text-nowrap" type="button" onClick="setNum(1008)">Last Week</button>
      <button class="btn btn-primary text-nowrap" type="button" onClick="setNum(4032)">Last Month</button>
      <button class="btn btn-primary text-nowrap" type="button" onClick="setNum(0)">Everything</button>
  </div>
  <div>
    <button
      class="btn btn-primary text-nowrap"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasRight"
      aria-controls="offcanvasRight"
      id="offcanvas_button"> 
        Table Legend 
    </button>
  </div>
</div>

<table id="apn-live-plc" class="table dt-responsive nowrap w-100">
  <thead>
    <tr>
      <th title="Timestamp DD/MM/YY H:mm"><i class="ri-calendar-line"></i></th>
      <th title="Temperature membrane tank 5">#1</th>
      <th title="pH membrane tank 5">#2</th>
      <th title="DO ppm LDO aeriation tank 4A">#3</th>
      <th title="DO ppm anoxic tank3">#4</th>
      <th title="MLSS SOLID mg/l membrane tank 5">#5</th>
      <th title="MLSS SOLID mg/l membrane tank 4A">#6</th>
      <th title="LDO DO ppm anoxic">#7</th>
      <th title="Temperature anoxic tank">#8</th>
      <th title="Turbidity NTU tank 10">#9</th>
      <th title="LT1 tank level in mm">#10</th>
      <th title="LT2 tank level in mm">#11</th>
      <th title="LT3 tank level in mm">#12</th>
    </tr>
  </thead>
</table>

<div class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div class="offcanvas-header">
    <h5 id="offcanvasRightLabel">PLC Metrics</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <table class="w-auto table table-sm table-centered">
      <thead>
        <tr>
          <th>Index</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>#1</td>
          <td>Temperature membrane tank 5</td>
        </tr>
        <tr>
          <td>#2</td>
          <td>pH membrane tank 5</td>
        </tr>
        <tr>
          <td>#3</td>
          <td>DO ppm LDO aeriation tank 4A</td>
        </tr>
        <tr>
          <td>#4</td>
          <td>DO ppm anoxic tank3</td>
        </tr>
        <tr>
          <td>#5</td>
          <td>MLSS SOLID mg/l membrane tank 5</td>
        </tr>
        <tr>
          <td>#6</td>
          <td>MLSS SOLID mg/l membrane tank 4A</td>
        </tr>
        <tr>
          <td>#7</td>
          <td>LDO DO ppm anoxic</td>
        </tr>
        <tr>
          <td>#8</td>
          <td>Temperature anoxic tank</td>
        </tr>
        <tr>
          <td>#9</td>
          <td>Turbidity NTU tank 10</td>
        </tr>
        <tr>
          <td>#10</td>
          <td>LT1 tank level in mm</td>
        </tr>
        <tr>
          <td>#11</td>
          <td>LT2 tank level in mm</td>
        </tr>
        <tr>
          <td>#12</td>
          <td>LT3 tank level in mm</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
