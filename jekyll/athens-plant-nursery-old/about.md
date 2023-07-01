---
layout: apn
title: Athens Plant Nursery
title_url: /athens-plant-nursery
subtitle: The Digital Twin of the NextGen pilot
headertitle: NextGen Water Solutions
links:
  - value: ss
    text: ss
---

#### On making a Sewer Mining Facility "Digital Twin Ready"

The sewer mining facility (SMF) at the municipal plant nursery of Athens, Greece, treats wastewater with a membrane bioreactor unit and a UV disinfection unit. The SMF produces high-quality reclaimed water for irrigation and aquifer recharge during the winter. The SMF setup demonstrates flexibility, scalability, and replicability, essential for innovation uptake within the emerging circular economy and market. But due to the tight coupling of the SMF operations and its system components and the used low-level data representations, the SMF is a disconnected information silo that lacks the ability for knowledge sharing and gaining relevant insights.

Disconnected information silos are common constructs in large cities like Athens, with heterogenous structures and many stakeholders involved. An Urban Digital Twin (UDT) utilizes the Internet of Things (IoT) idea and builds upon the related Cyber-Physical systems to enable knowledge sharing and gaining relevant insights. The UDT is a “system of systems” where stakeholders can interact, share data and collaborate. The UDT adopts suitable concepts and representations for representing real-world assets in cyberspace and providing various services.

To break the SMF information barriers and make the facility capable of integrating nicely into a future UDT for Athens (AUDT), we must describe a general procedure of building a middleware on top of the SMF’s system components’ low-level data representations. The first step to making the AUDT aware of the existence of the SMF is gathering and managing context information referring to values of attributes characterizing relevant SMF entities. The SMF’s components will produce context information respecting a suitable data model. Subject to access control policies, SMF will provide context to the AUDT while consumers will access the context. The AUDT will allow interested consumers to subscribe to the SMF’s relevant entity changes for instant push notifications.

The AUDT will push the latest SMF’s “water quality entity” to all connected subscribers. To that end, we employ the “Smart Water” data models related to the water management domain of the Smart Data Models Initiative of FIWARE et al. Several data models are available, including water consumption, quality, and wastewater treatment. The current SMF setup involves the Athens Water Supply and Sewerage Company (EYDAP SA) for collecting and analyzing the produced reclaimed water quality. To enable the AUDT with the water quality context of the SMF, we have to provide EYDAP with a suitable interface for entering their analysis outcomes. The interface will respect the “Smart Water” quality specification and perhaps extend it if such an extension seems appropriate.

Day-to-day SMF operations and monitoring, like the status of the bioreactor unit or the UV disinfection unit, are immediately available through the SMF’s programmable logic controller (PLC). The SMF uses a Unitronics PLC to provide its components’ real-time status. The PLC produces status information that follows Unitronic’s specifications and is stored directly in the PLC. We could say that every similar PLC is an inherently disconnected data source. To enable the AUDT with the specific PLC or any similar PLC setup context and try to be as less intrusive as possible, we have to establish data transfers from any PLC to the AUDT’s facility that transforms the PLC data to relevant context entity data. The “Smart Water” data models include ready-to-use models like the “waste water tank” data model. Once again, we can extend the available models or introduce new ones.

The above procedures are general and apply to any similar sewer mining facility. By making the AUDT aware of the SMF and similar entities, we can proceed further with the available knowledge and insights that the AUDT provides.