---
layout: default
title: Digital Twins of Attica
---

<div class="row">
  
      <div class="row">
        <div class="col-lg-9 col-12 d-flex flex-column gap-1">
          
          <p>The Digital Twins of the Attica region integrates innovations and pilots that different projects have implemented for climate adaptation. It aims to provide a tool to support climate adaptation efforts and improve the region's resilience against climate change's impacts.</p>

<p>As a proof of concept, the Digital Twins of Attica will have several uses. It will support urban planning by simulating the impacts of extreme weather events and other climate change-related factors on the built environment and identifying the most vulnerable areas.</p>

<p>As Attica is dependent on water resources, both for domestic consumption and agriculture, the Digital Twins will improve the efficiency of water usage and enhance the system's resilience against the impacts of climate change.</p>

<p>The Digital Twins will provide flood risk assessment by simulating the impact of floods on particular areas, taking into account various factors such as rainfall, river flow, and land use. Through the Digital Twin, stakeholders will reduce the risk of flooding by improving drainage systems, increasing the elevation of buildings, and protecting critical infrastructures. Also, real-time monitoring of floods will allow stakeholders to respond quickly to emergencies and make informed decisions based on real-time information.</p>

           {% include attribution.html %}
        </div>
        <div class="col-lg-3 text-center d-none d-lg-block">
          <img src="assets/images/attica.png" />
          <p class="font-10">
            Attica (region). (2023, March 26).
            <a href="https://en.wikipedia.org/wiki/Attica_(region)"
              >In Wikipedia.</a
            >
          </p>
        </div>
      </div>
   
</div>

<div class="row">
  <!-- prettier-ignore -->
  {% assign sorted_cards = site.innovations | where: 'group', 'homepage' | sort: 'order' %}
  {% for card in sorted_cards %}
  <div class="col-lg-4">
    <div class="card text-white overflow-hidden {{ card.color }}">
      <div class="card-body">
        <div class="toll-free-box text-center">
          <h4>
            <i class="{{ card.icon }}"></i>
            <a
              class="text-decoration-none text-white"
              href="{{ card.link | relative_url }}"
              >{{ card.title }}</a
            >
          </h4>
        </div>
      </div>
    </div>
  </div>
  {% endfor %}
</div>



