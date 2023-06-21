---
title: Athens Plant Nursery
layout: default
datatable: true
datatable_case: apn
apex: true
dashboard_case: apn
dt_case: apn
links:
  - url: futwrio/#about
    link: About the Digital Twin Pilot
  - url: futwrio/#a-short-video-tour
    link: A short video tour
  - url: futwrio/#live-plc-metrics
    link: Live PLC metrics
  - url: futwrio/#live-plc-charts
    link: Live PLC charts
metrics:
  - value: metrics/temperature-membrane-tank-5/
    text: Temperature of membrane tank 5
  - value: metrics/ph-membrane-tank-5/
    text: ph of membrane tank 5
  - value: metrics/do-aeriation-tank-4a/
    text: DO ppm in LDO Aeriation Tank 4A
  - value: metrics/do-anoxic-tank-3/
    text: DO ppm in Anoxic Tank 3
  - value: metrics/mlss-solid-tank-5/
    text: MLSS SOLID mg/l in Membrane Tank 5
  - value: metrics/mlss-solid-tank-4a/
    text: MLSS SOLID mg/l in Membrane Tank 4A
  - value: metrics/lddo-anoxic/
    text: LDO DO ppm Anoxic
  - value: metrics/temperature-anoxic/
    text: Temperature of Anoxic Tank
  - value: metrics/turbidity-tank-10/
    text: Turbidity NTU in Tank 10
  - value: metrics/lt-1/
    text: LT1 level in mm
  - value: metrics/lt-2/
    text: LT2 level in mm
  - value: metrics/lt-3/
    text: LT3 level in mm
---

#### About the Digital Twin Pilot

The sewer mining facility (SMF) at the municipal plant nursery of Athens, Greece, treats wastewater with a membrane bioreactor unit and a UV disinfection unit. The SMF produces high-quality reclaimed water for irrigation and aquifer recharge during the winter. The SMF setup demonstrates flexibility, scalability, and replicability, essential for innovation uptake within the emerging circular economy and market. But due to the tight coupling of the SMF operations and its system components and the used low-level data representations, the SMF is a disconnected information silo that lacks the ability for knowledge sharing and gaining relevant insights.

Disconnected information silos are common constructs in large cities like Athens, with heterogenous structures and many stakeholders involved. An Urban Digital Twin (UDT) utilizes the Internet of Things (IoT) idea and builds upon the related Cyber-Physical systems to enable knowledge sharing and gaining relevant insights. The UDT is a “system of systems” where stakeholders can interact, share data and collaborate. The UDT adopts suitable concepts and representations for representing real-world assets in cyberspace and providing various services.

To break the SMF information barriers and make the facility capable of integrating nicely into a future UDT for Athens (AUDT), we must describe a general procedure of building a middleware on top of the SMF’s system components’ low-level data representations. The first step to making the AUDT aware of the existence of the SMF is gathering and managing context information referring to values of attributes characterizing relevant SMF entities. The SMF’s components will produce context information respecting a suitable data model. Subject to access control policies, SMF will provide context to the AUDT while consumers will access the context. The AUDT will allow interested consumers to subscribe to the SMF’s relevant entity changes for instant push notifications.

The AUDT will push the latest SMF’s “water quality entity” to all connected subscribers. To that end, we employ the “Smart Water” data models related to the water management domain of the Smart Data Models Initiative of FIWARE et al. Several data models are available, including water consumption, quality, and wastewater treatment. The current SMF setup involves the Athens Water Supply and Sewerage Company (EYDAP SA) for collecting and analyzing the produced reclaimed water quality. To enable the AUDT with the water quality context of the SMF, we have to provide EYDAP with a suitable interface for entering their analysis outcomes. The interface will respect the “Smart Water” quality specification and perhaps extend it if such an extension seems appropriate.

Day-to-day SMF operations and monitoring, like the status of the bioreactor unit or the UV disinfection unit, are immediately available through the SMF’s programmable logic controller (PLC). The SMF uses a Unitronics PLC to provide its components’ real-time status. The PLC produces status information that follows Unitronic’s specifications and is stored directly in the PLC. We could say that every similar PLC is an inherently disconnected data source. To enable the AUDT with the specific PLC or any similar PLC setup context and try to be as less intrusive as possible, we have to establish data transfers from any PLC to the AUDT’s facility that transforms the PLC data to relevant context entity data. The “Smart Water” data models include ready-to-use models like the “waste water tank” data model. Once again, we can extend the available models or introduce new ones.

The above procedures are general and apply to any similar sewer mining facility. By making the AUDT aware of the SMF and similar entities, we can proceed further with the available knowledge and insights that the AUDT provides.

#### A short video tour

<div class="ratio ratio-16x9 mb-2">
    <iframe src="https://www.youtube.com/embed/B6m7JLbRJUQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen ></iframe>
</div>

The Athens Urban Tree Nursery comprises 4 hectares of vegetation, supplies all urban parks and green spaces of Athens with plant material, and uses potable water from Athens’s Water Supply and Sewerage Company (EYDAP) for irrigation. The city is seeking alternative water sources leveraging circular economy solutions to achieve environmental, social, and financial benefits for the town.

Installing a sewer mining modular unit for urban green irrigation at the point of demand brought direct benefits for the sustainability of the new metropolitan park. Compost-based eco-engineered growing media products are also reused as an onsite fertilizer for a portfolio of autonomous, decentralized water, energy, and materials circular solutions for cities in water-scarce areas. Finally, thermal energy recovery schemes were investigated to minimize the pilot’s environmental footprint.

#### Live PLC metrics

The SMF uses a Unitronics PLC to provide its components’ real-time status. The PLC produces status information that follows Unitronic’s specifications and is stored directly in the PLC. We established real-time data transfers from the inherently disconnected PLC to our project database. Our facility pushes metrics automatically every ten minutes.

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

<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
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

#### Live PLC charts

<div class="d-flex gap-2 mb-2">
      <button class="btn btn-primary text-nowrap" type="button" onClick="setNum(144)">Last Day</button>
      <button class="btn btn-primary text-nowrap" type="button" onClick="setNum(1008)">Last Week</button>
      <button class="btn btn-primary text-nowrap" type="button" onClick="setNum(4032)">Last Month</button>
  </div>

<div class="row"> {% assign sorted_cards = site.dashboards | where: 'group', 'plant_nursery_dashboard' | sort: 'order' %} {% for card in sorted_cards %} <div class="col-md-6 col-xl-4"> <div class="card"> <div class="card-body" id="{{card.metric}}">  </div> </div> </div> {% endfor %} </div>
