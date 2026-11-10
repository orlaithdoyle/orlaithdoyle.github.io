---
title: Projects
---

# Projects

Code for my ESA work is on [GitHub](https://github.com/orlaithdoyle/Biomass_ocean).

### Sea surface salinity from BIOMASS
*ESA ESTEC and MSc thesis, 2026*

BIOMASS is ESA's first P-band radar satellite. I built a pipeline that takes its Level 1 products, compares the HH and VV polarisations, corrects for wind roughening of the sea surface using ERA5, and converts the result to salinity using a dielectric model of seawater. I checked each scene against the SMOS satellite and the GLORYS12 ocean model. For the best scene, in the South Atlantic, my estimate came within 0.4 psu of GLORYS12.

Along the way I found that one product format stored its image bands in the opposite order to its own metadata, which had been swapping HH and VV without anyone noticing.

<!--
![Salinity map from BIOMASS](photos/biomass.png)
*Salinity retrieved from a BIOMASS scene.*
-->

### Mapping everywhere BIOMASS has looked
*ESA ESTEC, 2026*

A script that works through the whole BIOMASS catalogue (over 220,000 products), finds the roughly 5,000 unique places imaged, and sorts them into ocean, coast and land. It made finding good ocean scenes much quicker. It can be stopped and restarted without losing progress, which mattered because a full run takes most of a day.

<!--
![World map of BIOMASS swaths](photos/swath-map.png)
*Every location BIOMASS had imaged, sorted by ocean, coast and land.*
-->

### An ocean front in the Pacific
*ESA ESTEC, 2026*

One patch of an equatorial Pacific scene behaved differently in the radar data. When I compared it with ocean model salinity and satellite sea temperature, there was a tongue of fresher water and a temperature front in the same spot, so it looks like a real ocean front.

### HH-VV phase over the Amazon plume
*ESA ESTEC, 2026*

Looked at the phase difference between HH and VV radar returns off the mouth of the Amazon, how stable it was between repeat passes, and how it compared with SMOS and SMAP salinity.

### YPSat-2 valve mechanism
*ESA ESTEC, 2026*

Science justification and CAD work for a vein valve mechanism on ESA's young professionals satellite payload.

### SQRT high-altitude balloon
*UCD, 2025 to 2026*

Project manager for a five-person team that designed, built and flew a payload to the stratosphere.

<!--
![SQRT balloon launch](photos/sqrt.jpg)
*The SQRT launch.*
-->

### Coursework
*UCD, 2025 to 2026*

Algae and water levels at Blessington Lakes with Sentinel-2 and SWOT; SAR analysis of the 2025 Myanmar earthquake; InSAR for volcanic deformation and peatland; ship detection with Sentinel-1; vegetation mapping with polarimetric SAR.

### Interplanetary transfers
*DCU, 2023*

My BSc thesis: a Python simulation of orbital transfers between planets using NASA JPL data.
