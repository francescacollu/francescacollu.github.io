**Methodology**

This analysis combines administrative school data with satellite- and land-cover-based greenness measures for public schools in Silicon Valley.

This analysis uses California Department of Education (CDE) data on public schools (locations and names) and Free or Reduced-Price Meal (FRPM) eligibility as a proxy for economic disadvantage. These school locations were then linked to remote-sensing data in Google Earth Engine: Sentinel-2 surface reflectance imagery for NDVI and the USGS National Land Cover Database (NLCD) Tree Canopy Cover layer.

For satellite greenness, NDVI (Normalized Difference Vegetation Index) was computed from Sentinel-2 over 2023-06-01 to 2025-09-30 (median composite after cloud masking).
Tree canopy data comes from the 2023 NLCD (CONUS release).
FRPM data corresponds to the 2024–25 school year.

The *greenery index* is a composite measure that gives equal weight to:
* school-area NDVI mean (general vegetative greenness)
* school-area NLCD canopy mean (tree canopy cover).
Higher values indicate greener school surroundings relative to other schools in the sample.

**Limitations**

This is an area-level indicator, not a direct measure of students’ daily exposure to green space. Results are sensitive to methodological choices (buffer size, date window, cloud masking, and canopy threshold), and NDVI can capture non-tree vegetation (e.g., grass) while NLCD canopy emphasizes trees. Spatial resolution differences (10m vs 30m), geocoding/ID matching noise, and annual NLCD timing can also affect estimates. 
